#!/usr/bin/env bash

# Parallel Command Runner with Log Management and Fail-Fast
# Usage: ./run-parallel.sh "command1" "command2" ...

set -u
set -o pipefail

# Ensure log directory exists within the safe workspace
LOG_DIR="boomtick-pkg/cli/logs/parallel"
mkdir -p "$LOG_DIR"
rm -f "$LOG_DIR"/*.log

# State tracking
declare -A job_pids
declare -A job_logs
declare -A job_cmds

exit_code=0
num_jobs=$#

if [ "$num_jobs" -eq 0 ]; then
  echo "No commands provided to run-parallel.sh"
  exit 0
fi

# Cleanup function to terminate background jobs on failure or exit
cleanup() {
  for pid in "${!job_pids[@]}"; do
    if kill -0 "$pid" 2>/dev/null; then
      kill "$pid" 2>/dev/null
    fi
  done
}

trap cleanup EXIT SIGINT SIGTERM

# Start all jobs in the background
i=1
for cmd in "$@"; do
  log_file="$LOG_DIR/job_$i.log"
  echo "[Parallel] Starting Job $i: $cmd"

  # Execute command in a subshell with log redirection
  ( eval "$cmd" ) > "$log_file" 2>&1 &
  pid=$!

  job_pids[$pid]=$i
  job_logs[$i]=$log_file
  job_cmds[$i]=$cmd
  ((i++))
done

# Monitor jobs
while [ "${#job_pids[@]}" -gt 0 ]; do
  for pid in "${!job_pids[@]}"; do
    if ! kill -0 "$pid" 2>/dev/null; then
      wait "$pid"
      status=$?
      index=${job_pids[$pid]}
      unset job_pids[$pid]

      if [ $status -ne 0 ]; then
        echo "[Parallel] FATAL: Job $index failed with status $status: ${job_cmds[$index]}"
        exit_code=$status
        cleanup
        break 2
      fi
    fi
  done
  sleep 0.5
done

# Aggregate logs
echo ""
echo "========================================"
echo "      Parallel Execution Summary        "
echo "========================================"

# Sort indices numerically for consistent output
sorted_indices=$(echo "${!job_logs[@]}" | tr ' ' '\n' | sort -n)

for idx in $sorted_indices; do
  echo ">>> [Job $idx Log] ${job_cmds[$idx]}"
  if [ -f "${job_logs[$idx]}" ]; then
    cat "${job_logs[$idx]}"
  else
    echo "(Log file missing)"
  fi
  echo "<<< [Job $idx] Finished"
  echo "----------------------------------------"
done

if [ $exit_code -eq 0 ]; then
  echo "[Parallel] All jobs completed successfully."
else
  echo "[Parallel] Execution failed. See logs above."
fi

exit $exit_code

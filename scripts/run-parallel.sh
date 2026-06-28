#!/usr/bin/env bash
set -e

# script to run commands in parallel and wait for them
# usage: ./run-parallel.sh "cmd1" "cmd2" "cmd3"

LOG_DIR="boomtick-pkg/cli/logs/parallel"
mkdir -p "$LOG_DIR"

PIDS=()
for i in "${!@}"; do
  cmd="${!i}"
  log_file="$LOG_DIR/job_$i.log"
  echo "Running job $i: $cmd (logging to $log_file)"
  eval "$cmd" > "$log_file" 2>&1 &
  PIDS+=($!)
done

RET=0
for i in "${!PIDS[@]}"; do
  pid="${PIDS[$i]}"
  if ! wait "$pid"; then
    echo "Job $i (PID $pid) failed. See $LOG_DIR/job_$((i+1)).log"
    RET=1
  else
    echo "Job $i (PID $pid) succeeded."
  fi
done

exit $RET

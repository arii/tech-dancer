#!/usr/bin/env bash
set -e

# script to run commands in parallel and wait for them
# usage: ./run-parallel.sh "cmd1" "cmd2" "cmd3"

LOG_DIR="boomtick-pkg/cli/logs/parallel"
mkdir -p "$LOG_DIR"

PIDS=()
INDEX=1
for cmd in "$@"; do
  log_file="$LOG_DIR/job_$INDEX.log"
  echo "Running job $INDEX: $cmd (logging to $log_file)"
  eval "$cmd" > "$log_file" 2>&1 &
  PIDS+=($!)
  ((INDEX++))
done

RET=0
INDEX=1
for pid in "${PIDS[@]}"; do
  if ! wait "$pid"; then
    echo "Job $INDEX (PID $pid) failed. See $LOG_DIR/job_$INDEX.log"
    RET=1
  else
    echo "Job $INDEX (PID $pid) succeeded."
  fi
  ((INDEX++))
done

exit $RET

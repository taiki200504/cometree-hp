#!/bin/sh
set -e

# Stop background Next.js dev server using pidfile
# Usage: scripts/dev-stop-bg.sh [pidfile]

PIDFILE=${1:-/tmp/unionhp-dev.pid}

if [ -f "$PIDFILE" ]; then
  PID=$(cat "$PIDFILE")
  if ps -p $PID >/dev/null 2>&1; then
    kill -TERM $PID || true
    sleep 1
    if ps -p $PID >/dev/null 2>&1; then
      kill -KILL $PID || true
    fi
    echo "Stopped dev server PID $PID"
  else
    echo "No running process with PID $(cat "$PIDFILE")"
  fi
  rm -f "$PIDFILE"
else
  echo "No pidfile found at $PIDFILE"
fi



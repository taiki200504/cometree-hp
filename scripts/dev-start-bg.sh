#!/bin/sh
set -e

# Start Next.js dev server in background with logging and pidfile
# Usage: scripts/dev-start-bg.sh [logfile] [pidfile]

export NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED:-1}

LOG=${1:-/tmp/unionhp-dev.log}
PIDFILE=${2:-/tmp/unionhp-dev.pid}

if [ -f "$PIDFILE" ] && ps -p "$(cat "$PIDFILE" 2>/dev/null)" >/dev/null 2>&1; then
  echo "Dev server already running (PID $(cat "$PIDFILE"))"
  exit 0
fi

pnpm dev >"$LOG" 2>&1 &
PID=$!
echo $PID > "$PIDFILE"
echo "Started dev server PID $PID; log: $LOG; pidfile: $PIDFILE"



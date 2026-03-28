#!/bin/sh
# Convert logo.svg to a 512x512 PNG (e.g. for Play Store icon)
set -e

SCRIPT_DIR=$(dirname "$0")
INPUT="$SCRIPT_DIR/../public/logo.svg"
OUTPUT="$SCRIPT_DIR/../logo-512.png"

if ! command -v rsvg-convert >/dev/null 2>&1; then
  echo "rsvg-convert not found. Install with: brew install librsvg"
  exit 1
fi

rsvg-convert -w 512 -h 512 "$INPUT" -o "$OUTPUT"
echo "Created $OUTPUT"

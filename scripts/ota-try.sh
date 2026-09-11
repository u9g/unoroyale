#!/bin/sh
# Try HEAD on your phone over the air before it goes to everyone:
# pushes HEAD to the ota-try branch, waits for CI to publish its bundle,
# then pins this device to it in uno-stats. `ota-try.sh off` unpins.
set -e

DEVICE_ID=$(git config unoroyale.deviceId || true)
if [ -z "$DEVICE_ID" ]; then
  echo "Set your phone's id first: git config unoroyale.deviceId <id>  (see the games table in uno-stats)"
  exit 1
fi
d1() { (cd "$(dirname "$0")/../../uno-stats" && npx wrangler d1 execute uno-stats --remote --command "$1" >/dev/null); }

if [ "$1" = "off" ]; then
  d1 "delete from devices where device_id = '$DEVICE_ID'"
  echo "Unpinned; the phone follows main again on its next launch."
  exit 0
fi

SHA=$(git rev-parse HEAD)
BUNDLE=$(echo "$SHA" | cut -c1-7)
git push -f origin "HEAD:refs/heads/ota-try"

echo "Waiting for CI to publish bundle-$BUNDLE..."
until gh release view "bundle-$BUNDLE" >/dev/null 2>&1; do
  gh run list --branch ota-try --commit "$SHA" --json conclusion -q '.[0].conclusion' | grep -q '^failure$' && { echo "CI failed"; exit 1; }
  sleep 10
done

d1 "insert or replace into devices (device_id, bundle) values ('$DEVICE_ID', '$BUNDLE')"
echo "Pinned to $BUNDLE. Open the app, background it, reopen. Run 'npm run ota:try -- off' to unpin."

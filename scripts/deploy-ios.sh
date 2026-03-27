#!/bin/sh
set -e

# Run web build and device discovery in parallel
DEST_FILE=$(mktemp)
xcodebuild -project ios/App/App.xcodeproj -scheme App -showdestinations 2>/dev/null > "$DEST_FILE" &
DEST_PID=$!

npm run cap:sync

wait "$DEST_PID"

# Extract device ID + name from cached destinations
DEVICE_LINE=$(grep 'platform:iOS, arch:' "$DEST_FILE" | grep -v Simulator | head -1)
DEVICE_ID=$(echo "$DEVICE_LINE" | sed 's/.*id:\([^,]*\),.*/\1/')
rm -f "$DEST_FILE"

if [ -z "$DEVICE_ID" ]; then
  echo "No connected iPhone found."
  exit 1
fi

DEVICE_NAME=$(echo "$DEVICE_LINE" | sed 's/.*name:\(.*\) }.*/\1/')
echo "Deploying to $DEVICE_NAME ($DEVICE_ID)..."

# Build for device
xcodebuild -project ios/App/App.xcodeproj -scheme App \
  -destination "id=$DEVICE_ID" \
  -allowProvisioningUpdates \
  -quiet \
  SYMROOT="$PWD/ios/build"

# Install and launch on device
xcrun devicectl device install app --device "$DEVICE_ID" "ios/build/Debug-iphoneos/App.app"
echo "Launching app on $DEVICE_NAME..."
xcrun devicectl device process launch --device "$DEVICE_ID" dev.u9g.unoroyale

echo "Deployed and launched on $DEVICE_NAME."

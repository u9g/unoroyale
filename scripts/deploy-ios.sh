#!/bin/sh
set -e

# Build and sync web assets to iOS project
npm run cap:sync

# Find connected iPhone device ID
DEVICE_ID=$(xcodebuild -project ios/App/App.xcodeproj -scheme App -showdestinations 2>/dev/null \
  | grep 'platform:iOS, arch:' \
  | grep -v Simulator \
  | head -1 \
  | sed 's/.*id:\([^,]*\),.*/\1/')

if [ -z "$DEVICE_ID" ]; then
  echo "No connected iPhone found."
  exit 1
fi

DEVICE_NAME=$(xcodebuild -project ios/App/App.xcodeproj -scheme App -showdestinations 2>/dev/null \
  | grep "id:$DEVICE_ID" \
  | sed 's/.*name:\(.*\) }.*/\1/')

echo "Deploying to $DEVICE_NAME ($DEVICE_ID)..."

# Build for device
xcodebuild -project ios/App/App.xcodeproj -scheme App \
  -destination "id=$DEVICE_ID" \
  -allowProvisioningUpdates \
  -quiet

# Install on device
APP_PATH=$(xcodebuild -project ios/App/App.xcodeproj -scheme App -showBuildSettings 2>/dev/null \
  | grep ' BUILT_PRODUCTS_DIR' \
  | awk '{print $3}')

xcrun devicectl device install app --device "$DEVICE_ID" "$APP_PATH/App.app"

# Launch the app on device
echo "Launching app on $DEVICE_NAME..."
xcrun devicectl device process launch --device "$DEVICE_ID" dev.u9g.unoroyale

echo "Deployed and launched on $DEVICE_NAME."

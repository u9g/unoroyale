#!/bin/sh
# Build the Play Store bundle: android/app/build/outputs/bundle/release/app-release.aab
#
# AGP 8.13 rejects JDK 25, so Gradle is pinned to 21 regardless of the default java.
# Signing comes from android/keystore.properties; without it the bundle builds unsigned.
set -e

SCRIPT_DIR=$(dirname "$0")
ROOT=$(cd "$SCRIPT_DIR/.." && pwd)

JAVA_HOME=$(/usr/libexec/java_home -v 21)
export JAVA_HOME
export ANDROID_HOME="${ANDROID_HOME:-/opt/homebrew/share/android-commandlinetools}"

if [ ! -d "$ANDROID_HOME/platforms/android-36" ]; then
  echo "Missing SDK platform. Install with:"
  echo "  sdkmanager --install 'platforms;android-36' 'build-tools;36.0.0' 'platform-tools'"
  exit 1
fi

npm run cap:sync:android

if [ ! -f "$ROOT/android/keystore.properties" ]; then
  echo "Warning: android/keystore.properties missing — the bundle will be unsigned."
  echo "Copy android/keystore.properties.example and fill it in to upload to Play."
fi

cd "$ROOT/android"
./gradlew bundleRelease
echo "Built android/app/build/outputs/bundle/release/app-release.aab"

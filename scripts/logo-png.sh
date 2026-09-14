#!/bin/sh
# Render public/logo.svg into every raster form the stores need:
#   logo-512.png                     Play Store listing icon
#   android mipmap-*/ic_launcher*    legacy + adaptive launcher icons
#
# The iOS icon is checked in as a pre-rendered PNG and is not regenerated here;
# its glyph metrics differ from rsvg's and it already ships.
#
# Android adaptive icons draw a 108dp canvas but only show the inner 72dp, so the
# gradient becomes the background layer and the glyph is scaled to that safe zone.
set -e

SCRIPT_DIR=$(dirname "$0")
ROOT="$SCRIPT_DIR/.."
LOGO="$ROOT/public/logo.svg"
RES="$ROOT/android/app/src/main/res"

if ! command -v rsvg-convert >/dev/null 2>&1; then
  echo "rsvg-convert not found. Install with: brew install librsvg"
  exit 1
fi

rsvg-convert -w 512 -h 512 "$LOGO" -o "$ROOT/logo-512.png"

TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

# Background layer: the wild-card gradient, full bleed.
sed '/<text/d' "$LOGO" > "$TMP/bg.svg"
# Foreground layer: the glyph alone, scaled into the central 72/108 of the canvas.
sed -e '/<rect/d' \
    -e 's|<text |<text transform="translate(512,512) scale(0.667) translate(-512,-512)" |' \
    "$LOGO" > "$TMP/fg.svg"

# density:legacy px:adaptive px (48dp and 108dp respectively)
for entry in mdpi:48:108 hdpi:72:162 xhdpi:96:216 xxhdpi:144:324 xxxhdpi:192:432; do
  density=${entry%%:*}
  rest=${entry#*:}
  legacy=${rest%%:*}
  adaptive=${rest#*:}
  dir="$RES/mipmap-$density"
  mkdir -p "$dir"
  rsvg-convert -w "$legacy" -h "$legacy" "$LOGO" -o "$dir/ic_launcher.png"
  rsvg-convert -w "$legacy" -h "$legacy" "$LOGO" -o "$dir/ic_launcher_round.png"
  rsvg-convert -w "$adaptive" -h "$adaptive" "$TMP/bg.svg" -o "$dir/ic_launcher_background.png"
  rsvg-convert -w "$adaptive" -h "$adaptive" "$TMP/fg.svg" -o "$dir/ic_launcher_foreground.png"
done

echo "Rendered store and Android icons from $LOGO"

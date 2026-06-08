#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_VID="$ROOT/assets/video/emporium-exterior.mov"
SRC_LAND="$ROOT/assets/photos/emporium-storefront-landscape.heic"
SRC_PORT="$ROOT/assets/photos/emporium-milkshake-sign-portrait.heic"

OUT_VID="$ROOT/public/video"
OUT_IMG="$ROOT/public/images"
mkdir -p "$OUT_VID" "$OUT_IMG"

echo "→ Converting video to web mp4 (720p, h264 crf 28)..."
ffmpeg -y -i "$SRC_VID" \
  -vf "scale=-2:720" \
  -c:v libx264 -preset slow -crf 28 -movflags +faststart \
  -an "$OUT_VID/emporium-exterior.mp4"

echo "→ Extracting video poster frame (1s in)..."
ffmpeg -y -i "$SRC_VID" -ss 00:00:01 -vframes 1 -q:v 3 "$OUT_VID/emporium-poster.jpg"

echo "→ Converting HEIC photos to WebP via sips + cwebp..."
TMP=$(mktemp -d)
sips -s format jpeg -Z 2400 "$SRC_LAND" --out "$TMP/land.jpg" > /dev/null
sips -s format jpeg -Z 1600 "$SRC_PORT" --out "$TMP/port.jpg" > /dev/null
cwebp -q 85 "$TMP/land.jpg" -o "$OUT_IMG/storefront-landscape.webp" 2>&1 | tail -1
cwebp -q 85 "$TMP/port.jpg" -o "$OUT_IMG/milkshake-sign-portrait.webp" 2>&1 | tail -1
rm -rf "$TMP"

echo "✓ Asset optimization complete."

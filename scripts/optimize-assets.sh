#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_VID="$ROOT/assets/video/emporium-exterior.mov"
SRC_LAND="$ROOT/assets/photos/emporium-storefront-landscape.heic"
SRC_PORT="$ROOT/assets/photos/emporium-milkshake-sign-portrait.heic"

OUT_VID="$ROOT/public/video"
OUT_IMG="$ROOT/public/images"
mkdir -p "$OUT_VID" "$OUT_IMG"

echo "→ Converting video to web mp4 (1080p, h264)..."
ffmpeg -y -i "$SRC_VID" \
  -vf "scale=-2:1080" \
  -c:v libx264 -preset slow -crf 24 -movflags +faststart \
  -an "$OUT_VID/emporium-exterior.mp4"

echo "→ Converting video to webm (1080p, vp9)..."
ffmpeg -y -i "$SRC_VID" \
  -vf "scale=-2:1080" \
  -c:v libvpx-vp9 -crf 34 -b:v 0 \
  -an "$OUT_VID/emporium-exterior.webm"

echo "→ Extracting video poster frame (1s in)..."
ffmpeg -y -i "$SRC_VID" -ss 00:00:01 -vframes 1 -q:v 3 "$OUT_VID/emporium-poster.jpg"

echo "→ Converting HEIC photos to WebP via sips + ffmpeg..."
TMP=$(mktemp -d)
sips -s format jpeg "$SRC_LAND" --out "$TMP/land.jpg" > /dev/null
sips -s format jpeg "$SRC_PORT" --out "$TMP/port.jpg" > /dev/null
ffmpeg -y -i "$TMP/land.jpg" -vf "scale=2400:-2" -q:v 85 "$OUT_IMG/storefront-landscape.webp"
ffmpeg -y -i "$TMP/port.jpg" -vf "scale=1600:-2" -q:v 85 "$OUT_IMG/milkshake-sign-portrait.webp"
rm -rf "$TMP"

echo "✓ Asset optimization complete."

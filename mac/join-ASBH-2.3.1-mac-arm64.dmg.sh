#!/bin/sh
# Rebuilds ASBH-2.3.1-mac-arm64.dmg from its parts and checks it
cd "$(dirname "$0")"
cat ASBH-2.3.1-mac-arm64.dmg.part* > ASBH-2.3.1-mac-arm64.dmg
echo "07d325c360a78e1059b459086aaea1bd1f9ffc132d530a51ebfc04094db9fa9c  ASBH-2.3.1-mac-arm64.dmg" | shasum -a 256 -c - 2>/dev/null || echo "07d325c360a78e1059b459086aaea1bd1f9ffc132d530a51ebfc04094db9fa9c  ASBH-2.3.1-mac-arm64.dmg" | sha256sum -c -

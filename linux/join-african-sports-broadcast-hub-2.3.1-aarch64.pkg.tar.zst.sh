#!/bin/sh
# Rebuilds african-sports-broadcast-hub-2.3.1-aarch64.pkg.tar.zst from its parts and checks it
cd "$(dirname "$0")"
cat african-sports-broadcast-hub-2.3.1-aarch64.pkg.tar.zst.part* > african-sports-broadcast-hub-2.3.1-aarch64.pkg.tar.zst
echo "cfd143a2f62ba9fcef2c1114c96bf3d691f2d5cdca8ea91247008a2b341844b1  african-sports-broadcast-hub-2.3.1-aarch64.pkg.tar.zst" | shasum -a 256 -c - 2>/dev/null || echo "cfd143a2f62ba9fcef2c1114c96bf3d691f2d5cdca8ea91247008a2b341844b1  african-sports-broadcast-hub-2.3.1-aarch64.pkg.tar.zst" | sha256sum -c -

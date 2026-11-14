#!/bin/sh
# Rebuilds african-sports-broadcast-hub-2.3.1-x64.pkg.tar.zst from its parts and checks it
cd "$(dirname "$0")"
cat african-sports-broadcast-hub-2.3.1-x64.pkg.tar.zst.part* > african-sports-broadcast-hub-2.3.1-x64.pkg.tar.zst
echo "b27358aa8b03ec242789911bc34480fb194730a747a627cb7dc87a8978718cf1  african-sports-broadcast-hub-2.3.1-x64.pkg.tar.zst" | shasum -a 256 -c - 2>/dev/null || echo "b27358aa8b03ec242789911bc34480fb194730a747a627cb7dc87a8978718cf1  african-sports-broadcast-hub-2.3.1-x64.pkg.tar.zst" | sha256sum -c -

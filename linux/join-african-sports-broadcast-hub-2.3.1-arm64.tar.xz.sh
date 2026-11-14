#!/bin/sh
# Rebuilds african-sports-broadcast-hub-2.3.1-arm64.tar.xz from its parts and checks it
cd "$(dirname "$0")"
cat african-sports-broadcast-hub-2.3.1-arm64.tar.xz.part* > african-sports-broadcast-hub-2.3.1-arm64.tar.xz
echo "f50ff4390d5f8d3182cee334dd77821d0c92787157e900f9e96b9ab144c6c189  african-sports-broadcast-hub-2.3.1-arm64.tar.xz" | shasum -a 256 -c - 2>/dev/null || echo "f50ff4390d5f8d3182cee334dd77821d0c92787157e900f9e96b9ab144c6c189  african-sports-broadcast-hub-2.3.1-arm64.tar.xz" | sha256sum -c -

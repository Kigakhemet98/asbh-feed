#!/bin/sh
# Rebuilds african-sports-broadcast-hub-2.3.1-arm64.deb from its parts and checks it
cd "$(dirname "$0")"
cat african-sports-broadcast-hub-2.3.1-arm64.deb.part* > african-sports-broadcast-hub-2.3.1-arm64.deb
echo "4f76186041f2830fe844b4bcf9e6d454fc93cf03a7960df76b7e84382df19d83  african-sports-broadcast-hub-2.3.1-arm64.deb" | shasum -a 256 -c - 2>/dev/null || echo "4f76186041f2830fe844b4bcf9e6d454fc93cf03a7960df76b7e84382df19d83  african-sports-broadcast-hub-2.3.1-arm64.deb" | sha256sum -c -

#!/bin/sh
# Rebuilds african-sports-broadcast-hub-2.3.1-x64.tar.xz from its parts and checks it
cd "$(dirname "$0")"
cat african-sports-broadcast-hub-2.3.1-x64.tar.xz.part* > african-sports-broadcast-hub-2.3.1-x64.tar.xz
echo "c5f84fbf3a06b4bccbc58f4421c1b64ad188c05a73ac985519d9ab92b6c5f51e  african-sports-broadcast-hub-2.3.1-x64.tar.xz" | shasum -a 256 -c - 2>/dev/null || echo "c5f84fbf3a06b4bccbc58f4421c1b64ad188c05a73ac985519d9ab92b6c5f51e  african-sports-broadcast-hub-2.3.1-x64.tar.xz" | sha256sum -c -

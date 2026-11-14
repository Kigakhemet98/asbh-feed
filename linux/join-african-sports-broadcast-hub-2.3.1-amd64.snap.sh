#!/bin/sh
# Rebuilds african-sports-broadcast-hub-2.3.1-amd64.snap from its parts and checks it
cd "$(dirname "$0")"
cat african-sports-broadcast-hub-2.3.1-amd64.snap.part* > african-sports-broadcast-hub-2.3.1-amd64.snap
echo "54ecd37dcd4e7aee51fc632095055e0209c8d01a4d48e471c9644171069a5d64  african-sports-broadcast-hub-2.3.1-amd64.snap" | shasum -a 256 -c - 2>/dev/null || echo "54ecd37dcd4e7aee51fc632095055e0209c8d01a4d48e471c9644171069a5d64  african-sports-broadcast-hub-2.3.1-amd64.snap" | sha256sum -c -

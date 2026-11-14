#!/bin/sh
# Rebuilds african-sports-broadcast-hub-2.3.1-amd64.deb from its parts and checks it
cd "$(dirname "$0")"
cat african-sports-broadcast-hub-2.3.1-amd64.deb.part* > african-sports-broadcast-hub-2.3.1-amd64.deb
echo "77947e0aa9a64e1a325e0ec29465aa3bb264c206a7243f3d2f441401e929ace1  african-sports-broadcast-hub-2.3.1-amd64.deb" | shasum -a 256 -c - 2>/dev/null || echo "77947e0aa9a64e1a325e0ec29465aa3bb264c206a7243f3d2f441401e929ace1  african-sports-broadcast-hub-2.3.1-amd64.deb" | sha256sum -c -

#!/bin/sh
# Rebuilds african-sports-broadcast-hub-2.3.1-aarch64.rpm from its parts and checks it
cd "$(dirname "$0")"
cat african-sports-broadcast-hub-2.3.1-aarch64.rpm.part* > african-sports-broadcast-hub-2.3.1-aarch64.rpm
echo "fee39fc5facb17af4d807368b9f861883335b73ce2b47a24917eabee81d66e9c  african-sports-broadcast-hub-2.3.1-aarch64.rpm" | shasum -a 256 -c - 2>/dev/null || echo "fee39fc5facb17af4d807368b9f861883335b73ce2b47a24917eabee81d66e9c  african-sports-broadcast-hub-2.3.1-aarch64.rpm" | sha256sum -c -

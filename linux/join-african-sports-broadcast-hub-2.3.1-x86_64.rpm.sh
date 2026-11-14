#!/bin/sh
# Rebuilds african-sports-broadcast-hub-2.3.1-x86_64.rpm from its parts and checks it
cd "$(dirname "$0")"
cat african-sports-broadcast-hub-2.3.1-x86_64.rpm.part* > african-sports-broadcast-hub-2.3.1-x86_64.rpm
echo "43b63ce47705b11efa374c5e50e72222d9bc537f00279cb881d1c7c36ad66bab  african-sports-broadcast-hub-2.3.1-x86_64.rpm" | shasum -a 256 -c - 2>/dev/null || echo "43b63ce47705b11efa374c5e50e72222d9bc537f00279cb881d1c7c36ad66bab  african-sports-broadcast-hub-2.3.1-x86_64.rpm" | sha256sum -c -

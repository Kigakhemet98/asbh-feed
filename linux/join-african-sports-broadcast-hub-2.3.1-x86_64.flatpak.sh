#!/bin/sh
# Rebuilds african-sports-broadcast-hub-2.3.1-x86_64.flatpak from its parts and checks it
cd "$(dirname "$0")"
cat african-sports-broadcast-hub-2.3.1-x86_64.flatpak.part* > african-sports-broadcast-hub-2.3.1-x86_64.flatpak
echo "9c6c8373bc24c3a513a09401407da413263b9a9f115dc58f83c17934078993ee  african-sports-broadcast-hub-2.3.1-x86_64.flatpak" | shasum -a 256 -c - 2>/dev/null || echo "9c6c8373bc24c3a513a09401407da413263b9a9f115dc58f83c17934078993ee  african-sports-broadcast-hub-2.3.1-x86_64.flatpak" | sha256sum -c -

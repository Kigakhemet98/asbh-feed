@echo off
cd /d "%~dp0"
echo Joining African Sports Broadcast Hub 2.2.6 installer...
copy /b "ASBH-Setup-2.2.6.exe.part0"+"ASBH-Setup-2.2.6.exe.part1" "ASBH-Setup-2.2.6.exe" >nul
certutil -hashfile "ASBH-Setup-2.2.6.exe" SHA256 | find /i "3c0e7546f3e9855eb8d6d50a8a86b4c80e3bd1e7450501efca08176f67e471df" >nul
if errorlevel 1 (echo Checksum mismatch - download the parts again. & pause & exit /b 1)
echo Checksum OK. Starting installer...
start "" "ASBH-Setup-2.2.6.exe"

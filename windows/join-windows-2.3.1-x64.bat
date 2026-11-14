@echo off
cd /d "%~dp0"
echo Joining African Sports Broadcast Hub 2.3.1 (x64) installer...
copy /b "ASBH-Setup-2.3.1-x64.exe.part0"+"ASBH-Setup-2.3.1-x64.exe.part1" "ASBH-Setup-2.3.1-x64.exe" >nul
certutil -hashfile "ASBH-Setup-2.3.1-x64.exe" SHA256 | find /i "30e018b6d1711924129b7f48cbdd10460c28d7e40de5f54519614879a5e91fc1" >nul
if errorlevel 1 (echo Checksum mismatch - download the parts again. & pause & exit /b 1)
echo Checksum OK. Starting installer...
start "" "ASBH-Setup-2.3.1-x64.exe"

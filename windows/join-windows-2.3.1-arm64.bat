@echo off
cd /d "%~dp0"
echo Joining African Sports Broadcast Hub 2.3.1 (arm64) installer...
copy /b "ASBH-Setup-2.3.1-arm64.exe.part0"+"ASBH-Setup-2.3.1-arm64.exe.part1" "ASBH-Setup-2.3.1-arm64.exe" >nul
certutil -hashfile "ASBH-Setup-2.3.1-arm64.exe" SHA256 | find /i "e91793e7d4b799de4813f6c7a0579610ae9b69f63ddeb7451d562cd55566c59e" >nul
if errorlevel 1 (echo Checksum mismatch - download the parts again. & pause & exit /b 1)
echo Checksum OK. Starting installer...
start "" "ASBH-Setup-2.3.1-arm64.exe"

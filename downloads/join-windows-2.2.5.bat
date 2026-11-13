@echo off
cd /d "%~dp0"
echo Joining African Sports Broadcast Hub 2.2.5 installer...
copy /b "ASBH-Setup-2.2.5.exe.part0"+"ASBH-Setup-2.2.5.exe.part1" "ASBH-Setup-2.2.5.exe" >nul
certutil -hashfile "ASBH-Setup-2.2.5.exe" SHA256 | find /i "6861c24f65cde964b0ed8d5f8dc128612f78ed36e1adffa5fc6ed68afe4c762f" >nul
if errorlevel 1 (echo Checksum mismatch - download the parts again. & pause & exit /b 1)
echo Checksum OK. Starting installer...
start "" "ASBH-Setup-2.2.5.exe"

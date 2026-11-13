@echo off
cd /d "%~dp0"
echo Joining African Sports Broadcast Hub 2.2.7 installer...
copy /b "ASBH-Setup-2.2.7.exe.part0"+"ASBH-Setup-2.2.7.exe.part1" "ASBH-Setup-2.2.7.exe" >nul
certutil -hashfile "ASBH-Setup-2.2.7.exe" SHA256 | find /i "21aef05b2f5f7ede810e607404a53225276c7de28774b2b279c50746f132124e" >nul
if errorlevel 1 (echo Checksum mismatch - download the parts again. & pause & exit /b 1)
echo Checksum OK. Starting installer...
start "" "ASBH-Setup-2.2.7.exe"

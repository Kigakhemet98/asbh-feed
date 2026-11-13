@echo off
cd /d "%~dp0"
echo Joining African Sports Broadcast Hub 2.2.8 installer...
copy /b "ASBH-Setup-2.2.8.exe.part0"+"ASBH-Setup-2.2.8.exe.part1" "ASBH-Setup-2.2.8.exe" >nul
certutil -hashfile "ASBH-Setup-2.2.8.exe" SHA256 | find /i "4024ac1c7c3577204c3eb73ea362e6583a3df70061142dd15803dcdb8fb85f94" >nul
if errorlevel 1 (echo Checksum mismatch - download the parts again. & pause & exit /b 1)
echo Checksum OK. Starting installer...
start "" "ASBH-Setup-2.2.8.exe"

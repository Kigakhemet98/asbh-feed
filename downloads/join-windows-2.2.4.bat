@echo off
cd /d "%~dp0"
echo Joining African Sports Broadcast Hub 2.2.4 installer...
copy /b "ASBH-Setup-2.2.4.exe.part0"+"ASBH-Setup-2.2.4.exe.part1" "ASBH-Setup-2.2.4.exe" >nul
certutil -hashfile "ASBH-Setup-2.2.4.exe" SHA256 | find /i "0d422d082a2d041def6e8b6406441e4750c7f76847c1fd312171a1ce4c425da6" >nul
if errorlevel 1 (echo Checksum mismatch - download the parts again. & pause & exit /b 1)
echo Checksum OK. Starting installer...
start "" "ASBH-Setup-2.2.4.exe"

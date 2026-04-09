@echo off
echo ============================================
echo   Lumiere Studio - Installing Dependencies
echo ============================================

echo [1/2] Installing backend dependencies...
cd backend
call npm install
cd ..

echo [2/2] Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo Installation complete!
echo Run start.bat to launch the application.
pause

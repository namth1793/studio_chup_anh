@echo off
echo ============================================
echo   Lumiere Studio - Starting Application
echo ============================================

echo Starting backend (port 5016)...
start "Lumiere Backend" cmd /k "cd backend && npm start"

timeout /t 2 /nobreak > nul

echo Starting frontend (port 5173)...
start "Lumiere Frontend" cmd /k "cd frontend && npm run dev"

timeout /t 3 /nobreak > nul

echo.
echo ============================================
echo   Application is running!
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:5016
echo ============================================

start http://localhost:5173

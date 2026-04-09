@echo off
echo ============================================
echo   DEPLOY BACKEND -> RAILWAY
echo ============================================
cd backend

echo.
echo [Step 1] Login Railway (opens browser)...
railway login

echo.
echo [Step 2] Create new Railway project...
railway init

echo.
echo [Step 3] Deploy to Railway...
railway up --detach

echo.
echo [Step 4] Get your Railway URL...
railway open

echo.
echo ============================================
echo  IMPORTANT: Copy your Railway URL above!
echo  It looks like: https://xxx.railway.app
echo  Then run: deploy-frontend.bat
echo ============================================
pause

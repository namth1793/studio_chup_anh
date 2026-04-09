@echo off
echo ============================================
echo   DEPLOY FRONTEND -> NETLIFY
echo ============================================

set /p RAILWAY_URL="Paste your Railway URL (e.g. https://xxx.railway.app): "

echo.
echo Updating API URL in netlify.toml...
powershell -Command "(Get-Content 'frontend\netlify.toml') -replace 'RAILWAY_URL_PLACEHOLDER', '%RAILWAY_URL%' | Set-Content 'frontend\netlify.toml'"

echo.
cd frontend

echo [Step 1] Login Netlify (opens browser)...
netlify login

echo.
echo [Step 2] Build & Deploy to Netlify...
netlify deploy --build --prod --dir=dist --message="Lumiere Studio"

echo.
echo ============================================
echo  Done! Your site is live on Netlify.
echo ============================================
pause

@echo off
echo ====================================
echo   GitHub Upload Script
echo ====================================
echo.

cd /d "%~dp0"

echo [1/7] Initializing Git...
git init
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo.
echo [2/7] Adding all files...
git add .

echo.
echo [3/7] Creating first commit...
git commit -m "🎉 Initial commit: Complete portfolio website"

echo.
echo [4/7] Renaming branch to main...
git branch -M main

echo.
echo ====================================
echo   IMPORTANT: Manual Step Required
echo ====================================
echo.
echo Please go to GitHub and create a new repository:
echo   1. Go to: https://github.com/new
echo   2. Repository name: oaexam8-lgtm.github.io
echo   3. Make it PUBLIC
echo   4. Do NOT add README, .gitignore, or License
echo   5. Click "Create repository"
echo.
echo Press any key when you have created the repository...
pause > nul

echo.
echo [5/7] Adding remote repository...
git remote add origin https://github.com/oaexam8-lgtm/oaexam8-lgtm.github.io.git

echo.
echo [6/7] Pushing to GitHub...
echo.
echo NOTE: If asked for credentials:
echo   Username: oaexam8-lgtm
echo   Password: Use a Personal Access Token (not your password)
echo.
git push -u origin main

if errorlevel 1 (
    echo.
    echo ====================================
    echo   Authentication Failed
    echo ====================================
    echo.
    echo You need a Personal Access Token:
    echo   1. Go to: https://github.com/settings/tokens
    echo   2. Generate new token (classic)
    echo   3. Select 'repo' scope
    echo   4. Copy the token
    echo   5. Run this script again and use token as password
    echo.
    pause
    exit /b 1
)

echo.
echo ====================================
echo   SUCCESS! 🎉
echo ====================================
echo.
echo Your portfolio has been uploaded to GitHub!
echo.
echo Next steps:
echo   1. Go to: https://github.com/oaexam8-lgtm/oaexam8-lgtm.github.io/settings/pages
echo   2. Under "Source", select: main branch
echo   3. Click Save
echo   4. Wait 2-3 minutes
echo   5. Visit: https://oaexam8-lgtm.github.io
echo.
echo Congratulations! Your website is now live! 🚀
echo.
pause

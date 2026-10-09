@echo off
title MovieFinder - Full Stack Launcher
echo ========================================================
echo Launching MovieFinder Application (Backend + Frontend)
echo ========================================================
start "MovieFinder Backend (8080)" "%~dp0start-backend.bat"
timeout /t 5 /nobreak >nul
start "MovieFinder Frontend (5173)" "%~dp0start-frontend.bat"
echo.
echo Servers started:
echo   - Frontend: http://localhost:5173
echo   - Backend:  http://localhost:8080
echo.

@echo off
title MovieFinder - Frontend (React Vite)
echo ========================================================
echo Starting MovieFinder React Frontend on Port 5173...
echo ========================================================
cd /d "%~dp0frontend"
call npm run dev -- --host --port 5173
pause

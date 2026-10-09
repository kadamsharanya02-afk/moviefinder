@echo off
title MovieFinder - Backend (Spring Boot)
echo ========================================================
echo Starting MovieFinder Spring Boot Backend on Port 8080...
echo ========================================================
cd /d "%~dp0backend"
java -jar target/moviefinder-backend-1.0.0.jar
pause

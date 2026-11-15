@echo off
title After the Footprints - FastAPI Backend Server
echo ========================================================
echo  Launching After the Footprints Space Archive Backend
echo ========================================================
echo.
echo Installing requirements if needed...
python -m pip install -r backend/requirements.txt
echo.
echo Starting FastAPI Uvicorn Server at http://127.0.0.1:8000 ...
python backend/run_server.py
pause

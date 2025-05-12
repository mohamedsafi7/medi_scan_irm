@echo off
echo Starting MediScan AI application...

REM Start the Python backend in a new window
start cmd /k "echo Starting Python backend... && python mri_analysis_service.py"

REM Wait a moment for the Python backend to start
timeout /t 5 /nobreak > nul

REM Start the React frontend in a new window
start cmd /k "echo Starting React frontend... && npm run dev"

echo MediScan AI application started successfully!
echo.
echo The application is now running:
echo - Python backend: http://localhost:5000
echo - React frontend: http://localhost:5173 (or the port shown in the frontend window)
echo.
echo To test if the backend is running, visit: http://localhost:5000/api/test
echo.
echo Press any key to exit this window (the application will continue running)...
pause > nul

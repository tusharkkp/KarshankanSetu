@echo off
echo Starting Krishi Sakhi Frontend Server...
echo.
cd frontend
echo Installing frontend dependencies...
npm install
echo.
echo Starting frontend server on port 8080...
echo Frontend will be available at: http://localhost:8080
echo.
npm run dev
pause

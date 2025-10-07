@echo off
echo Initializing ISES Project...

echo Creating project directories...
mkdir frontend\src\components 2>nul
mkdir frontend\src\hooks 2>nul
mkdir frontend\src\pages 2>nul
mkdir frontend\src\services 2>nul
mkdir frontend\src\utils 2>nul
mkdir frontend\src\assets 2>nul
mkdir frontend\public 2>nul
mkdir backend\app\Http\Controllers\API 2>nul
mkdir backend\app\Models 2>nul
mkdir backend\app\Services 2>nul
mkdir backend\database\migrations 2>nul
mkdir backend\routes 2>nul
mkdir backend\config 2>nul

echo Project structure created successfully!

echo Setup complete! You can now:
echo 1. Run 'docker-compose up -d' to start the development environment
echo 2. Or navigate to frontend/ and run 'npm install' for frontend development
echo 3. Or navigate to backend/ and run 'composer install' for backend development
#!/bin/bash

echo "Initializing ISES Project..."

# Create necessary directories
echo "Creating project directories..."
mkdir -p frontend/src/{components,hooks,pages,services,utils,assets}
mkdir -p frontend/public
mkdir -p backend/app/{Http/Controllers/API,Models,Services}
mkdir -p backend/database/migrations
mkdir -p backend/routes
mkdir -p backend/config

echo "Project structure created successfully!"

echo "Setup complete! You can now:"
echo "1. Run 'docker-compose up -d' to start the development environment"
echo "2. Or navigate to frontend/ and run 'npm install' for frontend development"
echo "3. Or navigate to backend/ and run 'composer install' for backend development"
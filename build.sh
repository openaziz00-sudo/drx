#!/bin/bash

echo "Building Gentle AI..."

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd gentle-ai-frontend
npm install --legacy-peer-deps

# Build frontend
echo "Building frontend..."
npm run build

# Copy build to backend public folder
echo "Copying build files..."
mkdir -p ../gentle-ai-backend-nodejs/public
cp -r dist/* ../gentle-ai-backend-nodejs/public/

# Install backend dependencies
echo "Installing backend dependencies..."
cd ../gentle-ai-backend-nodejs
npm install

# Generate Prisma Client
echo "Generating Prisma Client..."
npx prisma generate

echo "Build completed successfully!"

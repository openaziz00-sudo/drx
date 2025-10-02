#!/bin/bash

echo "Building Gentle AI for Vercel..."

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

# Go back to root
cd ..

# Install backend dependencies
echo "Installing backend dependencies..."
cd gentle-ai-backend-nodejs
npm install

# Generate Prisma Client
echo "Generating Prisma Client..."
npx prisma generate

# Install API dependencies
echo "Installing API dependencies..."
cd ../api
npm install

echo "Build completed successfully!"

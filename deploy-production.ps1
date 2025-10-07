# RCA Security Group - Production Deployment Script
# Builds and deploys obfuscated version to GitHub Pages

Write-Host "🚀 RCA Security Group - Production Deployment" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Green

# Check if Node.js is available for build process
try {
    node --version | Out-Null
    Write-Host "✅ Node.js found" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js to build production files." -ForegroundColor Red
    exit 1
}

# Run build process
Write-Host "🔨 Building production files..." -ForegroundColor Yellow
node build.js

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

# Set git config to prevent hanging
git config core.autocrlf false
git config core.safecrlf false

# Check if we're in the right branch
$currentBranch = git branch --show-current
if ($currentBranch -ne "master") {
    Write-Host "⚠️  Warning: Not on master branch (currently on $currentBranch)" -ForegroundColor Yellow
}

# Check git status
Write-Host "📊 Checking git status..." -ForegroundColor Yellow
git status --porcelain

# Add all changes (including new dist folder)
Write-Host "📝 Adding all changes..." -ForegroundColor Yellow
git add .

# Get commit message from user
$commitMessage = Read-Host "💬 Enter commit message (or press Enter for 'Production deployment')"
if ([string]::IsNullOrEmpty($commitMessage)) {
    $commitMessage = "Production deployment - obfuscated code"
}

# Commit changes
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m $commitMessage

# Push to GitHub
Write-Host "🌐 Pushing to GitHub..." -ForegroundColor Yellow
git push origin master

Write-Host "✅ Production deployment complete!" -ForegroundColor Green
Write-Host "🌍 Your obfuscated website is live at: https://iamrca.github.io/rca-security-website/" -ForegroundColor Cyan
Write-Host "📁 Development files remain in your local repository with full comments" -ForegroundColor Cyan
Write-Host "🔒 Public-facing code is now obfuscated and minified" -ForegroundColor Green
Write-Host "⏱️  Changes will be live in 2-3 minutes" -ForegroundColor Yellow

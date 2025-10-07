#!/usr/bin/env node

/**
 * Build script for RCA Security Group Website
 * Creates production-ready files with obfuscated/minified code
 */

const fs = require('fs');
const path = require('path');

// Minification function
function minifyJS(code) {
    return code
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*$/gm, '')
        // Remove extra whitespace
        .replace(/\s+/g, ' ')
        .replace(/;\s*}/g, ';}')
        .replace(/{\s*/g, '{')
        .replace(/\s*}/g, '}')
        // Remove empty lines
        .replace(/\n\s*\n/g, '\n')
        .trim();
}

function minifyCSS(code) {
    return code
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove extra whitespace
        .replace(/\s+/g, ' ')
        .replace(/;\s*}/g, ';}')
        .replace(/{\s*/g, '{')
        .replace(/\s*}/g, '}')
        .replace(/,\s*/g, ',')
        .trim();
}

function obfuscateVariableNames(code) {
    const variableMap = new Map();
    let counter = 0;
    
    // Generate short obfuscated names
    function getObfuscatedName() {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let name = '';
        let num = counter++;
        
        while (num >= 0) {
            name = chars[num % chars.length] + name;
            num = Math.floor(num / chars.length) - 1;
        }
        
        return name;
    }
    
    // Replace common variable names with obfuscated ones
    const commonVars = [
        'loadingScreen', 'introScreen', 'loadingContent', 'urlParams',
        'hasSeenDemo', 'skipDemo', 'isMobile', 'mobileNote'
    ];
    
    commonVars.forEach(varName => {
        if (code.includes(varName)) {
            const obfuscated = getObfuscatedName();
            variableMap.set(varName, obfuscated);
            code = code.replace(new RegExp(`\\b${varName}\\b`, 'g'), obfuscated);
        }
    });
    
    return code;
}

// Build process
function build() {
    console.log('🔨 Building production files...');
    
    // Create dist directory
    const distDir = path.join(__dirname, 'dist');
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir);
    }
    
    // Copy and minify JavaScript
    const jsSource = fs.readFileSync('script.js', 'utf8');
    const minifiedJS = minifyJS(jsSource);
    const obfuscatedJS = obfuscateVariableNames(minifiedJS);
    fs.writeFileSync(path.join(distDir, 'script.min.js'), obfuscatedJS);
    
    // Copy and minify CSS
    const cssSource = fs.readFileSync('styles.css', 'utf8');
    const minifiedCSS = minifyCSS(cssSource);
    fs.writeFileSync(path.join(distDir, 'styles.min.css'), minifiedCSS);
    
    // Copy HTML files with updated references
    const htmlFiles = ['index.html', 'mobile.html', 'split-screen-demo.html', 'victory.html', 'security-checklist.html'];
    
    htmlFiles.forEach(file => {
        if (fs.existsSync(file)) {
            let htmlContent = fs.readFileSync(file, 'utf8');
            
            // Replace script references
            htmlContent = htmlContent.replace('script.js', 'script.min.js');
            htmlContent = htmlContent.replace('styles.css', 'styles.min.css');
            
            // Remove any remaining comments that might reveal development info
            htmlContent = htmlContent.replace(/<!--[\s\S]*?-->/g, '');
            
            fs.writeFileSync(path.join(distDir, file), htmlContent);
        }
    });
    
    // Copy other assets
    const assetsToCopy = ['security-config.js', '.htaccess', 'SECURITY.md'];
    assetsToCopy.forEach(asset => {
        if (fs.existsSync(asset)) {
            fs.copyFileSync(asset, path.join(distDir, asset));
        }
    });
    
    console.log('✅ Build complete! Production files in /dist folder');
    console.log('📁 Deploy the contents of /dist to your web server');
}

// Run build
build();

# FIX LOCALHOST URLs IN PRODUCTION DATABASE

## Problem
About content and other images are pointing to http://127.0.0.1:8000 instead of https://sdev.apratifoods.asia

## Solution
Upload `fix-production-urls.php` to your server and run it.

## Steps:
1. Upload `fix-production-urls.php` to `/aprati_backend/` folder
2. SSH into your server or use File Manager's terminal
3. Run: `cd aprati_backend && php fix-production-urls.php`

## What it fixes:
- About content images
- Management post images  
- Information section images
- Hero images
- Brand logos
- Product images

All localhost URLs will be replaced with: https://sdev.apratifoods.asia

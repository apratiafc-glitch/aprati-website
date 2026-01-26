# Aprati Foods - Hero Slides Seeder for cPanel

This package contains scripts to seed hero slides data on your cPanel hosting.

## Files Included

1. **seed-hero-slides.php** - Run via web browser
2. **seed-hero-slides.sh** - Run via SSH/Terminal

---

## METHOD 1: Via Web Browser (Easiest)

### Steps:

1. **Upload the file:**
   - Upload `seed-hero-slides.php` to your `public_html` folder via cPanel File Manager

2. **Visit the URL:**
   ```
   https://yourdomain.com/seed-hero-slides.php?key=aprati-hero-2026
   ```
   
   Replace `yourdomain.com` with your actual domain

3. **Check the result:**
   - You should see "✅ Hero slides seeded successfully!"

4. **Delete the file:**
   - **IMPORTANT:** Delete `seed-hero-slides.php` from your server for security
   - Or uncomment the auto-delete line in the file

### Security Notes:

- The script requires a secret key parameter (`?key=aprati-hero-2026`)
- **Change the secret key** in line 20 of the PHP file before uploading
- Delete the file immediately after running

---

## METHOD 2: Via SSH/Terminal (Recommended)

If you have SSH access to your cPanel:

### Steps:

1. **Upload the file:**
   - Upload `seed-hero-slides.sh` to your home directory

2. **Connect via SSH:**
   ```bash
   ssh your-username@your-server.com
   ```

3. **Make it executable:**
   ```bash
   chmod +x seed-hero-slides.sh
   ```

4. **Run the script:**
   ```bash
   ./seed-hero-slides.sh
   ```

5. **Check the output:**
   ```
   ✅ Hero slides seeded successfully!
   ```

---

## METHOD 3: Via cPanel Terminal

1. Log into cPanel
2. Open "Terminal" (under Advanced section)
3. Navigate to your Laravel directory:
   ```bash
   cd public_html
   ```
4. Run the command directly:
   ```bash
   php artisan db:seed --class=HeroSlideSeeder
   ```

---

## METHOD 4: Via Cron Job (Automated)

1. Go to cPanel > Cron Jobs
2. Add a new cron job:
   - **Command:**
     ```bash
     cd /home/your-username/public_html && php artisan db:seed --class=HeroSlideSeeder
     ```
   - **Schedule:** Run once (set to specific date/time)
3. Save and wait for it to run
4. Delete the cron job after it runs

---

## Troubleshooting

### "Class 'HeroSlideSeeder' not found"

Run this first:
```bash
composer dump-autoload
php artisan db:seed --class=HeroSlideSeeder
```

### "Access denied" or "Permission denied"

Option 1: Check file permissions
```bash
chmod 644 seed-hero-slides.php
```

Option 2: Run via SSH instead of browser

### "artisan file not found"

Adjust the path in the script to match your Laravel installation:
```php
$laravel_path = '/home/your-username/public_html';
```

---

## After Running

1. Visit your website: `https://yourdomain.com`
2. The hero section should now show 3 slides
3. Delete the seeder scripts from your server
4. Done! 🎉

---

## What Gets Created

The seeder creates **3 hero slides**:

1. **Welcome to Aprati** (Blue theme)
2. **Delicious Frutati Candies** (Green theme)
3. **Premium Mocati Chocolate** (Orange theme)

Each slide includes:
- Title and subtitle
- Hero image from Unsplash
- Two CTA buttons
- Custom colors and animations

---

## Security Recommendations

✅ **DO:**
- Change the secret key before uploading
- Delete scripts after running
- Use SSH method if available
- Run only once

❌ **DON'T:**
- Leave scripts on server
- Use default secret key
- Share the script URL publicly
- Run multiple times (will duplicate data)

---

## Questions?

If you encounter issues:
1. Check Laravel logs: `storage/logs/laravel.log`
2. Verify database connection in `.env`
3. Ensure migrations have run: `php artisan migrate`
4. Contact your hosting support for SSH/terminal access

---

**Aprati Foods (Cambodia) Ltd**  
Hero Slides Seeder - Version 1.0

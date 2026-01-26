<?php
/**
 * Storage Link Fixer - Remove directory and create proper symlink
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Security check
$SECRET_KEY = 'aprati2024secure';
if (!isset($_GET['key']) || $_GET['key'] !== $SECRET_KEY) {
    die('❌ Unauthorized. Add ?key=YOUR_SECRET_KEY to URL');
}

echo "<html><head><title>Fix Storage Link</title>";
echo "<style>body{font-family:monospace;padding:20px;background:#f5f5f5;}
.ok{color:green;font-weight:bold;} .error{color:red;font-weight:bold;} .warning{color:orange;font-weight:bold;}
pre{background:#fff;padding:15px;border-radius:8px;margin:10px 0;}
.btn{background:#667eea;color:white;padding:12px 24px;text-decoration:none;border-radius:5px;display:inline-block;margin:10px 5px;}
.btn-danger{background:#dc3545;}
</style></head><body>";

echo "<h1>🔧 Fix Storage Link</h1>";

// Find Laravel root
$laravelRoot = '/home/apratifoodscom/public_html/sdev.apratifoods.asia/aprati_backend';
$publicDir = $laravelRoot . '/public';
$storageLink = $publicDir . '/storage';
$storageTarget = $laravelRoot . '/storage/app/public';

echo "<pre>";
echo "Laravel Root: $laravelRoot\n";
echo "Public Dir: $publicDir\n";
echo "Storage Link: $storageLink\n";
echo "Should point to: $storageTarget\n";
echo "</pre>";

// Check current status
$linkExists = file_exists($storageLink);
$isSymlink = is_link($storageLink);
$isDirectory = is_dir($storageLink) && !is_link($storageLink);

echo "<h2>Current Status:</h2>";
echo "<p>Storage exists: <span class='" . ($linkExists ? "ok" : "error") . "'>" . ($linkExists ? "YES" : "NO") . "</span></p>";
echo "<p>Is symlink: <span class='" . ($isSymlink ? "ok" : "warning") . "'>" . ($isSymlink ? "YES ✅" : "NO ⚠️") . "</span></p>";
echo "<p>Is directory: <span class='" . ($isDirectory ? "warning" : "ok") . "'>" . ($isDirectory ? "YES (PROBLEM!) ⚠️" : "NO") . "</span></p>";

// Fix action
if (isset($_GET['action']) && $_GET['action'] === 'fix') {
    echo "<h2>🔨 Fixing...</h2>";
    
    $success = false;
    
    if ($isDirectory) {
        // Backup the directory
        $backupPath = $publicDir . '/storage_backup_' . date('YmdHis');
        echo "<p>1. Backing up directory to: $backupPath...</p>";
        
        if (rename($storageLink, $backupPath)) {
            echo "<p class='ok'>✅ Backed up successfully</p>";
            
            // Now create symlink
            echo "<p>2. Creating symbolic link...</p>";
            
            if (symlink($storageTarget, $storageLink)) {
                echo "<p class='ok'>✅ Symlink created successfully!</p>";
                $success = true;
            } else {
                echo "<p class='error'>❌ Failed to create symlink</p>";
                echo "<p class='warning'>Symlinks might not be supported. Trying alternative...</p>";
                
                // Alternative: Create directory and copy files
                if (mkdir($storageLink, 0755, true)) {
                    echo "<p>3. Created storage directory, copying files...</p>";
                    
                    // Copy all subdirectories
                    $folders = ['brands', 'products', 'information-sections', 'hero-images', 'profile_images', 'cv_files'];
                    foreach ($folders as $folder) {
                        $source = $storageTarget . '/' . $folder;
                        $dest = $storageLink . '/' . $folder;
                        
                        if (is_dir($source)) {
                            exec("cp -r " . escapeshellarg($source) . " " . escapeshellarg($dest), $output, $return);
                            if ($return === 0) {
                                echo "<p class='ok'>✅ Copied: $folder</p>";
                            } else {
                                echo "<p class='warning'>⚠️ Could not copy: $folder</p>";
                            }
                        }
                    }
                    
                    $success = true;
                    echo "<p class='ok'>✅ Files copied as fallback solution</p>";
                }
            }
        } else {
            echo "<p class='error'>❌ Failed to backup directory</p>";
        }
    } elseif ($isSymlink) {
        echo "<p class='ok'>✅ Storage is already a symlink - no fix needed!</p>";
        $success = true;
    } else {
        // Create new symlink
        echo "<p>Creating symbolic link...</p>";
        if (symlink($storageTarget, $storageLink)) {
            echo "<p class='ok'>✅ Symlink created successfully!</p>";
            $success = true;
        } else {
            echo "<p class='error'>❌ Failed to create symlink</p>";
        }
    }
    
    if ($success) {
        echo "<h2>✅ Fix Complete!</h2>";
        echo "<p><a href='https://sdev.apratifoods.asia/admin/information-sections' class='btn'>Test Information Sections</a></p>";
        echo "<p><a href='/fix-storage-link.php' class='btn'>Check Status</a></p>";
    } else {
        echo "<h2>❌ Fix Failed</h2>";
        echo "<p>Contact hosting support to enable symlink creation or manually copy files.</p>";
    }
    
} else {
    // Show fix button
    echo "<h2>Action Required:</h2>";
    
    if ($isDirectory) {
        echo "<p class='warning'>⚠️ The storage folder is a regular directory, not a symlink.</p>";
        echo "<p>This prevents images from loading correctly.</p>";
        echo "<p><a href='?key=$SECRET_KEY&action=fix' class='btn btn-danger' onclick='return confirm(\"This will backup the current storage folder and create a proper symlink. Continue?\")'>🔧 Fix Storage Link Now</a></p>";
    } elseif ($isSymlink) {
        echo "<p class='ok'>✅ Storage link is already configured correctly!</p>";
    } else {
        echo "<p class='error'>❌ Storage folder doesn't exist</p>";
        echo "<p><a href='?key=$SECRET_KEY&action=fix' class='btn'>Create Storage Link</a></p>";
    }
}

echo "<p><small>Generated at: " . date('Y-m-d H:i:s') . "</small></p>";
echo "</body></html>";
?>

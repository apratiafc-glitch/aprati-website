<?php
/**
 * Update APP_KEY in .env file
 * This script updates the APP_KEY directly on the server
 */

echo "=== Update APP_KEY Script ===\n\n";

// The new APP_KEY to set
$newAppKey = 'base64:zZZZGBiaZcu8wu4yqZ1Z8SNSb+PapMPR7DAfBaKek5I=';

// Find the .env file
$laravelRoot = dirname(__DIR__);
$envPath = $laravelRoot . '/.env';

echo "Laravel Root: $laravelRoot\n";
echo "ENV file path: $envPath\n\n";

// Check if .env exists
if (!file_exists($envPath)) {
    die("❌ ERROR: .env file not found at $envPath\n");
}

// Check if readable
if (!is_readable($envPath)) {
    die("❌ ERROR: .env file is not readable. Check permissions.\n");
}

// Check if writable
if (!is_writable($envPath)) {
    die("❌ ERROR: .env file is not writable. Check permissions (should be 644).\n");
}

echo "✓ .env file found and is writable\n\n";

// Read current content
$envContent = file_get_contents($envPath);

// Check current APP_KEY
if (preg_match('/^APP_KEY=(.*)$/m', $envContent, $matches)) {
    $currentKey = trim($matches[1]);
    echo "Current APP_KEY: " . ($currentKey ?: '(empty)') . "\n";
    echo "Length: " . strlen($currentKey) . " characters\n\n";
} else {
    echo "⚠️ APP_KEY line not found in .env\n\n";
}

echo "New APP_KEY: $newAppKey\n";
echo "Length: " . strlen($newAppKey) . " characters\n\n";

// Confirm before updating
echo "### Updating APP_KEY ###\n";

// Replace APP_KEY line
$updated = preg_replace(
    '/^APP_KEY=.*$/m',
    'APP_KEY=' . $newAppKey,
    $envContent
);

if ($updated === $envContent) {
    echo "⚠️ WARNING: No changes made. APP_KEY pattern not found or already set.\n\n";
} else {
    // Write back to file
    $result = file_put_contents($envPath, $updated);
    
    if ($result !== false) {
        echo "✓ SUCCESS: APP_KEY updated in .env file!\n";
        echo "Bytes written: $result\n\n";
        
        // Verify the change
        $verifyContent = file_get_contents($envPath);
        if (preg_match('/^APP_KEY=(.*)$/m', $verifyContent, $matches)) {
            $verifiedKey = trim($matches[1]);
            if ($verifiedKey === $newAppKey) {
                echo "✓ VERIFIED: APP_KEY successfully updated\n";
                echo "New value: " . substr($verifiedKey, 0, 20) . "...\n\n";
            } else {
                echo "❌ ERROR: Verification failed. Key doesn't match.\n";
                echo "Expected: " . substr($newAppKey, 0, 20) . "...\n";
                echo "Got: " . substr($verifiedKey, 0, 20) . "...\n\n";
            }
        }
        
        echo "### Next Steps ###\n";
        echo "1. Run clear-cache.php to clear Laravel caches\n";
        echo "2. Test API endpoints with config-test.html\n";
        echo "3. Delete this script for security\n";
        
    } else {
        echo "❌ ERROR: Failed to write to .env file\n";
        echo "Check file permissions and disk space.\n";
    }
}

echo "\n=== Update Complete ===\n";

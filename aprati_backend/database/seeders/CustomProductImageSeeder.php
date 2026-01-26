<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class CustomProductImageSeeder extends Seeder
{
    /**
     * Add YOUR real product images here!
     * 
     * Instructions:
     * 1. Replace the image URLs below with YOUR actual product image URLs
     * 2. You can use:
     *    - External URLs: 'https://yourwebsite.com/images/product.jpg'
     *    - Storage paths: '/storage/products/product-name.jpg'
     *    - Multiple images per product: ['image1.jpg', 'image2.jpg', 'image3.jpg']
     * 
     * 3. Run: php artisan db:seed --class=CustomProductImageSeeder
     */
    public function run(): void
    {
        echo "🖼️ Updating products with YOUR real images...\n\n";

        // YOUR PRODUCT IMAGES - CUSTOMIZE THIS!
        $productImages = [
            // Product ID 4: ចាហួយស្វិត រសជាតិត្របែក (Watermelon flavor)
            4 => [
                'https://your-website.com/images/watermelon-candy.jpg', // REPLACE with your image
                // You can add multiple images:
                // 'https://your-website.com/images/watermelon-candy-2.jpg',
                // 'https://your-website.com/images/watermelon-candy-3.jpg',
            ],
            
            // Product ID 5: ចាហួយស្វិត រសជាតិព្រីង (Lychee flavor)
            5 => [
                'https://your-website.com/images/lychee-candy.jpg', // REPLACE with your image
            ],
            
            // Product ID 6: ចាហួយស្វិត រសជាតិគូលែន (Guava flavor)
            6 => [
                'https://your-website.com/images/guava-candy.jpg', // REPLACE with your image
            ],
            
            // Product ID 7: ចាហួយស្វិត រសជាតិក្រូចពោធិ៍សាត់ (Orange flavor)
            7 => [
                'https://your-website.com/images/orange-candy.jpg', // REPLACE with your image
            ],
            
            // Product ID 8: ចាហួយស្វិត រសជាតិអម្ពិលផ្អែម (Tamarind flavor)
            8 => [
                'https://your-website.com/images/tamarind-candy.jpg', // REPLACE with your image
            ],
            
            // Product ID 14: ស្ករគ្រាប់ រសជាតិត្របែក អំបិលម្ទេស (Watermelon chili salt)
            14 => [
                'https://your-website.com/images/watermelon-salt.jpg', // REPLACE with your image
            ],
            
            // Product ID 15: ស្ករគ្រាប់ រសជាតិព្រីង (Lychee salt)
            15 => [
                'https://your-website.com/images/lychee-salt.jpg', // REPLACE with your image
            ],
            
            // Product ID 16: ស្ករគ្រាប់ រសជាតិទំពាំងបាយជូរ (Sour fruit salt)
            16 => [
                'https://your-website.com/images/sour-fruit-salt.jpg', // REPLACE with your image
            ],
            
            // Product ID 21: នំម៉ូកាទី រសជាតិ​សូកូឡា (Mocati chocolate cookie)
            21 => [
                'https://your-website.com/images/mocati-chocolate.jpg', // REPLACE with your image
            ],
            
            // Product ID 22: នំអេប្រាទី រស់ជាតិសូកូឡា (Aprati chocolate biscuit)
            22 => [
                'https://your-website.com/images/aprati-chocolate.jpg', // REPLACE with your image
            ],
            
            // Product ID 29: ចាហួយស្វិត រសជាតិកូឡា (Cola candy)
            29 => [
                'https://your-website.com/images/cola-candy.jpg', // REPLACE with your image
            ],
            
            // Product ID 30: ចាហួយស្វិត រសជាតិម៉ុងតុល (Mint candy)
            30 => [
                'https://your-website.com/images/mint-candy.jpg', // REPLACE with your image
            ],
            
            // Product ID 31: ចាហួយស្វិត រសជាតិផ្លែឈើចម្រុះ (Mixed fruit candy)
            31 => [
                'https://your-website.com/images/mixed-fruit-candy.jpg', // REPLACE with your image
            ],
            
            // Product ID 32: ចាហួយស្វិត រសជាតិស្ត្របឺរី (Strawberry candy)
            32 => [
                'https://your-website.com/images/strawberry-candy.jpg', // REPLACE with your image
            ],
        ];

        $updated = 0;
        $skipped = 0;

        foreach ($productImages as $productId => $images) {
            $product = Product::find($productId);
            
            if ($product) {
                // Skip if using placeholder URLs
                if (strpos($images[0], 'your-website.com') !== false) {
                    echo "⏭️  Skipped Product ID {$productId}: {$product->name} (placeholder URL)\n";
                    $skipped++;
                    continue;
                }
                
                try {
                    $product->update(['images' => $images]);
                    echo "✅ Updated Product ID {$productId}: {$product->name}\n";
                    echo "   Images: " . implode(', ', $images) . "\n\n";
                    $updated++;
                } catch (\Exception $e) {
                    echo "❌ Failed Product ID {$productId}: {$e->getMessage()}\n\n";
                }
            }
        }

        echo "\n========================================\n";
        echo "✅ Updated: {$updated} products\n";
        echo "⏭️  Skipped: {$skipped} products (placeholder URLs)\n";
        echo "========================================\n\n";
        
        if ($skipped > 0) {
            echo "⚠️  Edit this file and replace placeholder URLs with your real image URLs!\n";
            echo "📁 File: database/seeders/CustomProductImageSeeder.php\n\n";
        } else {
            echo "🎉 Done! Refresh your browser to see your product images!\n";
            echo "📱 Visit: http://localhost:3000\n\n";
        }
    }
}

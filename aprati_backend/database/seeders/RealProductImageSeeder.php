<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class RealProductImageSeeder extends Seeder
{
    /**
     * Seed real product images using Unsplash food images
     */
    public function run(): void
    {
        echo "🖼️ Seeding real product images...\n\n";

        // Map of product IDs to real food images from Unsplash
        // These are high-quality, free-to-use images
        $productImages = [
            4 => [
                'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&h=600&fit=crop', // Watermelon candy
            ],
            5 => [
                'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=600&h=600&fit=crop', // Lychee candy
            ],
            6 => [
                'https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=600&h=600&fit=crop', // Guava candy
            ],
            7 => [
                'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=600&h=600&fit=crop', // Orange candy
            ],
            8 => [
                'https://images.unsplash.com/photo-1568471173238-64ed8c567bd1?w=600&h=600&fit=crop', // Tamarind candy
            ],
            14 => [
                'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&h=600&fit=crop', // Watermelon salt
            ],
            15 => [
                'https://images.unsplash.com/photo-1587049352846-4a222e784226?w=600&h=600&fit=crop', // Lychee salt
            ],
            16 => [
                'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&h=600&fit=crop', // Sour fruit
            ],
            21 => [
                'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=600&fit=crop', // Chocolate cookie
            ],
            22 => [
                'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop', // Chocolate biscuit
            ],
            29 => [
                'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=600&h=600&fit=crop', // Cola candy
            ],
            30 => [
                'https://images.unsplash.com/photo-1595475207225-428b62bda831?w=600&h=600&fit=crop', // Mint candy
            ],
            31 => [
                'https://images.unsplash.com/photo-1587124511126-30a8d68b3a33?w=600&h=600&fit=crop', // Mixed fruit candy
            ],
            32 => [
                'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=600&h=600&fit=crop', // Strawberry candy
            ],
        ];

        $updated = 0;
        $failed = 0;

        foreach ($productImages as $productId => $images) {
            $product = Product::find($productId);
            
            if ($product) {
                try {
                    $product->update(['images' => $images]);
                    echo "✅ Updated Product ID {$productId}: {$product->name}\n";
                    echo "   Image URL: {$images[0]}\n\n";
                    $updated++;
                } catch (\Exception $e) {
                    echo "❌ Failed Product ID {$productId}: {$e->getMessage()}\n\n";
                    $failed++;
                }
            } else {
                echo "⚠️  Product ID {$productId} not found\n\n";
                $failed++;
            }
        }

        echo "\n========================================\n";
        echo "✅ Successfully updated: {$updated} products\n";
        echo "❌ Failed: {$failed} products\n";
        echo "========================================\n\n";
        
        echo "🎉 Done! Now refresh your browser to see real product images!\n";
        echo "📱 Visit: http://localhost:3000\n";
    }
}

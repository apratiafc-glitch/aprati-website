<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;

class ProductImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Sample product images (using placeholder service)
        $products = Product::all();

        foreach ($products as $index => $product) {
            // Generate a unique color based on product ID
            $colors = ['FF6B6B', '4ECDC4', '45B7D1', 'FFA07A', '98D8C8', 'F7DC6F', 'BB8FCE', '85C1E2'];
            $color = $colors[$product->id % count($colors)];
            
            // Create a local SVG data URI (no external service needed)
            $svg = '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">' .
                   '<rect width="600" height="600" fill="#' . $color . '"/>' .
                   '<text x="300" y="300" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle">' .
                   'Product ' . $product->id .
                   '</text>' .
                   '</svg>';
            
            $imageUrl = 'data:image/svg+xml;base64,' . base64_encode($svg);
            
            // Update product with images array
            $product->update([
                'images' => [$imageUrl]
            ]);

            $this->command->info("✅ Added image to product: {$product->name}");
        }

        $this->command->info("🎉 Successfully added images to " . $products->count() . " products!");
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductVariant;

class ProductVariantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get existing products
        $products = Product::all();

        foreach ($products as $product) {
            // Create default variant for each product
            ProductVariant::create([
                'product_id' => $product->id,
                'name' => 'Original',
                'description' => 'Classic flavor',
                'price' => $product->price ?: 25.99,
                'cost_price' => $product->cost_price ?: 20.00,
                'stock_quantity' => 50,
                'is_default' => true,
                'is_active' => true,
                'sort_order' => 1,
            ]);

            // Add flavor variants based on product name/category
            if (stripos($product->name, 'spice') !== false || 
                stripos($product->name, 'powder') !== false ||
                stripos($product->name, 'turmeric') !== false) {
                
                // Spice variants
                ProductVariant::create([
                    'product_id' => $product->id,
                    'name' => 'Mild',
                    'description' => 'Light and gentle flavor',
                    'price' => ($product->price ?: 25.99) + 2,
                    'cost_price' => ($product->cost_price ?: 20.00) + 1.50,
                    'stock_quantity' => 30,
                    'is_default' => false,
                    'is_active' => true,
                    'sort_order' => 2,
                ]);

                ProductVariant::create([
                    'product_id' => $product->id,
                    'name' => 'Medium',
                    'description' => 'Balanced spice level',
                    'price' => ($product->price ?: 25.99) + 3,
                    'cost_price' => ($product->cost_price ?: 20.00) + 2.00,
                    'stock_quantity' => 45,
                    'is_default' => false,
                    'is_active' => true,
                    'sort_order' => 3,
                ]);

                ProductVariant::create([
                    'product_id' => $product->id,
                    'name' => 'Hot',
                    'description' => 'Strong and spicy',
                    'price' => ($product->price ?: 25.99) + 5,
                    'cost_price' => ($product->cost_price ?: 20.00) + 3.00,
                    'stock_quantity' => 25,
                    'is_default' => false,
                    'is_active' => true,
                    'sort_order' => 4,
                ]);

            } elseif (stripos($product->name, 'rice') !== false) {
                
                // Rice variants
                ProductVariant::create([
                    'product_id' => $product->id,
                    'name' => 'Premium',
                    'description' => 'Extra long grain',
                    'price' => ($product->price ?: 25.99) + 3,
                    'cost_price' => ($product->cost_price ?: 20.00) + 2.00,
                    'stock_quantity' => 40,
                    'is_default' => false,
                    'is_active' => true,
                    'sort_order' => 2,
                ]);

                ProductVariant::create([
                    'product_id' => $product->id,
                    'name' => 'Export Quality',
                    'description' => 'Finest grade available',
                    'price' => ($product->price ?: 25.99) + 8,
                    'cost_price' => ($product->cost_price ?: 20.00) + 5.00,
                    'stock_quantity' => 20,
                    'is_default' => false,
                    'is_active' => true,
                    'sort_order' => 3,
                ]);
            }
        }
    }
}

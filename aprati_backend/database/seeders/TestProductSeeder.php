<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Product;
use Illuminate\Database\Seeder;

class TestProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the Aprati brand
        $apratieBrand = Brand::where('slug', 'aprati')->first();
        
        if (!$apratieBrand) {
            $this->command->error('Aprati brand not found!');
            return;
        }

        // Create test products
        $products = [
            [
                'brand_id' => $apratieBrand->id,
                'name' => 'Premium Basmati Rice',
                'slug' => 'premium-basmati-rice',
                'sku' => 'APR001',
                'part_number' => 'BR001',
                'description' => 'Premium quality basmati rice with authentic flavor and aroma.',
                'short_description' => 'Premium basmati rice',
                'weight' => 5.0,
                'is_active' => true,
                'is_featured' => true,
                'images' => ['brands/logos/cOyMzVna2fUMX2VBIJjnC9ct9Y04grRnejYFeGqf.png'], // Using existing logo as test image
            ],
            [
                'brand_id' => $apratieBrand->id,
                'name' => 'Organic Turmeric Powder',
                'slug' => 'organic-turmeric-powder',
                'sku' => 'APR002',
                'part_number' => 'TP001',
                'description' => 'Pure organic turmeric powder for authentic taste and health benefits.',
                'short_description' => 'Organic turmeric powder',
                'weight' => 0.5,
                'is_active' => true,
                'is_featured' => false,
                'images' => ['brands/logos/cOyMzVna2fUMX2VBIJjnC9ct9Y04grRnejYFeGqf.png'], // Using existing logo as test image
            ],
        ];

        foreach ($products as $productData) {
            Product::firstOrCreate(
                ['slug' => $productData['slug']],
                $productData
            );
        }

        $this->command->info('Test products seeded successfully!');
    }
}

<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            [
                'name' => 'Aprati',
                'slug' => 'aprati',
                'description' => 'Premium traditional food products with authentic flavors.',
                'logo' => 'brands/logos/cOyMzVna2fUMX2VBIJjnC9ct9Y04grRnejYFeGqf.png',
                'website' => 'https://aprati.com',
                'is_active' => true,
                'sort_order' => 1,
                'established_year' => 2015,
            ],
            [
                'name' => 'Frutati',
                'slug' => 'frutati',
                'description' => 'Fresh and natural fruit products for healthy living.',
                'logo' => null, // No logo file found yet
                'website' => 'https://frutati.com',
                'is_active' => true,
                'sort_order' => 2,
                'established_year' => 2018,
            ],
            [
                'name' => 'Mocati',
                'slug' => 'mocati',
                'description' => 'Premium coffee and beverage products.',
                'logo' => null, // No logo file found yet
                'website' => 'https://mocati.com',
                'is_active' => true,
                'sort_order' => 3,
                'established_year' => 2020,
            ],
        ];

        foreach ($brands as $brandData) {
            Brand::firstOrCreate(
                ['slug' => $brandData['slug']],
                $brandData
            );
        }

        $this->command->info('Brands seeded successfully!');
    }
}

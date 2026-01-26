<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\HeroImage;

class HeroImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a default hero image
        HeroImage::create([
            'image_url' => '/images/hero-sample.svg',
            'alt_text' => 'Aprati Food Company - Premium Quality Food Products',
            'title' => 'Premium Quality',
            'description' => 'Fresh Food Products from Aprati Food Company',
            'is_active' => true,
            'sort_order' => 0
        ]);
    }
}

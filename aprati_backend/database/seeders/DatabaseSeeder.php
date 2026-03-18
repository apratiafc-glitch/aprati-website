<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\HeroSlide;
use App\Models\InformationSection;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@aprati.com',
            'password' => '12345678',
            'role' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'role' => 'admin',
        ]);

        // Create Brands
        $aprati = Brand::create([
            'name' => 'Aprati',
            'slug' => 'aprati',
            'description' => 'Premium candy brand',
            'is_active' => true,
        ]);

        $frutati = Brand::create([
            'name' => 'Frutati',
            'slug' => 'frutati',
            'description' => 'Fruit flavored candy',
            'is_active' => true,
        ]);

        $mocati = Brand::create([
            'name' => 'Mocati',
            'slug' => 'mocati',
            'description' => 'Coffee and chocolate treats',
            'is_active' => true,
        ]);

        // Create Categories
        $candy = Category::create(['name' => 'Candy', 'slug' => 'candy', 'is_active' => true]);
        $chocolate = Category::create(['name' => 'Chocolate', 'slug' => 'chocolate', 'is_active' => true]);

        // Create Products
        for ($i = 1; $i <= 5; $i++) {
            Product::create([
                'brand_id' => $aprati->id,
                'category_id' => $candy->id,
                'name' => "Aprati Product $i",
                'slug' => "aprati-product-$i",
                'description' => 'Delicious Aprati candy.',
                'image' => null,
                'is_active' => true,
            ]);
        }

        for ($i = 1; $i <= 5; $i++) {
            Product::create([
                'brand_id' => $frutati->id,
                'category_id' => $candy->id,
                'name' => "Frutati Product $i",
                'slug' => "frutati-product-$i",
                'description' => 'Fruity Frutati candy.',
                'image' => null,
                'is_active' => true,
            ]);
        }

        // Create Hero Slides
        HeroSlide::create([
            'title' => 'Welcome to Aprati',
            'subtitle' => 'Taste the difference',
            'image' => '', // Placeholder
            'button_text' => 'Shop Now',
            'button_link' => '/brands/aprati',
            'sort_order' => 1,
            'is_active' => true,
        ]);

        // Create Information Section
        InformationSection::create([
            'title' => 'About Us',
            'description' => '<p>We are a leading candy manufacturer.</p>',
            'image' => null,
            'is_active' => true,
        ]);
    }
}

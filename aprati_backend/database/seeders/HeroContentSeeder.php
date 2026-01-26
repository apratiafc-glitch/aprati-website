<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\HeroContent;

class HeroContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create default hero content entries
        HeroContent::create([
            'title' => 'Welcome to <span class="text-yellow-300">Aprati</span> Food Company',
            'subtitle' => 'Premium quality food products crafted with excellence and innovation for over two decades.',
            'primary_button_text' => 'Explore Our Brands',
            'primary_button_link' => '/brands',
            'secondary_button_text' => 'Join Our Team',
            'secondary_button_link' => '/careers',
            'is_active' => true,
        ]);

        HeroContent::create([
            'title' => 'Discover <span class="text-yellow-300">Premium</span> Food Solutions',
            'subtitle' => 'From farm to table, we deliver exceptional taste and quality in every product we create.',
            'primary_button_text' => 'View Products',
            'primary_button_link' => '/products',
            'secondary_button_text' => 'Learn More',
            'secondary_button_link' => '/about',
            'is_active' => false,
        ]);

        HeroContent::create([
            'title' => 'Innovation in <span class="text-yellow-300">Food</span> Technology',
            'subtitle' => 'Leading the industry with cutting-edge food processing and sustainable practices.',
            'primary_button_text' => 'Our Technology',
            'primary_button_link' => '/technology',
            'secondary_button_text' => 'Contact Us',
            'secondary_button_link' => '/contact',
            'is_active' => false,
        ]);
    }
}

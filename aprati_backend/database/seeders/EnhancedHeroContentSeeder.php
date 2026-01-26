<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\HeroContent;

class EnhancedHeroContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing content first
        HeroContent::truncate();

        // Create multiple hero content variations for testing
        $heroContents = [
            [
                'title' => 'Welcome to <span class="text-yellow-300">Aprati</span> Food Company',
                'subtitle' => 'Premium quality food products crafted with excellence and innovation for over two decades. Experience the taste of authentic flavors.',
                'primary_button_text' => 'Explore Our Brands',
                'primary_button_link' => '/brands',
                'secondary_button_text' => 'Join Our Team',
                'secondary_button_link' => '/careers',
                'is_active' => true,
            ],
            [
                'title' => 'Discover <span class="text-yellow-300">Premium</span> Food Solutions',
                'subtitle' => 'From farm to table, we deliver exceptional taste and quality in every product we create. Sustainable. Fresh. Delicious.',
                'primary_button_text' => 'View Products',
                'primary_button_link' => '/products',
                'secondary_button_text' => 'Learn More',
                'secondary_button_link' => '/about',
                'is_active' => false,
            ],
            [
                'title' => 'Innovation in <span class="text-yellow-300">Food</span> Technology',
                'subtitle' => 'Leading the industry with cutting-edge food processing and sustainable practices that preserve nutrition and enhance flavor.',
                'primary_button_text' => 'Our Technology',
                'primary_button_link' => '/technology',
                'secondary_button_text' => 'Contact Us',
                'secondary_button_link' => '/contact',
                'is_active' => false,
            ],
            [
                'title' => '<span class="text-yellow-300">Sustainable</span> Food for Future',
                'subtitle' => 'Committed to environmental responsibility while delivering the highest quality food products to families worldwide.',
                'primary_button_text' => 'Sustainability',
                'primary_button_link' => '/sustainability',
                'secondary_button_text' => 'Our Story',
                'secondary_button_link' => '/story',
                'is_active' => false,
            ],
            [
                'title' => 'Taste the <span class="text-yellow-300">Difference</span>',
                'subtitle' => 'Experience authentic flavors from carefully selected ingredients. Every bite tells a story of quality and tradition.',
                'primary_button_text' => 'Shop Now',
                'primary_button_link' => '/shop',
                'secondary_button_text' => 'Find Stores',
                'secondary_button_link' => '/stores',
                'is_active' => false,
            ],
            [
                'title' => 'Partnership in <span class="text-yellow-300">Excellence</span>',
                'subtitle' => 'Building lasting relationships with suppliers, retailers, and customers through transparency and mutual growth.',
                'primary_button_text' => 'Become Partner',
                'primary_button_link' => '/partners',
                'secondary_button_text' => 'Partnership Benefits',
                'secondary_button_link' => '/benefits',
                'is_active' => false,
            ]
        ];

        foreach ($heroContents as $content) {
            HeroContent::create($content);
        }

        $this->command->info('Enhanced hero content seeded successfully with ' . count($heroContents) . ' variations.');
    }
}

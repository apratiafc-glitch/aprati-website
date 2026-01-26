<?php

namespace Database\Seeders;

use App\Models\HeroSlide;
use Illuminate\Database\Seeder;

class HeroSlideSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing slides
        HeroSlide::truncate();

        // Create default hero slides
        $slides = [
            [
                'title' => 'Welcome to <span class="font-black">Aprati</span> Food Company',
                'subtitle' => '🌈 Leading Cambodia\'s food industry with premium quality products and innovation 🌈',
                'image_url' => 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=1920&h=1080&fit=crop',
                'image_alt' => 'Aprati Food Company',
                'badge_text' => '🍬 Welcome to Aprati Foods (Cambodia) Ltd 🍬',
                'badge_color' => 'bg-blue-600 shadow-blue-500/50',
                'overlay_class' => 'bg-blue-600/30',
                'primary_button_text' => '🍭 Explore Our Brands',
                'primary_button_link' => '/brands',
                'primary_button_class' => 'group relative px-8 py-4 sm:px-12 sm:py-6 bg-blue-600 text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/60 rounded-full ring-2 sm:ring-4 ring-white/50 overflow-hidden w-full sm:w-auto',
                'secondary_button_text' => '💼 Join Our Team',
                'secondary_button_link' => '/careers',
                'secondary_button_class' => 'group relative px-8 py-4 sm:px-12 sm:py-6 bg-white text-blue-700 font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-white/60 rounded-full ring-2 sm:ring-4 ring-blue-200 overflow-hidden w-full sm:w-auto',
                'is_active' => true,
                'display_order' => 1,
            ],
            [
                'title' => 'Delicious <span class="font-black text-green-300">Frutati</span> Candies',
                'subtitle' => '🍓 Natural fruit flavors in every bite - Perfect sweetness for everyone 🍊',
                'image_url' => 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1920&h=1080&fit=crop',
                'image_alt' => 'Frutati Fruit Candies',
                'badge_text' => '🍭 Discover Frutati 🍭',
                'badge_color' => 'bg-green-600 shadow-green-500/50',
                'overlay_class' => 'bg-green-600/30',
                'primary_button_text' => '🛒 Shop Now',
                'primary_button_link' => '/brands/frutati',
                'primary_button_class' => 'group relative px-8 py-4 sm:px-12 sm:py-6 bg-green-600 text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-green-500/60 rounded-full ring-2 sm:ring-4 ring-white/50 overflow-hidden w-full sm:w-auto',
                'secondary_button_text' => '📖 Learn More',
                'secondary_button_link' => '/brands',
                'secondary_button_class' => 'group relative px-8 py-4 sm:px-12 sm:py-6 bg-white text-green-700 font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-white/60 rounded-full ring-2 sm:ring-4 ring-green-200 overflow-hidden w-full sm:w-auto',
                'is_active' => true,
                'display_order' => 2,
            ],
            [
                'title' => 'Premium <span class="font-black text-orange-300">Mocati</span> Chocolate',
                'subtitle' => '🎁 Rich chocolate experience with every piece - Pure indulgence awaits 🍫',
                'image_url' => 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=1920&h=1080&fit=crop',
                'image_alt' => 'Mocati Premium Chocolate',
                'badge_text' => '🍫 Indulge in Mocati 🍫',
                'badge_color' => 'bg-orange-600 shadow-orange-500/50',
                'overlay_class' => 'bg-orange-600/30',
                'primary_button_text' => '🎯 View Collection',
                'primary_button_link' => '/brands/mocati',
                'primary_button_class' => 'group relative px-8 py-4 sm:px-12 sm:py-6 bg-orange-600 text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/60 rounded-full ring-2 sm:ring-4 ring-white/50 overflow-hidden w-full sm:w-auto',
                'secondary_button_text' => '📞 Contact Us',
                'secondary_button_link' => '/contact',
                'secondary_button_class' => 'group relative px-8 py-4 sm:px-12 sm:py-6 bg-white text-orange-700 font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-white/60 rounded-full ring-2 sm:ring-4 ring-orange-200 overflow-hidden w-full sm:w-auto',
                'is_active' => true,
                'display_order' => 3,
            ],
        ];

        foreach ($slides as $slide) {
            HeroSlide::create($slide);
        }

        $this->command->info('✅ Hero slides seeded successfully!');
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ManagementPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing data
        \App\Models\ManagementPost::truncate();
        
        // Create sample management posts
        \App\Models\ManagementPost::create([
            'name' => 'John Smith',
            'position' => 'Chief Executive Officer',
            'department' => 'Executive',
            'email' => 'john.smith@aprati.com',
            'description' => 'Experienced leader with over 15 years in the food industry, driving innovation and growth across all our brands.',
            'bio' => 'John has been leading Aprati Foods since 2018, driving innovation and growth across all our brands. His vision for sustainable food production and commitment to quality has positioned the company as a market leader in the industry. Under his leadership, the company has expanded into new markets and launched several successful product lines.',
            'image_url' => '/images/team/john-smith.jpg',
            'is_active' => true
        ]);
        
        \App\Models\ManagementPost::create([
            'name' => 'Sarah Johnson',
            'position' => 'Chief Technology Officer',
            'department' => 'Technology',
            'email' => 'sarah.johnson@aprati.com',
            'description' => 'Technology innovator focused on digital transformation and implementing cutting-edge solutions.',
            'bio' => 'Sarah leads our technology initiatives, implementing cutting-edge solutions to streamline operations and enhance customer experience. She brings 12 years of experience in food tech innovation and has been instrumental in modernizing our production processes and supply chain management systems.',
            'image_url' => '/images/team/sarah-johnson.jpg',
            'is_active' => true
        ]);
        
        \App\Models\ManagementPost::create([
            'name' => 'Michael Chen',
            'position' => 'Chief Marketing Officer',
            'department' => 'Marketing',
            'email' => 'michael.chen@aprati.com',
            'description' => 'Creative marketing strategist with global brand experience and expertise in digital marketing.',
            'bio' => 'Michael oversees brand strategy and marketing campaigns for all Aprati brands. His innovative approach to digital marketing has significantly increased brand visibility and customer engagement. He has successfully launched multiple product campaigns that have resulted in substantial market share growth.',
            'image_url' => '/images/team/michael-chen.jpg',
            'is_active' => true
        ]);
        
        \App\Models\ManagementPost::create([
            'name' => 'Emily Rodriguez',
            'position' => 'Chief Financial Officer',
            'department' => 'Finance',
            'email' => 'emily.rodriguez@aprati.com',
            'description' => 'Financial expert with strong analytical skills and strategic planning expertise.',
            'bio' => 'Emily manages all financial operations and strategic planning initiatives. With over 10 years of experience in corporate finance, she has helped guide the company through several successful expansion phases and maintains strong relationships with investors and financial institutions.',
            'image_url' => '/images/team/emily-rodriguez.jpg',
            'is_active' => true
        ]);
        
        echo "Created " . \App\Models\ManagementPost::count() . " management posts.\n";
    }
}

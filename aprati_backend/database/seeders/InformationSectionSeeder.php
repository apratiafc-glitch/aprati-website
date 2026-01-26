<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\InformationSection;
use App\Models\User;

class InformationSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get admin user
        $admin = User::where('role', 'admin')->first();
        
        if (!$admin) {
            $this->command->warn('No admin user found. Please run UserSeeder first.');
            return;
        }

        $sections = [
            [
                'title' => 'Quality Products',
                'description' => 'We offer high-quality products that meet international standards. Our team carefully selects each item to ensure customer satisfaction.',
                'image_path' => null, // Will use default image
                'is_active' => true,
                'sort_order' => 1,
                'created_by' => $admin->id,
            ],
            [
                'title' => 'Fast Delivery',
                'description' => 'Get your orders delivered quickly with our efficient logistics network. We ensure safe and timely delivery to your doorstep.',
                'image_path' => null,
                'is_active' => true,
                'sort_order' => 2,
                'created_by' => $admin->id,
            ],
            [
                'title' => '24/7 Customer Support',
                'description' => 'Our dedicated support team is available round the clock to assist you with any queries or concerns. Customer satisfaction is our priority.',
                'image_path' => null,
                'is_active' => true,
                'sort_order' => 3,
                'created_by' => $admin->id,
            ],
            [
                'title' => 'Competitive Pricing',
                'description' => 'We offer the best prices in the market without compromising on quality. Enjoy great value for your money with our products.',
                'image_path' => null,
                'is_active' => true,
                'sort_order' => 4,
                'created_by' => $admin->id,
            ],
        ];

        foreach ($sections as $section) {
            InformationSection::create($section);
        }

        $this->command->info('Information sections seeded successfully!');
    }
}

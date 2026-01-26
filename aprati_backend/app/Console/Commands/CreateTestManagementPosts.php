<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\ManagementPost;

class CreateTestManagementPosts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:create-management-posts';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create test management posts for demo purposes';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Creating test management posts...');

        // Clear existing posts
        ManagementPost::truncate();

        // Create test posts
        $posts = [
            [
                'name' => 'John Doe',
                'position' => 'Chief Executive Officer',
                'department' => 'Executive',
                'email' => 'john.doe@apratifoods.com',
                'description' => 'Leading Aprati Food Company with over 15 years of experience in the food industry. Passionate about innovation and sustainable business practices.',
                'bio' => 'John has been instrumental in growing Aprati Food Company from a small local business to a major player in the food industry. His vision for sustainable and innovative food solutions has led the company through multiple successful product launches and market expansions. He holds an MBA from a prestigious business school and has been recognized as Business Leader of the Year multiple times.',
                'image_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
                'is_active' => true
            ],
            [
                'name' => 'Sarah Johnson',
                'position' => 'Chief Technology Officer',
                'department' => 'Technology',
                'email' => 'sarah.johnson@apratifoods.com',
                'description' => 'Driving technological innovation and digital transformation across all our brands and operations.',
                'bio' => 'Sarah brings over 12 years of experience in technology leadership, specializing in food technology and digital innovation. She has led the development of cutting-edge food processing techniques and implemented advanced inventory management systems that have revolutionized our operations.',
                'image_url' => 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=400&h=400&fit=crop&crop=face',
                'is_active' => true
            ],
            [
                'name' => 'Michael Chen',
                'position' => 'Chief Operating Officer',
                'department' => 'Operations',
                'email' => 'michael.chen@apratifoods.com',
                'description' => 'Overseeing daily operations and ensuring quality across all product lines and manufacturing processes.',
                'bio' => 'Michael has extensive experience in operations management and supply chain optimization. He has successfully streamlined our production processes, reduced costs by 20%, and improved product quality standards across all our brands.',
                'image_url' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
                'is_active' => true
            ]
        ];

        foreach ($posts as $postData) {
            ManagementPost::create($postData);
            $this->info("Created post for: {$postData['name']}");
        }

        $this->success('Test management posts created successfully!');
        $this->info('Total posts created: ' . count($posts));
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Brand;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@aprati.com',
            'password' => Hash::make('admin123'),
            'role' => User::ROLE_ADMIN,
            'is_active' => true,
        ]);

        // Create sample brands
        $brands = [
            [
                'name' => 'Aprati',
                'slug' => 'aprati',
                'description' => 'Premium food products with traditional quality',
                'logo' => 'https://via.placeholder.com/200x200/3B82F6/ffffff?text=Aprati',
                'website' => 'https://aprati.com',
                'is_active' => true,
            ],
            [
                'name' => 'Frutati',
                'slug' => 'frutati',
                'description' => 'Fresh and natural fruit products',
                'logo' => 'https://via.placeholder.com/200x200/10B981/ffffff?text=Frutati',
                'website' => 'https://frutati.com',
                'is_active' => true,
            ],
            [
                'name' => 'Mocati',
                'slug' => 'mocati',
                'description' => 'Modern catering and food service solutions',
                'logo' => 'https://via.placeholder.com/200x200/F97316/ffffff?text=Mocati',
                'website' => 'https://mocati.com',
                'is_active' => true,
            ],
        ];

        foreach ($brands as $brandData) {
            Brand::create($brandData);
        }

        // Create a brand admin user
        $frutati = Brand::where('slug', 'frutati')->first();
        User::create([
            'name' => 'Frutati Admin',
            'email' => 'frutati@aprati.com',
            'password' => Hash::make('frutati123'),
            'role' => User::ROLE_BRAND_ADMIN,
            'brand_id' => $frutati->id,
            'is_active' => true,
        ]);

        // Create a regular user
        User::create([
            'name' => 'Regular User',
            'email' => 'user@aprati.com',
            'password' => Hash::make('user123'),
            'role' => User::ROLE_USER,
            'is_active' => true,
        ]);

        // Run additional seeders
        $this->call([
            HeroContentSeeder::class,
            InformationSectionSeeder::class,
        ]);
    }
}

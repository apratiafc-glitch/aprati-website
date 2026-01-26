<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Brand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@aprati.com'],
            [
                'name' => 'System Administrator',
                'email' => 'admin@aprati.com',
                'password' => Hash::make('admin123'),
                'role' => User::ROLE_ADMIN,
                'phone' => '+1234567890',
                'address' => 'Admin Office, Aprati Food Company',
                'is_active' => true,
            ]
        );

        // Create Regular User
        $user = User::firstOrCreate(
            ['email' => 'user@aprati.com'],
            [
                'name' => 'John Doe',
                'email' => 'user@aprati.com',
                'password' => Hash::make('user123'),
                'role' => User::ROLE_USER,
                'phone' => '+1234567891',
                'address' => '123 User Street, City',
                'is_active' => true,
            ]
        );

        // Create Brand Admin for Aprati (if brands exist)
        $apratiBrand = Brand::where('slug', 'aprati')->first();
        if ($apratiBrand) {
            $brandAdmin = User::firstOrCreate(
                ['email' => 'aprati.admin@aprati.com'],
                [
                    'name' => 'Aprati Brand Manager',
                    'email' => 'aprati.admin@aprati.com',
                    'password' => Hash::make('brand123'),
                    'role' => User::ROLE_BRAND_ADMIN,
                    'phone' => '+1234567892',
                    'address' => 'Aprati Brand Office',
                    'is_active' => true,
                    'brand_id' => $apratiBrand->id,
                ]
            );
        }

        // Create Brand Admin for Frutati (if brands exist)
        $frutatiBrand = Brand::where('slug', 'frutati')->first();
        if ($frutatiBrand) {
            $brandAdmin = User::firstOrCreate(
                ['email' => 'frutati.admin@aprati.com'],
                [
                    'name' => 'Frutati Brand Manager',
                    'email' => 'frutati.admin@aprati.com',
                    'password' => Hash::make('brand123'),
                    'role' => User::ROLE_BRAND_ADMIN,
                    'phone' => '+1234567893',
                    'address' => 'Frutati Brand Office',
                    'is_active' => true,
                    'brand_id' => $frutatiBrand->id,
                ]
            );
        }

        // Create Brand Admin for Mocati (if brands exist)
        $mocatiBrand = Brand::where('slug', 'mocati')->first();
        if ($mocatiBrand) {
            $brandAdmin = User::firstOrCreate(
                ['email' => 'mocati.admin@aprati.com'],
                [
                    'name' => 'Mocati Brand Manager',
                    'email' => 'mocati.admin@aprati.com',
                    'password' => Hash::make('brand123'),
                    'role' => User::ROLE_BRAND_ADMIN,
                    'phone' => '+1234567894',
                    'address' => 'Mocati Brand Office',
                    'is_active' => true,
                    'brand_id' => $mocatiBrand->id,
                ]
            );
        }

        $this->command->info('User roles seeded successfully!');
        $this->command->info('Admin credentials: admin@aprati.com / admin123');
        $this->command->info('User credentials: user@aprati.com / user123');
        $this->command->info('Brand Admin credentials: *.admin@aprati.com / brand123');
    }
}

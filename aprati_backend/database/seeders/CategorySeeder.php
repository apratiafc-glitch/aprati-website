<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create main categories first
        $beverages = Category::create([
            'name' => 'Beverages',
            'description' => 'All types of beverages and drinks',
            'is_active' => true,
            'sort_order' => 1,
            'color' => 'blue'
        ]);

        $snacks = Category::create([
            'name' => 'Snacks',
            'description' => 'Snack foods and light meals',
            'is_active' => true,
            'sort_order' => 2,
            'color' => 'green'
        ]);

        $condiments = Category::create([
            'name' => 'Condiments',
            'description' => 'Sauces, spices, and flavor enhancers',
            'is_active' => true,
            'sort_order' => 3,
            'color' => 'red'
        ]);

        $preserves = Category::create([
            'name' => 'Preserves',
            'description' => 'Jams, jellies, and preserved foods',
            'is_active' => true,
            'sort_order' => 4,
            'color' => 'purple'
        ]);

        // Create subcategories for Beverages
        Category::create([
            'name' => 'Fruit Juices',
            'description' => 'Natural and artificial fruit juices',
            'parent_id' => $beverages->id,
            'is_active' => true,
            'sort_order' => 1,
            'color' => 'yellow'
        ]);

        Category::create([
            'name' => 'Energy Drinks',
            'description' => 'Energy and sports drinks',
            'parent_id' => $beverages->id,
            'is_active' => true,
            'sort_order' => 2,
            'color' => 'orange'
        ]);

        Category::create([
            'name' => 'Soft Drinks',
            'description' => 'Carbonated and non-carbonated soft drinks',
            'parent_id' => $beverages->id,
            'is_active' => true,
            'sort_order' => 3,
            'color' => 'cyan'
        ]);

        // Create subcategories for Snacks
        Category::create([
            'name' => 'Chips & Crisps',
            'description' => 'Potato chips and crispy snacks',
            'parent_id' => $snacks->id,
            'is_active' => true,
            'sort_order' => 1,
            'color' => 'amber'
        ]);

        Category::create([
            'name' => 'Nuts & Seeds',
            'description' => 'Roasted nuts and seeds',
            'parent_id' => $snacks->id,
            'is_active' => true,
            'sort_order' => 2,
            'color' => 'brown'
        ]);

        // Create subcategories for Condiments
        Category::create([
            'name' => 'Hot Sauces',
            'description' => 'Spicy sauces and hot condiments',
            'parent_id' => $condiments->id,
            'is_active' => true,
            'sort_order' => 1,
            'color' => 'red'
        ]);

        Category::create([
            'name' => 'Mild Sauces',
            'description' => 'Mild and sweet sauces',
            'parent_id' => $condiments->id,
            'is_active' => true,
            'sort_order' => 2,
            'color' => 'green'
        ]);

        Category::create([
            'name' => 'Spice Blends',
            'description' => 'Mixed spices and seasoning blends',
            'parent_id' => $condiments->id,
            'is_active' => true,
            'sort_order' => 3,
            'color' => 'orange'
        ]);

        // Create subcategories for Preserves
        Category::create([
            'name' => 'Fruit Jams',
            'description' => 'Traditional fruit jams and preserves',
            'parent_id' => $preserves->id,
            'is_active' => true,
            'sort_order' => 1,
            'color' => 'pink'
        ]);

        Category::create([
            'name' => 'Pickled Foods',
            'description' => 'Pickled vegetables and fruits',
            'parent_id' => $preserves->id,
            'is_active' => true,
            'sort_order' => 2,
            'color' => 'lime'
        ]);

        echo "Categories seeded successfully!\n";
        echo "Created " . Category::count() . " categories total.\n";
        echo "Top-level categories: " . Category::whereNull('parent_id')->count() . "\n";
        echo "Subcategories: " . Category::whereNotNull('parent_id')->count() . "\n";
    }
}

<?php

namespace Tests\Feature\Api;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductSearchTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_search_products_by_name()
    {
        $brandId = \Illuminate\Support\Facades\DB::table('brands')->insertGetId([
            'name' => 'Test Brand',
            'slug' => 'test-brand',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $categoryId = \Illuminate\Support\Facades\DB::table('categories')->insertGetId([
            'name' => 'Test Category',
            'slug' => 'test-category',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        \Illuminate\Support\Facades\DB::table('products')->insert([
            'name' => 'Unique Product Name',
            'slug' => 'unique-product-name',
            'brand_id' => $brandId,
            'category_id' => $categoryId,
            'price' => 100,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        \Illuminate\Support\Facades\DB::table('products')->insert([
            'name' => 'Other Product',
            'slug' => 'other-product',
            'brand_id' => $brandId,
            'category_id' => $categoryId,
            'price' => 200,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $response = $this->getJson('/api/products?search=Unique');

        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');
        $response->assertJsonPath('data.0.name', 'Unique Product Name');
    }

    public function test_search_returns_empty_if_no_match()
    {
        $response = $this->getJson('/api/products?search=NonExistent');

        $response->assertStatus(200);
        $response->assertJsonCount(0, 'data');
    }
}

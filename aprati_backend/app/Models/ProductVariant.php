<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'name',
        'description',
        'price',
        'cost_price',
        'stock_quantity',
        'is_default',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'cost_price' => 'decimal:2',
        'stock_quantity' => 'integer',
        'is_default' => 'boolean',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Get the product that owns this variant
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Scope to get active variants
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to get default variant
     */
    public function scopeDefault($query)
    {
        return $query->where('is_default', true);
    }

    /**
     * Check if variant is in stock
     */
    public function isInStock(): bool
    {
        return $this->stock_quantity > 0;
    }
}

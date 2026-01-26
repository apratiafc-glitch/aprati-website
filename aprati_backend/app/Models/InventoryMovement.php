<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryMovement extends Model
{
    use HasFactory;

    const TYPE_IN = 'in';
    const TYPE_OUT = 'out';
    const TYPE_ADJUSTMENT = 'adjustment';

    protected $fillable = [
        'product_id',
        'type',
        'quantity',
        'reference',
        'notes',
        'created_by',
    ];

    protected $casts = [
        'quantity' => 'integer',
    ];

    /**
     * Get the product this movement belongs to
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the user who created this movement
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get available movement types
     */
    public static function getAvailableTypes(): array
    {
        return [
            self::TYPE_IN => 'Stock In',
            self::TYPE_OUT => 'Stock Out',
            self::TYPE_ADJUSTMENT => 'Adjustment',
        ];
    }

    /**
     * Scope to get stock in movements
     */
    public function scopeStockIn($query)
    {
        return $query->where('type', self::TYPE_IN);
    }

    /**
     * Scope to get stock out movements
     */
    public function scopeStockOut($query)
    {
        return $query->where('type', self::TYPE_OUT);
    }

    /**
     * Boot method to update product stock
     */
    protected static function boot()
    {
        parent::boot();

        static::created(function ($movement) {
            $product = $movement->product;
            
            switch ($movement->type) {
                case self::TYPE_IN:
                    $product->increment('stock_quantity', $movement->quantity);
                    break;
                case self::TYPE_OUT:
                    $product->decrement('stock_quantity', $movement->quantity);
                    break;
                case self::TYPE_ADJUSTMENT:
                    // For adjustments, the quantity represents the new total
                    $product->update(['stock_quantity' => $movement->quantity]);
                    break;
            }
        });
    }
}

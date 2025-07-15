<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'product_Ref',
        'product_libelle',
        'prix_achat_colis',
        'prix_achat_unite',
        'prix_vente_colis',
        'prix_vente_unite',
        'brand_id',
        'category_id',
        'product_Poids',
        'nombre_unite_par_colis',
        'product_isActive',
        'observation',
    ];

    protected $casts = [
        'prix_achat_colis' => 'decimal:2',
        'prix_achat_unite' => 'decimal:2',
        'prix_vente_colis' => 'decimal:2',
        'prix_vente_unite' => 'decimal:2',
        'product_Poids' => 'decimal:3',
        'nombre_unite_par_colis' => 'integer',
        'product_isActive' => 'boolean',
    ];

    /**
     * Get the brand that owns the product.
     */
    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    /**
     * Get the category that owns the product.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}

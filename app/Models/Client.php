<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'fullName',
        'idVille',
        'idSecteur',
    ];

    /**
     * Get the ville that owns the client.
     */
    public function ville(): BelongsTo
    {
        return $this->belongsTo(Ville::class, 'idVille');
    }

    /**
     * Get the secteur that owns the client.
     */
    public function secteur(): BelongsTo
    {
        return $this->belongsTo(Secteur::class, 'idSecteur');
    }
}

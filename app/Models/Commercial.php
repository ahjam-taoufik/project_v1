<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commercial extends Model
{
    protected $table = 'commerciaux';

    protected $fillable = [
        'commercial_code',
        'commercial_fullName',
        'commercial_telephone',
    ];
}

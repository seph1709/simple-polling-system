<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Polling extends Model
{
    /** @use HasFactory<\Database\Factories\PollingFactory> */
    use HasFactory;

    protected $fillable = [
        'pollings_data'
    ];

    protected $casts = [
        'pollings_data' => 'array'
        ];
}

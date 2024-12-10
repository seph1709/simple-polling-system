<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voted extends Model
{
    /** @use HasFactory<\Database\Factories\VotedFactory> */
    use HasFactory;
    protected $fillable = [
        'voted_data'
    ];

    protected $casts = [
        'voted_data' => 'array'
        ];
}

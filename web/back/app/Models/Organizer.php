<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $table = "organizers";

    protected $fillable = [
        'name',
        'coords',
        'location',
        'img',
    ];
}

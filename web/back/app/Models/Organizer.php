<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organizer extends Model
{
    use HasFactory;

    protected $table = "organizers";

    protected $fillable = [
        'idUser',
        'name',
        'address',
        'postal_code',
        'city',
        'coords',
        'img',
    ];
}

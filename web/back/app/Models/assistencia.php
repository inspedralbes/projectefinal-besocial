<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assistencia extends Model
{
    use HasFactory;

    protected $table = "assistencias";

    protected $fillable = [
        'id_event',
        'id_user',
    ];
}

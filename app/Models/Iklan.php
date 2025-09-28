<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Iklan extends Model
{
    protected $fillable =[
        'status',
        'type',
        'image',
        'owner',
        'no_hp',
        'brand',
    ];
}

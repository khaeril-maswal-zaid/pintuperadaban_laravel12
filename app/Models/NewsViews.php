<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsViews extends Model
{
    protected $fillable = ['news_id', 'ip_address'];
}

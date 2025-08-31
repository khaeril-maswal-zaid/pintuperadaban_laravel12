<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

class Blog extends Model
{
    /** @use HasFactory<\Database\Factories\BlogFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'slug',
        'title',
        'excerpt',
        'body1',
        'body2',
        'picture1',
        'picture2',
        'tags',
        'category_articles_id',
        'views'
    ];

    protected $casts = [
        'tags' => 'array',
        'created_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(CategoryArticle::class, 'category_articles_id', 'id');
    }

    public function views(): HasMany
    {
        return $this->hasMany(NewsViews::class);
    }

    public function populer()
    {
        $populer = $this->select(['slug', 'title', 'picture1', 'category_articles_id',  'user_id', 'views', 'created_at'])
            // ->where('created_at', '>=', Carbon::now()->subDays(70))
            ->with(['category', 'author'])
            ->orderByDesc('views')
            ->take(5)
            ->get();

        return $populer;
    }

    function import()
    {
        $datas = require database_path("artikel.php");

        $this->query()->delete();
        DB::statement('ALTER TABLE blogs AUTO_INCREMENT = 1');

        $artikel = [];
        foreach ($datas as $key => $data) {
            $artikel[] = [
                'user_id' =>  $data['oleh'],
                'slug' => $data['slug'],
                'title' => $data['judul'],
                'excerpt' => $data['description'],
                'body1' => $data['artikel'],
                'body2' => '',
                'picture1' => $data['picture'],
                'picture2' => '',
                'tags' => json_encode(['']),
                'category_articles_id' =>  $data['kategori'],
                'level' => $data['level'],
                'views' => $data['view'],
                'created_at' => Carbon::parse($data['tanggal'] . ' ' . $data['waktu']),
                'updated_at' => now(),
            ];
        }

        $this->insert($artikel);
    }
}

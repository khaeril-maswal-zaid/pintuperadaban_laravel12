<?php

namespace Database\Seeders;

use App\Models\CategoryArticle;
use Illuminate\Database\Seeder;

class CategoryArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'Teologi',
                'slug' => 'teologi',
            ],
            [
                'name' => 'Pendidikan',
                'slug' => 'pendidikan',
            ],
            [
                'name' => 'Filsafat',
                'slug' => 'filsafat',
            ],
            [
                'name' => 'Ekonomi',
                'slug' => 'ekonomi',
            ],
            [
                'name' => 'Sosial',
                'slug' => 'sosial',
            ],
            [
                'name' => 'Politik',
                'slug' => 'politik',
            ],
            [
                'name' => 'News',
                'slug' => 'news',
            ],
            [
                'name' => 'Opini',
                'slug' => 'opini',
            ],
            [
                'name' => 'The Story',
                'slug' => 'the-story',
            ],
        ];

        foreach ($data as $key => $value) {
            CategoryArticle::create([
                'name' => $value['name'],
                'slug' => $value['slug'],
            ]);
        }
    }
}

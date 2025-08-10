<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Official Pintu Peradaban',
            'email' => 'official@pintuperadaban.com',
            'image' => 'image/assets/pp.png',
            'password' => 'PpcAdmin@2025',
        ]);

        $this->call([
            CategoryArticleSeeder::class,
            IklanSeeder::class,
            KontakSeeder::class
        ]);
    }
}

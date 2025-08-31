<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'Official Pintu Peradaban',
                'alamat' => 'Makassar, Sulsel',
                'pekerjaan' => 'Admin',
                'no_hp' => '6281234567890',
                'email' => 'official@pintuperadaban.com',
                'image' => 'image/users/pp.png',
                'password' => 'PpcAdmin@2025',
                'role' => 'superadmin',
            ],
            [
                'name' => 'Ajmail',
                'alamat' => 'Bombana, Sultra',
                'pekerjaan' => 'Mahasiswa',
                'no_hp' => '6282396504583',
                'password' => 'ajmailumr78#@!',
                'email' => 'ajmail02@pintuperadaban.com',
                'role' => 'admin',
                'image' => 'image/users/ajmail.jpg',
            ],
            [
                'name' => 'Khaeril Maswal Zaid',
                'alamat' => 'Bulukumba, Sulsel',
                'pekerjaan' => 'Programmer',
                'no_hp' => '6285343652494',
                'password' => 'AlZaid739!',
                'email' => 'alzaid7@pintuperadaban.com',
                'role' => 'admin',
                'image' => 'image/users/kmz.jpg',
            ],
            [
                'name' => 'Faridun Taufik Muhamad Akbar',
                'alamat' => 'Muna, Sultra',
                'pekerjaan' => 'Mahasiswa',
                'no_hp' => '625349316603',
                'password' => 'faridun2003',
                'email' => 'faridun08@pintuperadaban.com',
                'role' => 'admin',
                'image' => 'image/users/faridun.jpg',
            ],
        ];

        foreach ($data as $user) {
            User::create([
                'name' => $user['name'],
                'alamat' => $user['alamat'],
                'pekerjaan' => $user['pekerjaan'],
                'no_hp' => $user['no_hp'],
                'image' => $user['image'] ?? 'image/users/' . Str::slug($user['name']) . '.jpg',
                'email' => $user['email'],
                'password' => Hash::make($user['password']),
                'role' => $user['role'] ?? 'user',
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
            ]);
        }
    }
}

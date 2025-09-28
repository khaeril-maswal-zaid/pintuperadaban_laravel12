<?php

namespace Database\Seeders;

use App\Models\Iklan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IklanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            [
                'brand' => 'ppc',
                'no_hp' => '085343652494',
                'owner' => 'Khaeril Maswal Zaid',
                'image' => 'image/advertisement/flayer-1-1.png',
                'type' => '1-1',
                'status' => 'active',
            ],
            [
                'brand' => 'ppc',
                'no_hp' => '085343652494',
                'owner' => 'Khaeril Maswal Zaid',
                'image' => 'image/advertisement/banner-1-2.png',
                'type' => '2-1',
                'status' => 'active',
            ],
            [
                'brand' => 'ppc',
                'no_hp' => '085343652494',
                'owner' => 'Khaeril Maswal Zaid',
                'image' => 'image/advertisement/banner-728-90.png',
                'type' => '728-90',
                'status' => 'active',
            ],

            // Tambahan dari daftar kamu
            [
                'brand' => 'ppc',
                'no_hp' => '085343652494',
                'owner' => 'Khaeril Maswal Zaid',
                'image' => 'image/advertisement/header-deks.png',
                'type' => 'HeaderDeks',
                'status' => 'active',
            ],
            [
                'brand' => 'ppc',
                'no_hp' => '085343652494',
                'owner' => 'Khaeril Maswal Zaid',
                'image' => 'image/advertisement/header-mob.png',
                'type' => 'HeaderMob',
                'status' => 'active',
            ],
            [
                'brand' => 'ppc',
                'no_hp' => '085343652494',
                'owner' => 'Khaeril Maswal Zaid',
                'image' => 'image/advertisement/news-area.jpg',
                'type' => 'News',
                'status' => 'active',
            ],
            [
                'brand' => 'ppc',
                'no_hp' => '085343652494',
                'owner' => 'Khaeril Maswal Zaid',
                'image' => 'image/advertisement/kategori-area-deks.jpg',
                'type' => 'KategoriDeks',
                'status' => 'active',
            ],
            [
                'brand' => 'ppc',
                'no_hp' => '085343652494',
                'owner' => 'Khaeril Maswal Zaid',
                'image' => 'image/advertisement/kategori-area-mob.jpg',
                'type' => 'KategoriMob',
                'status' => 'active',
            ],
            [
                'brand' => 'ppc',
                'no_hp' => '085343652494',
                'owner' => 'Khaeril Maswal Zaid',
                'image' => 'image/advertisement/sidebar-deks.png',
                'type' => 'SidebarDeks',
                'status' => 'active',
            ],
            [
                'brand' => 'ppc',
                'no_hp' => '085343652494',
                'owner' => 'Khaeril Maswal Zaid',
                'image' => 'image/advertisement/sidebar-mob.jpg',
                'type' => 'SidebarMob',
                'status' => 'active',
            ],
            [
                'brand' => 'ppc',
                'no_hp' => '085343652494',
                'owner' => 'Khaeril Maswal Zaid',
                'image' => 'image/advertisement/sidebar-deks.png',
                'type' => 'ShowMob',
                'status' => 'active',
            ],
            [
                'brand' => 'ppc',
                'no_hp' => '085343652494',
                'owner' => 'Khaeril Maswal Zaid',
                'image' => 'image/advertisement/kategori-area-deks.png',
                'type' => 'ShowDeks',
                'status' => 'active',
            ],
        ];

        foreach ($datas as $key => $value) {
            Iklan::create($value);
        }
    }
}

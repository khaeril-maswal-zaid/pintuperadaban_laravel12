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
                'image' => 'image/advertisement/banner-728-90.png',
                'type' => '728-90',
                'status' => 'active',
            ],
            [
                'brand' => 'ppc',
                'no_hp' => '085343652494',
                'owner' => 'Khaeril Maswal Zaid',
                'image' => 'image/advertisement/banner-1-2.png',
                'type' => '1-2',
                'status' => 'active',
            ],
        ];

        foreach ($datas as $key => $value) {
            Iklan::create($value);
        }
    }
}

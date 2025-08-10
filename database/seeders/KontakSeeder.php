<?php

namespace Database\Seeders;

use App\Models\Kontak;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KontakSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contactChannels = [
            [
                'label' => 'fb',
                'name' => 'Facebook',
                'value' => 'Pintu Peradaban',
                'link' => 'https://www.facebook.com/profile.php?id=100083999477470',
                'status' => 'aktif',
            ],
            [
                'label' => 'ig',
                'name' => 'Instagram',
                'value' => '@pintuperadaban',
                'link' => 'https://www.instagram.com/pintuperadaban/',
                'status' => 'aktif',
            ],
            [
                'label' => 'x',
                'name' => 'X',
                'value' => 'Pintu Peradaban',
                'link' => '#',
                'status' => 'aktif',
            ],
            [
                'label' => 'yt',
                'name' => 'YouTube',
                'value' => 'Official Pintu Peradaban',
                'link' => 'https://youtube.com/@ppc',
                'status' => 'aktif',
            ],
            [
                'label' => 'telepon',
                'name' => 'Telepon',
                'value' => '+62 853-4365-2494',
                'link' => 'https://wa.me/6285343652494',
                'status' => 'aktif',
            ],
            [
                'label' => 'email',
                'name' => 'Email',
                'value' => 'official@pintuperadaban.com',
                'link' => 'mailto:official@pintuperadaban.com',
                'status' => 'aktif',
            ],

            [
                'label' => 'waTim1',
                'name' => 'TIM 1',
                'value' => 'official@pintuperadaban.com',
                'link' => 'mailto:official@pintuperadaban.com',
                'status' => 'aktif',
            ],
            [
                'label' => 'waTim2',
                'name' => 'TIM 2',
                'value' => 'official@pintuperadaban.com',
                'link' => 'mailto:official@pintuperadaban.com',
                'status' => 'aktif',
            ],
            [
                'label' => 'waTim3',
                'name' => 'TIM 1',
                'value' => 'official@pintuperadaban.com',
                'link' => 'mailto:official@pintuperadaban.com',
                'status' => 'aktif',
            ],
            [
                'label' => 'alamat',
                'name' => 'Alamat',
                'value' => 'Berdikari Connection, Jln. Muh. Hatta No. 07, Kec. Ujung Bulu, Bulukumba',
                'link' => '#',
                'status' => 'aktif',
            ],

        ];

        foreach ($contactChannels as $key => $kontak) {
            Kontak::create([
                'label' => $kontak['label'],
                'name' => $kontak['name'],
                'value' => $kontak['value'],
                'link' => $kontak['link'],
                'status' => $kontak['status'],
            ]);
        }
    }
}

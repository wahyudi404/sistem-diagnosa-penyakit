<?php

namespace Database\Seeders;

use App\Models\Keputusan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KeputusanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $keputusans = [
            ['penyakit_id' => 1, 'gejala_id' => 1],
            ['penyakit_id' => 1, 'gejala_id' => 2],
            ['penyakit_id' => 1, 'gejala_id' => 3],
            ['penyakit_id' => 1, 'gejala_id' => 4],
            ['penyakit_id' => 1, 'gejala_id' => 5],
            ['penyakit_id' => 1, 'gejala_id' => 6],
            ['penyakit_id' => 1, 'gejala_id' => 7],
            ['penyakit_id' => 1, 'gejala_id' => 8],

            ['penyakit_id' => 2, 'gejala_id' => 4],
            ['penyakit_id' => 2, 'gejala_id' => 9],
            ['penyakit_id' => 2, 'gejala_id' => 10],

            ['penyakit_id' => 3, 'gejala_id' => 5],
            ['penyakit_id' => 3, 'gejala_id' => 11],
            ['penyakit_id' => 3, 'gejala_id' => 12],

            ['penyakit_id' => 4, 'gejala_id' => 13],
            ['penyakit_id' => 4, 'gejala_id' => 5],
            ['penyakit_id' => 4, 'gejala_id' => 11],
            ['penyakit_id' => 4, 'gejala_id' => 3],
            ['penyakit_id' => 4, 'gejala_id' => 14],
            ['penyakit_id' => 4, 'gejala_id' => 9],
            ['penyakit_id' => 4, 'gejala_id' => 6],

            ['penyakit_id' => 5, 'gejala_id' => 3],
            ['penyakit_id' => 5, 'gejala_id' => 13],
            ['penyakit_id' => 5, 'gejala_id' => 5],
            ['penyakit_id' => 5, 'gejala_id' => 15],
            ['penyakit_id' => 5, 'gejala_id' => 9],
            ['penyakit_id' => 5, 'gejala_id' => 16],

            ['penyakit_id' => 6, 'gejala_id' => 18],
            ['penyakit_id' => 6, 'gejala_id' => 9],
            ['penyakit_id' => 6, 'gejala_id' => 15],
            ['penyakit_id' => 6, 'gejala_id' => 19],
            ['penyakit_id' => 6, 'gejala_id' => 13],
            ['penyakit_id' => 6, 'gejala_id' => 30],

            ['penyakit_id' => 7, 'gejala_id' => 20],
            ['penyakit_id' => 7, 'gejala_id' => 21],
            ['penyakit_id' => 7, 'gejala_id' => 22],
            ['penyakit_id' => 7, 'gejala_id' => 15],
            ['penyakit_id' => 7, 'gejala_id' => 23],
            ['penyakit_id' => 7, 'gejala_id' => 24],
            ['penyakit_id' => 7, 'gejala_id' => 25],

            ['penyakit_id' => 8, 'gejala_id' => 14],
            ['penyakit_id' => 8, 'gejala_id' => 26],
            ['penyakit_id' => 8, 'gejala_id' => 27],
            ['penyakit_id' => 8, 'gejala_id' => 36],
            ['penyakit_id' => 8, 'gejala_id' => 38],

            ['penyakit_id' => 9, 'gejala_id' => 28],
            ['penyakit_id' => 9, 'gejala_id' => 29],

            ['penyakit_id' => 10, 'gejala_id' => 14],
            ['penyakit_id' => 10, 'gejala_id' => 5],
            ['penyakit_id' => 10, 'gejala_id' => 11],
            ['penyakit_id' => 10, 'gejala_id' => 24],
            ['penyakit_id' => 10, 'gejala_id' => 15],

            ['penyakit_id' => 11, 'gejala_id' => 3],
            ['penyakit_id' => 11, 'gejala_id' => 18],
            ['penyakit_id' => 11, 'gejala_id' => 14],
            ['penyakit_id' => 11, 'gejala_id' => 9],
            ['penyakit_id' => 11, 'gejala_id' => 13],
            ['penyakit_id' => 11, 'gejala_id' => 6],
            ['penyakit_id' => 11, 'gejala_id' => 15],

            ['penyakit_id' => 12, 'gejala_id' => 3],
            ['penyakit_id' => 12, 'gejala_id' => 9],
            ['penyakit_id' => 12, 'gejala_id' => 14],
            ['penyakit_id' => 12, 'gejala_id' => 13],
            ['penyakit_id' => 12, 'gejala_id' => 6],
            ['penyakit_id' => 12, 'gejala_id' => 27],
            ['penyakit_id' => 12, 'gejala_id' => 1],
            ['penyakit_id' => 12, 'gejala_id' => 17],
            ['penyakit_id' => 12, 'gejala_id' => 31],

            ['penyakit_id' => 13, 'gejala_id' => 29],
            ['penyakit_id' => 13, 'gejala_id' => 32],
            ['penyakit_id' => 13, 'gejala_id' => 33],

            ['penyakit_id' => 14, 'gejala_id' => 3],
            ['penyakit_id' => 14, 'gejala_id' => 35],
            ['penyakit_id' => 14, 'gejala_id' => 14],
            ['penyakit_id' => 14, 'gejala_id' => 15],
            ['penyakit_id' => 14, 'gejala_id' => 19],
            ['penyakit_id' => 14, 'gejala_id' => 17],
            ['penyakit_id' => 14, 'gejala_id' => 1],
            ['penyakit_id' => 14, 'gejala_id' => 27],
            ['penyakit_id' => 14, 'gejala_id' => 37],
        ];

        foreach ($keputusans as $keputusan) {
            Keputusan::create($keputusan);
        }
    }
}

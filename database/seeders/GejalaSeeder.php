<?php

namespace Database\Seeders;

use App\Models\Gejala;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GejalaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $gejalas = [
            ['nama_gejala' => 'Ruam Kulit'],
            ['nama_gejala' => 'Gatal dan perih pada kulit'],
            ['nama_gejala' => 'Demam'],
            ['nama_gejala' => 'Pembengkakan'],
            ['nama_gejala' => 'Sesak Napas'],
            ['nama_gejala' => 'Pilek'],
            ['nama_gejala' => 'Mata berair dan gatal'],
            ['nama_gejala' => 'Anafilaksis'],
            ['nama_gejala' => 'Nyeri sendi atau otot'],
            ['nama_gejala' => 'Tidak enak badan (Malaise)'],
            ['nama_gejala' => 'Nyeri dada'],
            ['nama_gejala' => 'Sulit tidur'],
            ['nama_gejala' => 'Batuk atau sakit tenggorokan'],
            ['nama_gejala' => 'Pusing atau sakit kepala'],
            ['nama_gejala' => 'Kelelahan atau lemas'],
            ['nama_gejala' => 'Kehilangan indra perasa atau penciuman'],
            ['nama_gejala' => 'Diare'],
            ['nama_gejala' => 'Menggigil atau kedinginan'],
            ['nama_gejala' => 'Hilang nafsu makan'],
            ['nama_gejala' => 'Sering haus dan lapar'],
            ['nama_gejala' => 'Sering buang air kecil'],
            ['nama_gejala' => 'Penurunan berat badan tanpa sebab jelas'],
            ['nama_gejala' => 'Luka sulit sembuh dan infeksi berulang'],
            ['nama_gejala' => 'Penglihatan kabur'],
            ['nama_gejala' => 'Kesemutan'],
            ['nama_gejala' => 'Sensitif terhadap suara/cahaya'],
            ['nama_gejala' => 'Mual'],
            ['nama_gejala' => 'Tampak noda putih, coklat, atau kehitaman pada gigi'],
            ['nama_gejala' => 'Gigi terasa ngilu atau nyeri'],
            ['nama_gejala' => 'Suhu badan di atas 37 derajat Celcius'],
            ['nama_gejala' => 'Pembengkakan kelenjar getah bening'],
            ['nama_gejala' => 'Pembengkakan gusi'],
            ['nama_gejala' => 'Pendarahan gusi'],
            ['nama_gejala' => 'Nyeri saat menggigit atau mengunyah makanan'],
            ['nama_gejala' => 'Sakit perut'],
            ['nama_gejala' => 'Sakit Kepala Sebelah'],
            ['nama_gejala' => 'Lidah Putih'],
            ['nama_gejala' => 'Muntah'],
        ];

        foreach ($gejalas as $gejala) {
            Gejala::create($gejala);
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\Penyakit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PenyakitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $penyakits = [
            [
                'nama_penyakit' => 'Alergi Obat',
                'solusi' => '(1) Antihistamin: Untuk meredakan gejala ringan seperti ruam, gatal-gatal, dan kulit melepuh. (2) Bronkodilator: Untuk mengurangi gejala sesak napas atau batuk dengan melebarkan saluran pernapasan. (3) Kortikosteroid: Dapat diberikan dalam bentuk krim yang dioleskan pada kulit, diminum (per oral), atau melalui vena (intravena) untuk mengurangi peradangan akibat alergi. (4) Epinefrin: Obat darurat yang diberikan segera melalui suntikan jika terjadi anafilaksis.'
            ],
            [
                'nama_penyakit' => 'Asam Urat',
                'solusi' => '(1) Obat antiinflamasi: Obat antiinflamasi nonsteroid (OAINS) atau steroid dapat membantu mengurangi peradangan dan nyeri saat kambuh. (2) Obat-obatan lain: Obat-obatan seperti allopurinol atau febuxostat dapat membantu mengurangi kadar asam urat dalam darah untuk mencegah pembentukan kristal. (3) Perubahan gaya hidup: Mengubah pola makan, menurunkan berat badan, dan menghindari alkohol berlebihan.',
            ],
            [
                'nama_penyakit' => 'Asma',
                'solusi' => '(1) Bronkodilator: Untuk melemaskan otot-otot di sekitar saluran udara. (2) Anti-inflamasi: Untuk mengurangi pembengkakan dan produksi lendir di saluran udara. (3) Terapi biologis untuk asma: Untuk gejala asma berat atau asma yang menetap meskipun telah dilakukan terapi inhaler yang tepat.',
            ],
            [
                'nama_penyakit' => 'Bronkitis',
                'solusi' => 'Bronkitis akut: (1) Biasanya sembuh sendiri tanpa perlu antibiotik. (2) Perbanyak istirahat dan konsumsi cairan yang cukup untuk membantu pemulihan. (3) Obat pereda gejala seperti parasetamol untuk mengurangi demam atau nyeri, dekongestan untuk mengurangi hidung tersumbat, dan obat batuk. (4) Hindari faktor-faktor atau zat-zat yang dapat menyebabkan iritasi paru-paru, seperti asap rokok, polusi udara, dan debu. Bronkitis kronis: (1) Menghindari pemicu, seperti berhenti merokok dan menghindari polusi udara. (2) Bronkodilator atau inhaler untuk melebarkan saluran napas dan melegakan gejala sesak napas. (3) Obat steroid, baik dalam bentuk inhalasi maupun oral, untuk mengurangi peradangan pada saluran napas. (4) Terapi oksigen bisa diperlukan untuk kasus bronkitis kronis yang berat. (5) Rehabilitasi paru, termasuk latihan pernapasan, untuk membantu meningkatkan kapasitas paru-paru dan kualitas hidup penderita.',
            ],
            [
                'nama_penyakit' => 'COVID-19',
                'solusi' => 'Saat ini, tidak ada obat khusus yang dapat menyembuhkan COVID-19. Sebagian besar penderita dengan gejala ringan akan pulih dengan istirahat yang cukup, menjaga hidrasi, dan mengonsumsi makanan bergizi. Pengobatan simptomatik seperti antipiretik dan analgesik dapat digunakan untuk meredakan demam dan nyeri. Namun, beberapa penderita dapat mengalami komplikasi serius. Pada kondisi ini, penderita COVID-19 memerlukan tindakan medis untuk mengatasi komplikasi yang dialami.',
            ],
            [
                'nama_penyakit' => 'Demam',
                'solusi' => '(1) Minum banyak cairan: Minum air dan cairan lainnya membantu menjaga tubuh tetap terhidrasi dan membantu menurunkan suhu tubuh. (2) Istirahat: Memberikan tubuh istirahat yang cukup dapat membantu sistem imun melawan infeksi. (3) Obat antipiretik: Untuk membantu menurunkan suhu tubuh dan meredakan gejala. (4) Manajemen infeksi: Jika demam disebabkan oleh infeksi, dokter mungkin meresepkan antibiotik atau obat lain untuk mengobati penyebabnya.',
            ],
            [
                'nama_penyakit' => 'Diabetes',
                'solusi' => 'Diabetes Tipe 1: (1) Terapi insulin: Pasien memerlukan suntikan insulin setiap hari. (2) Pemantauan gula darah: Harus dilakukan secara rutin untuk menghindari lonjakan atau penurunan gula darah. (3) Pola makan sehat dan olahraga: Membantu mengontrol kadar gula darah. Diabetes Tipe 2: (1) Perubahan gaya hidup: Pola makan sehat, olahraga teratur, dan menjaga berat badan ideal. (2) Obat oral: Seperti metformin untuk meningkatkan sensitivitas insulin. (3) Suntikan insulin: Biasanya diberikan jika kadar gula darah sulit dikendalikan dengan obat oral. Diabetes Gestasional (1) Pemantauan gula darah: Untuk memastikan kadar gula tetap normal selama kehamilan. (2) Diet sehat dan olahraga: Membantu mengontrol gula darah. (3) Insulin: Diberikan jika gula darah tidak bisa dikendalikan dengan perubahan gaya hidup.',
            ],
            [
                'nama_penyakit' => 'Sakit Kepala Migrain',
                'solusi' => 'Tidak ada pengobatan yang dikhususkan untuk menyembuhkan migrain, tetapi ada beberapa obat-obatan yang dapat mengurangi gejala migrain, diantaranya: (1) Painkillers: Untuk meredakan nyeri migrain. (2) Obat golongan triptan: Untuk mengurangi gejala neurologis yang disebabkan oleh migrain. (3) Anti-emetik: Untuk mengurangi gejala mual.',
            ],
            [
                'nama_penyakit' => 'Gigi Berlubang',
                'solusi' => '(1) Pada kasus karies superfisial dan karies media, gigi dapat dilakukan perawatan restorasi (penambalan) pada gigi. (2) Pada karies profunda, bakteri telah masuk lebih dalam hingga ke mencapai area pulpa. Oleh karena itu, perlu dilakukan perawatan saluran akar terlebih dahulu untuk membersihkan bakteri di dalam saluran akar gigi. Setelah saluran akar bersih, restorasi gigi dapat dilakukan. (3) Pada kasus karies gigi yang sudah menyebabkan kerusakan luas dan tidak memungkinkan untuk direstorasi, gigi tersebut perlu dicabut. Setelah itu, gigi yang dicabut akan digantikan dengan gigi palsu atau implan gigi.',
            ],
            [
                'nama_penyakit' => 'Hipertensi (Tekanan Darah Tinggi)',
                'solusi' => 'Gaya hidup sehat yang dianjurkan meliputi: (1) Pola makan sehat. (2) Menjaga berat badan ideal. (3) Rutin berolahraga. (4) Mengurangi konsumsi alkohol dan menghindari merokok. Pemberian obat-obatan akan disesuaikan dengan kondisi dan kebutuhan masing-masing penderita, dan hanya dapat diberikan oleh dokter setelah melakukan evaluasi medis.',
            ],
            [
                'nama_penyakit' => 'Influenza',
                'solusi' => '(1) Istirahat yang cukup. (2) Hidrasi yang baik. (3) Antipiretik, untuk meredakan demam. (4) Analgesik, untuk mengatasi nyeri.Namun, pada kasus yang lebih parah atau jika gejala tidak kunjung membaik, dokter mungkin meresepkan antivirus untuk mengurangi durasi penyakit dan keparahan gejala.',
            ],
            [
                'nama_penyakit' => 'Penyakit Infeksi',
                'solusi' => '(1) Antibiotik: Digunakan untuk mengobati infeksi bakteri dengan cara membunuh atau menghambat pertumbuhan bakteri. Antibiotik wajib dikonsumsi sesuai resep dokter dan seluruh dosis harus dihabiskan untuk mencegah resistensi antibiotik. (2) Antiviral: Diberikan untuk infeksi virus tertentu seperti hepatitis B, HIV, herpes, dan lainnya. Infeksi virus biasanya akan sembuh dengan sendirinya, sehingga antivirus sering kali tidak dibutuhkan. (3) Antijamur: Diberikan untuk mengatasi infeksi jamur dan dapat berupa krim untuk infeksi jamur di kulit, obat oral (diminum) untuk infeksi jamur yang lebih luas, atau intravena. (4) Antiparasit: Diberikan untuk infeksi parasit, seperti malaria, penyakit cacingan, toksoplasmosis dan lainnya. (5) Vaksinasi: Berperan untuk pencegahan infeksi tertentu, seperti infeksi virus SARS-CoV-2 (COVID-19), infeksi bakteri tetanus, dan lainnya. (6) Pengobatan simptomatik: Diberikan untuk gejala yang timbul akibat infeksi bakteri, seperti obat penurun demam (antipiretik), obat antimuntah, dan obat pereda nyeri.',
            ],
            [
                'nama_penyakit' => 'Sakit Gigi',
                'solusi' => '(1) Menjaga kebersihan mulut dengan menyikat gigi dua kali sehari dan menggunakan benang gigi setiap hari. (2) Berkumur dengan larutan air garam hangat. (3) Mengonsumsi obat pereda nyeri yang dijual bebas, seperti ibuprofen atau parasetamol. (4) Menghindari makanan atau minuman yang dapat memperburuk rasa sakit, seperti makanan manis, panas, atau dingin. (5) Berkonsultasi dengan dokter gigi untuk perawatan lebih lanjut, seperti penambalan gigi atau perawatan saluran akar.',
            ],
            [
                'nama_penyakit' => 'Tifus',
                'solusi' => '(1) Antibiotik untuk membunuh bakteri Salmonella. (2) Anti-piretik, untuk menurunkan demam. (3) Anti-diare, untuk mengurangi intensitas diare. (4) Pemberian cairan untuk menjaga hidrasi tubuh. (5) Istirahat selama masa pemulihan. (6) Hindari makanan padat dan konsumsi makanan lunak mudah dicerna.',
            ],
        ];

        foreach ($penyakits as $penyakit) {
            Penyakit::create($penyakit);
        }
    }
}

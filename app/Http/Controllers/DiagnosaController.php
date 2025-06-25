<?php

namespace App\Http\Controllers;

use App\Models\Gejala;
use App\Models\Keputusan;
use App\Models\Penyakit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DiagnosaController extends Controller
{
    public function index()
    {
        $param = request()->get('back');
        if ($param == 1 || !session()->has('diagnosa')) {
            if (session()->has('diagnosa')) {
                session()->forget('diagnosa');
            }

            $gejalas = Gejala::selectRaw("CONCAT('G', id) as kode_gejala, nama_gejala")->orderBy('id', 'asc')->get();

            return Inertia::render('diagnosa/index', [
                'gejalas' => $gejalas,
            ]);
        } else {
            return redirect()->route('diagnosa.hasil');
        }
    }

    public function prosesDiagnosa(Request $request)
    {
        // hasil disimpan ke session
        session()->put('diagnosa', $request->data);
        return redirect()->route('diagnosa.hasil');
    }

    public function showHasil()
    {
        // Ambil dari session
        $data = session()->get('diagnosa');

        if (!$data) {
            return redirect()->route('diagnosa'); // Kembali jika tidak ada data
        }

        $hasil = $this->naiveBayes($data);

        return Inertia::render('diagnosa/hasil-diagnosa', [
            'hasil' => $hasil
        ]);
    }

    private function naiveBayes($data)
    {
        // ambil data penyakit
        $data_penyakit = Penyakit::selectRaw("id, CONCAT('P', id) as kode, nama_penyakit, solusi")->orderBy('id', 'asc')->get();

        // ambil data keputusan
        $data_keputusan = Keputusan::orderBy('id', 'asc')->get();

        // ambil data gejala
        $gejalas = Gejala::orderBy('id', 'asc')->get();
        $data_gejala = collect([]);
        $gejalas->each(function ($item) use ($data_penyakit, $data_keputusan, $data_gejala) {
            $gejala_id = $item->id;
            $keputusan = collect([]);

            $data_penyakit->each(function ($item2) use ($data_keputusan, $gejala_id, $keputusan) {
                $penyakit_id = $item2->id;
                $filtered = $data_keputusan->filter(fn($item) => $item->penyakit_id == $penyakit_id && $item->gejala_id == $gejala_id);
                $keputusan->push($filtered->count() > 0 ? $filtered->count() : '-');
            });

            $data_gejala->push((object)[
                'gejala_id' => $gejala_id,
                'keputusan' => $keputusan
            ]);
        });
        // dd($data_gejala);

        // * probabilitas awal
        $probabilitas_awal = collect([]);
        $data_penyakit->each(function ($item) use ($data_penyakit, $probabilitas_awal) {
            $penyakit_id = $item->id;
            $filtered = $data_penyakit->filter(fn($item2) => $item2->id == $penyakit_id);
            $probabilitas_awal->push(round($filtered->count() / $data_penyakit->count(), 2));
        });
        // dd($probabilitas_awal);

        // * data pengujian
        $data_pengujian = collect([]);
        foreach ($data as $value) {
            $data_pengujian->push((object)[
                'gejala_id' => $value['gejala_id'],
                'nama_gejala' => $value['nama_gejala'],
                'prob_kondisional' => [],
                'prob_posterior' => []
            ]);
        }
        // dd($data);

        // * probabilitas kondisional
        $data_pengujian->each(function ($item) use ($data_gejala, $data_pengujian) {
            $gejala_id = $item->gejala_id;
            $filtered = $data_gejala->filter(fn($gejala) => $gejala->gejala_id == $gejala_id);
            $gejala_with_keputusan = $filtered->first();
            $keputusan = $gejala_with_keputusan->keputusan;
            foreach ($keputusan as $key => $value) {
                if ($value != '-') {
                    $keputusan[$key] = round($value / $data_pengujian->count(), 2);
                }
            }
            $data_pengujian->where('gejala_id', $gejala_id)->first()->prob_kondisional = $keputusan;
        });
        // dd($data_pengujian);

        // * probabilitas posterior
        $data_pengujian->each(function ($item) use ($data_pengujian, $probabilitas_awal) {
            $prob_kondisional = $item->prob_kondisional;
            $filtered_prob_kondisional = $prob_kondisional->filter(fn($value) => $value != '-');
            $jml_prob_kondisional = $filtered_prob_kondisional->count();

            foreach ($prob_kondisional as $key => $nilai_prob_kondisional) {
                $nilai_prob_awal = $probabilitas_awal[$key];

                if ($nilai_prob_kondisional != '-') {
                    $result = ($nilai_prob_awal * $nilai_prob_kondisional) / (($nilai_prob_awal * $nilai_prob_kondisional) * $jml_prob_kondisional);
                    $data_pengujian->where('gejala_id', $item->gejala_id)->first()->prob_posterior[$key] = round($result, 2);
                } else {
                    $data_pengujian->where('gejala_id', $item->gejala_id)->first()->prob_posterior[$key] = $nilai_prob_kondisional;
                }
            }
        });
        // dd($data_pengujian);

        // * total probabilitas untuk setiap penyakit
        $total_probabilitas = collect([]);

        $data_pengujian->each(function ($item) use ($total_probabilitas) {
            $prob_posterior = $item->prob_posterior;
            foreach ($prob_posterior as $key => $value) {
                $nilai_prob_posterior = $value;
                if ($nilai_prob_posterior == '-') {
                    $nilai_prob_posterior = 0;
                }
                if (!isset($total_probabilitas[$key])) {
                    $total_probabilitas[$key] = 0;
                }
                $total_probabilitas[$key] += round($nilai_prob_posterior, 2);
            }
        });
        // dd($total_probabilitas->toArray(), round($total_probabilitas->sum()));

        // normalisasi probabilitas, chart data, dan solusi
        $chart_data = collect([]);
        $normalisasi_probabilitas = collect([]);
        $sum = round($total_probabilitas->sum());
        $total_probabilitas->each(function ($value, $key) use ($sum, $normalisasi_probabilitas, $chart_data, $data_penyakit) {
            $result = ($value / $sum) * 100;
            $normalisasi_probabilitas->push($result ? round($result, 0) . '%' : '-');

            // chart data
            if($result) {
                $chart_data->push([
                    'kode' => $data_penyakit[$key]->kode,
                    'penyakit' => $data_penyakit[$key]->nama_penyakit,
                    'persentase' => round($result, 0),
                    'solusi' => $data_penyakit[$key]->solusi
                ]);
            }
        });
        // dd($normalisasi_probabilitas);
        return [
            'probabilitas_awal' => $probabilitas_awal,
            'data_pengujian' => $data_pengujian,
            'total_probabilitas' => $total_probabilitas,
            'normalisasi_probabilitas' => $normalisasi_probabilitas,
            'penyakits' => $data_penyakit,
            'chart_data' => $chart_data
        ];
    }
}

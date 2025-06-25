<?php

namespace App\Http\Controllers;

use App\Models\Gejala;
use App\Models\Keputusan;
use App\Models\Penyakit;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataTrainingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * dt => data table
     *
     */
    public function index()
    {
        // data dari model penyakit
        $penyakits = Penyakit::selectRaw("id, CONCAT('P', id) as kode")->orderBy('id', 'asc')->get();

        // data dari model keputusan
        $keputusans = Keputusan::selectRaw("id, CONCAT('P', penyakit_id) as kode_penyakit, CONCAT('G', gejala_id) as kode_gejala")->orderBy('id', 'asc')->get();

        // data dari model gejala
        $gejalas = Gejala::selectRaw("id, CONCAT('G', id) as kode")->orderBy('id', 'asc')->get();

        // buat data table keputusan untuk ditampilkan di view
        $dt_keputusans = collect([]);
        foreach ($gejalas as $gejala) {
            $kode_gejala = $gejala->kode;

            $array_keputusan = collect([]);
            foreach ($penyakits as $penyakit) {
                $kode_penyakit = $penyakit->kode;
                $result_filter = $keputusans->filter(fn($item) => $item->kode_gejala == $kode_gejala && $item->kode_penyakit == $kode_penyakit)->count();
                $array_keputusan->push($result_filter ? $result_filter : '-');
            }

            $dt_keputusans->push([
                'kode_gejala' => $kode_gejala,
                'keputusans' => $array_keputusan,
            ]);
        }

        return Inertia::render('keputusan/index', [
            'dt_keputusans' => $dt_keputusans,
            'penyakits' => $penyakits
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // data dari model penyakit
        $penyakits = Penyakit::selectRaw("id, CONCAT('P', id) as kode, nama_penyakit")->orderBy('id', 'asc')->get();

        // data dari model keputusan join gejala
        $keputusans = Keputusan::selectRaw("keputusans.id, gejala_id, penyakit_id, CONCAT('P', penyakit_id) as kode_penyakit, CONCAT('G', gejala_id) as kode_gejala, gejalas.nama_gejala")
            ->leftJoin('gejalas', 'gejalas.id', '=', 'keputusans.gejala_id')
            ->orderBy('id', 'asc')
            ->get();

        // data dari model gejala
        $gejalas = Gejala::selectRaw("id, CONCAT('G', id) as kode_gejala, nama_gejala")->orderBy('id', 'asc')->get();

        return Inertia::render('keputusan/create', [
            'penyakits' => $penyakits,
            'keputusans' => $keputusans,
            'gejalas' => $gejalas,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'data' => 'required|array',
            'data.*.gejala_id' => 'nullable',
            'penyakit_id' => 'required',
        ], [
            'data.required' => 'Data gejala tidak boleh kosong',
            'data.array' => 'Data gejala harus berupa array',
            'penyakit_id.required' => 'ID penyakit tidak boleh kosong',
        ]);

        try {
            $keputusan = Keputusan::find($request->penyakit_id);

            if ($keputusan) {
                // hapus semua data keputusan yang ada
                Keputusan::where('penyakit_id', $request->penyakit_id)->delete();

                // simpan data keputusan baru
                foreach ($request->data as $item) {
                    $gejala_id = $item['gejala_id'];

                    // buat gejala jika tidak ada
                    if($gejala_id === null) {
                        $gejala = Gejala::create([
                            'nama_gejala' => $item['nama_gejala'],
                        ]);
                        $gejala_id = $gejala->id;
                    }

                    Keputusan::create([
                        'gejala_id' => $gejala_id,
                        'penyakit_id' => $request->penyakit_id,
                    ]);
                }
            } else {
                $penyakit = Penyakit::create([
                    'nama_penyakit' => $request->penyakit_id,
                    'solusi' => $request->solusi,
                ]);

                // simpan data keputusan
                foreach ($request->data as $item) {
                    $gejala_id = $item['gejala_id'];

                    // buat gejala jika tidak ada
                    if($gejala_id == null) {
                        $gejala = Gejala::create([
                            'nama_gejala' => $item['nama_gejala'],
                        ]);
                        $gejala_id = $gejala->id;
                    }

                    Keputusan::create([
                        'gejala_id' => $gejala_id,
                        'penyakit_id' => $penyakit->id,
                    ]);
                }
            }


            return back();
        } catch (Exception $e) {
            return back();
        }
    }
}

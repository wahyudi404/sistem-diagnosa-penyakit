<?php

namespace App\Http\Controllers;

use App\Models\Rekap;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RekapController extends Controller
{
    public function index()
    {


        if (Auth::user()->role_id == 2) {
            $rekaps = Rekap::with([
                'rekap_gejalas.gejala',
                'rekap_penyakits' => function ($query) {
                    $query->orderBy('persentase', 'desc')->with('penyakit');
                }
            ])->where('user_id', Auth::user()->id);
        } else {
            $rekaps = Rekap::with([
                'rekap_gejalas.gejala',
                'rekap_penyakits' => function ($query) {
                    $query->orderBy('persentase', 'desc')->with('penyakit');
                }
            ])->select('rekaps.*', 'users.name', 'users.email', 'roles.name as role')
            ->join('users', 'users.id', '=', 'rekaps.user_id')
            ->join('roles', 'roles.id', '=', 'users.role_id');
        }

        $rekaps = $rekaps->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('rekap/index', [
            'rekaps' => $rekaps,
            'role_id' => Auth::user()->role_id,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'rekap_gejalas' => 'required|array',
                'rekap_gejalas.*' => 'numeric',
                'rekap_penyakits' => 'required|array',
                'rekap_penyakits.*.penyakit_id' => 'numeric',
                'rekap_penyakits.*.persentase' => 'numeric',
            ]);

            $user_id = Auth::user()->id;
            $rekap_gejalas = [];
            $rekap_penyakits = [];

            foreach ($request->rekap_gejalas as $value) {
                $rekap_gejalas[] = [
                    'gejala_id' => $value,
                ];
            }

            foreach ($request->rekap_penyakits as $value) {
                $rekap_penyakits[] = [
                    'penyakit_id' => $value['penyakit_id'],
                    'persentase' => $value['persentase'],
                ];
            }

            $rekap = Rekap::create(['user_id' => $user_id]);
            $rekap->rekap_gejalas()->createMany($rekap_gejalas);
            $rekap->rekap_penyakits()->createMany($rekap_penyakits);

            return redirect()->back();
        } catch (\Exception $e) {
            return back()->withErrors([
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function destroy(Rekap $rekap)
    {
        $rekap->delete();
        return back();
    }
}

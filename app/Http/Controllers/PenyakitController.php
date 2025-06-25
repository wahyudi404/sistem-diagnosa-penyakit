<?php

namespace App\Http\Controllers;

use App\Models\Penyakit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PenyakitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $penyakits = Penyakit::orderBy('id', 'desc')->lazy();
        return Inertia::render('penyakit/index', ['penyakits' => $penyakits]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_penyakit' => 'required|string',
            'solusi' => 'required|string'
        ], [
            'nama_penyakit.required' => 'Penyakit harus diisi.',
            'solusi.required' => 'Solusi harus diisi.'
        ]);
        Penyakit::create($request->only(['nama_penyakit', 'solusi']));
        return back();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Penyakit $penyakit)
    {
        return Inertia::render('penyakit/edit', ['penyakit' => $penyakit]);
    }

    public function show()
    {
        return redirect()->route('penyakit.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Penyakit $penyakit)
    {
        $options = [
            'nama_penyakit' => 'required|string',
            'solusi' => 'required|string'
        ];

        $messages = [
            'nama_penyakit.required' => 'Penyakit harus diisi.',
            'solusi.required' => 'Solusi harus diisi.'
        ];

        $request->validate($options, $messages);

        $penyakit->update($request->only(['nama_penyakit', 'solusi']));

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $penyakit = Penyakit::findOrFail($id);
        $penyakit->delete();
        return back();
    }
}

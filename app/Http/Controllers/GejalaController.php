<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gejala;
use Inertia\Inertia;

class GejalaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gejalas = Gejala::orderBy('id', 'desc')->lazy();
        return Inertia::render('gejala/index', ['gejalas' => $gejalas]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_gejala' => 'required',
        ]);

        Gejala::create($request->only(['nama_gejala']));

        return back();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gejala $gejala)
    {
        return Inertia::render('gejala/edit', ['gejala' => $gejala]);
    }

    public function show()
    {
        return redirect()->route('gejala.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gejala $gejala)
    {
        $options = [
            'nama_gejala' => 'required|string',
        ];

        $messages = [
            'nama_gejala.required' => 'Gejala harus diisi.',
        ];

        $request->validate($options, $messages);

        $gejala->update($request->only(['nama_gejala']));

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gejala $gejala)
    {
        $gejala->delete();
        return back();
    }
}

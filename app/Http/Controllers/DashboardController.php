<?php

namespace App\Http\Controllers;

use App\Models\Gejala;
use App\Models\Penyakit;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * title: string;
     * total: number;
     * icon: string;
     * route: string;
     */
    public function index()
    {
        $data = [];

        // data penyakit
        $data[] = (object)[
            'title' => 'Total Data Penyakit',
            'total' => Penyakit::count(),
            'icon' => 'clipboard-list',
            'route' => 'penyakit.index'
        ];

        // data gejala
        $data[] = (object)[
            'title' => 'Total Data Gejala',
            'total' => Gejala::count(),
            'icon' => 'clipboard-list',
            'route' => 'gejala.index'
        ];

        // data users
        $data[] = (object)[
            'title' => 'Total Pengguna',
            'total' => User::count(),
            'icon' => 'user',
            'route' => 'users.index'
        ];

        return Inertia::render('dashboard', ['data' => $data]);
    }
}

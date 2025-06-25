<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Penyakit extends Model
{
    protected $guarded = [];

    public function keputusans(): HasMany
    {
        return $this->hasMany(Keputusan::class);
    }

    public function rekap_penyakits(): HasMany
    {
        return $this->hasMany(RekapPenyakit::class);
    }
}

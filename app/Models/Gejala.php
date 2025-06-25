<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Gejala extends Model
{
    protected $guarded = [];

    public function keputusans(): HasMany
    {
        return $this->hasMany(Keputusan::class);
    }

    public function rekap_gejalas(): HasMany
    {
        return $this->hasMany(RekapGejala::class);
    }
}

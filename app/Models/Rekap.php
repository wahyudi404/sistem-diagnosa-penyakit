<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Rekap extends Model
{
    protected $guarded = [];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function rekap_gejalas(): HasMany
    {
        return $this->hasMany(RekapGejala::class);
    }

    public function rekap_penyakits(): HasMany
    {
        return $this->hasMany(RekapPenyakit::class);
    }
}

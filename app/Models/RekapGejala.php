<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RekapGejala extends Model
{
    protected $guarded = [];

    public $timestamps = false;

    public function gejala(): BelongsTo
    {
        return $this->belongsTo(Gejala::class);
    }

    public function rekap(): BelongsTo
    {
        return $this->belongsTo(Rekap::class);
    }
}

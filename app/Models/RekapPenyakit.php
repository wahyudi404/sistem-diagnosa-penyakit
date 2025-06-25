<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RekapPenyakit extends Model
{
    protected $guarded = [];
    public $timestamps = false;

    public function penyakit(): BelongsTo
    {
        return $this->belongsTo(Penyakit::class);
    }

    public function rekap(): BelongsTo
    {
        return $this->belongsTo(Rekap::class);
    }
}

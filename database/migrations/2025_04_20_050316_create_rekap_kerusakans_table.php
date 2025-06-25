<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rekap_penyakits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rekap_id')->constrained('rekaps')->onDelete('cascade');
            $table->foreignId('penyakit_id')->constrained('penyakits')->onDelete('cascade');
            $table->integer('persentase');
            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rekap_penyakits');
    }
};

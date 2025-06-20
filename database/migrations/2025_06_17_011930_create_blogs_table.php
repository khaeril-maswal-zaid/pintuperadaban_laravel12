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
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('excerpt');
            $table->text('body1');
            $table->text('body2');
            $table->string('picture1')->default('default.png');
            $table->string('picture2')->nullable();
            $table->json('tags')->nullable();
            $table->string('category')->nullable();
            $table->enum('level', ['main', 'general'])->default('general');
            $table->integer('views')->default(50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};

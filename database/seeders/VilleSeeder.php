<?php

namespace Database\Seeders;

use App\Models\Ville;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VilleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $villes = [
            'agadir',
            'ait melloul',
            'inzgane',
            'anza'
        ];
        foreach ($villes as $villeName) {
            Ville::updateOrCreate(['nameVille' => $villeName]);
        }
    }
}

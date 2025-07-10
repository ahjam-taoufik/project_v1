<?php

namespace Database\Seeders;

use App\Models\Secteur;
use App\Models\Ville;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SecteurSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            'agadir' => ['hay Mohammadi', 'el houda', 'ben sergaou'],
            'ait melloul' => ['laazib', 'kasbat taher'],
            'inzgane' => ['aljihadia', 'azrou'],
            'anza' => ['le marche', 'hassania', 'taddart']
        ];

        foreach ($data as $villeName => $secteurs) {
            // On retrouve la ville dans la base de données
            $ville = Ville::where('nameVille', $villeName)->first();

            if ($ville) {
                foreach ($secteurs as $secteurName) {
                    Secteur::updateOrCreate(
                        [
                            'nameSecteur' => $secteurName,
                            'idVille' => $ville->id
                        ]
                    );
                }
            }
        }
    }
}

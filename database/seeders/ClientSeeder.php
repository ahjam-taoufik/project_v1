<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Ville;
use App\Models\Secteur;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Récupérer quelques villes et secteurs existants
        $villes = Ville::all();
        $secteurs = Secteur::all();

        if ($villes->count() > 0 && $secteurs->count() > 0) {
            $clients = [
                [
                    'code' => 'CL001',
                    'fullName' => 'Ahmed Benali',
                    'ville_id' => $villes->random()->id,
                    'secteur_id' => $secteurs->random()->id,
                ],
                [
                    'code' => 'CL002',
                    'fullName' => 'Fatima Zahra',
                    'ville_id' => $villes->random()->id,
                    'secteur_id' => $secteurs->random()->id,
                ],
                [
                    'code' => 'CL003',
                    'fullName' => 'Mohammed Alami',
                    'ville_id' => $villes->random()->id,
                    'secteur_id' => $secteurs->random()->id,
                ],
                [
                    'code' => 'CL004',
                    'fullName' => 'Aicha Kadiri',
                    'ville_id' => $villes->random()->id,
                    'secteur_id' => $secteurs->random()->id,
                ],
                [
                    'code' => 'CL005',
                    'fullName' => 'Youssef Tazi',
                    'ville_id' => $villes->random()->id,
                    'secteur_id' => $secteurs->random()->id,
                ],
            ];

            foreach ($clients as $client) {
                Client::create($client);
            }
        }
    }
}

<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Ville;
use App\Models\Secteur;
use App\Models\Commercial;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Récupérer quelques villes, secteurs et commerciaux existants
        $villes = Ville::all();
        $commerciaux = Commercial::all();

        if ($villes->count() > 0 && $commerciaux->count() > 0) {
            $clients = [
                [
                    'code' => 'CL001',
                    'fullName' => 'Ahmed Benali',
                    'telephone' => '0612345678',
                    'remise_special' => 150.00,
                    'pourcentage' => 5.50,
                ],
                [
                    'code' => 'CL002',
                    'fullName' => 'Fatima Zahra',
                    'telephone' => '0623456789',
                    'remise_special' => 200.00,
                    'pourcentage' => 7.00,
                ],
                [
                    'code' => 'CL003',
                    'fullName' => 'Mohammed Alami',
                    'telephone' => '0634567890',
                    'remise_special' => 100.00,
                    'pourcentage' => 3.50,
                ],
                [
                    'code' => 'CL004',
                    'fullName' => 'Aicha Kadiri',
                    'telephone' => '0645678901',
                    'remise_special' => 300.00,
                    'pourcentage' => 10.00,
                ],
                [
                    'code' => 'CL005',
                    'fullName' => 'Youssef Tazi',
                    'telephone' => '0656789012',
                    'remise_special' => 250.00,
                    'pourcentage' => 8.50,
                ],
                [
                    'code' => 'CL006',
                    'fullName' => 'Khadija Radi',
                    'telephone' => '0667890123',
                    'remise_special' => 180.00,
                    'pourcentage' => 6.25,
                ],
                [
                    'code' => 'CL007',
                    'fullName' => 'Omar Fassi',
                    'telephone' => '0678901234',
                    'remise_special' => 120.00,
                    'pourcentage' => 4.75,
                ],
                [
                    'code' => 'CL008',
                    'fullName' => 'Laila Mansouri',
                    'telephone' => '0689012345',
                    'remise_special' => 220.00,
                    'pourcentage' => 9.00,
                ],
                [
                    'code' => 'CL009',
                    'fullName' => 'Rachid Bennani',
                    'telephone' => '0690123456',
                    'remise_special' => 160.00,
                    'pourcentage' => 5.25,
                ],
                [
                    'code' => 'CL010',
                    'fullName' => 'Nadia Chraibi',
                    'telephone' => '0601234567',
                    'remise_special' => 280.00,
                    'pourcentage' => 12.00,
                ],
            ];

            foreach ($clients as $clientData) {
                // Sélectionner une ville aléatoire
                $ville = $villes->random();

                // Trouver un secteur qui appartient à cette ville
                $secteur = Secteur::where('idVille', $ville->id)->first();

                // Si aucun secteur n'est trouvé pour cette ville, prendre le premier secteur disponible
                if (!$secteur) {
                    $secteur = Secteur::first();
                }

                // Sélectionner un commercial aléatoire
                $commercial = $commerciaux->random();

                // Créer le client avec toutes les données
                Client::create([
                    'code' => $clientData['code'],
                    'fullName' => $clientData['fullName'],
                    'telephone' => $clientData['telephone'],
                    'remise_special' => $clientData['remise_special'],
                    'pourcentage' => $clientData['pourcentage'],
                    'idVille' => $ville->id,
                    'idSecteur' => $secteur->id,
                    'idCommercial' => $commercial->id,
                ]);
            }

            $this->command->info('✅ ' . count($clients) . ' clients créés avec succès!');
        } else {
            $this->command->warn('⚠️  Aucune ville ou commercial trouvé. Veuillez d\'abord exécuter les seeders des villes et commerciaux.');
        }
    }
}

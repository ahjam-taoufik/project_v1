<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Commercial;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommercialSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $commerciaux = [
            [
                'commercial_code' => 'COM001',
                'commercial_fullName' => 'Ahmed Bennani',
                'commercial_telephone' => '0661234567',
            ],
            [
                'commercial_code' => 'COM002',
                'commercial_fullName' => 'Fatima El Alaoui',
                'commercial_telephone' => '0677891234',
            ],
            [
                'commercial_code' => 'COM003',
                'commercial_fullName' => 'Youssef Tazi',
                'commercial_telephone' => '0665432109',
            ],
            [
                'commercial_code' => 'COM004',
                'commercial_fullName' => 'Khadija Rhazi',
                'commercial_telephone' => '0678901234',
            ],
            [
                'commercial_code' => 'COM005',
                'commercial_fullName' => 'Omar Cherkaoui',
                'commercial_telephone' => '0612345678',
            ],
        ];

        foreach ($commerciaux as $commercial) {
            Commercial::updateOrCreate(
                ['commercial_code' => $commercial['commercial_code']],
                $commercial
            );
        }
    }
}

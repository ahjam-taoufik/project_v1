<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class LivreurSeeder extends Seeder
{
    public function run(): void
    {
        \App\Models\Livreur::factory(10)->create();

        $permissions = [
            'livreurs.view',
            'livreurs.create',
            'livreurs.edit',
            'livreurs.delete',
        ];
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }
    }
}

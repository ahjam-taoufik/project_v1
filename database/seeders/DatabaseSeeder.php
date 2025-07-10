<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Administrateur',
            'email' => 'admin@admin.com',
            'password' => 'password',
        ]);
         // La méthode call() prend un tableau de classes de Seeder à exécuter.
        $this->call([
            VilleSeeder::class,
            SecteurSeeder::class,
        ]);
    }
}

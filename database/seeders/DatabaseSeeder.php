<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Créer d'abord les permissions
        $this->call([
            PermissionSeeder::class,
        ]);

        // Créer le rôle Super Admin
        $superAdminRole = Role::firstOrCreate(['name' => 'Super Admin']);

        // Assigner toutes les permissions au rôle Super Admin
        $allPermissions = Permission::all();
        $superAdminRole->syncPermissions($allPermissions);

        // Créer l'utilisateur Super Admin
        $superAdmin = User::firstOrCreate(
            ['email' => 'superadmin@admin.com'],
            [
                'name' => 'Super Administrateur',
                'password' => bcrypt('password'),
            ]
        );

        // Assigner le rôle Super Admin à l'utilisateur
        $superAdmin->assignRole($superAdminRole);

        // Créer un utilisateur admin normal
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name' => 'Administrateur',
                'password' => bcrypt('password'),
            ]
        );

        // La méthode call() prend un tableau de classes de Seeder à exécuter.
        $this->call([
            VilleSeeder::class,
            SecteurSeeder::class,
            CommercialSeeder::class,
        ]);
    }
}

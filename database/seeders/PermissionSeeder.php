<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          // ⚠️ Désactiver les clés étrangères pour éviter les conflits
          DB::statement('SET FOREIGN_KEY_CHECKS=0;');

          // 🧹 Vider la table (remise à zéro)
          Permission::truncate();

          // ✅ Réactiver les clés étrangères
          DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        $permissions = [
                            // Permissions Utilisateurs
                            'users.view',
                            'users.create',
                            'users.edit',
                            'users.delete',
                            // Permissions Commerciaux
                            'commerciaux.view',
                            'commerciaux.create',
                            'commerciaux.edit',
                            'commerciaux.delete',
                            // Permissions Reglement
                            'reglement.view',
                            'reglement.create',
                            'reglement.edit',
                            'reglement.delete',
                            // Permissions Rôles
                            'roles.view',
                            'roles.create',
                            'roles.edit',
                            'roles.delete',
                            // Permissions Clients
                            'clients.view',
                            'clients.create',
                            'clients.edit',
                            'clients.delete',
                            // Permissions Secteurs
                            'secteurs.view',
                            'secteurs.create',
                            'secteurs.edit',
                            'secteurs.delete',
                            // Permissions Villes
                            'villes.view',
                            'villes.create',
                            'villes.edit',
                            'villes.delete',

        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }
    }
}


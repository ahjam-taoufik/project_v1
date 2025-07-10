<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'ville.view',
            'ville.edit',
            'ville.delete',
            'ville.create',
            'role.view',
            'role.edit',
            'role.delete',
            'role.create',
            'user.view',
            'user.edit',
            'user.delete',
            'user.create',
            'permission.view',
            'permission.edit',
            'permission.delete',
            'permission.create',
            'permission.assign',
            'permission.revoke',
            'permission.list',
            'reglement.view',
            'reglement.edit',
            'reglement.delete',
            'reglement.create',
            'reglement.list',
            'reglement.assign',
            'reglement.revoke',
            'commune.view',
            'commune.edit',
            'commune.delete',
            'commune.create',
            'commune.list',
            'commune.assign',
            'commune.revoke',






        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }
    }
}


<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ⚠️ Désactiver les clés étrangères pour éviter les conflits
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // 🧹 Vider la table (remise à zéro)
        Category::truncate();

        // ✅ Réactiver les clés étrangères
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Récupérer tous les brands existants
        $brands = Brand::all();

        if ($brands->isNotEmpty()) {
            // Créer des catégories pour chaque brand
            foreach ($brands as $brand) {
                // Créer 2-4 catégories par brand
                $categoryCount = fake()->numberBetween(2, 4);

                for ($i = 0; $i < $categoryCount; $i++) {
                    Category::create([
                        'category_name' => fake()->unique()->words(2, true) . ' ' . fake()->randomElement(['Pro', 'Lite', 'Standard', 'Premium', 'Basic', 'Plus', 'Max', 'Advanced']),
                        'brand_id' => $brand->id,
                    ]);
                }
            }
        } else {
            // Si aucun brand n'existe, créer des catégories avec des brands via factory
            Category::factory()->count(20)->create();
        }
    }
}

<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ⚠️ Désactiver les clés étrangères pour éviter les conflits
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // 🧹 Vider la table (remise à zéro)
        Product::truncate();

        // ✅ Réactiver les clés étrangères
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Récupérer tous les brands et categories existants
        $brands = Brand::all();
        $categories = Category::all();

        if ($brands->isNotEmpty() && $categories->isNotEmpty()) {
            // Créer des produits pour chaque combinaison brand/category
            foreach ($brands as $brand) {
                // Récupérer les catégories de cette marque
                $brandCategories = $categories->where('brand_id', $brand->id);

                if ($brandCategories->isNotEmpty()) {
                    foreach ($brandCategories as $category) {
                        // Créer 3-8 produits par catégorie
                        $productCount = fake()->numberBetween(3, 8);

                        for ($i = 0; $i < $productCount; $i++) {
                            $prixAchatUnite = fake()->randomFloat(2, 5, 500);
                            $prixAchatColis = $prixAchatUnite * fake()->numberBetween(6, 24);

                            $margeUnite = fake()->randomFloat(2, 1.2, 2.5);
                            $margeColis = fake()->randomFloat(2, 1.15, 2.2);

                            $prixVenteUnite = $prixAchatUnite * $margeUnite;
                            $prixVenteColis = $prixAchatColis * $margeColis;

                            Product::create([
                                'product_Ref' => strtoupper(fake()->unique()->bothify('PR-####-???')),
                                'product_libelle' => $category->category_name . ' ' . fake()->words(2, true) . ' ' . fake()->randomElement(['Premium', 'Standard', 'Pro', 'Lite', 'Classic', 'Deluxe']),
                                'prix_achat_colis' => round($prixAchatColis, 2),
                                'prix_achat_unite' => round($prixAchatUnite, 2),
                                'prix_vente_colis' => round($prixVenteColis, 2),
                                'prix_vente_unite' => round($prixVenteUnite, 2),
                                'brand_id' => $brand->id,
                                'category_id' => $category->id,
                                'product_Poids' => fake()->randomFloat(3, 0.1, 50.0),
                                'product_isActive' => fake()->boolean(85), // 85% de chance d'être actif
                                'observation' => fake()->optional(0.25)->sentence(),
                            ]);
                        }
                    }
                }
            }
        } else {
            // Si aucun brand ou category n'existe, créer des produits avec des relations via factory
            Product::factory()->count(50)->create();
        }
    }
}

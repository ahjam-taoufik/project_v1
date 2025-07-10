# Instructions de Développement - Système de Gestion d'Inventaire Laravel 12

## Vue d'Ensemble du Projet
Système de gestion d'inventaire complet construit avec Laravel 12, Inertia.js, React et TypeScript suivant les meilleures pratiques de développement full-stack moderne.

## Stack Technique
- **Backend**: Laravel 12 (PHP 8.2+), MySQL, Eloquent ORM
- **Frontend**: React avec TypeScript, Inertia.js
- **Authentification**: Laravel Breeze + Sanctum
- **Style**: TailwindCSS + shadcn/ui
- **Permissions**: spatie/laravel-permission
- **Query Builder**: spatie/laravel-query-builder

## Fonctionnalités Principales à Développer

### Phase 1: Modules de Base (Complétés)
- ✅ Authentification utilisateur (Laravel Breeze)
- ✅ Gestion des rôles et permissions
- ✅ Gestion des utilisateurs
- ✅ Gestion des villes
- ✅ Gestion des secteurs

### Phase 2: Modules d'Inventaire Principaux
#### 2.1 Gestion des Catégories
- **Model**: `Category` avec hiérarchie parent/enfant
- **Controller**: `CategoryController` avec CRUD complet
- **Migrations**: Structure hiérarchique avec `parent_id`
- **Interface**: Arbre de catégories avec drag & drop

#### 2.2 Gestion des Fournisseurs
- **Model**: `Supplier` avec informations complètes
- **Controller**: `SupplierController` avec validation
- **Relations**: Liaison avec villes et secteurs
- **Interface**: Formulaires détaillés avec recherche

#### 2.3 Gestion des Produits
- **Model**: `Product` avec variations et attributs
- **Controller**: `ProductController` avec gestion d'images
- **Relations**: Categories, suppliers, variants
- **Interface**: Galerie d'images, gestion des variants

#### 2.4 Gestion des Entrepôts
- **Model**: `Warehouse` avec localisation
- **Controller**: `WarehouseController` avec zones
- **Relations**: Gestion multi-entrepôts
- **Interface**: Plans d'entrepôt interactifs

### Phase 3: Gestion des Stocks
#### 3.1 Stock Management
- **Model**: `Stock` pour suivi en temps réel
- **Controller**: `StockController` avec ajustements
- **Events**: Notifications de stock faible
- **Interface**: Dashboard de stock avec alertes

#### 3.2 Mouvements de Stock
- **Model**: `StockMovement` pour traçabilité
- **Controller**: `StockMovementController` avec filtres
- **Types**: Entrée, sortie, transfert, ajustement
- **Interface**: Historique complet avec recherche

### Phase 4: Commandes et Transactions
#### 4.1 Commandes d'Achat
- **Model**: `PurchaseOrder` avec statuts
- **Controller**: `PurchaseOrderController` avec workflow
- **Relations**: Fournisseurs, produits, réception
- **Interface**: Workflow de validation complet

#### 4.2 Commandes de Vente
- **Model**: `SalesOrder` avec gestion client
- **Controller**: `SalesOrderController` avec facturation
- **Relations**: Clients, produits, livraison
- **Interface**: Processus de vente intégré

### Phase 5: Rapports et Analytics
#### 5.1 Dashboard Analytics
- **KPIs**: Stock value, turnover, profit margins
- **Charts**: Inventory trends, sales analytics
- **Alerts**: Low stock, expired products
- **Interface**: Dashboard interactif avec graphiques

#### 5.2 Rapports Avancés
- **Rapports**: Stock, ventes, achats, mouvements
- **Export**: PDF, Excel, CSV
- **Filtres**: Dates, entrepôts, catégories
- **Interface**: Générateur de rapports

## Structure des Dossiers

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── CategoryController.php
│   │   ├── SupplierController.php
│   │   ├── ProductController.php
│   │   ├── WarehouseController.php
│   │   ├── StockController.php
│   │   ├── StockMovementController.php
│   │   ├── PurchaseOrderController.php
│   │   ├── SalesOrderController.php
│   │   └── ReportController.php
│   ├── Requests/
│   │   ├── CategoryRequest.php
│   │   ├── SupplierRequest.php
│   │   ├── ProductRequest.php
│   │   └── ...
│   └── Resources/
│       ├── CategoryResource.php
│       ├── ProductResource.php
│       └── ...
├── Models/
│   ├── Category.php
│   ├── Supplier.php
│   ├── Product.php
│   ├── Warehouse.php
│   ├── Stock.php
│   ├── StockMovement.php
│   ├── PurchaseOrder.php
│   └── SalesOrder.php
├── Events/
│   ├── LowStockAlert.php
│   └── StockMovementCreated.php
└── Listeners/
    └── SendLowStockNotification.php

database/
├── migrations/
│   ├── create_categories_table.php
│   ├── create_suppliers_table.php
│   ├── create_products_table.php
│   ├── create_warehouses_table.php
│   ├── create_stocks_table.php
│   ├── create_stock_movements_table.php
│   ├── create_purchase_orders_table.php
│   └── create_sales_orders_table.php
├── seeders/
│   ├── CategorySeeder.php
│   ├── ProductSeeder.php
│   └── WarehouseSeeder.php
└── factories/
    ├── ProductFactory.php
    └── SupplierFactory.php

resources/js/
├── Pages/
│   ├── Category/
│   ├── Product/
│   ├── Supplier/
│   ├── Warehouse/
│   ├── Stock/
│   └── Report/
├── Components/
│   ├── Inventory/
│   ├── Charts/
│   └── Forms/
└── types/
    ├── Category.ts
    ├── Product.ts
    └── Stock.ts
```

## Workflow de Développement

### Étape 1: Préparation
1. Installer les dépendances nécessaires
2. Configurer l'environnement de développement
3. Mettre en place les migrations de base

### Étape 2: Développement par Module
1. **Catégories** (2-3 jours)
   - Migration et model avec hiérarchie
   - Controller avec CRUD complet
   - Interface React avec arbre hiérarchique
   - Tests unitaires et fonctionnels

2. **Fournisseurs** (2-3 jours)
   - Model avec relations complexes
   - Interface de gestion complète
   - Intégration avec villes/secteurs
   - Validation et tests

3. **Produits** (4-5 jours)
   - Model avec variants et attributs
   - Gestion d'images et médias
   - Interface riche avec galerie
   - Relations avec catégories/fournisseurs

4. **Stock et Mouvements** (3-4 jours)
   - Système de suivi en temps réel
   - Events et notifications
   - Interface de gestion des stocks
   - Rapports de base

5. **Commandes** (4-5 jours)
   - Workflow d'achat et vente
   - Intégration avec stocks
   - Interface de gestion des commandes
   - Système de validation

6. **Rapports et Analytics** (3-4 jours)
   - Dashboard interactif
   - Générateur de rapports
   - Charts et graphiques
   - Export de données

### Étape 3: Tests et Optimisation
1. Tests d'intégration complets
2. Optimisation des performances
3. Sécurité et validation
4. Documentation utilisateur

## Librairies et Outils

### Backend Laravel
```bash
composer require:
- spatie/laravel-query-builder
- barryvdh/laravel-dompdf
- maatwebsite/excel
- intervention/image
- pusher/pusher-php-server
```

### Frontend React
```bash
npm install:
- @tanstack/react-query
- recharts
- react-select
- react-dropzone
- date-fns
- lodash
```

## Commandes de Développement

```bash
# Génération des ressources
php artisan make:model Category -mfr
php artisan make:model Product -mfr
php artisan make:controller CategoryController --resource
php artisan make:request CategoryRequest

# Tests
php artisan test
npm run test

# Optimisation
php artisan optimize
npm run build
```

## Sécurité et Permissions

### Rôles Système
- **Super Admin**: Accès complet
- **Admin**: Gestion inventaire + utilisateurs
- **Manager**: Gestion inventaire
- **User**: Consultation + opérations de base

### Permissions Granulaires
- `categories.view/create/edit/delete`
- `products.view/create/edit/delete`
- `stock.view/adjust/transfer`
- `orders.view/create/approve/cancel`
- `reports.view/export`

## Indicateurs de Performance (KPIs)

### Métriques Principales
- Valeur totale du stock
- Rotation des stocks
- Niveau de stock optimal
- Commandes en attente
- Produits en rupture

### Alertes Automatiques
- Stock bas (< seuil minimum)
- Produits expirés
- Commandes en retard
- Mouvements suspects

## Base de Données

### Relations Principales
```sql
Users -> Roles (Many-to-Many)
Products -> Categories (Many-to-One)
Products -> Suppliers (Many-to-One)
Stocks -> Products (One-to-One)
Stocks -> Warehouses (Many-to-One)
StockMovements -> Stocks (Many-to-One)
PurchaseOrders -> Suppliers (Many-to-One)
SalesOrders -> Users (Many-to-One)
```

### Indexes Optimisés
- `products(category_id, supplier_id)`
- `stocks(product_id, warehouse_id)`
- `stock_movements(stock_id, created_at)`
- `orders(status, created_at)`

## Prochaines Étapes

1. **Immédiat**: Commencer par le développement des catégories
2. **Cette semaine**: Compléter catégories et fournisseurs
3. **Prochaine semaine**: Développer la gestion des produits
4. **Fin du mois**: Système de stock opérationnel
5. **Objectif**: Système complet d'ici 6-8 semaines

## Notes Importantes

- Suivre strictement les principes SOLID
- Tester chaque fonctionnalité avant passage au suivant
- Documenter les APIs au fur et à mesure
- Maintenir la performance avec des requêtes optimisées
- Assurer la sécurité à chaque niveau

Ce plan de développement garantit un système d'inventaire robuste, évolutif et maintenu selon les meilleures pratiques Laravel 12.
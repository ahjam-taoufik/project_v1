
+# Intégration Spatie Permission avec Laravel, Inertia.js et React

+## Vue d'ensemble

+Créez un middleware pour partager automatiquement les permissions avec React :

+**app/Http/Middleware/HandleInertiaRequests.php**
+
+```php
+<?php
+
+namespace App\Http\Middleware;
+
+use Illuminate\Http\Request;
+use Inertia\Middleware;
+
+class HandleInertiaRequests extends Middleware
+{
+    public function share(Request $request): array
+    {
+        return array_merge(parent::share($request), [
+            'auth' => [
+                'user' => $request->user() ? [
+                    'id' => $request->user()->id,
+                    'name' => $request->user()->name,
+                    'email' => $request->user()->email,
+                    // Partager les permissions et rôles
+                    'permissions' => $request->user()->getAllPermissions()->pluck('name'),
+                    'roles' => $request->user()->getRoleNames(),
+                ] : null,
+            ],
+        ]);
+    }
+}
+```
+
+### Alternative : Méthode sélective
+
+Si vous ne voulez pas partager toutes les permissions globalement :
+
+**Dans vos contrôleurs Laravel :**
+
+```php
+<?php
+
+namespace App\Http\Controllers;
+
+use Illuminate\Http\Request;
+use Inertia\Inertia;
+
+class DashboardController extends Controller
+{
+    public function index(Request $request)
+    {
+        return Inertia::render('Dashboard', [
+            'userPermissions' => $request->user()->getAllPermissions()->pluck('name'),
+            'userRoles' => $request->user()->getRoleNames(),
+        ]);
+    }
+}
+```
+
+## 2. Hook personnalisé React pour les permissions
+
+Créez un hook personnalisé pour gérer les permissions côté React :
+
+**resources/js/hooks/usePermissions.js**
+
+```javascript
+import { usePage } from '@inertiajs/react';
+
+export function usePermissions() {
+    const { auth } = usePage().props;
    
+    const user = auth?.user;
+    const permissions = user?.permissions || [];
+    const roles = user?.roles || [];

+    const hasPermission = (permission) => {
+        return permissions.includes(permission);
+    };

+    const hasRole = (role) => {
+        return roles.includes(role);
+    };

+    const hasAnyPermission = (permissionsList) => {
+        return permissionsList.some(permission => permissions.includes(permission));
+    };

+    const hasAllPermissions = (permissionsList) => {
+        return permissionsList.every(permission => permissions.includes(permission));
+    };

+    const hasAnyRole = (rolesList) => {
+        return rolesList.some(role => roles.includes(role));
+    };

+    const can = hasPermission; // Alias pour plus de clarté
+    const cannot = (permission) => !hasPermission(permission);

+    return {
+        permissions,
+        roles,
+        user,
+        hasPermission,
+        hasRole,
+        hasAnyPermission,
+        hasAllPermissions,
+        hasAnyRole,
+        can,
+        cannot
+    };
+}
+```
+
+## 3. Composants React pour les permissions
+
+### Composant PermissionGuard
+
+**resources/js/components/PermissionGuard.jsx**
+
+```javascript
+import React from 'react';
+import { usePermissions } from '../hooks/usePermissions';
+
+export function PermissionGuard({ 
+    permission, 
+    role, 
+    permissions, 
+    roles,
+    fallback = null, 
+    children 
+}) {
+    const { hasPermission, hasRole, hasAnyPermission, hasAnyRole } = usePermissions();

+    let hasAccess = false;

+    if (permission) {
+        hasAccess = hasPermission(permission);
+    } else if (role) {
+        hasAccess = hasRole(role);
+    } else if (permissions && permissions.length > 0) {
+        hasAccess = hasAnyPermission(permissions);
+    } else if (roles && roles.length > 0) {
+        hasAccess = hasAnyRole(roles);
+    }

+    return hasAccess ? children : fallback;
+}
+```
+
+### Composant RoleGuard
+
+**resources/js/components/RoleGuard.jsx**
+
+```javascript
+import React from 'react';
+import { usePermissions } from '../hooks/usePermissions';

+export function RoleGuard({ role, roles, fallback = null, children }) {
+    const { hasRole, hasAnyRole } = usePermissions();

+    let hasAccess = false;

+    if (role) {
+        hasAccess = hasRole(role);
+    } else if (roles && roles.length > 0) {
+        hasAccess = hasAnyRole(roles);
+    }

+    return hasAccess ? children : fallback;
+}
+```
+
+## 4. Exemples d'utilisation dans vos composants React
+
+### Utilisation basique avec le hook
+
+```javascript
+import React from 'react';
+import { usePermissions } from '../hooks/usePermissions';

+export default function UserManagement() {
+    const { can, hasRole } = usePermissions();

+    return (
+        <div>
+            <h1>Gestion des utilisateurs</h1>
            
+            {can('create users') && (
+                <button>Créer un utilisateur</button>
+            )}
            
+            {can('edit users') && (
+                <button>Modifier</button>
+            )}
            
+            {can('delete users') && (
+                <button>Supprimer</button>
+            )}
            
+            {hasRole('admin') && (
+                <button>Actions Admin</button>
+            )}
+        </div>
+    );
+}
+```
+
+### Utilisation avec les composants guards
+
+```javascript
+import React from 'react';
+import { PermissionGuard, RoleGuard } from '../components/Guards';

+export default function Dashboard() {
+    return (
+        <div>
+            <h1>Tableau de bord</h1>
            
+            <PermissionGuard permission="view analytics">
+                <div>Données analytiques</div>
+            </PermissionGuard>
            
+            <PermissionGuard 
+                permissions={['manage users', 'view users']}
+                fallback={<div>Accès refusé</div>}
+            >
+                <button>Gestion des utilisateurs</button>
+            </PermissionGuard>
            
+            <RoleGuard role="admin">
+                <button>Panneau d'administration</button>
+            </RoleGuard>
+        </div>
+    );
+}
+```
+
+### Navigation conditionnelle
+
+```javascript
+import React from 'react';
+import { Link } from '@inertiajs/react';
+import { usePermissions } from '../hooks/usePermissions';

+export default function Navigation() {
+    const { can, hasRole } = usePermissions();

+    return (
+        <nav>
+            <Link href="/">Accueil</Link>
            
+            {can('view users') && (
+                <Link href="/users">Utilisateurs</Link>
+            )}
            
+            {can('view posts') && (
+                <Link href="/posts">Articles</Link>
+            )}
            
+            {hasRole('admin') && (
+                <Link href="/admin">Administration</Link>
+            )}
+        </nav>
+    );
+}
+```
+
+## 5. Gestion avancée
+
+### Permissions dynamiques avec paramètres
+
+```javascript
+// Dans votre contrôleur Laravel
+public function show(Post $post)
+{
+    return Inertia::render('Posts/Show', [
+        'post' => $post,
+        'canEdit' => auth()->user()->can('edit', $post),
+        'canDelete' => auth()->user()->can('delete', $post),
+    ]);
+}
+```
+
+```javascript
+// Dans votre composant React
+export default function ShowPost({ post, canEdit, canDelete }) {
+    return (
+        <div>
+            <h1>{post.title}</h1>
+            <p>{post.content}</p>
            
+            {canEdit && (
+                <button>Modifier</button>
+            )}
            
+            {canDelete && (
+                <button>Supprimer</button>
+            )}
+        </div>
+    );
+}
+```
+
+### Hook pour permissions spécifiques à une ressource
+
+```javascript
+import { usePage } from '@inertiajs/react';

+export function useResourcePermissions() {
+    const page = usePage();
    
+    const canEdit = page.props.canEdit || false;
+    const canDelete = page.props.canDelete || false;
+    const canView = page.props.canView || false;
    
+    return { canEdit, canDelete, canView };
+}
+```
+
+## 6. Équivalences Blade → React
+
+| Directive Blade | Équivalent React |
+|-----------------|------------------|
+| `@can('edit posts')` | `{can('edit posts') && <Component />}` |
+| `@cannot('edit posts')` | `{cannot('edit posts') && <Component />}` |
+| `@hasrole('admin')` | `{hasRole('admin') && <Component />}` |
+| `@canany(['edit', 'delete'])` | `{hasAnyPermission(['edit', 'delete']) && <Component />}` |
+
+## 7. Installation et configuration
+
+### Dépendances nécessaires
+
+```bash
+# Côté Laravel
+composer require spatie/laravel-permission
+
+# Côté frontend (si pas déjà installé)
+npm install @inertiajs/react
+```
+
+### Configuration Inertia
+
+Assurez-vous que votre `app.js` est configuré correctement :
+
+```javascript
+import { createInertiaApp } from '@inertiajs/react';
+import { createRoot } from 'react-dom/client';

+createInertiaApp({
+    title: (title) => `${title} - Mon App`,
+    resolve: (name) => {
+        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
+        return pages[`./Pages/${name}.jsx`];
+    },
+    setup({ el, App, props }) {
+        createRoot(el).render(<App {...props} />);
+    },
+});
+```
+
+Cette approche vous permet d'utiliser toute la puissance de Spatie Permission côté React, en remplacement des directives Blade, tout en maintenant une synchronisation parfaite avec votre backend Laravel.

---

## Implémentation Complète des Permissions : Module Ville

### Vue d'ensemble

Le module ville a été complètement sécurisé avec un système de permissions granulaires utilisant Spatie Permission. Cette implémentation couvre à la fois le frontend (React/Inertia.js) et le backend (Laravel).

### 1. Permissions Définies

Les permissions suivantes ont été créées pour le module ville :

```php
// database/seeders/PermissionSeeder.php
'villes.view',      // Voir la liste des villes
'villes.create',    // Créer une nouvelle ville
'villes.edit',      // Modifier une ville existante
'villes.delete',    // Supprimer une ville
```

### 2. Sécurisation Backend (Contrôleur)

Le contrôleur `VilleController` a été sécurisé avec des vérifications de permissions dans chaque méthode :

```php
// app/Http/Controllers/VilleController.php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\VilleRequest;
use App\Models\Ville;
use Inertia\Inertia;

class VilleController extends Controller
{
    public function index()
    {
        // Vérifier la permission de voir les villes
        if (!auth()->user()->can('villes.view')) {
            abort(403, 'Vous n\'avez pas l\'autorisation de voir les villes.');
        }
        
        $villes = Ville::latest()->get();
        return Inertia::render('ville/index', ['villes' => $villes]);
    }

    public function store(VilleRequest $request)
    {
        // Vérifier la permission de créer une ville
        if (!auth()->user()->can('villes.create')) {
            abort(403, 'Vous n\'avez pas l\'autorisation de créer une ville.');
        }
        
        // Logique de création...
    }

    public function update(VilleRequest $request, Ville $ville)
    {
        // Vérifier la permission d'éditer une ville
        if (!auth()->user()->can('villes.edit')) {
            abort(403, 'Vous n\'avez pas l\'autorisation de modifier cette ville.');
        }
        
        // Logique de mise à jour...
    }

    public function destroy(Ville $ville)
    {
        // Vérifier la permission de supprimer une ville
        if (!auth()->user()->can('villes.delete')) {
            abort(403, 'Vous n\'avez pas l\'autorisation de supprimer cette ville.');
        }
        
        // Logique de suppression...
    }
}
```

### 3. Sécurisation Frontend (React Components)

#### 3.1 Bouton "Ajouter une ville"

Le composant `VilleDialog` masque le bouton d'ajout si l'utilisateur n'a pas la permission :

```tsx
// resources/js/pages/ville/components/VilleDialog.tsx
import { usePermissions } from '@/hooks/use-permissions';

export default function ProductDialog() {
    const { can } = usePermissions();
    
    // Ne pas afficher le bouton si l'utilisateur n'a pas la permission
    if (!can('villes.create')) {
        return null;
    }
    
    // Reste du composant...
}
```

#### 3.2 Menu Actions (Dropdown)

Le composant `VilleDropDown` filtre les actions disponibles selon les permissions :

```tsx
// resources/js/pages/ville/components/VilleDropDown.tsx
import { usePermissions } from '@/hooks/use-permissions';

export default function ProductDropDown({ row }) {
    const { can } = usePermissions();
    
    // Construire le menu en fonction des permissions
    const menuItems = [
        // Copy - nécessite villes.create pour créer une copie
        ...(can('villes.create') ? [{ icon: <MdContentCopy />, label: "Copy", className: "" }] : []),
        // Edit - nécessite villes.edit
        ...(can('villes.edit') ? [{ icon: <FaRegEdit />, label: "Edit", className: "" }] : []),
        // Séparateur seulement si on a des actions ET une action de suppression
        ...(((can('villes.create') || can('villes.edit')) && can('villes.delete')) ? [{ separator: true }] : []),
        // Delete - nécessite villes.delete
        ...(can('villes.delete') ? [{ icon: <MdOutlineDelete />, label: "Delete", className: "text-red-600" }] : [])
    ];

    // Si aucune action n'est disponible, ne pas afficher le dropdown
    if (menuItems.length === 0) {
        return null;
    }
    
    // Reste du composant...
}
```

### 4. Hook de Permissions Utilisé

Le hook `usePermissions` est utilisé pour vérifier les permissions côté frontend :

```tsx
// resources/js/hooks/use-permissions.tsx
export function usePermissions() {
    const { auth } = usePage<SharedData>().props;
    
    const can = (permission: string): boolean => {
        if (!user || !permission) return false;
        return permissions.includes(permission);
    };
    
    // Autres fonctions utilitaires...
    
    return { can, cannot, hasPermission, hasRole, /* ... */ };
}
```

### 5. Tests Automatisés

Des tests complets ont été créés pour vérifier le bon fonctionnement des permissions :

```php
// tests/Feature/VillePermissionTest.php
class VillePermissionTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_view_villes_with_permission(): void
    {
        $user = User::factory()->create();
        $user->givePermissionTo('villes.view');

        $response = $this->actingAs($user)->get(route('villes.index'));
        $response->assertStatus(200);
    }

    public function test_user_cannot_view_villes_without_permission(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('villes.index'));
        $response->assertStatus(403);
    }
    
    // Tests pour create, update, delete...
}
```

### 6. Protection des Routes

Les routes sont protégées au niveau du fichier de routes :

```php
// routes/web.php
Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('villes', VilleController::class);
    // Autres routes protégées...
});
```

### 7. Sécurité Multicouche

L'implémentation suit le principe de défense en profondeur :

1. **Authentification** : Middleware `auth` sur les routes
2. **Autorisation Backend** : Vérifications dans le contrôleur
3. **Interface Utilisateur** : Masquage des éléments selon les permissions
4. **Tests** : Validation automatisée du comportement

### 8. Utilisation dans d'autres Modules

Cette approche peut être répliquée pour d'autres modules en :

1. Créant les permissions correspondantes dans `PermissionSeeder`
2. Ajoutant les vérifications dans le contrôleur
3. Utilisant le hook `usePermissions` dans les composants React
4. Créant des tests pour valider le comportement

### 9. Gestion des Erreurs

- **Backend** : Retourne HTTP 403 avec message explicite
- **Frontend** : Masquage préventif des actions non autorisées
- **UX** : L'utilisateur ne voit que les actions qu'il peut effectuer

Cette implémentation garantit une sécurité robuste et une expérience utilisateur cohérente pour le module ville.

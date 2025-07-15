# System Patterns - Architecture & Design Decisions

## Core Architecture

### MVC with Inertia.js Pattern
```
Browser (React) ↔ Inertia.js ↔ Laravel Controllers ↔ Eloquent Models ↔ MySQL
```

- **Controllers**: Handle HTTP requests, return Inertia responses
- **Models**: Eloquent ORM with proper relationships
- **Views**: React components via Inertia.js (no Blade except app.blade.php)
- **Routes**: SPA routing through Laravel with Inertia navigation

### Data Flow Pattern
```
User Action → React Component → Inertia Form → Laravel Controller → Model → Database
Database → Model → Controller → Inertia Response → React Component → UI Update
```

## Database Design Patterns

### Entity Relationships
```
Users (1:1) Commercial
Commercial (1:n) Clients
Clients (n:1) Ville
Ville (n:1) Secteur
Products (n:1) Brand
Products (n:1) Category
```

### Naming Conventions
- **Tables**: Plural snake_case (`commerciaux`, `clients`, `products`)
- **Models**: Singular PascalCase (`Commercial`, `Client`, `Product`)
- **Foreign Keys**: Singular with `_id` suffix (`commercial_id`, `ville_id`)

### Migration Strategy
- Sequential migrations with proper dependency order
- Unique constraints for business-critical fields
- Proper foreign key relationships with cascading rules

## Component Architecture Patterns

### Page Structure
```
resources/js/pages/[entity]/
├── index.tsx           # Main page component
├── AppTable.tsx        # Table wrapper with search/filter
├── components/
│   ├── [Entity]Table.tsx       # Data table
│   ├── [Entity]Dialog.tsx      # Create dialog
│   ├── [Entity]EditDialog.tsx  # Edit dialog
│   ├── [Entity]DropDown.tsx    # Action dropdown
│   └── PaginationSelection.tsx # Pagination controls
└── config/
    └── columns.tsx     # Table column definitions
```

### Form Management Pattern
- Use `useForm()` from Inertia for all forms
- Validation handled server-side with FormRequest classes
- Error display through `InputError` components
- Consistent submit/cancel button patterns

### Permission Pattern
- Role-based permissions via spatie/laravel-permission
- Permission checks in controllers using policies
- Frontend permission visibility using `usePermissions()` hook
- Consistent permission naming: `[entity].[action]` (e.g., `client.create`)

## UI/UX Patterns

### Design System
- **Components**: shadcn/ui as base, customized for brand
- **Styling**: TailwindCSS utilities only, no custom CSS
- **Icons**: Lucide React with consistent sizing
- **Colors**: Neutral palette with accent colors for actions

### Navigation Pattern
```
AppShell
├── AppSidebar (collapsible navigation)
├── AppHeader (breadcrumbs, user menu)
└── AppContent (page content)
```

### Table Interaction Pattern
1. **Search**: Global search across relevant fields
2. **Sort**: Click column headers for sorting
3. **Actions**: Dropdown menu for row actions
4. **Create**: Dialog modal from page header
5. **Edit**: Dialog modal from row actions
6. **Delete**: Confirmation dialog with soft delete

### Modal Pattern
- Create/Edit operations use dialog modals
- Form state managed by Inertia's `useForm()`
- Consistent button layout: Cancel (left) / Save (right)
- Auto-close on successful submission

## Security Patterns

### Authentication Flow
1. Laravel Breeze handles auth UI and logic
2. Sanctum provides CSRF protection for SPA
3. Middleware protects all authenticated routes
4. Session-based authentication for web routes

### Authorization Pattern
```php
// Controller pattern
public function store(ClientRequest $request)
{
    $this->authorize('create', Client::class);
    // ... create logic
}

// Policy pattern
public function create(User $user): bool
{
    return $user->hasPermissionTo('client.create');
}
```

### Data Validation
- Server-side validation via FormRequest classes
- Client-side validation through form state
- Sanitization in FormRequest rules
- Database constraints as final safety net

## State Management Patterns

### Page State
- Server state via Inertia props (no client-side caching)
- Form state via `useForm()` hook
- UI state via React `useState()` for local interactions
- Global state via Zustand only when absolutely necessary

### Search & Filter State
- URL-based state for shareable/bookmarkable results
- Server-side processing for performance
- Debounced search input to reduce requests
- Pagination state maintained in URL parameters

## Error Handling Patterns

### Backend Errors
- FormRequest validation with detailed messages
- Custom exceptions for business logic errors
- Proper HTTP status codes
- Structured error responses for API endpoints

### Frontend Errors
- Error boundaries for React component crashes
- Form validation errors displayed inline
- Network error handling with user-friendly messages
- Loading states during async operations

## Performance Patterns

### Database Optimization
- Eager loading for N+1 query prevention
- Database indexing on frequently queried columns
- Pagination for large datasets
- Query scoping for filtered results

### Frontend Optimization
- Code splitting at page level
- Lazy loading of heavy components
- Minimal re-renders through proper React patterns
- Image optimization for UI assets

## Testing Strategy Patterns

### Backend Testing
- Feature tests for controller endpoints
- Unit tests for models and business logic
- Permission tests for authorization
- Database tests with transactions

### Frontend Testing
- Component testing for UI interactions
- Integration testing for form submissions
- Permission-based UI testing
- Accessibility testing for compliance 

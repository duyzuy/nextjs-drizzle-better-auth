
## Architecture: Feature-Sliced Design (FSD) + Clean Architecture

Import rules:
app → sections → features → entities → shared

each layer can only import from layers bellow it. same layer imports not allowed.

Structure overview:

src/
├── app/
├── widgets/
├── features/
├── entities/
├── infrastructure/
├── shared/
├── stores/
└── proxy.ts

app/

- The entry point, contains only routes, definitions, layouts and global providers. Pages must be thin - they import from widgets, features and render them. Not contain business logic.

app/
├── layout.tsx # Root layout — fonts, global providers (QueryClient, Zustand)
├── globals.css # Global styles
├── providers.tsx # Wraps app with React Query, auth context, etc.
├── middleware.ts # Route protection — redirect unauthenticated users
├── (auth)/ # Route group — shares auth layout (no navbar/footer)
│ ├── layout.tsx
│ ├── login/page.tsx
│ ├── register/page.tsx
│ └── forgot-password/page.tsx
├── (main)/ # Route group — shares main layout (navbar + footer)
│ ├── layout.tsx
│ ├── page.tsx # Home
│ ├── tours/
│ │ ├── page.tsx # Tour listing
│ │ └── [id]/page.tsx # Tour detail
│ ├── bookings/
│ │ ├── page.tsx # My bookings
│ │ └── [id]/page.tsx # Booking detail
│ └── profile/page.tsx
└── admin/ # Admin section — separate layout


widgets/

- Composes the features and entities into full page sections. Acts as the glue layer — takes data from server components or React Query, and assembles the final UI block. One section = one meaningful region of a page.
- Can import from: features/, entities/, shared/, infrastructure

widgets/
├── header/ # Navbar with auth state, nav links
├── footer/ # Site footer
├── home/ # Hero, featured tours, category strip
├── tour-list/ # Filter bar + tour card grid
├── tour-detail/ # Tour gallery + info + booking form
├── booking-list/ # My bookings list with status
├── booking-detail/ # Single booking info + actions
└── admin-dashboard/ # Stats cards + recent activity

Each widget folder:

tour-detail/
├── ui/
│ └── TourDetailSection.tsx
└── index.ts # Public export only

features/ - User action and interaction
Contains everything triggered by user intent — form submissions, mutations, interactions. Each sub-folder is a single user action (verb-based naming). Components here use 'use client' and call mutations via React Query.
Can import from: entities/, shared/
Cannot import from: app/*, other features/

features/
├── auth/
│ ├── login/ # Login form + useLogin hook
│ ├── register/ # Register form + useRegister hook
│ └── logout/ # Logout button + useLogout hook
├── tour/
│ ├── filter-tours/ # Filter UI + URL param sync
│ └── search-tours/ # Search bar + debounced query
├── booking/
│ ├── book-tour/ # Booking form, schedule picker, submit
│ ├── cancel-booking/ # Cancel button + confirmation
│ └── review-tour/ # Post-tour review form
└── admin/
│ ├── manage-tours/ # Create/edit/delete tour forms
│ └── manage-bookings/ # Confirm/cancel booking actions

Each feature folder:

book-tour/
├── components/
│ ├── BookTourForm.tsx # 'use client' — form with user interaction
│ └── BookTourSummary.tsx # Summary display before confirm
├── hooks/
│ └── useBookTour.ts # useMutation — calls bookingRepository
├── utils/
├── constants/
├── server/ action fetching api in server
├── controllers/
│ └── BookTourController.tsx # return null (no UI), components handle these logic bootstrap for whole app like: theme, auth, analytics, websockets....
└── index.ts

entities/ — Business Domain Objects (Clean Architecture influence)
The domain layer. Each entity owns its type definitions, data mapper, repository interface (contract), repository implementation, and display-only UI components. This is where API responses are transformed into domain models.
Can import from: shared/
Cannot import from: features/, sections/, app/

entities/
├── user/
├── tour/
├── booking/

Each entities folder

tour/
├── model/
│ ├── tour.types.ts # Domain types — source of truth for the whole app
├── repository/
│ ├── tour.repository.ts # ITourRepository — Repository contract.
├── ui/
│ └── TourCard.tsx # Pure display — receives typed props, no side effects
└── index.ts # Export only what other layers need

Infrastructure/
├── api
│ ├── axios/
│ ├──fetch-client/
├── services
│ ├──payment/
│ ├──websocket/
├── repositories
│ ├──auth/
│ │ ├──auth.dto // Defines raw API response/request types (DTOs).
│ │ ├──auth.mapper // Converts DTOs into domain models and vice versa.
│ │ ├──auth.repository // Implements repository contracts and handles API communication.

shared/ — Infrastructure & Primitives

The foundation. No business logic, no domain knowledge. Contains only reusable utilities, base UI components, API client setup, global store, and common types. Every other layer can import from here.
Can import from: external libraries only
Cannot import from: any project layer

shared/
├── api/
│ ├── axios.ts # Axios instance with baseURL, interceptors, token injection
│ └── queryClient.ts # React Query client config (staleTime, retry, etc.)
├── ui/ # Base UI — no business logic, fully reusable
│ ├── Button.tsx
│ ├── Input.tsx
│ ├── Modal.tsx
│ ├── Badge.tsx
│ ├── Spinner.tsx
│ ├── SelectBox.tsx # Generic select — receives options[] via props
│ └── Pagination.tsx
├── store/
│ └── auth.store.ts # Zustand — stores current user & token, readable by all layers
├── hooks/
│ ├── useDebounce.ts # Generic debounce hook
│ └── useMediaQuery.ts # Responsive breakpoint hook
├── utils/
│ ├── formatDate.ts # Date formatting helpers
│ ├── formatPrice.ts # VND / currency formatting
│ └── cn.ts # clsx + tailwind-merge utility
├── constants/
│ └── index.ts # App-wide constants (routes, pagination limits, etc.)
└── types/
└── common.types.ts # ApiResponse<T>, PaginatedResponse<T>, etc.

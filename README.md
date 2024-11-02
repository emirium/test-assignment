# Posts Management Application

## Key Implementation Details
- Server-side pagination
- Type-safe API integration
- Loading states for better UX
- Form validation with error messages
- **Complete CRUD Operations**
  - View paginated list of posts
  - Create new posts
  - Edit existing posts
  - Delete posts with confirmation

## Technical Stack
- React 18 with TypeScript
- Redux Toolkit for state management
- React Router v6 for navigation
- Zod for schema validation
- React Hook Form for form handling
- TailwindCSS for styling
- Vite for build tooling

## Installation

Clone the repository:
```bash
git clone [repository-url]
cd test-assignment
```

Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode
```bash
npm run dev
```
Access the application at `http://localhost:7700`

### Production Build
```bash
npm run build
npm run preview
```
Access the production build at `http://localhost:700`

## Project Structure

```
src/
├── api/          # API integration layer
├── components/   # Reusable UI components
├── store/        # Redux store configuration
│   └── posts/    # Posts-related state management
├── types/        # TypeScript type definitions
└── hooks/        # Custom React hooks
```

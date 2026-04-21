
# Find Me Some Deals (Advanced)

## Project Overview
An advanced iteration of the fmsd project, featuring a multi-page React architecture, dynamic dark/light mode theming, and integration with `react-bootstrap`.

## Tech Stack
- **Framework:** React 19 (Vite)
- **Routing:** `react-router-dom`
- **Styling:** `styled-components` + `react-bootstrap`
- **Theming:** Custom theme system with `ThemeProvider`
- **Deployment:** `gh-pages` (pre-configured for path `/find-me-deals/`)

## Directory Structure
- `src/`
  - `Routing.jsx`: The application's main entry for layout, navigation, and `ThemeProvider`.
  - `App.jsx`: Search page component with sorting and API fetching logic.
  - `Stores.jsx`: Component for displaying store-related information.
  - `BestDeals.jsx`: Component for displaying featured or top deals.
  - `themes.js`: Configuration for `lightTheme` and `darkTheme` colors.
  - `Spinner.jsx`: Reusable loading indicator.
  - `main.jsx`: Renders the `BrowserRouter` and `Routing` component.

## Key Features & Patterns
### 1. Theming
- Managed in `Routing.jsx` using `ThemeProvider`.
- Themes are defined in `themes.js`.
- A `ThemeToggler` button (fixed position) allows users to switch between modes.

### 2. Navigation & Routing
- Uses `react-router-dom`.
- **Base Path:** `/find-me-deals/` is used for all routes to ensure compatibility with GitHub Pages.
- Navigation is handled via a styled `Nav` component in `Routing.jsx`.

### 3. State & Logic
- **Search (App.jsx):** Includes input validation, price sorting (ASC/DESC), and error alerts.
- **Sorting:** Uses a `toggleOrder` function to alternate between ascending and descending prices.

## Development Commands
- `npm run dev`: Starts the Vite development server.
- `npm run deploy`: Builds and deploys the app to GitHub Pages.
- `npm run lint`: Performs linting checks.

## Guidelines for LLM Agents
1. **Routing Context:** Always use the `/find-me-deals/` prefix for new routes or links.
2. **Theming:** When creating new components, ensure they use `props.theme` for colors to maintain dark/light mode support.
3. **Bootstrap Integration:** `react-bootstrap` is available; use it for complex UI elements (modals, dropdowns) while keeping layout-specific styles in `styled-components`.
4. **Validation:** Ensure search inputs and API responses are validated before updating state (follow the pattern in `App.jsx`).

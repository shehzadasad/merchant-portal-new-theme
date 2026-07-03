# Merchant Portal

A React-based merchant dashboard for a Buy Now, Pay Later (BNPL) / e-commerce payments platform. The portal gives merchants a single place to onboard their business, manage stores ("QP Malls"), track orders and customers, configure tax/shipping/payment rules, handle returns and abandoned carts, generate invoices and payment links, and view finance data such as billing payouts and balance sheets. The UI is built on top of the Crema Material UI admin theme and is JWT-authenticated, multi-language, and country-aware (the sidebar changes based on the merchant's country).

## Tech Stack

- **Language:** JavaScript (with TypeScript available)
- **Framework:** React 17 (Create React App / `react-scripts` 4)
- **UI:** Material UI (`@mui/material` v5 and `@material-ui/core` v4), Emotion, Bootstrap / React-Bootstrap, MUI X Date Pickers
- **State management:** Redux, React-Redux, Redux Thunk, Redux Persist, Connected React Router
- **Routing:** React Router DOM v6
- **Forms & validation:** Formik, Yup
- **HTTP:** Axios (with `axios-mock-adapter` for mocks)
- **Data & charts:** ApexCharts / React-ApexCharts, Recharts, React Simple Maps, React World Map
- **Rich content & media:** Draft.js, `react-draft-wysiwyg`, `react-quill`, `mui-rte`, React Dropzone, React Images Uploading, `qrcode.react`
- **Maps:** Google Maps (`@react-google-maps/api`, `react-google-maps`)
- **Reporting/PDF:** Kendo React (drawing, PDF, buttons)
- **Internationalization:** React Intl with locale bundles (English, Arabic, Spanish, French, Italian, Chinese)
- **Auth:** JWT (`jwt-decode`, `jwt-check-expiration`)
- **Notifications:** React Toastify
- **Tooling:** ESLint, Prettier, Husky, lint-staged, commitlint (Jira rules)

## Features

- **Merchant onboarding** flow (business info, contact, documents, bank details).
- **QP Malls management** and a Merchants view for mall operators.
- **Dashboard** with order counts, order amounts, pending payout metrics, and charts.
- **Orders** listing with search, date filtering, order details, and CSV export.
- **Customers** management.
- **Returns** (return policies, drop-off locations, order return handling) including a phase-2 returns view.
- **Abandoned cart** tracking.
- **Configuration:** tax rules, shipping rules, sites, payment methods ("Stack Builder"), and third-party integrations.
- **Invoices:** merchant billing, invoices, and a payment Link Builder.
- **Listings:** products management and a recommendation engine.
- **Finance:** billing payouts and balance sheet.
- **User management** with role selection and discounts.
- **Account settings** including profile, bank accounts, order timer, and password management.
- **Multi-language UI** with right-to-left support (Stylis RTL plugin) and country-specific navigation.

## Project Structure

```
merchant-portal-new-theme/
├── public/                     # Static HTML shell, manifest, robots.txt, assets
├── src/
│   ├── @crema/                 # Crema theme core: layout, providers, services, utilities, JWT auth
│   ├── pages/                  # Route views (auth, dashboard/sample modules, extra pages, error pages)
│   │   └── routesConfig.js     # Country-aware sidebar/navigation configuration
│   ├── redux/                  # Redux store, reducers, and actions
│   │   └── actions/            # Domain actions (Orders, Products, Tax, Returns, Billing, Discounts, etc.)
│   ├── shared/                 # Reusable UI components, constants, and localization
│   │   └── localization/       # React Intl entries and locale JSON (en, ar, es, fr, it, zh)
│   ├── App.js                  # Root app: providers, theme, router, auth wrapper
│   └── index.js                # Application entry point
├── jsconfig.json               # Path aliases (baseUrl: src)
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (a recent LTS release; Node 17+ requires the OpenSSL legacy provider, which the scripts already enable)
- npm or Yarn

### Installation

```bash
npm install
```

### Environment

Create a `.env` file in the project root and provide the API base URL used by the Redux actions/services:

```bash
REACT_APP_API_URL=<base URL of the platform API gateway>
```

### Running

```bash
npm start
```

The app runs in development mode with an increased Node heap size and the OpenSSL legacy provider enabled.

## Available Scripts

- `npm start` - Start the development server.
- `npm run build` - Create a production build.
- `npm test` - Run the test runner.
- `npm run lint` - Lint JavaScript/JSX files in `src`.
- `npm run lint:fix` - Lint and auto-fix issues.
- `npm run format` - Format `src` files with Prettier.

## Environment Variables

- `REACT_APP_API_URL` - Base URL of the backend API gateway. It is prefixed to microservice paths such as `ms-merchant-portal`, `ms-user-authentication`, `ms-return-service`, and `ms-web-external-apis`.

## Author

Author: Shehzad Asadullah — https://github.com/shehzadasad

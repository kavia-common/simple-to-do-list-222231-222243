# Lightweight React Template for KAVIA

This project now includes a modern To-do app with Ocean Professional theming, localStorage persistence, and an API-ready abstraction.

## Environment

The app resolves API base URL as:
- `REACT_APP_API_BASE` || `REACT_APP_BACKEND_URL` || `window.location.origin`

Feature flags via `REACT_APP_FEATURE_FLAGS`:
- Example: `{"useApi": true}` enables API mode. When `useApi` is false or omitted, the app uses localStorage persistence.

For local-only mode, you can omit the variable or set:  
`REACT_APP_FEATURE_FLAGS={"useApi": false}`

## Scripts

- `npm start` - start development server
- `npm test` - run tests
- `npm run build` - production build

## UI

- Header with theme toggle (light/dark)
- Add new tasks
- List items with toggle complete, edit, and delete
- Filters: All, Active, Completed and Clear Completed
- Items-left counter
- Smooth transitions, rounded corners, and accessibility attributes

## Styling

Theme tokens and component styling are in `src/App.css` following the Ocean Professional palette.

## Persistence

- Local mode: Tasks persist across reloads via `localStorage`
- API mode: Calls are routed via `src/services/api.js`

## Note on API

Endpoints expected in API mode:
- GET `/api/todos`
- POST `/api/todos` (body: `{ text }`)
- PATCH `/api/todos/:id` (body: partial)
- DELETE `/api/todos/:id`


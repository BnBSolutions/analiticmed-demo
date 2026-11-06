# Routes

The route table is defined in `src/routes.tsx` using React Router. The files in
this directory export page components; adding a page requires registering its
path in the route table.

Use the shared `AppLink` in `src/lib/router.tsx` for internal links. It uses
React Router's standard `to` path format and preserves the current Russian
language query parameter.

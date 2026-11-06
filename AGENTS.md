<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- Language is a `?lang=ru` search param (Romanian default), retained by the root route's search middleware; every route's head uses `seo()` from src/lib/i18n.ts for hreflang + unique meta. Why: one route tree serves both languages with crawlable URLs.
- Clinic content lives in src/data/site.ts as `{ro, ru}` pairs. Why: single source for both languages.
- Header and footer share the uploaded logo through the Logo component; the favicon uses its medical symbol. Why: keep clinic branding consistent across placements.
- Booking doctor identities and explicit service assignments live in site data; filter by these assignments and clear the selection on service changes. Why: prevent unrelated or stale doctor preferences.
- Shared Section entrances use a one-shot IntersectionObserver with visible content by default; CSS motion respects reduced-motion preferences. Why: animate progressively without hiding content when scripts or motion are unavailable.

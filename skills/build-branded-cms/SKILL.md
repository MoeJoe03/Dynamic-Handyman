---
name: build-branded-cms
description: Build or adapt a reusable website CMS that follows the target site's branding, with configurable content sections, a shared media library, and a client-friendly editing experience. Use when adding a CMS to a website or extracting a reusable CMS implementation, rather than for ordinary public-page edits.
---

# Build a Branded Website CMS

Create a working CMS integrated with the target website. Adapt to its framework, content model and visual identity. This skill is a reusable implementation workflow, not a prebuilt application or a guarantee that every platform accepts the same code.

## Discover the target

- Inspect repository instructions, framework, deployment model, existing CMS, public pages, design tokens, assets, authentication and content sources.
- Identify what the user actually needs to edit. For an image-management CMS, provide media and placement editing; add text, SEO fields, products, articles or other collections only when requested or supported by the site's scope.
- Reuse the site's framework and established backend. Extend an existing platform CMS where appropriate instead of introducing a competing system. Static sites need a build/publish mechanism or a content API; explain and implement the chosen connection.
- Use actual site assets and styles to infer the brand. Ask only for essential missing choices, such as an ambiguous backend project or administrator identity.

## Make reuse concrete

Separate the implementation into a reusable editor layer, a site configuration layer and a persistence adapter. Follow the repository's conventions rather than forcing a particular folder structure.

Keep these in site configuration:

- Business name, logo, colours, typography, border radii and spacing tokens.
- Public origin, admin route, public preview links and enabled CMS modules.
- Collections, fields, categories, labels, validation and allowed editing operations.
- Stable page/section/placement identifiers, ordering, image ratios and existing fallback assets.

Do not bake the source client's name, email, domain, credentials, project ID, categories or number of images into reusable components. Use stable IDs independently of labels. Renaming a category or slot must not detach existing content.

Expose storage and content operations through a small typed adapter appropriate to the stack. Keep provider-specific authentication and queries out of generic form and media-picker components. If Supabase is selected, use `$integrate-cms-supabase` when available; otherwise implement its equivalent backend boundary using current official documentation.

## Follow the brand

Derive the admin theme from the target site's existing design tokens and logo. Use familiar brand typography and button treatment while keeping labels, focus indicators and status messages readable. Never carry another client's branding into a new project.

Keep the public website's established design. Add responsive, keyboard-accessible admin navigation and forms; don't place the public footer, hero or marketing navigation inside admin screens unless requested. Provide loading, empty, error and success states.

## Shared media and placements

- Provide **Upload file** and **Choose from uploaded images** anywhere an image can be assigned, including gallery entries and page placements.
- Upload an asset once and reference its media ID from multiple placements. The library includes all authorised site uploads, not only published gallery images. Add search, previews and pagination when the collection warrants them.
- Store the asset's storage locator, dimensions, MIME type, size and default alt text separately from placement-specific alt text, captions, crop/focal point, ordering and publication state.
- Distinguish removing a placement from deleting the underlying file. Show existing uses and prevent accidental deletion of referenced media. Handle a failed database save after upload without silently accumulating orphaned files.
- Group placement editors by page and section. For carousels, show each carousel's image slots together with a clear heading and divider. Do not invent an extra slide by repeating an image unless the visual loop requires a presentation-only duplicate.
- Validate upload formats and sizes at the trusted boundary. Preserve efficient image delivery, responsive sizes and aspect ratios; avoid loading full-resolution assets merely to populate the picker.

## Editing behaviour

Support metadata-only saves without requiring a new upload. Track dirty state against the last successful save. Provide per-item saving and **Save all** for screens with multiple editable items. Report failed items accurately, retain their edits and clear only confirmed saves. Save all must not silently publish drafts or imply atomic success when partial writes occur.

Warn on navigation away from unsaved edits. Revalidate or refresh public content after successful changes according to the framework's caching model. If concurrent editing is plausible, use version checks or an explicit conflict response instead of silently overwriting changes.

Include a dismissible **Take a tour** experience for new authorised editors and a way to restart it. Explain actual screen controls, media reuse, saving and public previews. Persist completion per user and site; make it keyboard-accessible and respect reduced motion.

## Integrate and verify

Keep meaningful public content available through the site's server/static rendering strategy where supported. Editing controls belong in the CMS; adding them must not force every public page into client-only rendering. Protect admin pages and mutations with backend authorisation, not only a hidden menu.

Verify a real editor flow: sign in, upload, select the same asset in a second placement without a second upload, save alt text only, save multiple changes, reload, and inspect the public result. Check responsive layout, unsaved-change behaviour and referenced-media deletion handling. Run appropriate project checks and report any untested external steps honestly.

To validate reusability, inspect the implementation with a second hypothetical site configuration: a different brand and unrelated content categories should require configuration/adapter changes rather than edits throughout the editor UI.

Deliver implementation files and a concise integration handoff describing site configuration, content mapping, environment variable names and verification results. Never copy secrets into documentation. A request to build a CMS does not itself authorise Git pushes, paid provisioning or production deployment; follow the user's existing scope and permissions.

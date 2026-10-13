---
name: integrate-cms-supabase
description: Connect a website CMS to Supabase Auth, Postgres and Storage with administrator permissions, reusable media, secure content access and environment-specific authentication redirects. Use when setting up or migrating a CMS backend, or fixing its Supabase integration.
---

# Integrate a CMS with Supabase

Provide a reusable Supabase backend for the target CMS and framework. Keep all client-specific identity, content definitions and origins configurable. This skill can be used independently or with `$build-branded-cms`.

## Establish the integration

Inspect existing clients, schemas, migrations, environment variable names, storage buckets and auth routes before changing anything. Identify the target project using trusted user/repository context; do not infer it from another website's configuration. Reuse an established project when authorised. Ask when project selection or shared-versus-isolated tenancy is genuinely ambiguous.

Check installed SDK/CLI versions and current official documentation before implementing version-sensitive APIs. Read the relevant entries in the [Supabase changelog](https://supabase.com/changelog) and use CLI `--help` instead of guessing commands. If the Supabase skill is available, follow its applicable guidance too.

This workflow does not require creating a paid project, sending invitations or migrating production data merely to draft an integration. Complete local implementation within the user's scope; distinguish prepared changes from applied and verified remote changes.

## Configuration and clients

- Keep project URL, public client key, server-only credentials when necessary, bucket identifiers, public origin and auth callback routes in appropriate configuration. Provide an environment example containing names and placeholders only.
- Use separate browser and server clients according to the framework's official integration. Prefer the publishable key for new browser integrations; preserve supported legacy anon-key setups when appropriate. Secret/service-role keys must never enter public environment variables, browser bundles, logs or source control.
- Verify identity using the supported server auth validation method before privileged operations. A client session object or hidden admin route alone is not authorisation.
- Use the normal user's permissions for routine operations so RLS remains effective. Reserve privileged server clients for narrow, independently authorised operations.

## Data model and migrations

Adapt existing tables rather than assuming a fixed gallery schema. A useful model separates media assets, content entries and media placements. Placements reference assets and carry contextual alt text/captions, order and slot identifiers. Keep storage locators rather than expiring signed URLs as durable records. Add foreign keys, uniqueness rules, validation and indexes that match actual queries.

Prefer one client's existing isolation boundary. If multiple sites intentionally share tables, carry a site/tenant identifier through membership, assets, entries and placements. Enforce same-site references in the database; filtering by site only in frontend code is insufficient.

Keep schema changes reproducible in reviewed migrations using the repository's tooling. Experiment on a local or isolated development database, then validate migrations on a fresh test database. Preserve existing data and migration history. Do not reset or overwrite a live database to make a migration pass.

## Authentication and authorisation

An Auth account is not automatically a CMS administrator. Use a protected membership/role table keyed by Auth user ID or trusted server-managed app metadata. Ordinary users must not be able to grant themselves roles; never trust user-editable metadata for permissions. Account for token refresh when roles live in JWT claims.

Enable RLS on exposed tables and set least-privilege grants. Define each operation's access model: public visitors may read explicitly published public content; authorised editors may manage their allowed site's content; unapproved users may not edit. Apply rules to backend requests, RPCs and storage as well as UI routes. Updates need visibility of the row and appropriate `USING` and `WITH CHECK` rules.

Avoid recursive membership policies. Prefer invoker-security functions and views; if privileged helpers are genuinely necessary, restrict execution, fix their search path and validate the caller and scope. Do not bypass RLS just to resolve an unexplained permission error.

Implement the requested sign-in method, sign-out, session expiry and password recovery where applicable. Invite/admin bootstrap must use an authorised administrative path; public signup must not confer editor privileges.

## Redirects and email

Configure the production Site URL and the actual callback/reset routes in the redirect allowlist. Keep local development redirects separate and explicit. Build production redirects from trusted configuration, not an arbitrary request host. Validate return destinations to prevent open redirects.

For recovery links, implement the supported token/code handling, session establishment and password update flow, including expired or reused links. Test on the deployed origin as well as locally when deployment access is available. A production link must not default to localhost.

When configuring email delivery, use the user's chosen provider and verified sender domain, protect SMTP/API credentials and check current provider limits. Do not assume a particular free plan includes SMTP. Respect rate-limit failures rather than repeatedly sending reset emails. Domain changes require reviewing auth URLs, email templates, environment configuration and actual reset-link behaviour.

## Storage and shared media

Use bucket/path policies that match editor membership and site ownership. Public buckets make their object URLs public: use them only for intentionally public media. Private/draft assets need private storage with authorised delivery; RLS on a content row cannot make a public object private.

Validate uploads at a trusted boundary, use collision-resistant storage paths, and avoid arbitrary executable formats. Reusing an image creates another placement reference, not another upload. Protect referenced assets from deletion and distinguish database changes from Storage API deletion. Replacement/upsert requires the relevant insert, select and update permissions.

Handle storage/database partial failures explicitly; those operations do not share a database transaction. Return actionable failures and clean up only files created by the failed operation when safe. Apply cache invalidation after confirmed saves and avoid signing a whole library of private URLs when only one page of results is needed.

## Verification and handoff

Test allowed and denied operations with real anon/authenticated contexts, not only a service-role connection. Cover public published reads, draft privacy, an unapproved signed-in user, an authorised editor, and cross-site access if tenancy is shared. Exercise create/read/update/delete and Storage access; a successful UI screen alone does not prove RLS works.

Verify upload, reuse, metadata-only updates, reload persistence, public rendering and recovery/sign-out flows. Inspect security advisors when available and resolve relevant findings. Report checks blocked by unavailable credentials or services rather than claiming they passed.

Deliver client integration, migrations, policy tests and setup notes appropriate to the project. Document environment variable names, the admin-grant procedure, bucket visibility, auth URLs and domain cutover steps without secrets. Creating these files does not authorise an unrelated push or deployment.

## Official references

Read the relevant pages when implementing each part:

- [Server-side Auth](https://supabase.com/docs/guides/auth/server-side) for framework clients and session handling.
- [Row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security) for grants, policies and tests.
- [Storage access control](https://supabase.com/docs/guides/storage/security/access-control) for object permissions.
- [Redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls) for recovery and environment configuration.
- [Custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp) for provider setup and delivery constraints.

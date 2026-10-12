# Gallery CMS setup

The Gallery Manager is part of this Next.js site at `/admin/login`. It uses the Moejoe Supabase project `laqzhzvzbbwvmangpgki` (named `Projects`). The application uses only the project's publishable key; no service-role key is needed by the site.

The gallery migrations have been applied to this project, including nine existing gallery entries. Local development is configured in the ignored `.env.local`. The Gallery Manager Auth account and `admin_users` membership have been created for `moejoeschule@gmail.com`; its email is confirmed. A user-chosen password has not been verified.

## 1. Create and configure Supabase

1. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in the deployment environment. Restart the Next.js server after changing these variables. The local `.env.local` is already configured and must remain private.
2. The migrations in `supabase/migrations` are already applied to project `laqzhzvzbbwvmangpgki`. For a different project, apply them with `supabase db push` or in the SQL Editor. They create the gallery tables and policies and seed the nine existing gallery entries.
3. The login page uses email and password. To set or reset the owner's password, use `/admin/set-password` to request a recovery email, then choose a password of at least 12 characters. If clicking the recovery link redirects to a different URL, copy its address from the email and paste it into `/admin/set-password` without opening it first. Supabase's built-in email sender is currently rate-limiting further reset requests; wait for the limit to clear before requesting another. Disable public sign-up in Auth settings when dashboard access is available. The CMS has no registration route.
4. The owner membership is already inserted. For a different project, after the owner exists in `auth.users`, run the following in the SQL Editor:

```sql
insert into public.admin_users (user_id)
select id from auth.users where email = 'moejoeschule@gmail.com'
on conflict (user_id) do nothing;
```

Check that the insert affected one row. An Auth user without a row in `admin_users` cannot use the CMS or write gallery files.

## 2. Bring existing gallery photos into the CMS

The public Gallery now reads `gallery_images` from Supabase. The nine existing entries retain their original hosted image URLs; their categories, alt text, and order are managed in the database. New images upload to Supabase Storage. The older project data file remains in the repository because other website sections still use it.

The manager supports JPG, PNG, and WebP files up to 8 MB each, with up to 10 files selected at once. It uploads each file individually so progress and failures are visible per photo. Files are saved under a category folder with a generated name. A failed database insert triggers Storage cleanup.

## Home page images

The Gallery Manager links to `/admin/home-images`. This page manages the named image positions throughout the home page: all 11 service hero carousel panels, the source images in each home service carousel, six featured-project cards, the About photo, the Reviews photo, and the projects call-to-action photo. Upload a JPG, PNG, or WebP image of up to 8 MB for a position and write a descriptive alt text. Each position shows its current photo and whether it is original or custom. “Restore original” removes its replacement. Home page images continue to use their existing photos until replaced, and public updates revalidate the home page after saving.

The `home_images` migration creates the slot metadata table with public read and admin-only write policies. Replacements are stored in the existing public `gallery` bucket under `home/<slot>/`. The upload endpoint validates the administrator, origin, position, file type, bytes, size, and alt text before saving.

To reuse a photo already uploaded to Gallery Manager, open its home image position, choose **Choose from Gallery**, select the photo, and save. This stores a reference to the existing gallery image; it does not upload another file. The same gallery photo can be used in multiple home positions. Gallery Manager prevents deleting a photo while a home position uses it. Restore or replace those positions first, then delete the gallery photo if desired. Existing legacy gallery image URLs are supported too.

You can also edit only an image's alt text. Change the Image description field and choose **Save alt text**; no replacement photo is required. This works for original, uploaded, and reused gallery images. **Restore original** resets both the image and its alt text to their built-in defaults.

## 3. Verify before launch

- Sign in as the provisioned owner, upload an image, edit its category and alt text, move it up or down, then delete it. Confirm each change appears on `/gallery`.
- Visit `/admin/gallery` while signed out; it must redirect to `/admin/login`.
- Create or use a second Auth user without an `admin_users` row. Confirm that user cannot access the dashboard, insert or edit `gallery_images`, or upload/delete files in the `gallery` bucket.
- Confirm an anonymous visitor can read gallery metadata and public image URLs but cannot write either resource.
- Try an SVG, HTML file, invalid image bytes, and a file over 8 MB. The upload endpoint must reject them.
- Check the manager at 360px, 390px, 768px, 1024px, and 1440px widths.

Changes to the admin category list, business name, logo, bucket, or upload limits belong in `config/gallery.config.ts`. The SQL category constraint allows safe slug values without hardcoding this site's categories, so the CMS can be reused with another client project's configuration.

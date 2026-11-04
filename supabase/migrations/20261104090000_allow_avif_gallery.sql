update storage.buckets set allowed_mime_types = array_append(allowed_mime_types, 'image/avif') where id = 'gallery' and not ('image/avif' = any(allowed_mime_types));

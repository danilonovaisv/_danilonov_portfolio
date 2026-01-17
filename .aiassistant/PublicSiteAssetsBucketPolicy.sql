-- Make site-assets bucket public
UPDATE storage.buckets 
SET public = true 
WHERE name = 'site-assets';

-- Add RLS policy for public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'site-assets');

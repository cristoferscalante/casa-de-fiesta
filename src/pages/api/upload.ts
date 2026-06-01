import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';

// Setup Supabase Admin Client using Service Role Key for server-side operations (bypassing RLS)
const supabaseUrl =
  process.env.SUPABASE_URL ||
  import.meta.env.SUPABASE_URL ||
  import.meta.env.PUBLIC_SUPABASE_URL ||
  '';

const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY ||
  '';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Maximum file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed image types
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const POST: APIRoute = async ({ request }) => {
  try {
    // Check authentication
    const cookieHeader = request.headers.get('cookie') || '';
    const match = cookieHeader.match(/sb-access-token=([^;]+)/);
    const accessToken = match ? match[1] : null;

    let isAuthenticated = false;

    if (accessToken) {
      const { data, error } = await supabase.auth.getUser(accessToken);
      if (!error && data?.user) {
        isAuthenticated = true;
      }
    }

    if (!isAuthenticated) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return new Response(
        JSON.stringify({ 
          error: `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(', ')}` 
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return new Response(
        JSON.stringify({ 
          error: `File size exceeds maximum limit of ${MAX_FILE_SIZE / 1024 / 1024}MB` 
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 1. Ensure the bucket 'productos' exists and is public
    const bucketName = 'productos';
    const { error: getBucketError } = await supabaseAdmin.storage.getBucket(bucketName);
    if (getBucketError) {
      // Bucket probably doesn't exist, let's create it
      const { error: createBucketError } = await supabaseAdmin.storage.createBucket(bucketName, {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'],
        fileSizeLimit: MAX_FILE_SIZE
      });
      if (createBucketError) {
        console.warn('Could not auto-create bucket:', createBucketError.message);
      }
    }

    // 2. Prepare file data
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate unique name
    const fileExt = file.name.split('.').pop() || 'webp';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = fileName;

    // 3. Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from(bucketName)
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    // 4. Get the public URL of the uploaded image
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return new Response(
      JSON.stringify({
        success: true,
        url: publicUrl,
        filePath: filePath,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Upload error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to upload image' 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

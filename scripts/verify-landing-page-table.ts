import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

async function checkLandingPageTable() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error(
      'Missing env vars: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY'
    );
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  console.log('Verifying landing_pages table existence...');

  const { data, error } = await supabase
    .from('landing_pages')
    .select('count', { count: 'exact', head: true });

  if (error) {
    console.error('Error accessing landing_pages table:', error.message);
    if (error.code === '42P01') {
      // undefined_table
      console.error('CONFIRMED: Table landing_pages does not exist.');
    }
  } else {
    console.log('SUCCESS: Table landing_pages exists and is accessible.');
  }
}

checkLandingPageTable();

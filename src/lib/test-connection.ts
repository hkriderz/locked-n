// Simple Supabase connection test
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fuatxvwkagcpnnupdqhs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1YXR4dndrYWdjcG5udXBkcWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0Nzc4NjEsImV4cCI6MjA3NDA1Mzg2MX0.MIzDazZ4cSbALP25Gwn6KIrpCR9dZ5n4nBMYJzdTptY';

const supabase = createClient(supabaseUrl, supabaseKey);

// Test basic connection
async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test auth
    const { data: authData, error: authError } = await supabase.auth.getSession();
    console.log('Auth test:', { authData, authError });
    
    // Test database connection
    const { data: dbData, error: dbError } = await supabase
      .from('services')
      .select('count')
      .limit(1);
    
    console.log('Database test:', { dbData, dbError });
    
    return { success: !authError && !dbError };
  } catch (error) {
    console.error('Connection test failed:', error);
    return { success: false, error };
  }
}

export { testConnection };


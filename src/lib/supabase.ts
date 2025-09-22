import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Database types
export interface Client {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  address?: string;
  date_of_birth?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  client_id?: string;
  role: string; // Changed from enum to string to match database
  full_name?: string; // Made optional to match database
  email?: string; // Made optional to match database
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  price_per_hour?: number;
  price_per_session?: number;
  price_per_month?: number;
  is_active: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  client_id: string;
  service_id?: string;
  service_name: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  participants: number;
  total_amount?: number;
  notes?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  client?: Client;
}

export interface Invoice {
  id: string;
  client_id: string;
  booking_id?: string;
  invoice_number: string;
  amount: number;
  tax_amount: number;
  total_amount: number;
  status: 'unpaid' | 'paid' | 'overdue' | 'cancelled';
  issued_at: string;
  due_date?: string;
  paid_at?: string;
  payment_method?: string;
  notes?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  client?: Client;
  booking?: Booking;
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}

// Auth helpers
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
  }
}

// Test connection
export async function testConnection() {
  try {
    // Test with a simple query that should work with RLS
    const { data, error } = await supabase
      .from('services')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Connection test failed:', error);
      return false;
    }
    
    console.log('Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Connection test error:', error);
    return false;
  }
}

// Client operations
export async function getClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
  
  return data || [];
}

export async function getClient(id: string): Promise<Client | null> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching client:', error);
    return null;
  }
  
  return data;
}

export async function createClient(client: Omit<Client, 'id' | 'created_at' | 'updated_at'>): Promise<Client | null> {
  const { data, error } = await supabase
    .from('clients')
    .insert(client)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating client:', error);
    return null;
  }
  
  return data;
}

export async function updateClient(id: string, updates: Partial<Client>): Promise<Client | null> {
  const { data, error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating client:', error);
    return null;
  }
  
  return data;
}

// Booking operations
export async function getBookings(): Promise<Booking[]> {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        client:clients(*)
      `)
      .order('start_time', { ascending: false });
    
    if (error) {
      console.error('Error fetching bookings:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getBookings:', error);
    return [];
  }
}

export async function getBookingsByDateRange(startDate: string, endDate: string): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      client:clients(*)
    `)
    .gte('start_time', startDate)
    .lte('start_time', endDate)
    .order('start_time', { ascending: true });
  
  if (error) {
    console.error('Error fetching bookings by date range:', error);
    return [];
  }
  
  return data || [];
}

export async function createBooking(booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .insert(booking)
    .select(`
      *,
      client:clients(*)
    `)
    .single();
  
  if (error) {
    console.error('Error creating booking:', error);
    return null;
  }
  
  return data;
}

export async function updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      client:clients(*)
    `)
    .single();
  
  if (error) {
    console.error('Error updating booking:', error);
    return null;
  }
  
  return data;
}

// Invoice operations
export async function getInvoices(): Promise<Invoice[]> {
  try {
    const { data, error } = await supabase
      .from('invoices')
      .select(`
        *,
        client:clients(*),
        booking:bookings(*)
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching invoices:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getInvoices:', error);
    return [];
  }
}

export async function createInvoice(invoice: Omit<Invoice, 'id' | 'created_at' | 'updated_at'>): Promise<Invoice | null> {
  const { data, error } = await supabase
    .from('invoices')
    .insert(invoice)
    .select(`
      *,
      client:clients(*),
      booking:bookings(*)
    `)
    .single();
  
  if (error) {
    console.error('Error creating invoice:', error);
    return null;
  }
  
  return data;
}

export async function updateInvoice(id: string, updates: Partial<Invoice>): Promise<Invoice | null> {
  const { data, error } = await supabase
    .from('invoices')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      client:clients(*),
      booking:bookings(*)
    `)
    .single();
  
  if (error) {
    console.error('Error updating invoice:', error);
    return null;
  }
  
  return data;
}

// Services operations
export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('name');
  
  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }
  
  return data || [];
}

// Analytics helpers
export async function getBookingStats(startDate: string, endDate: string) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('status, total_amount, start_time')
      .gte('start_time', startDate)
      .lte('start_time', endDate);
    
    if (error) {
      console.error('Error fetching booking stats:', error);
      return {
        totalBookings: 0,
        confirmedBookings: 0,
        totalRevenue: 0,
        averageBookingValue: 0
      };
    }
    
    const stats = {
      totalBookings: data?.length || 0,
      confirmedBookings: data?.filter(b => b.status === 'confirmed').length || 0,
      totalRevenue: data?.reduce((sum, b) => sum + (b.total_amount || 0), 0) || 0,
      averageBookingValue: 0
    };
    
    if (stats.totalBookings > 0) {
      stats.averageBookingValue = stats.totalRevenue / stats.totalBookings;
    }
    
    return stats;
  } catch (error) {
    console.error('Error in getBookingStats:', error);
    return {
      totalBookings: 0,
      confirmedBookings: 0,
      totalRevenue: 0,
      averageBookingValue: 0
    };
  }
}

export async function getClientStats() {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('created_at');
    
    if (error) {
      console.error('Error fetching client stats:', error);
      return {
        totalClients: 0,
        newClientsThisMonth: 0
      };
    }
    
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    return {
      totalClients: data?.length || 0,
      newClientsThisMonth: data?.filter(c => new Date(c.created_at) >= thirtyDaysAgo).length || 0
    };
  } catch (error) {
    console.error('Error in getClientStats:', error);
    return {
      totalClients: 0,
      newClientsThisMonth: 0
    };
  }
}

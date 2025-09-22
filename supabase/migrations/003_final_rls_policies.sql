-- Fix RLS policies to work with authentication flow
-- These policies handle the case where users might not have profiles yet

-- Drop existing policies
DROP POLICY IF EXISTS "Users can manage their own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can manage their own client record" ON clients;
DROP POLICY IF EXISTS "Admins can manage all clients" ON clients;
DROP POLICY IF EXISTS "Staff can view all clients" ON clients;
DROP POLICY IF EXISTS "Everyone can view services" ON services;
DROP POLICY IF EXISTS "Admins can manage services" ON services;
DROP POLICY IF EXISTS "Admins and staff can manage bookings" ON bookings;
DROP POLICY IF EXISTS "Clients can view their own bookings" ON bookings;
DROP POLICY IF EXISTS "Admins can manage invoices" ON invoices;
DROP POLICY IF EXISTS "Clients can view their own invoices" ON invoices;
DROP POLICY IF EXISTS "Admins can manage invoice items" ON invoice_items;

-- PROFILES TABLE - Allow users to manage their own profile
CREATE POLICY "Users can manage their own profile" ON profiles
  FOR ALL USING (auth.uid() = id);

-- Allow authenticated users to view services (no profile dependency)
CREATE POLICY "Authenticated users can view services" ON services
  FOR SELECT USING (auth.role() = 'authenticated');

-- CLIENTS TABLE - Allow users to manage their own client record
CREATE POLICY "Users can manage their own client record" ON clients
  FOR ALL USING (
    id = (
      SELECT client_id FROM profiles 
      WHERE id = auth.uid()
    )
  );

-- Allow admins to manage all clients (with profile check)
CREATE POLICY "Admins can manage all clients" ON clients
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Allow staff to view all clients (with profile check)
CREATE POLICY "Staff can view all clients" ON clients
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'staff')
    )
  );

-- BOOKINGS TABLE - Allow admins and staff to manage bookings
CREATE POLICY "Admins and staff can manage bookings" ON bookings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'staff')
    )
  );

-- Allow clients to view their own bookings
CREATE POLICY "Clients can view their own bookings" ON bookings
  FOR SELECT USING (
    client_id = (
      SELECT client_id FROM profiles 
      WHERE id = auth.uid()
    )
  );

-- INVOICES TABLE - Allow admins to manage invoices
CREATE POLICY "Admins can manage invoices" ON invoices
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Allow clients to view their own invoices
CREATE POLICY "Clients can view their own invoices" ON invoices
  FOR SELECT USING (
    client_id = (
      SELECT client_id FROM profiles 
      WHERE id = auth.uid()
    )
  );

-- INVOICE_ITEMS TABLE - Allow admins to manage invoice items
CREATE POLICY "Admins can manage invoice items" ON invoice_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

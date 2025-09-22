-- Fix Supabase Auth integration by creating the expected profiles table
-- Supabase Auth expects a 'profiles' table, not 'user_profiles'

-- Create the profiles table that Supabase Auth expects
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  role TEXT DEFAULT 'client',
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create a function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'client')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some basic services data if not exists
INSERT INTO services (id, name, description, price_per_hour, price_per_session, price_per_month) VALUES
  (gen_random_uuid(), 'Gym Rental', 'Full gym access for training sessions', 25.00, NULL, NULL),
  (gen_random_uuid(), 'Personal Training', 'One-on-one training sessions', NULL, 50.00, NULL),
  (gen_random_uuid(), 'Group Training', 'Group training sessions', NULL, 30.00, NULL),
  (gen_random_uuid(), 'Youth Academy', 'Monthly youth training program', NULL, NULL, 150.00),
  (gen_random_uuid(), 'Tournament Entry', 'Entry fee for tournaments', NULL, 25.00, NULL)
ON CONFLICT DO NOTHING;

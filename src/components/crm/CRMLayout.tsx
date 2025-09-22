"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Users, 
  Calendar, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User,
  Shield,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { supabase, getUserProfile, UserProfile, signOut } from "@/lib/supabase";

interface CRMNavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: ('admin' | 'staff' | 'client')[];
}

const navigation: CRMNavItem[] = [
  {
    name: "Dashboard",
    href: "/crm",
    icon: BarChart3,
    roles: ['admin', 'staff']
  },
  {
    name: "Clients",
    href: "/crm/clients",
    icon: Users,
    roles: ['admin', 'staff']
  },
  {
    name: "Bookings",
    href: "/crm/bookings",
    icon: Calendar,
    roles: ['admin', 'staff']
  },
  {
    name: "Invoices",
    href: "/crm/invoices",
    icon: FileText,
    roles: ['admin']
  },
  {
    name: "Reports",
    href: "/crm/reports",
    icon: BarChart3,
    roles: ['admin']
  },
  {
    name: "My Bookings",
    href: "/portal",
    icon: Calendar,
    roles: ['client']
  },
  {
    name: "My Invoices",
    href: "/portal/invoices",
    icon: FileText,
    roles: ['client']
  }
];

interface CRMLayoutProps {
  children: React.ReactNode;
}

export function CRMLayout({ children }: CRMLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const profile = await getUserProfile(user.id);
          if (profile) {
            setUserProfile(profile);
          } else {
            setRedirecting(true);
            router.push('/auth/login');
          }
        } else {
          setRedirecting(true);
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
        setRedirecting(true);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    }

    loadUserProfile();
  }, [router]);

  // Handle redirect after state change
  useEffect(() => {
    if (redirecting) {
      router.push('/auth/login');
    }
  }, [redirecting, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const filteredNavigation = navigation.filter(item => 
    userProfile?.role && item.roles.includes(userProfile.role as 'admin' | 'staff' | 'client')
  );

  if (loading || redirecting) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <SidebarContent navigation={filteredNavigation} userProfile={userProfile} />
        </div>
      </div>

      {/* Desktop sidebar - positioned below header with extra space */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:top-24">
        <SidebarContent navigation={filteredNavigation} userProfile={userProfile} />
      </div>

      {/* Main content - accounting for header height with extra space */}
      <div className="lg:pl-64 flex flex-col flex-1 pt-24">
        {/* Top bar for mobile */}
        <div className="sticky top-24 z-10 lg:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-50">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

interface SidebarContentProps {
  navigation: CRMNavItem[];
  userProfile: UserProfile;
}

function SidebarContent({ navigation, userProfile }: SidebarContentProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <Link href="/" className="flex items-center">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">LN</span>
            </div>
            <span className="ml-3 text-2xl font-bold text-gray-900">Locked N CRM</span>
          </Link>
        </div>

        {/* User info */}
        <div className="mt-6 px-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-600" />
              </div>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">
                {userProfile.full_name}
              </div>
              <div className="text-sm font-medium text-gray-500 flex items-center">
                {userProfile.role === 'admin' && <Shield className="h-4 w-4 mr-1" />}
                {userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1)}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sign out */}
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
        <Button
          variant="outline"
          onClick={handleSignOut}
          className="w-full justify-start"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign out
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { CRMLayout } from "@/components/crm/CRMLayout";
import { 
  getBookingStats, 
  getClientStats, 
  getBookings, 
  getInvoices,
  testConnection,
  Booking,
  Invoice
} from "@/lib/supabase";

interface DashboardStats {
  totalClients: number;
  newClientsThisMonth: number;
  totalBookings: number;
  confirmedBookings: number;
  totalRevenue: number;
  averageBookingValue: number;
  unpaidInvoices: number;
  overdueInvoices: number;
}

export default function CRMDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [recentInvoices, setRecentInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        // Test connection first
        const connectionOk = await testConnection();
        if (!connectionOk) {
          console.error('Supabase connection failed');
          setLoading(false);
          return;
        }

        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        
        // Load stats
        const [clientStats, bookingStats] = await Promise.all([
          getClientStats(),
          getBookingStats(startOfMonth.toISOString(), endOfMonth.toISOString())
        ]);

        // Load recent data
        const [bookings, invoices] = await Promise.all([
          getBookings(),
          getInvoices()
        ]);

        // Calculate invoice stats
        const unpaidInvoices = invoices.filter(inv => inv.status === 'unpaid').length;
        const overdueInvoices = invoices.filter(inv => inv.status === 'overdue').length;

        setStats({
          totalClients: clientStats?.totalClients || 0,
          newClientsThisMonth: clientStats?.newClientsThisMonth || 0,
          totalBookings: bookingStats?.totalBookings || 0,
          confirmedBookings: bookingStats?.confirmedBookings || 0,
          totalRevenue: bookingStats?.totalRevenue || 0,
          averageBookingValue: bookingStats?.averageBookingValue || 0,
          unpaidInvoices,
          overdueInvoices
        });

        setRecentBookings(bookings.slice(0, 5));
        setRecentInvoices(invoices.slice(0, 5));
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <CRMLayout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </CRMLayout>
    );
  }

  const statCards = [
    {
      title: "Total Clients",
      value: stats?.totalClients || 0,
      change: `+${stats?.newClientsThisMonth || 0} this month`,
      icon: Users,
      color: "blue"
    },
    {
      title: "Total Bookings",
      value: stats?.totalBookings || 0,
      change: `${stats?.confirmedBookings || 0} confirmed`,
      icon: Calendar,
      color: "green"
    },
    {
      title: "Monthly Revenue",
      value: `$${(stats?.totalRevenue || 0).toLocaleString()}`,
      change: `Avg: $${(stats?.averageBookingValue || 0).toFixed(2)}`,
      icon: DollarSign,
      color: "purple"
    },
    {
      title: "Outstanding Invoices",
      value: (stats?.unpaidInvoices || 0) + (stats?.overdueInvoices || 0),
      change: `${stats?.overdueInvoices || 0} overdue`,
      icon: AlertCircle,
      color: "red"
    }
  ];

  return (
    <CRMLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back! Here's what's happening at Locked N today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            const colorClasses = {
              blue: "text-blue-600 bg-blue-100",
              green: "text-green-600 bg-green-100",
              purple: "text-purple-600 bg-purple-100",
              red: "text-red-600 bg-red-100"
            };
            
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${colorClasses[card.color as keyof typeof colorClasses]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
                    <p className="text-sm text-gray-500">{card.change}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {booking.client?.full_name || 'Unknown Client'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {booking.service_name} • {new Date(booking.start_time).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
                {recentBookings.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No recent bookings</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Recent Invoices */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-lg shadow"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {invoice.invoice_number}
                        </p>
                        <p className="text-sm text-gray-500">
                          {invoice.client?.full_name || 'Unknown Client'} • ${invoice.total_amount}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        invoice.status === 'paid' 
                          ? 'bg-green-100 text-green-800'
                          : invoice.status === 'overdue'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {invoice.status}
                      </span>
                    </div>
                  </div>
                ))}
                {recentInvoices.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No recent invoices</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/crm/clients/new"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Users className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Add New Client</p>
                <p className="text-sm text-gray-500">Register a new client</p>
              </div>
            </a>
            <a
              href="/crm/bookings/new"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Calendar className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Create Booking</p>
                <p className="text-sm text-gray-500">Schedule a new session</p>
              </div>
            </a>
            <a
              href="/crm/invoices/new"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <DollarSign className="h-6 w-6 text-purple-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Create Invoice</p>
                <p className="text-sm text-gray-500">Generate new invoice</p>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </CRMLayout>
  );
}

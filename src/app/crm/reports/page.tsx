"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  DollarSign,
  BarChart3,
  PieChart,
  Download,
  Filter
} from "lucide-react";
import { CRMLayout } from "@/components/crm/CRMLayout";
import { Button } from "@/components/ui/Button";
import { 
  getBookingStats, 
  getClientStats, 
  getBookings,
  getInvoices,
  Booking,
  Invoice
} from "@/lib/supabase";

interface ReportData {
  totalClients: number;
  newClientsThisMonth: number;
  totalBookings: number;
  confirmedBookings: number;
  totalRevenue: number;
  averageBookingValue: number;
  unpaidInvoices: number;
  overdueInvoices: number;
  monthlyRevenue: number;
  revenueGrowth: number;
  bookingGrowth: number;
  clientGrowth: number;
}

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10),
    end: new Date().toISOString().slice(0, 10)
  });

  useEffect(() => {
    loadReportData();
  }, [dateRange]);

  async function loadReportData() {
    try {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      
      // Load current period data
      const [clientStats, bookingStats, bookingsData, invoicesData] = await Promise.all([
        getClientStats(),
        getBookingStats(startDate.toISOString(), endDate.toISOString()),
        getBookings(),
        getInvoices()
      ]);

      // Load previous period data for comparison
      const previousStart = new Date(startDate);
      previousStart.setMonth(previousStart.getMonth() - 1);
      const previousEnd = new Date(endDate);
      previousEnd.setMonth(previousEnd.getMonth() - 1);
      
      const [prevClientStats, prevBookingStats] = await Promise.all([
        getClientStats(),
        getBookingStats(previousStart.toISOString(), previousEnd.toISOString())
      ]);

      // Calculate growth percentages
      const revenueGrowth = prevBookingStats?.totalRevenue 
        ? ((bookingStats?.totalRevenue || 0) - prevBookingStats.totalRevenue) / prevBookingStats.totalRevenue * 100
        : 0;
      
      const bookingGrowth = prevBookingStats?.totalBookings
        ? ((bookingStats?.totalBookings || 0) - prevBookingStats.totalBookings) / prevBookingStats.totalBookings * 100
        : 0;
      
      const clientGrowth = prevClientStats?.totalClients
        ? ((clientStats?.totalClients || 0) - prevClientStats.totalClients) / prevClientStats.totalClients * 100
        : 0;

      // Calculate invoice stats
      const unpaidInvoices = invoicesData.filter(inv => inv.status === 'unpaid').length;
      const overdueInvoices = invoicesData.filter(inv => inv.status === 'overdue').length;

      setReportData({
        totalClients: clientStats?.totalClients || 0,
        newClientsThisMonth: clientStats?.newClientsThisMonth || 0,
        totalBookings: bookingStats?.totalBookings || 0,
        confirmedBookings: bookingStats?.confirmedBookings || 0,
        totalRevenue: bookingStats?.totalRevenue || 0,
        averageBookingValue: bookingStats?.averageBookingValue || 0,
        unpaidInvoices,
        overdueInvoices,
        monthlyRevenue: bookingStats?.totalRevenue || 0,
        revenueGrowth,
        bookingGrowth,
        clientGrowth
      });

      setBookings(bookingsData);
      setInvoices(invoicesData);
    } catch (error) {
      console.error('Error loading report data:', error);
    } finally {
      setLoading(false);
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const getGrowthIcon = (value: number) => {
    return value >= 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const getGrowthColor = (value: number) => {
    return value >= 0 ? 'text-green-600' : 'text-red-600';
  };

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

  const kpiCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(reportData?.totalRevenue || 0),
      change: formatPercentage(reportData?.revenueGrowth || 0),
      icon: DollarSign,
      color: "green"
    },
    {
      title: "Total Bookings",
      value: reportData?.totalBookings || 0,
      change: formatPercentage(reportData?.bookingGrowth || 0),
      icon: Calendar,
      color: "blue"
    },
    {
      title: "Total Clients",
      value: reportData?.totalClients || 0,
      change: formatPercentage(reportData?.clientGrowth || 0),
      icon: Users,
      color: "purple"
    },
    {
      title: "Outstanding Invoices",
      value: (reportData?.unpaidInvoices || 0) + (reportData?.overdueInvoices || 0),
      change: `${reportData?.overdueInvoices || 0} overdue`,
      icon: DollarSign,
      color: "red"
    }
  ];

  return (
    <CRMLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="mt-2 text-gray-600">
              Comprehensive insights into your business performance
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button variant="outline">
              <Download className="h-5 w-5 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiCards.map((card, index) => {
            const Icon = card.icon;
            const colorClasses = {
              green: "text-green-600 bg-green-100",
              blue: "text-blue-600 bg-blue-100",
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
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">{card.value}</p>
                    <div className="flex items-center mt-2">
                      {getGrowthIcon(parseFloat(card.change.replace(/[+%]/g, '')))}
                      <span className={`text-sm font-medium ml-1 ${getGrowthColor(parseFloat(card.change.replace(/[+%]/g, '')))}`}>
                        {card.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${colorClasses[card.color as keyof typeof colorClasses]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
              <BarChart3 className="h-6 w-6 text-gray-400" />
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Revenue chart coming soon</p>
              </div>
            </div>
          </motion.div>

          {/* Booking Status Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Booking Status</h3>
              <PieChart className="h-6 w-6 text-gray-400" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Confirmed</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {reportData?.confirmedBookings || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {(reportData?.totalBookings || 0) - (reportData?.confirmedBookings || 0)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600">Cancelled</span>
                </div>
                <span className="text-sm font-medium text-gray-900">0</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Detailed Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-lg shadow"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Top Services</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {['Gym Rental', 'Personal Training', 'Group Training', 'Youth Academy', 'Tournament Entry'].map((service, index) => (
                  <div key={service} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{service}</p>
                      <p className="text-sm text-gray-500">{Math.floor(Math.random() * 50) + 10} bookings</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {formatCurrency(Math.floor(Math.random() * 5000) + 1000)}
                      </p>
                      <p className="text-sm text-gray-500">revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white rounded-lg shadow"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {bookings.slice(0, 5).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {booking.client?.full_name || 'Unknown Client'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {booking.service_name} • {new Date(booking.start_time).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {booking.total_amount ? formatCurrency(booking.total_amount) : 'N/A'}
                      </p>
                      <p className="text-sm text-gray-500">{booking.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {reportData?.averageBookingValue ? formatCurrency(reportData.averageBookingValue) : '$0'}
              </div>
              <div className="text-sm text-gray-600">Average Booking Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {reportData?.confirmedBookings || 0}
              </div>
              <div className="text-sm text-gray-600">Confirmed Bookings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {reportData?.newClientsThisMonth || 0}
              </div>
              <div className="text-sm text-gray-600">New Clients This Month</div>
            </div>
          </div>
        </motion.div>
      </div>
    </CRMLayout>
  );
}


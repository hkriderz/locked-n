"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  DollarSign, 
  Download, 
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock
} from "lucide-react";
import { CRMLayout } from "@/components/crm/CRMLayout";
import { Button } from "@/components/ui/Button";
import { 
  getInvoices, 
  createInvoice,
  updateInvoice,
  getClients,
  getBookings,
  Invoice,
  Client,
  Booking
} from "@/lib/supabase";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showNewInvoiceForm, setShowNewInvoiceForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterInvoices();
  }, [invoices, searchTerm, statusFilter]);

  async function loadData() {
    try {
      const [invoicesData, clientsData, bookingsData] = await Promise.all([
        getInvoices(),
        getClients(),
        getBookings()
      ]);
      
      setInvoices(invoicesData);
      setClients(clientsData);
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  function filterInvoices() {
    let filtered = invoices;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(invoice =>
        invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.client?.full_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(invoice => invoice.status === statusFilter);
    }

    setFilteredInvoices(filtered);
  }

  async function handleCreateInvoice(invoiceData: Omit<Invoice, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const newInvoice = await createInvoice(invoiceData);
      if (newInvoice) {
        setInvoices(prev => [newInvoice, ...prev]);
        setShowNewInvoiceForm(false);
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  }

  async function handleUpdateInvoice(id: string, updates: Partial<Invoice>) {
    try {
      const updatedInvoice = await updateInvoice(id, updates);
      if (updatedInvoice) {
        setInvoices(prev => prev.map(invoice => 
          invoice.id === id ? updatedInvoice : invoice
        ));
        setEditingInvoice(null);
      }
    } catch (error) {
      console.error('Error updating invoice:', error);
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'unpaid':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'overdue':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-gray-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'unpaid':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <CRMLayout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </CRMLayout>
    );
  }

  return (
    <CRMLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
            <p className="mt-2 text-gray-600">
              Manage client invoices ({filteredInvoices.length} invoices)
            </p>
          </div>
          <Button onClick={() => setShowNewInvoiceForm(true)}>
            <Plus className="h-5 w-5 mr-2" />
            New Invoice
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search invoices by number or client..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <Button variant="outline">
              <Filter className="h-5 w-5 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Invoices List */}
        <div className="space-y-4">
          {filteredInvoices.map((invoice, index) => (
            <motion.div
              key={invoice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(invoice.status)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {invoice.invoice_number}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {formatCurrency(invoice.total_amount)}
                      </div>
                      <div className="flex items-center">
                        <span>Client: {invoice.client?.full_name || 'Unknown'}</span>
                      </div>
                      <div className="flex items-center">
                        <span>Issued: {new Date(invoice.issued_at).toLocaleDateString()}</span>
                      </div>
                      {invoice.due_date && (
                        <div className="flex items-center">
                          <span>Due: {new Date(invoice.due_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    {invoice.booking && (
                      <p className="text-sm text-gray-600 mt-1">
                        Booking: {invoice.booking.service_name} • {new Date(invoice.booking.start_time).toLocaleDateString()}
                      </p>
                    )}
                    {invoice.notes && (
                      <p className="text-sm text-gray-500 mt-2">{invoice.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingInvoice(invoice)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || statusFilter !== 'all' ? 'No invoices found' : 'No invoices yet'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Get started by creating your first invoice'
                }
              </p>
              {(!searchTerm && statusFilter === 'all') && (
                <Button onClick={() => setShowNewInvoiceForm(true)}>
                  <Plus className="h-5 w-5 mr-2" />
                  Create First Invoice
                </Button>
              )}
            </div>
          )}
        </div>

        {/* New Invoice Form Modal */}
        {showNewInvoiceForm && (
          <InvoiceFormModal
            invoice={null}
            clients={clients}
            bookings={bookings}
            onSave={handleCreateInvoice}
            onClose={() => setShowNewInvoiceForm(false)}
          />
        )}

        {/* Edit Invoice Form Modal */}
        {editingInvoice && (
          <InvoiceFormModal
            invoice={editingInvoice}
            clients={clients}
            bookings={bookings}
            onSave={(updates) => handleUpdateInvoice(editingInvoice.id, updates)}
            onClose={() => setEditingInvoice(null)}
          />
        )}
      </div>
    </CRMLayout>
  );
}

interface InvoiceFormModalProps {
  invoice: Invoice | null;
  clients: Client[];
  bookings: Booking[];
  onSave: (data: Omit<Invoice, 'id' | 'created_at' | 'updated_at'>) => void;
  onClose: () => void;
}

function InvoiceFormModal({ invoice, clients, bookings, onSave, onClose }: InvoiceFormModalProps) {
  const [formData, setFormData] = useState({
    client_id: invoice?.client_id || '',
    booking_id: invoice?.booking_id || '',
    amount: invoice?.amount || 0,
    tax_amount: invoice?.tax_amount || 0,
    total_amount: invoice?.total_amount || 0,
    status: invoice?.status || 'unpaid',
    due_date: invoice?.due_date ? new Date(invoice.due_date).toISOString().slice(0, 10) : '',
    payment_method: invoice?.payment_method || '',
    notes: invoice?.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const invoiceData = {
      ...formData,
      invoice_number: '', // Will be auto-generated by the database
      due_date: formData.due_date ? new Date(formData.due_date).toISOString() : null,
      paid_at: formData.status === 'paid' ? new Date().toISOString() : null
    };
    
    onSave(invoiceData);
  };

  const handleAmountChange = (field: string, value: number) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      updated.total_amount = updated.amount + updated.tax_amount;
      return updated;
    });
  };

  const handleBookingChange = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      setFormData(prev => ({
        ...prev,
        booking_id: bookingId,
        client_id: booking.client_id,
        amount: booking.total_amount || 0
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {invoice ? 'Edit Invoice' : 'Create New Invoice'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client *
              </label>
              <select
                required
                value={formData.client_id}
                onChange={(e) => setFormData(prev => ({ ...prev, client_id: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select a client</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.full_name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Related Booking (Optional)
              </label>
              <select
                value={formData.booking_id}
                onChange={(e) => handleBookingChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select a booking</option>
                {bookings.map(booking => (
                  <option key={booking.id} value={booking.id}>
                    {booking.client?.full_name} - {booking.service_name} ({new Date(booking.start_time).toLocaleDateString()})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.amount}
                onChange={(e) => handleAmountChange('amount', parseFloat(e.target.value) || 0)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tax Amount
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.tax_amount}
                onChange={(e) => handleAmountChange('tax_amount', parseFloat(e.target.value) || 0)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Amount
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.total_amount}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={formData.due_date}
                onChange={(e) => setFormData(prev => ({ ...prev, due_date: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                value={formData.payment_method}
                onChange={(e) => setFormData(prev => ({ ...prev, payment_method: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select payment method</option>
                <option value="cash">Cash</option>
                <option value="credit_card">Credit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="check">Check</option>
                <option value="online">Online Payment</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Additional notes about this invoice..."
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {invoice ? 'Update Invoice' : 'Create Invoice'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}


import React, { useState, useEffect, useCallback } from 'react';
import { api } from './services/api';
import Navbar from './components/Navbar';
import DashboardSummary from './components/DashboardSummary';
import BillCard from './components/BillCard';
import PaymentModal from './components/PaymentModal';
import ReceiptModal from './components/ReceiptModal';
import AddBillModal from './components/AddBillModal';
import TransactionHistory from './components/TransactionHistory';
import CategoryIcon from './components/CategoryIcon';
import { Search, Plus, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('bills');
  const [bills, setBills] = useState([]);
  const [summary, setSummary] = useState(null);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isAddBillOpen, setIsAddBillOpen] = useState(false);
  const [activeBillToPay, setActiveBillToPay] = useState(null);
  const [activeReceipt, setActiveReceipt] = useState(null);

  // Loading & toast states
  const [isLoading, setIsLoading] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const [toast, setToast] = useState(null);

  // Helper to show notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Load all initial data
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [sumRes, catRes, billsRes, txnRes] = await Promise.all([
        api.getSummary(),
        api.getCategories(),
        api.getBills({ status: statusFilter, category: categoryFilter, search: searchTerm }),
        api.getTransactions()
      ]);

      setSummary(sumRes.data);
      setCategories(catRes.data);
      setBills(billsRes.data);
      setTransactions(txnRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      showToast('Failed to connect to backend API. Please make sure the backend is running.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, categoryFilter, searchTerm]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle Pay Bill
  const handlePaymentSuccess = async (billId, paymentData) => {
    const res = await api.payBill(billId, paymentData);
    const { transaction } = res.data;

    // Close pay modal & show receipt
    setActiveBillToPay(null);
    setActiveReceipt(transaction);

    showToast(`Payment of $${transaction.amount.toFixed(2)} completed successfully!`);

    // Refresh data
    loadData();
    return res;
  };

  // Handle View Receipt from BillCard
  const handleViewReceiptFromBill = (bill) => {
    // Find matching transaction
    const matchedTxn = transactions.find(t => t.billId === bill.id || t.id === bill.transactionRef);
    if (matchedTxn) {
      setActiveReceipt(matchedTxn);
    } else {
      // Construct receipt fallback from bill
      setActiveReceipt({
        id: bill.transactionRef || `TXN-DEMO-${bill.id}`,
        billId: bill.id,
        billerName: bill.billerName,
        category: bill.category,
        consumerId: bill.consumerId,
        customerName: bill.customerName,
        amount: bill.amount,
        paidAt: bill.paidAt || new Date().toISOString(),
        paymentMethod: bill.paymentMethod || 'Online Transfer',
        status: 'SUCCESS'
      });
    }
  };

  // Handle Add Bill
  const handleBillAdded = async (billData) => {
    const res = await api.createBill(billData);
    showToast(`Bill from ${billData.billerName} added successfully!`);
    loadData();
    return res;
  };

  // Handle Reset Mock Data
  const handleResetData = async () => {
    if (window.confirm('Reset all mock bills and transaction history back to initial test state?')) {
      try {
        setIsResetting(true);
        await api.resetMockData();
        showToast('Mock data reset to initial demo state!');
        await loadData();
      } catch (err) {
        console.error('Failed to reset mock data:', err);
        showToast('Failed to reset mock data.', 'error');
      } finally {
        setIsResetting(false);
      }
    }
  };

  return (
    <div className="app-layout">
      {/* Toast Alert */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onResetData={handleResetData}
        isResetting={isResetting}
        onOpenAddBill={() => setIsAddBillOpen(true)}
      />

      {/* Main Content Area */}
      <main className="container main-content">
        {activeTab === 'bills' ? (
          <>
            {/* Dashboard Summary Cards */}
            <DashboardSummary
              summary={summary}
              onFilterStatus={setStatusFilter}
              currentStatusFilter={statusFilter}
            />

            {/* Quick Actions & Filter Bar */}
            <div className="controls-panel">
              <div className="search-and-status-row">
                {/* Search */}
                <div className="search-box">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search bills by provider, consumer # or ID..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button className="clear-btn" onClick={() => setSearchTerm('')}>×</button>
                  )}
                </div>

                {/* Status Tabs */}
                <div className="status-tabs">
                  <button
                    className={`status-tab ${statusFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('all')}
                  >
                    All ({summary?.counts?.all || 0})
                  </button>
                  <button
                    className={`status-tab ${statusFilter === 'pending' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('pending')}
                  >
                    Pending ({summary?.counts?.pending || 0})
                  </button>
                  <button
                    className={`status-tab tab-danger ${statusFilter === 'overdue' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('overdue')}
                  >
                    Overdue ({summary?.counts?.overdue || 0})
                  </button>
                  <button
                    className={`status-tab tab-success ${statusFilter === 'paid' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('paid')}
                  >
                    Paid ({summary?.counts?.paid || 0})
                  </button>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="category-chips-row">
                <button
                  className={`chip ${categoryFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setCategoryFilter('all')}
                >
                  All Categories
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`chip ${categoryFilter === cat.id ? 'active' : ''}`}
                    onClick={() => setCategoryFilter(cat.id)}
                  >
                    <CategoryIcon category={cat.id} size={15} />
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bills Section */}
            <div className="bills-section">
              <div className="bills-section-header">
                <div>
                  <h2 className="section-title">
                    {statusFilter === 'all' && 'All Utility Bills'}
                    {statusFilter === 'pending' && 'Pending Bills Due'}
                    {statusFilter === 'overdue' && 'Overdue Bills'}
                    {statusFilter === 'paid' && 'Settled Bills'}
                  </h2>
                  <span className="section-count text-muted">
                    Showing {bills.length} {bills.length === 1 ? 'bill' : 'bills'}
                  </span>
                </div>

                <button
                  className="btn-primary btn-sm"
                  onClick={() => setIsAddBillOpen(true)}
                >
                  <Plus size={16} />
                  <span>New Bill</span>
                </button>
              </div>

              {isLoading ? (
                <div className="loading-state">
                  <Loader2 size={36} className="spin text-primary" />
                  <p>Loading mock bills...</p>
                </div>
              ) : bills.length === 0 ? (
                <div className="empty-state">
                  <AlertCircle size={44} className="empty-icon text-muted" />
                  <h3 className="empty-title">No bills match your filter</h3>
                  <p className="empty-text">
                    Try changing your category or status filters, or add a new bill to track.
                  </p>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      setStatusFilter('all');
                      setCategoryFilter('all');
                      setSearchTerm('');
                    }}
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="bills-grid">
                  {bills.map(bill => (
                    <BillCard
                      key={bill.id}
                      bill={bill}
                      onPayClick={(b) => setActiveBillToPay(b)}
                      onViewReceiptClick={(b) => handleViewReceiptFromBill(b)}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          /* Payment History Tab */
          <TransactionHistory
            transactions={transactions}
            onSelectReceipt={(receipt) => setActiveReceipt(receipt)}
          />
        )}
      </main>

      {/* Payment Modal */}
      <PaymentModal
        bill={activeBillToPay}
        isOpen={Boolean(activeBillToPay)}
        onClose={() => setActiveBillToPay(null)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Digital Receipt Modal */}
      <ReceiptModal
        receipt={activeReceipt}
        isOpen={Boolean(activeReceipt)}
        onClose={() => setActiveReceipt(null)}
      />

      {/* Add / Fetch Bill Modal */}
      <AddBillModal
        isOpen={isAddBillOpen}
        onClose={() => setIsAddBillOpen(false)}
        categories={categories}
        onBillAdded={handleBillAdded}
      />
    </div>
  );
}

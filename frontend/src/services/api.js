const API_BASE = '/api';

export const api = {
  // Get summary analytics
  async getSummary() {
    const res = await fetch(`${API_BASE}/summary`);
    if (!res.ok) throw new Error('Failed to fetch summary');
    return res.json();
  },

  // Get categories and billers
  async getCategories() {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  // Get bills with query filters
  async getBills({ status, category, search } = {}) {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (category && category !== 'all') params.append('category', category);
    if (search && search.trim()) params.append('search', search.trim());

    const res = await fetch(`${API_BASE}/bills?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch bills');
    return res.json();
  },

  // Get single bill
  async getBill(id) {
    const res = await fetch(`${API_BASE}/bills/${id}`);
    if (!res.ok) throw new Error('Failed to fetch bill details');
    return res.json();
  },

  // Add / Fetch new bill
  async createBill(billData) {
    const res = await fetch(`${API_BASE}/bills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(billData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to create bill');
    }
    return res.json();
  },

  // Pay bill
  async payBill(billId, paymentData) {
    const res = await fetch(`${API_BASE}/bills/${billId}/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Payment failed');
    }
    return res.json();
  },

  // Get transactions
  async getTransactions({ category, search } = {}) {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search && search.trim()) params.append('search', search.trim());

    const res = await fetch(`${API_BASE}/transactions?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch transactions');
    return res.json();
  },

  // Reset mock data
  async resetMockData() {
    const res = await fetch(`${API_BASE}/reset`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to reset mock data');
    return res.json();
  }
};

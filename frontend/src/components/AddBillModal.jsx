import React, { useState } from 'react';
import { X, Plus, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import CategoryIcon from './CategoryIcon';

export default function AddBillModal({ isOpen, onClose, categories, onBillAdded }) {
  const [category, setCategory] = useState('electricity');
  const [billerId, setBillerId] = useState('');
  const [consumerId, setConsumerId] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [customerName, setCustomerName] = useState('Alex Morgan');
  const [unitsConsumed, setUnitsConsumed] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  // Selected category object
  const currentCategoryObj = categories.find(c => c.id === category) || categories[0];
  const billers = currentCategoryObj?.billers || [];

  // Simulate "Fetch Latest Bill" from provider
  const handleAutoFetchBill = () => {
    if (!consumerId.trim()) {
      setError('Please enter a Consumer / Account number first to fetch.');
      return;
    }
    setError(null);

    // Mock realistic values based on category
    const mockAmounts = {
      electricity: (80 + Math.random() * 90).toFixed(2),
      water: (25 + Math.random() * 35).toFixed(2),
      broadband: (49.99 + (Math.random() > 0.5 ? 20 : 0)).toFixed(2),
      mobile: (39.99 + Math.random() * 25).toFixed(2),
      gas: (30 + Math.random() * 40).toFixed(2),
      dth: (24.99 + Math.random() * 15).toFixed(2)
    };

    const nextDueDate = new Date();
    nextDueDate.setDate(nextDueDate.getDate() + 14);

    setAmount(mockAmounts[category] || '55.00');
    setDueDate(nextDueDate.toISOString().split('T')[0]);

    const mockUnits = {
      electricity: `${Math.floor(200 + Math.random() * 200)} kWh (Domestic)`,
      water: `${Math.floor(12000 + Math.random() * 8000)} Gallons`,
      broadband: 'Highspeed Fiber 200 Mbps Plan',
      mobile: 'Unlimited Talk + 30GB Data',
      gas: `${Math.floor(20 + Math.random() * 25)} SCM Gas Units`,
      dth: 'Gold Family Entertainment HD Pack'
    };
    setUnitsConsumed(mockUnits[category] || 'Standard Consumer Service');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please provide a valid bill amount.');
      return;
    }
    if (!consumerId.trim()) {
      setError('Please provide a consumer or account ID.');
      return;
    }

    const selectedBillerObj = billers.find(b => b.id === billerId) || billers[0];

    setIsLoading(true);
    setError(null);

    try {
      await onBillAdded({
        category,
        billerId: selectedBillerObj?.id,
        billerName: selectedBillerObj?.name || 'Utility Provider',
        consumerId: consumerId.trim(),
        customerName: customerName.trim() || 'Alex Morgan',
        amount: parseFloat(amount),
        dueDate: dueDate || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        unitsConsumed: unitsConsumed || 'Monthly Regular Service'
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to add bill. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container add-bill-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Add / Fetch New Bill</h2>
            <span className="modal-subtitle">Register and track a new utility bill</span>
          </div>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Category selection */}
            <div className="form-group">
              <label className="input-label">Select Utility Category</label>
              <div className="category-select-grid">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`category-pill-btn ${category === cat.id ? 'active' : ''}`}
                    onClick={() => {
                      setCategory(cat.id);
                      setBillerId('');
                    }}
                  >
                    <CategoryIcon category={cat.id} size={16} />
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Biller selection */}
            <div className="form-group">
              <label className="input-label">Select Biller / Service Provider</label>
              <select
                className="input-control"
                value={billerId || (billers[0]?.id || '')}
                onChange={e => setBillerId(e.target.value)}
                required
              >
                {billers.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Consumer / Account Number */}
            <div className="form-group">
              <label className="input-label">Consumer / Account ID / Phone</label>
              <div className="fetch-input-wrapper">
                <input
                  type="text"
                  className="input-control"
                  value={consumerId}
                  onChange={e => setConsumerId(e.target.value)}
                  placeholder="e.g. EB-904281, MOB-9876543210"
                  required
                />
                <button
                  type="button"
                  className="btn-fetch-pill"
                  onClick={handleAutoFetchBill}
                  title="Simulate online bill lookup"
                >
                  <Sparkles size={14} />
                  <span>Fetch Bill</span>
                </button>
              </div>
              <span className="helper-text">
                Tip: Enter any mock account number and click "Fetch Bill" to simulate provider lookup.
              </span>
            </div>

            {/* Amount & Due Date */}
            <div className="form-row-2">
              <div className="form-group">
                <label className="input-label">Bill Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  className="input-control"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="e.g. 75.50"
                  required
                />
              </div>

              <div className="form-group">
                <label className="input-label">Due Date</label>
                <input
                  type="date"
                  className="input-control"
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Customer & Usage */}
            <div className="form-group">
              <label className="input-label">Usage / Plan Details (Optional)</label>
              <input
                type="text"
                className="input-control"
                value={unitsConsumed}
                onChange={e => setUnitsConsumed(e.target.value)}
                placeholder="e.g. 240 kWh units, Unlimited 200Mbps"
              />
            </div>

            {error && (
              <div className="error-alert">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 size={16} className="spin" />
                  <span>Adding Bill...</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>Add Bill</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Smartphone, Building, Check, Loader2, AlertCircle } from 'lucide-react';
import CategoryIcon from './CategoryIcon';

export default function PaymentModal({ bill, isOpen, onClose, onPaymentSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('alex@mockbank');
  const [selectedCard, setSelectedCard] = useState('card-1');
  const [selectedBank, setSelectedBank] = useState('Global Mock Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !bill) return null;

  const isOverdue = bill.status === 'overdue';
  const lateFee = isOverdue ? (bill.lateFee || 0) : 0;
  const totalAmount = bill.amount + lateFee;

  const handlePay = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    let paymentDetails = '';
    if (paymentMethod === 'UPI') {
      paymentDetails = `${upiId} (Mock UPI)`;
    } else if (paymentMethod === 'Credit Card') {
      paymentDetails = selectedCard === 'card-1' ? 'Mock Visa ending in 4242' : 'Mock Mastercard ending in 8812';
    } else {
      paymentDetails = `${selectedBank} (Mock NetBanking)`;
    }

    try {
      // Simulate realistic payment gateway processing delay
      await new Promise(resolve => setTimeout(resolve, 800));

      await onPaymentSuccess(bill.id, {
        paymentMethod,
        paymentDetails
      });
      // onClose will be triggered by parent after receipt shown
    } catch (err) {
      setError(err.message || 'Payment processing failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container payment-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <div className={`category-badge category-${bill.category} sm`}>
              <CategoryIcon category={bill.category} size={18} />
            </div>
            <div>
              <h2 className="modal-title">Pay Bill</h2>
              <span className="modal-subtitle">{bill.billerName}</span>
            </div>
          </div>
          <button className="btn-close" onClick={onClose} disabled={isProcessing}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handlePay}>
          <div className="modal-body">
            {/* Bill Summary Box */}
            <div className="payment-bill-summary">
              <div className="summary-line">
                <span className="text-muted">Account / Consumer ID</span>
                <span className="font-mono">{bill.consumerId}</span>
              </div>
              <div className="summary-line">
                <span className="text-muted">Base Bill Amount</span>
                <span>${bill.amount.toFixed(2)}</span>
              </div>
              {isOverdue && lateFee > 0 && (
                <div className="summary-line text-danger">
                  <span>Overdue Late Fee</span>
                  <span>+${lateFee.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-divider"></div>
              <div className="summary-line total-line">
                <span className="font-bold">Total Amount Payable</span>
                <span className="total-price font-bold">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="payment-methods-section">
              <label className="section-label">Select Payment Method (Mock)</label>
              <div className="payment-tabs">
                <button
                  type="button"
                  className={`payment-tab ${paymentMethod === 'UPI' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('UPI')}
                  disabled={isProcessing}
                >
                  <Smartphone size={18} />
                  <span>UPI</span>
                </button>

                <button
                  type="button"
                  className={`payment-tab ${paymentMethod === 'Credit Card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('Credit Card')}
                  disabled={isProcessing}
                >
                  <CreditCard size={18} />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  className={`payment-tab ${paymentMethod === 'Net Banking' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('Net Banking')}
                  disabled={isProcessing}
                >
                  <Building size={18} />
                  <span>Net Banking</span>
                </button>
              </div>

              {/* Method Specific Form */}
              <div className="method-details-card">
                {paymentMethod === 'UPI' && (
                  <div className="upi-box">
                    <label className="input-label">Mock UPI Virtual ID</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="input-control"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@mockbank"
                        required
                        disabled={isProcessing}
                      />
                      <span className="input-affix text-success">
                        <Check size={16} /> Verified
                      </span>
                    </div>
                    <p className="helper-text">
                      Instant one-tap mock UPI transfer. No PIN or real funds needed.
                    </p>
                  </div>
                )}

                {paymentMethod === 'Credit Card' && (
                  <div className="card-box">
                    <label className="input-label">Select Mock Card</label>
                    <div className="mock-card-list">
                      <label className={`mock-card-item ${selectedCard === 'card-1' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="mockCard"
                          checked={selectedCard === 'card-1'}
                          onChange={() => setSelectedCard('card-1')}
                          disabled={isProcessing}
                        />
                        <div className="card-info">
                          <span className="card-title">Mock Visa Platinum</span>
                          <span className="card-number">•••• •••• •••• 4242 (Exp 12/28)</span>
                        </div>
                      </label>

                      <label className={`mock-card-item ${selectedCard === 'card-2' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="mockCard"
                          checked={selectedCard === 'card-2'}
                          onChange={() => setSelectedCard('card-2')}
                          disabled={isProcessing}
                        />
                        <div className="card-info">
                          <span className="card-title">Mock Mastercard Rewards</span>
                          <span className="card-number">•••• •••• •••• 8812 (Exp 09/27)</span>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {paymentMethod === 'Net Banking' && (
                  <div className="netbank-box">
                    <label className="input-label">Select Mock Bank</label>
                    <select
                      className="input-control"
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      disabled={isProcessing}
                    >
                      <option value="Global Mock Bank">Global Mock Bank</option>
                      <option value="First City Mock Bank">First City Mock Bank</option>
                      <option value="Metro Mock Bank">Metro Mock Bank</option>
                      <option value="National Mock Reserve">National Mock Reserve</option>
                    </select>
                    <p className="helper-text">
                      Simulates instantaneous gateway authorization.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sandbox Notice */}
            <div className="sandbox-notice">
              <ShieldCheck size={18} className="text-primary" />
              <span>
                <strong>Sandbox Mock Mode:</strong> No real bank accounts, cards, or passwords are used. All transactions are simulated for testing.
              </span>
            </div>

            {error && (
              <div className="error-alert">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 size={16} className="spin" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <span>Pay ${totalAmount.toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

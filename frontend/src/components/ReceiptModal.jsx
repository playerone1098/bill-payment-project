import React from 'react';
import { X, CheckCircle2, Download, Printer, ShieldCheck } from 'lucide-react';
import CategoryIcon from './CategoryIcon';

export default function ReceiptModal({ receipt, isOpen, onClose }) {
  if (!isOpen || !receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container receipt-modal" onClick={e => e.stopPropagation()}>
        <div className="receipt-header-banner">
          <button className="btn-close-receipt" onClick={onClose}>
            <X size={18} />
          </button>
          <div className="receipt-success-badge">
            <CheckCircle2 size={44} className="text-white" />
          </div>
          <h2 className="receipt-title">Payment Successful!</h2>
          <p className="receipt-subtitle">Your bill has been settled and receipt generated.</p>
        </div>

        <div className="modal-body receipt-body">
          <div className="receipt-amount-card">
            <span className="receipt-amount-label">Amount Paid</span>
            <span className="receipt-amount-val">${Number(receipt.amount).toFixed(2)}</span>
            <span className="receipt-status-pill">Status: {receipt.status || 'SUCCESS'}</span>
          </div>

          <div className="receipt-details-list">
            <div className="receipt-row">
              <span className="r-label">Transaction Reference:</span>
              <span className="r-val font-mono">{receipt.id}</span>
            </div>
            <div className="receipt-row">
              <span className="r-label">Bill ID:</span>
              <span className="r-val font-mono">{receipt.billId}</span>
            </div>
            <div className="receipt-row">
              <span className="r-label">Biller Name:</span>
              <span className="r-val font-semibold">{receipt.billerName}</span>
            </div>
            <div className="receipt-row">
              <span className="r-label">Consumer / Account:</span>
              <span className="r-val font-mono">{receipt.consumerId}</span>
            </div>
            <div className="receipt-row">
              <span className="r-label">Customer Name:</span>
              <span className="r-val">{receipt.customerName || 'Alex Morgan'}</span>
            </div>
            <div className="receipt-row">
              <span className="r-label">Payment Mode:</span>
              <span className="r-val">{receipt.paymentMethod} ({receipt.paymentDetails || 'Mock Authorized'})</span>
            </div>
            <div className="receipt-row">
              <span className="r-label">Paid Timestamp:</span>
              <span className="r-val">{new Date(receipt.paidAt).toLocaleString()}</span>
            </div>
            {receipt.authCode && (
              <div className="receipt-row">
                <span className="r-label">Authorization Code:</span>
                <span className="r-val font-mono text-muted">{receipt.authCode}</span>
              </div>
            )}
          </div>

          <div className="receipt-watermark">
            <ShieldCheck size={16} />
            <span>Simulated Mock Receipt • Verified Digital Authorization</span>
          </div>
        </div>

        <div className="modal-footer receipt-footer">
          <button className="btn-secondary" onClick={handlePrint}>
            <Printer size={16} />
            <span>Print Receipt</span>
          </button>
          <button className="btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

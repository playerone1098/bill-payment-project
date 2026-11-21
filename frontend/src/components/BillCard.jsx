import React, { useState } from 'react';
import { Calendar, Hash, ChevronDown, ChevronUp, CheckCircle, AlertTriangle, Clock, Receipt, CreditCard } from 'lucide-react';
import CategoryIcon from './CategoryIcon';

export default function BillCard({ bill, onPayClick, onViewReceiptClick }) {
  const [expanded, setExpanded] = useState(false);

  // Status styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return (
          <span className="badge badge-paid">
            <CheckCircle size={13} /> Paid
          </span>
        );
      case 'overdue':
        return (
          <span className="badge badge-overdue">
            <AlertTriangle size={13} /> Overdue
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="badge badge-pending">
            <Clock size={13} /> Due Soon
          </span>
        );
    }
  };

  const isOverdue = bill.status === 'overdue';
  const isPaid = bill.status === 'paid';
  const totalPayable = isOverdue ? bill.amount + (bill.lateFee || 0) : bill.amount;

  return (
    <div className={`bill-card ${isOverdue ? 'border-overdue' : ''} ${isPaid ? 'card-paid' : ''}`}>
      <div className="bill-card-top">
        <div className="biller-info">
          <div className={`category-badge category-${bill.category}`}>
            <CategoryIcon category={bill.category} size={22} />
          </div>
          <div>
            <h3 className="biller-name">{bill.billerName}</h3>
            <div className="consumer-id">
              <Hash size={13} />
              <span>Acc: {bill.consumerId}</span>
            </div>
          </div>
        </div>
        <div className="bill-status">
          {getStatusBadge(bill.status)}
        </div>
      </div>

      <div className="bill-card-body">
        <div className="bill-due-row">
          <div className="due-date-meta">
            <Calendar size={14} className="text-muted" />
            <span>
              {isPaid ? (
                <>Paid on: <strong>{new Date(bill.paidAt || bill.billDate).toLocaleDateString()}</strong></>
              ) : (
                <>Due Date: <strong className={isOverdue ? 'text-danger' : ''}>{bill.dueDate}</strong></>
              )}
            </span>
          </div>

          <div className="bill-amount-box">
            <span className="amount-label">{isPaid ? 'Paid Amount' : 'Amount Due'}</span>
            <span className="amount-value">${totalPayable.toFixed(2)}</span>
            {isOverdue && bill.lateFee > 0 && (
              <span className="late-fee-note">+${bill.lateFee.toFixed(2)} late fee included</span>
            )}
          </div>
        </div>

        {/* Collapsible details */}
        {expanded && (
          <div className="bill-details-drawer">
            <div className="drawer-row">
              <span className="drawer-label">Bill ID:</span>
              <span className="drawer-value font-mono">{bill.id}</span>
            </div>
            <div className="drawer-row">
              <span className="drawer-label">Customer Name:</span>
              <span className="drawer-value">{bill.customerName}</span>
            </div>
            <div className="drawer-row">
              <span className="drawer-label">Billing Cycle:</span>
              <span className="drawer-value">{bill.billingPeriod || 'Monthly'}</span>
            </div>
            {bill.unitsConsumed && (
              <div className="drawer-row">
                <span className="drawer-label">Usage / Plan:</span>
                <span className="drawer-value">{bill.unitsConsumed}</span>
              </div>
            )}
            {bill.meterNumber && (
              <div className="drawer-row">
                <span className="drawer-label">Meter / Device:</span>
                <span className="drawer-value font-mono">{bill.meterNumber}</span>
              </div>
            )}
            {isPaid && bill.transactionRef && (
              <div className="drawer-row">
                <span className="drawer-label">Transaction Ref:</span>
                <span className="drawer-value font-mono text-success">{bill.transactionRef}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bill-card-actions">
        <button
          className="btn-text btn-details-toggle"
          onClick={() => setExpanded(!expanded)}
        >
          <span>{expanded ? 'Hide Details' : 'View Details'}</span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {isPaid ? (
          <button
            className="btn-outline-success btn-action"
            onClick={() => onViewReceiptClick(bill)}
          >
            <Receipt size={16} />
            <span>Receipt</span>
          </button>
        ) : (
          <button
            className={`btn-pay btn-action ${isOverdue ? 'btn-pay-urgent' : ''}`}
            onClick={() => onPayClick(bill)}
          >
            <CreditCard size={16} />
            <span>Pay ${totalPayable.toFixed(2)}</span>
          </button>
        )}
      </div>
    </div>
  );
}

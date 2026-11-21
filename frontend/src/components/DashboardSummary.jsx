import React from 'react';
import { AlertCircle, Clock, CheckCircle2, WalletCards, ArrowUpRight } from 'lucide-react';

export default function DashboardSummary({ summary, onFilterStatus, currentStatusFilter }) {
  if (!summary) return null;

  const { totals, counts } = summary;

  return (
    <div className="summary-grid">
      {/* Total Due */}
      <div
        className={`summary-card total-due ${currentStatusFilter === 'all' ? 'active-filter' : ''}`}
        onClick={() => onFilterStatus('all')}
        role="button"
        tabIndex={0}
      >
        <div className="summary-header">
          <span className="summary-label">Total Outstanding Due</span>
          <div className="summary-icon icon-blue">
            <WalletCards size={20} />
          </div>
        </div>
        <div className="summary-amount">${totals?.totalDueNow?.toFixed(2) || '0.00'}</div>
        <div className="summary-footer">
          <span>{counts?.pending + counts?.overdue || 0} active unpaid bills</span>
          <ArrowUpRight size={14} className="view-indicator" />
        </div>
      </div>

      {/* Overdue */}
      <div
        className={`summary-card overdue ${currentStatusFilter === 'overdue' ? 'active-filter' : ''}`}
        onClick={() => onFilterStatus('overdue')}
        role="button"
        tabIndex={0}
      >
        <div className="summary-header">
          <span className="summary-label">Overdue Bills</span>
          <div className="summary-icon icon-red">
            <AlertCircle size={20} />
          </div>
        </div>
        <div className="summary-amount text-danger">
          ${totals?.totalOverdueAmount?.toFixed(2) || '0.00'}
        </div>
        <div className="summary-footer">
          <span className="badge-danger">{counts?.overdue || 0} bills past due</span>
          <ArrowUpRight size={14} className="view-indicator" />
        </div>
      </div>

      {/* Pending / Due soon */}
      <div
        className={`summary-card pending ${currentStatusFilter === 'pending' ? 'active-filter' : ''}`}
        onClick={() => onFilterStatus('pending')}
        role="button"
        tabIndex={0}
      >
        <div className="summary-header">
          <span className="summary-label">Pending / Upcoming</span>
          <div className="summary-icon icon-amber">
            <Clock size={20} />
          </div>
        </div>
        <div className="summary-amount text-warning">
          ${totals?.totalPendingAmount?.toFixed(2) || '0.00'}
        </div>
        <div className="summary-footer">
          <span>{counts?.upcomingDue || 0} due within 7 days</span>
          <ArrowUpRight size={14} className="view-indicator" />
        </div>
      </div>

      {/* Paid */}
      <div
        className={`summary-card paid ${currentStatusFilter === 'paid' ? 'active-filter' : ''}`}
        onClick={() => onFilterStatus('paid')}
        role="button"
        tabIndex={0}
      >
        <div className="summary-header">
          <span className="summary-label">Total Settled / Paid</span>
          <div className="summary-icon icon-green">
            <CheckCircle2 size={20} />
          </div>
        </div>
        <div className="summary-amount text-success">
          ${totals?.totalPaidAmount?.toFixed(2) || '0.00'}
        </div>
        <div className="summary-footer">
          <span className="badge-success">{counts?.paid || 0} bills paid</span>
          <ArrowUpRight size={14} className="view-indicator" />
        </div>
      </div>
    </div>
  );
}

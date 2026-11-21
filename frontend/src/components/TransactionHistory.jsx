import React, { useState } from 'react';
import { Search, Receipt, CheckCircle2 } from 'lucide-react';
import CategoryIcon from './CategoryIcon';

export default function TransactionHistory({ transactions, onSelectReceipt }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = transactions.filter(t => {
    const q = searchTerm.toLowerCase().trim();
    return !q ||
      t.id.toLowerCase().includes(q) ||
      t.billerName.toLowerCase().includes(q) ||
      t.consumerId.toLowerCase().includes(q) ||
      t.paymentMethod.toLowerCase().includes(q);
  });

  return (
    <div className="history-container">
      <div className="section-header-row">
        <div>
          <h2 className="section-title">Payment History & Receipts</h2>
          <p className="section-subtitle">View all past settled bills and verified digital receipts.</p>
        </div>

        <div className="history-search-bar">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by Txn ID, Biller, Account..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <Receipt size={48} className="empty-icon" />
          <h3 className="empty-title">No transactions found</h3>
          <p className="empty-text">No payment records match your current filter criteria.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="history-table">
            <thead>
              <tr>
                <th>Transaction Ref</th>
                <th>Biller & Category</th>
                <th>Consumer ID</th>
                <th>Payment Mode</th>
                <th>Paid Date & Time</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(txn => (
                <tr key={txn.id}>
                  <td>
                    <span className="txn-ref-badge">{txn.id}</span>
                  </td>
                  <td>
                    <div className="table-biller-cell">
                      <div className={`category-badge category-${txn.category} sm`}>
                        <CategoryIcon category={txn.category} size={15} />
                      </div>
                      <span className="font-medium">{txn.billerName}</span>
                    </div>
                  </td>
                  <td className="font-mono text-muted">{txn.consumerId}</td>
                  <td>
                    <span className="pay-method-tag">{txn.paymentMethod}</span>
                  </td>
                  <td className="text-muted text-sm">
                    {new Date(txn.paidAt).toLocaleDateString()} {new Date(txn.paidAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td>
                    <span className="font-bold text-success">${Number(txn.amount).toFixed(2)}</span>
                  </td>
                  <td>
                    <span className="badge-status-success">
                      <CheckCircle2 size={12} /> {txn.status || 'SUCCESS'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-sm btn-outline"
                      onClick={() => onSelectReceipt(txn)}
                    >
                      <Receipt size={14} />
                      <span>Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

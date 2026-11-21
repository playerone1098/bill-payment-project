import React from 'react';
import { CreditCard, RotateCcw, User, ShieldCheck, History, LayoutDashboard, PlusCircle } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onResetData, isResetting, onOpenAddBill }) {
  return (
    <header className="navbar">
      <div className="container nav-content">
        <div className="nav-brand" onClick={() => setActiveTab('bills')} role="button" tabIndex={0}>
          <div className="brand-icon">
            <CreditCard size={22} className="brand-svg" />
          </div>
          <div>
            <div className="brand-title">PayFlow <span className="brand-badge">Mock</span></div>
            <div className="brand-subtitle">Smart Bill Payment Portal</div>
          </div>
        </div>

        <nav className="nav-links">
          <button
            className={`nav-btn ${activeTab === 'bills' ? 'active' : ''}`}
            onClick={() => setActiveTab('bills')}
          >
            <LayoutDashboard size={17} />
            <span>Dashboard & Bills</span>
          </button>

          <button
            className={`nav-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <History size={17} />
            <span>Payment History</span>
          </button>

          <button
            className="nav-btn primary-action-btn"
            onClick={onOpenAddBill}
          >
            <PlusCircle size={17} />
            <span>Add / Fetch Bill</span>
          </button>
        </nav>

        <div className="nav-actions">
          <button
            className="btn-secondary btn-sm"
            onClick={onResetData}
            disabled={isResetting}
            title="Reset mock data to initial demo state"
          >
            <RotateCcw size={14} className={isResetting ? 'spin' : ''} />
            <span>{isResetting ? 'Resetting...' : 'Reset Mock Data'}</span>
          </button>

          <div className="user-badge" title="Demo User: Alex Morgan (Mock Data Only)">
            <div className="avatar">
              <User size={15} />
            </div>
            <div className="user-meta">
              <span className="user-name">Alex Morgan</span>
              <span className="user-mode"><ShieldCheck size={11} /> Sandbox</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

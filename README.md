# PayFlow - Smart Bill Payment Portal (Offline Mock)

A fast, responsive, and completely self-contained Bill Payment Web Application built with **React 19** and a **Node.js Express** mock API backend.

> [!NOTE]
> **100% Offline-Ready**: This repository is designed to run entirely offline with zero remote service dependencies. It uses self-contained system fonts, bundled SVG icons, local mock data stores, and a unified Express server that can serve both the REST API and the production frontend build from a single process.

---

## 🚀 Features

- **100% Offline & Local**:
  - No internet connection required to run, develop, or build.
  - Zero external CDN links, Google Fonts, or remote analytics scripts.
  - Built-in system font fallbacks and local Lucide SVG icons.
  - In-memory mock data store with pre-populated bills and transaction history.
- **Unified Full-Stack Server**:
  - Express backend serves both API endpoints (`/api/*`) and the compiled production frontend (`frontend/dist`) on a single port (`5000`).
- **Dashboard & Analytics**:
  - High-level metric cards for Total Outstanding, Overdue amounts, Pending amounts, and Settled amounts.
  - Filter bills by category (Electricity, Water, Broadband, Mobile, Gas, DTH) and status (Pending, Overdue, Paid).
  - Real-time search by provider name, consumer account number, or bill ID.
- **Interactive Payment Simulation**:
  - Multi-method sandbox payment gateway: Mock UPI, Mock Credit/Debit Cards, and Mock NetBanking.
  - Automatic calculation of late fees for overdue bills.
  - Generates instant verified digital payment receipts with transaction references and authorization codes.
  - Printable receipt modal with print-optimized CSS layout.
- **Add / Fetch Bills**:
  - Register new utility bills manually or simulate automatic provider lookup using the "Fetch Bill" feature.
- **Reset Mock Data**:
  - One-click reset to restore the original demo state anytime.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Lucide React (vector icons), Vanilla Modern CSS
- **Backend**: Node.js (ES Modules), Express 4, CORS
- **Storage**: In-memory mock state with reset capability

---

## 📦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`

### Installation

Install dependencies for both backend and frontend from the root directory:

```bash
npm run install:all
```

---

## 🏃 Running the Application

### Option 1: Single-Process Offline Mode (Recommended)

Build the frontend and run everything through the Express server on port 5000:

```bash
# 1. Build the frontend production bundle
npm run build

# 2. Start the unified offline server
npm start
```

Open your browser and navigate to:
```
http://localhost:5000
```

### Option 2: Development Mode (with Hot Module Replacement)

Run the backend and frontend development servers concurrently:

**Terminal 1 (Backend API on port 5000):**
```bash
npm run backend
```

**Terminal 2 (Vite Frontend on port 5173):**
```bash
npm run frontend
```

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 📡 API Endpoints (Local)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check and uptime status |
| `GET` | `/api/summary` | Analytics metrics and dashboard summary |
| `GET` | `/api/categories` | List supported utility categories and billers |
| `GET` | `/api/bills` | List bills (supports `status`, `category`, `search` query params) |
| `GET` | `/api/bills/:id` | Get bill details by ID |
| `POST` | `/api/bills` | Create a new bill |
| `POST` | `/api/bills/:id/pay` | Pay a bill and generate a transaction receipt |
| `GET` | `/api/transactions` | List all payment transaction receipts |
| `GET` | `/api/transactions/:id` | Get a specific transaction receipt |
| `POST` | `/api/reset` | Reset mock database to default test values |

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

# 💸 Expense Tracker

A clean, dark-themed expense tracker built with **React** and **Tailwind CSS**.
Track your spending, filter by date and category, and visualize your data with interactive charts.

---

## ✨ Features

- ➕ **Add, edit, and delete expenses** with description, amount, date, and category
- 🏷️ **Custom categories** — create your own categories on the fly (no code changes needed)
- 🔍 **Filters** — filter expenses by date range and category
- 📊 **Charts** — pie chart for spending by category and bar chart for spending over time
- 💾 **Persistent storage** — expenses and categories are saved in `localStorage`

- ⚡ **Notifications** — instant feedback for create, update, and delete actions

---

## 🛠️ Tech Stack

| Technology                         | Purpose                 |
| ---------------------------------- | ----------------------- |
| **React**                          | UI & state management   |
| **Tailwind CSS**                   | Styling                 |
| **Chart.js** + **react-chartjs-2** | Data visualization      |
| **Vite**                           | Dev server & build tool |
| **localStorage**                   | Client-side persistence |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd expense-tracker

# Install dependencies
npm install

# Start the dev server
npm run dev

```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Top navigation bar
│   ├── Filters.jsx         # Date & category filters
│   ├── ExpenseForm.jsx     # Add expense + custom category
│   ├── ExpensesTable.jsx   # Expense list with edit/delete
│   └── ChartsSection.jsx   # Pie & bar charts
├── data/
│   └── dummyData.js        # Initial sample expenses
├── App.jsx                 # Main app logic & state
└── main.jsx                # React entry point
```

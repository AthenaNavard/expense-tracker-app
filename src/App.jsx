import { useState, useEffect } from "react";

import { expenses as initialExpenses } from "./data/dummyData";

import Header from "./components/Header";

import ExpenseForm from "./components/ExpenseForm";

import Filters from "./components/Filters";

import ExpensesTable from "./components/ExpensesTable";

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import ChartsSection from "./components/ChartsSection";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

const CHART_COLORS = [
  "#f9a8d4", // pink-300
  "#c4b5fd", // violet-300
  "#93c5fd", // blue-300
  "#fbcfe8", // pink-200
  "#ddd6fe", // violet-200
  "#bfdbfe", // blue-200
  "#f5d0fe", // fuchsia-200
  "#e9d5ff", // purple-200
  "#dbeafe", // blue-100
];

const DEFAULT_CATEGORIES = ["Bills", "Food", "Fun"];
let idCounter = 0;

function generateId() {
  idCounter += 1;
  return `${Date.now()}-${idCounter}`;
}
function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");

    return savedExpenses ? JSON.parse(savedExpenses) : initialExpenses;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("categories");

    if (saved) return JSON.parse(saved);

    const fromExpenses = Array.from(
      new Set(initialExpenses.map((e) => e.category)),
    );

    return fromExpenses.length ? fromExpenses : DEFAULT_CATEGORIES;
  });

  const [editingExpense, setEditingExpense] = useState(null);

  const [notification, setNotification] = useState("");

  const showNotification = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 2500);
  };

  const [filters, setFilters] = useState({
    category: "",
    start: "",
    end: "",
  });

  const [form, setForm] = useState({
    description: "",
    amount: "",
    date: "",
    category: "",
  });

  const [editForm, setEditForm] = useState({
    description: "",
    amount: "",
    date: "",
    category: "",
  });

  // ذخیره expenses
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // ذخیره categories
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  //  اضافه کردن دسته‌بندی جدید
  const handleAddCategory = (name) => {
    const trimmed = name.trim();

    if (!trimmed) return null;

    // اگر قبلاً وجود داشت، همون رو برگردون (بدون تکرار)
    const existing = categories.find(
      (c) => c.toLowerCase() === trimmed.toLowerCase(),
    );

    if (existing) return existing;

    setCategories((prev) => [...prev, trimmed]);

    return trimmed;
  };

  const handleOpenEdit = (expense) => {
    setEditingExpense(expense);

    setEditForm({
      description: expense.description,
      amount: String(expense.amount),
      date: expense.date,
      category: expense.category,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateExpense = (e) => {
    e.preventDefault();

    showNotification("Expense Updated");

    setExpenses((prev) =>
      prev.map((expense) => {
        if (expense.id === editingExpense.id) {
          return {
            ...expense,
            description: editForm.description,
            amount: parseFloat(editForm.amount),
            date: editForm.date,
            category: editForm.category,
          };
        }

        return expense;
      }),
    );

    setEditingExpense(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.description ||
      !form.amount ||
      !form.date ||
      !effectiveFormCategory
    ) {
      return;
    }

    const newExpense = {
      id: generateId(),
      description: form.description,
      amount: parseFloat(form.amount),
      date: form.date,
      category: effectiveFormCategory,
    };

    setExpenses((prev) => [newExpense, ...prev]);

    showNotification(`Expense CREATED`);

    setForm({
      description: "",
      amount: "",
      date: "",
      category: "",
    });
  };

  const handeDelete = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));

    showNotification(`Expense #${id} Deleted`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredExpenses = expenses.filter((expense) => {
    if (filters.category && expense.category !== filters.category) {
      return false;
    }

    if (filters.start && expense.date < filters.start) {
      return false;
    }

    if (filters.end && expense.date > filters.end) {
      return false;
    }

    return true;
  });

  const handleResetFilters = () =>
    setFilters({
      category: "",
      start: "",
      end: "",
    });

  const total = filteredExpenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  const handleCloseEdit = () => {
    setEditingExpense(null);

    setEditForm({
      description: "",
      amount: "",
      date: "",
      category: "",
    });
  };

  const categoryTotals = filteredExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;

    return acc;
  }, {});

  const categoryChartData = {
    labels: Object.keys(categoryTotals),

    datasets: [
      {
        data: Object.values(categoryTotals),
        //  رنگ‌ها به صورت چرخشی انتخاب می‌شوند
        backgroundColor: Object.keys(categoryTotals).map(
          (_, i) => CHART_COLORS[i % CHART_COLORS.length],
        ),
        borderColor: "#0f172a",
        borderWidth: 2,
      },
    ],
  };

  const dateTotals = filteredExpenses.reduce((acc, expense) => {
    acc[expense.date] = (acc[expense.date] || 0) + expense.amount;

    return acc;
  }, {});

  const dateChartData = {
    labels: Object.keys(dateTotals),

    datasets: [
      {
        label: "Expenses",
        data: Object.values(dateTotals),
        backgroundColor: "#a5b4fc", // indigo-300
        borderColor: "#c4b5fd", // violet-300
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#B0CAD6",
        },
      },
    },

    scales: {
      x: {
        ticks: { color: "#B0CAD6" },
        grid: {
          color: "#435C69",
        },
      },

      y: {
        ticks: { color: "#B0CAD6" },
        grid: {
          color: "#435C69",
        },
      },
    },
  };

  //  مقدار پیش‌فرض category در فرم (وقتی categories لود شد)
  //  محاسبه مقدار مؤثر دسته‌بندی در حین رندر
  const effectiveFormCategory = form.category || categories[0] || "";
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {notification && (
        <div className="fixed top-4 right-4 z-50 rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 shadow-lg">
          <h1>{notification}</h1>
        </div>
      )}

      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
        <p className="text-slate-400 mb-6">
          Track spending, filter expenses, and visualize your data.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Filters
            filters={filters}
            categories={categories}
            handleFilterChange={handleFilterChange}
            handleResetFilters={handleResetFilters}
          />

          <ExpenseForm
            form={form}
            categories={categories}
            effectiveCategory={effectiveFormCategory}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleAddCategory={handleAddCategory}
          />
        </div>

        <div className="mt-6 mb-3">
          <span className="text-sm text-slate-300 mr-2">Total:</span>

          <span className="inline-block rounded-xl border border-slate-700 bg-slate-800 px-3 py-1 font-semibold">
            ${total.toFixed(2)}
          </span>
        </div>

        <ExpensesTable
          filteredExpenses={filteredExpenses}
          handleOpenEdit={handleOpenEdit}
          handleDelete={handeDelete}
        />

        <ChartsSection
          categoryChartData={categoryChartData}
          dateChartData={dateChartData}
          chartOptions={chartOptions}
        />
      </main>

      {/* Edit MODAL */}
      {editingExpense && (
        <div
          onClick={handleCloseEdit}
          className="fixed inset-0 bg-black/50 flex items-center justify-center px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-5"
          >
            <h2 className="text-xl font-semibold mb-4">Edit Expense</h2>

            <form onSubmit={handleUpdateExpense} className="space-y-3">
              <label className="block text-sm">
                <span className="block mb-1 text-slate-300">Description</span>

                <input
                  type="text"
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm">
                  <span className="block mb-1 text-slate-300">Amount</span>

                  <input
                    type="number"
                    name="amount"
                    value={editForm.amount}
                    onChange={handleEditChange}
                    className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2"
                  />
                </label>

                <label className="block text-sm">
                  <span className="block mb-1 text-slate-300">Date</span>

                  <input
                    type="date"
                    name="date"
                    value={editForm.date}
                    onChange={handleEditChange}
                    className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2"
                  />
                </label>
              </div>

              <label className="block text-sm">
                <span className="block mb-1 text-slate-300">Category</span>

                {/*  لیست دسته‌بندی‌ها از state */}
                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                  className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCloseEdit}
                  className="mt-4 rounded-xl bg-slate-800 px-4 py-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="mt-4 rounded-xl bg-slate-800 px-4 py-2"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

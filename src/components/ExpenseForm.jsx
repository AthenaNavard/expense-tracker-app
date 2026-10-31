import { useState } from "react";

function ExpenseForm({
  form,
  categories,
  effectiveCategory,
  handleChange,
  handleSubmit,
  handleAddCategory,
}) {
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategory, setShowNewCategory] = useState(false);

  const handleAddNew = () => {
    const added = handleAddCategory(newCategory);

    if (added) {
      handleChange({ target: { name: "category", value: added } });
      setNewCategory("");
      setShowNewCategory(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <h2 className="text-lg font-semibold mb-4">Add Expense</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block text-sm">
          <span className="block mb-1 text-slate-300">Description</span>

          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="e.g. Netflix"
            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm">
            <span className="block mb-1 text-slate-300">Amount</span>

            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="25.00"
              className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2"
            />
          </label>

          <label className="block text-sm">
            <span className="block mb-1 text-slate-300">Date</span>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2"
            />
          </label>
        </div>

        <div className="block text-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-slate-300">Category</span>

            <button
              type="button"
              onClick={() => setShowNewCategory((v) => !v)}
              className="text-xs text-sky-300 hover:text-sky-200"
            >
              {showNewCategory ? "× Cancel" : "+ New category"}
            </button>
          </div>

          {/* ✅ value از effectiveCategory می‌آید */}
          <select
            name="category"
            value={effectiveCategory}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {showNewCategory && (
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category name"
                className="flex-1 rounded-xl bg-slate-800 border border-slate-700 px-3 py-2"
              />
              <button
                type="button"
                onClick={handleAddNew}
                className="rounded-xl bg-violet-400 hover:bg-violet-300 text-slate-900 font-medium px-3 py-2"
              >
                Add
              </button>
            </div>
          )}
        </div>

        <button className="w-full rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-900 font-medium px-4 py-2">
          Add Expense
        </button>
      </form>
    </section>
  );
}

export default ExpenseForm;

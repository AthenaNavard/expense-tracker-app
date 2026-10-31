function Filters({
  filters,
  categories,
  handleFilterChange,
  handleResetFilters,
}) {
  return (
    <section className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
        <label className="text-sm">
          <span className="block mb-1 text-slate-300">Start</span>

          <input
            type="date"
            name="start"
            value={filters.start}
            onChange={handleFilterChange}
            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2"
          />
        </label>

        <label className="text-sm">
          <span className="block mb-1 text-slate-300">End</span>

          <input
            name="end"
            value={filters.end}
            onChange={handleFilterChange}
            type="date"
            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2"
          />
        </label>

        {/* CATEGORY - از categories داینامیک */}
        <label className="text-sm md:col-span-2">
          <span className="block mb-1 text-slate-300">Category</span>

          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2"
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <button
          onClick={handleResetFilters}
          className="rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2"
        >
          Reset
        </button>
      </div>
    </section>
  );
}

export default Filters;

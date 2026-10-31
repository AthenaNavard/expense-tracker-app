import { Pie, Bar } from "react-chartjs-2";

function ChartsSection({ categoryChartData, dateChartData, chartOptions }) {
  return (
    <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <h3 className="font-semibold mb-3">Spending by Category</h3>

        <div className="h-64 rounded-xl bg-slate-800 p-2">
          <Pie
            data={categoryChartData}
            options={{
              maintainAspectRatio: false,
              plugins: { legend: { labels: { color: "#B0CAD6" } } },
            }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <h3 className="font-semibold mb-3">Spending Over Time</h3>

        <div className="h-64 rounded-xl bg-slate-800 p-2">
          <Bar data={dateChartData} options={chartOptions} />
        </div>
      </div>
    </section>
  );
}

export default ChartsSection;

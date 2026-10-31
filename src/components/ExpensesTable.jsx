function ExpensesTable({ filteredExpenses, handleOpenEdit, handleDelete }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-800">
        <h2 className="text-lg font-semibold">Expenses</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          {/* TABLE HEADER */}
          <thead className="bg-slate-800/50 text-slate-300">
            <tr>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Description</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-right px-4 py-3">Amount</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <tr key={expense.id} className="border-t border-slate-800">
                  <td className="px-4 py-3">{expense.date}</td>
                  <td className="px-4 py-3">{expense.description}</td>
                  <td className="px-4 py-3">{expense.category}</td>
                  <td className="px-4 py-3 text-right">
                    ${expense.amount.toFixed(2)}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleOpenEdit(expense)}
                      className="text-sky-300 border border-sky-400/30 px-3 py-1 rounded-lg text-xs mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this expense?')) {
                          handleDelete(expense.id)
                        }
                      }}
                      className="text-rose-300 border border-rose-400/30 px-3 py-1 rounded-lg text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-6 text-center text-slate-400"
                >
                  No expenses
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ExpensesTable

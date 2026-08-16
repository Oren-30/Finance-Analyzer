import { useState } from "react";

function TransactionForm({ onTransactionAdded }) {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "expense",
    category: "",
    date: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onTransactionAdded({
      ...form,
      amount: Number(form.amount),
    });

    setForm({
      description: "",
      amount: "",
      type: "expense",
      category: "",
      date: "",
    });
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h4 className="mb-3">Add Transaction</h4>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <input
                type="text"
                name="description"
                className="form-control"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-2 mb-3">
              <input
                type="number"
                name="amount"
                className="form-control"
                placeholder="Amount"
                value={form.amount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-2 mb-3">
              <select
                name="type"
                className="form-select"
                value={form.type}
                onChange={handleChange}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div className="col-md-2 mb-3">
              <input
                type="text"
                name="category"
                className="form-control"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-2 mb-3">
              <input
                type="date"
                name="date"
                className="form-control"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;
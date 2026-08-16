function Dashboard({ transactions, prediction }) {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <>
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="text-muted">Total Income</h6>
              <h3>KES {totalIncome.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="text-muted">Total Expenses</h6>
              <h3>KES {totalExpenses.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="text-muted">Balance</h6>
              <h3>KES {balance.toLocaleString()}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h4>Expense Prediction</h4>

          {prediction?.predicted_expenses !== undefined ? (
            <p>
              Predicted next month expenses:{" "}
              <strong>
                KES {prediction.predicted_expenses.toLocaleString()}
              </strong>
            </p>
          ) : (
            <p className="text-muted">
              Add expense data from at least two months to generate a
              prediction.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
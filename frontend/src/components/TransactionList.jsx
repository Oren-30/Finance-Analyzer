function TransactionList({ transactions, onDelete }) {
  return (
    <div className="card">
      <div className="card-body">
        <h4>Transactions</h4>

        {transactions.length === 0 ? (
          <p className="text-muted">No transactions yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.description}</td>
                    <td>
                      KES {transaction.amount.toLocaleString()}
                    </td>
                    <td>{transaction.type}</td>
                    <td>{transaction.category}</td>
                    <td>{transaction.date}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(transaction.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionList;
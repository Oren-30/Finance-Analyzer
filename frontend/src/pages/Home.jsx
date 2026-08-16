function Home() {
  return (
    <div className="container py-5">
      <div className="text-center">
        <h1 className="display-4 fw-bold">
          Personal Finance Analyzer
        </h1>

        <p className="lead text-muted mt-3">
          Track your income, expenses, and understand your
          financial habits with simple data analysis.
        </p>

        <div className="mt-4">
          <a href="/dashboard" className="btn btn-primary btn-lg">
            View Dashboard
          </a>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <h4>Track Expenses</h4>
              <p className="text-muted">
                Record your income and expenses in one place.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <h4>Analyze Spending</h4>
              <p className="text-muted">
                Understand where your money is going using
                simple data analysis.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <h4>Predict Expenses</h4>
              <p className="text-muted">
                Use linear regression to estimate your next
                month's expenses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
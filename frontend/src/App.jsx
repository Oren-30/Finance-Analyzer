import { useEffect, useState } from "react";

import api from "./services/api";
import Dashboard from "./components/Dashboard";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Home from "./pages/Home";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [error, setError] = useState("");

  const getTransactions = async () => {
    try {
      const response = await api.get("/transactions");

      setTransactions(response.data);
      setError("");
    } catch (error) {
      console.error("Error loading transactions:", error);
      setError("Could not connect to the Flask backend.");
    }
  };

  const getPrediction = async () => {
    try {
      const response = await api.get("/prediction");

      setPrediction(response.data);
    } catch (error) {
      console.error("Error loading prediction:", error);
      setPrediction(null);
    }
  };

  useEffect(() => {
    getTransactions();
    getPrediction();
  }, []);

  const addTransaction = async (transaction) => {
    try {
      await api.post("/transactions", transaction);

      await getTransactions();
      await getPrediction();

      setError("");
    } catch (error) {
      console.error("Error adding transaction:", error);
      setError("Could not add transaction.");
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);

      await getTransactions();
      await getPrediction();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      setError("Could not delete transaction.");
    }
  };

  if (!showDashboard) {
    return (
      <>
        <Home />

        <div className="text-center pb-5">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => setShowDashboard(true)}
          >
            Open Dashboard
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1>Personal Finance Analyzer</h1>

        <button
          className="btn btn-outline-secondary"
          onClick={() => setShowDashboard(false)}
        >
          Home
        </button>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <Dashboard
        transactions={transactions}
        prediction={prediction}
      />

      <TransactionForm
        onTransactionAdded={addTransaction}
      />

      <TransactionList
        transactions={transactions}
        onDelete={deleteTransaction}
      />
    </div>
  );
}

export default App;
import pandas as pd
from sklearn.linear_model import LinearRegression


def predict_next_month(transactions):
    if len(transactions) < 2:
        return {
            "error": "At least 2 months of data are required"
        }

    df = pd.DataFrame(transactions)

    # Only use expenses
    df = df[df["type"] == "expense"].copy()

    if df.empty:
        return {
            "error": "No expense data available"
        }

    # Convert date to datetime
    df["date"] = pd.to_datetime(df["date"])

    # Get monthly expenses
    df["month"] = df["date"].dt.to_period("M")

    monthly = (
        df.groupby("month")["amount"]
        .sum()
        .reset_index()
    )

    # Month numbers: 1, 2, 3, ...
    monthly["month_number"] = range(1, len(monthly) + 1)

    X = monthly[["month_number"]]
    y = monthly["amount"]

    # Create and train model
    model = LinearRegression()
    model.fit(X, y)

    # Predict next month
    next_month = [[len(monthly) + 1]]

    prediction = model.predict(next_month)[0]

    return {
        "months_used": len(monthly),
        "predicted_expenses": round(float(prediction), 2)
    }
from flask import Flask, request, jsonify
from flask_cors import CORS

from models import db, Transaction
from analytics import predict_next_month


app = Flask(__name__)

# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///finance.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize extensions
db.init_app(app)
CORS(app)


# Create database tables
with app.app_context():
    db.create_all()


# Home route
@app.route("/")
def home():
    return jsonify({
        "message": "Finance Analyzer API is running"
    })


# Get all transactions
@app.route("/api/transactions", methods=["GET"])
def get_transactions():
    transactions = Transaction.query.all()

    return jsonify([
        transaction.to_dict()
        for transaction in transactions
    ])


# Create a transaction
@app.route("/api/transactions", methods=["POST"])
def create_transaction():
    data = request.get_json()

    transaction = Transaction(
        description=data["description"],
        amount=float(data["amount"]),
        transaction_type=data["type"],
        category=data["category"],
        date=data["date"]
    )

    db.session.add(transaction)
    db.session.commit()

    return jsonify(transaction.to_dict()), 201


# Delete a transaction
@app.route("/api/transactions/<int:id>", methods=["DELETE"])
def delete_transaction(id):
    transaction = Transaction.query.get_or_404(id)

    db.session.delete(transaction)
    db.session.commit()

    return jsonify({
        "message": "Transaction deleted"
    })


# Predict next month's expenses
@app.route("/api/prediction", methods=["GET"])
def prediction():
    transactions = Transaction.query.all()

    data = [
        transaction.to_dict()
        for transaction in transactions
    ]

    result = predict_next_month(data)

    return jsonify(result)


# Run Flask
if __name__ == "__main__":
    app.run(debug=True, port=5000)
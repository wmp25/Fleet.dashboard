from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/vehicles")
def vehicles():
    data = [
        {"id": 1, "equipment_id": "ABC123", "category": "Truck", "location": "Nairobi",
         "brand": "Hino", "model": "300", "current_mileage": 12345,
         "service_status": "OK", "operational_status": "Working",
         "next_service_date": "2025-07-01"}
    ]
    return jsonify(data)

if __name__ == "__main__":
    app.run()
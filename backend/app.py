from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def get_vehicles():
    conn = sqlite3.connect('vehicles.db')
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute("SELECT * FROM vehicles")
    rows = [dict(ix) for ix in cur.fetchall()]
    conn.close()
    return rows

@app.route("/vehicles")
def vehicles():
    data = get_vehicles()
    return jsonify(data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
import time
from datetime import datetime
from flask import Flask, Response, json, request, jsonify
from flask_cors import CORS
import psycopg2
from dotenv import load_dotenv
import os
import random

load_dotenv()
app= Flask(__name__)
CORS(app, resources={r"/stream": {"origins": "*"}})
data = None
conn = psycopg2.connect(database=os.getenv('DB'),user=os.getenv('DB_user'),password=os.getenv('DB_password'),host=os.getenv('DB_host'), port=os.getenv('DB_port'))
cursor = conn.cursor()
cursor.execute('''
CREATE TABLE IF NOT EXISTS sensor_data (sno SERIAL PRIMARY KEY , date DATE NOT NULL,time TIME NOT NULL, value INT NOT NULL)
               ''')
conn.commit()

@app.route('/data', methods=['POST'])
def receive():
    global data
    value = request.form.get('value')
    data = value
    print("---- DATA RECEIVED ----")
    print(f"Sensor Value: {value}")
    print("-----------------------")
    now = datetime.now()
    cursor.execute("""
        INSERT INTO sensor_data (date, time, value)
        VALUES (%s, %s, %s)
    """, (now.date(), now.time(), value))

    conn.commit()
    return jsonify({
        'Status': "Success",
        "message":"Data logged successfully"
    })

def upload():
    global data
    while True:
        if data is None:
            time.sleep(0.5)
            continue
        curr_data  = data
        data = None
        raw =(((4095-int(curr_data))/(4095-1200))*100)
        percent = max(0,min(100,raw))
        send= json.dumps(round(percent))
        print(f"[SENSOR DATA] Raw Data: {curr_data} | Final Percent: {round(percent)}% | Sending String: '{send}'")
        yield f"data: {send}\n\n"      
        time.sleep(2)

# def upload():
#     while True:
#         num = random.randint(1,100)
#         yield f"data: {num}\n\n"
#         time.sleep(2)

@app.route('/stream')
def stream():
    return Response(upload(),mimetype="text/event-stream")

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5000,debug=True,threaded=True)


from flask import request, Response
from flask_cors import CORS
from flask_api import FlaskAPI
import json
import pandas as pd
import psycopg2
import re

app = FlaskAPI(__name__)

CORS(app)

@app.route('/insert', methods=['GET'])
def insert():
    
    data = request.args.get('data')
    rows= re.findall(r"\w+\s+\w+\s+\d+\s+\w+\s+\w+",data)

    conn = psycopg2.connect("host=127.0.0.1 dbname=project\
                            user=josemanuel")
    conn.set_session(autocommit=True)
    cur = conn.cursor()

    cur.execute("DROP TABLE IF EXISTS purchases")

    table_create = ("""
    CREATE TABLE IF NOT EXISTS purchases (
        purchase_id serial PRIMARY KEY,
        name varchar,
        item_description varchar,
        count integer,
        merchant_address varchar,
        merchant_name varchar
    )
    """)
    cur.execute(table_create)
    
    table_insert = ("""
    INSERT INTO purchases (name, item_description, count, merchant_address, merchant_name)
    VALUES (%s, %s, %s, %s, %s)
    """)

    for row in rows:
        cols = row.split('\t')
        cur.execute(table_insert, (cols[0], cols[1], cols[2], cols[3], cols[4]))
    
    conn.close()

    return Response(json.dumps(data),  mimetype='application/json')


@app.route('/read', methods=['GET'])
def read():

    conn = psycopg2.connect("host=127.0.0.1 dbname=project\
                            user=josemanuel")
    conn.set_session(autocommit=True)

    df = pd.read_sql_query('SELECT * FROM purchases',con=conn)
    conn.close()

    result = df.to_json(orient="records")
    parsed = json.loads(result)
    
    return Response(json.dumps(parsed),  mimetype='application/json')

if __name__=="__main__":
    app.run(debug=True)
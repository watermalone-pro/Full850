from flask import Flask, request, jsonify # import the modules needed for flask app
from flask_cors import CORS #CORS is needed to ensure that backend server allows 
#to receive data from another domain
import mysql.connector

app = Flask(__name__) # create a flask app
CORS(app, supports_credentials=True) 

connection = mysql.connector.connect(
    host = '127.0.0.1',
    user = 'root',
    password = 'K@C12345',
    database = 'testDB'
)

cursor = connection.cursor()


def query(query, data):
    cursor.execute(query, data)
    connection.commit()
        

@app.route('/load', methods=['POST'])
def load_data():
    data = request.get_json()
    returnRows = {}
    count = 0
    cursor.execute('SELECT * FROM test')
    print(data['postData']['User'])
    rows = cursor.fetchall()
    for row in rows:
        if(row[0] == data['postData']['User']):
            print(row[4])
            returnRows[count] = row
            count += 1
    return jsonify(returnRows)




@app.route('/data', methods=['POST']) #create an end point with /data 
def receive_data():
    data = request.get_json() #load the json data
    print("Received data", data)
    print("data input", data['typeOf'])
    query("""INSERT INTO test(Username, Password, tableName, typeOf, dateOfPurchase, Amount, id)
          VALUES(%s, %s, %s, %s, %s, %s, %s)""",
          (data['username'], data['password'], data['table'], data['typeOf'], data['dateOf'], float(data['amountOf']), int(data['indexOf']))
          )
    query("""UPDATE test SET idTracker = %s WHERE Username = %s""", (data['totalIndex'], data['username']))
    return jsonify({'messsage': 'data received'}, 200) #return a message of successfully received

@app.route('/edit', methods = ['POST'])
def receve_data2():
    data = request.get_json() #loads sub2 data
    print("Received data2", data)
    cursor.execute("SELECT * FROM test")
    rows = cursor.fetchall()
    
    query("""UPDATE test SET Username = %s, Password = %s, tableName = %s, typeOf = %s, dateOfPurchase = %s, Amount = %s, id = %s WHERE id = %s AND Username = %s""", 
                  (data['username'], data['password'], data['table'], data['typeOf'], data['dateOf'], float(data['amountOf']), int(data['indexOf']), int(data['indexOf']), data['username'])
    )

        
    return jsonify({'messsage': 'data received'}, 200)

@app.route('/delete', methods=['POST'])
def deleteData():
    data = request.get_json()
    print(data['indexOf'])
    print("data received")
    print(data['username'])
    query("""DELETE FROM test WHERE id = %s AND Username = %s""", (data['indexOf'], data['username']))    
    return jsonify({'messsage': 'data received'}, 200)
    





if __name__ == '__main__': #run the app
    app.run(debug=True)
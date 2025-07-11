from flask import Flask, request, jsonify, send_file # import the modules needed for flask app
from flask_cors import CORS #CORS is needed to ensure that backend server allows 
#to receive data from another domain
import mysql.connector
from fpdf import FPDF
import io
from datetime import datetime
import joblib
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
    connection.commit()
    cursor.execute('SELECT * FROM test')
    print(data['postData']['User'])
    rows = cursor.fetchall()
    for row in rows:
        if(row[0] == data['postData']['User']):
            print(row[4])
            returnRows[count] = row
            count += 1
    print(returnRows)
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
    connection.commit()
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

    connection.commit()
    return jsonify({'messsage': 'data received'}, 200)

@app.route('/delete', methods=['POST'])
def deleteData():
    data = request.get_json()
    print(data['indexOf'])
    print("data received")
    print(data['username'])
    query("""DELETE FROM test WHERE id = %s AND Username = %s""", (int(data['indexOf']), data['username']))   
    connection.commit() 
    return jsonify({'messsage': 'data received'}, 200)
    
@app.route('/budget', methods=['POST'])
def updateBudget():
    data = request.get_json()
    query("""UPDATE test SET Budget = %s WHERE tableName = %s""", (float(data['budget']), data['table']))
    connection.commit()
    return jsonify({'messsage': 'data received'}, 200)

@app.route('/download', methods=['POST'])
def getPDF():
    data = request.get_json()
    income = {}
    expense = {}
    cursor.execute("SELECT * FROM test")
    rows = cursor.fetchall()
    for row in rows:
        if(row[0] != data['Username']):
            continue
        else:
            if(row[2] == "Income"):
                if(row[3] in income):
                    income[row[3]].append(str(row[5]))
                    continue
                else:
                    income[row[3]] = [str(row[5])]
                    continue
            else:
                if(row[2] in expense):
                    expense[row[2]].append(str(row[5]))
                    continue
                else:
                    expense[row[2]] = [str(row[5])]
                    continue
    print(income)
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Helvetica", size = 20)

    pdf.cell(200, 20, txt = "Income", ln = 1, align = 'C')
    pdf.cell(200, 10, txt=" " * 100, ln=3, align='C')


    pdf.set_font("Times", size = 13)
    tracker = 10
    total = 0; 
    for key in income:
        for item in income[key]:

                pdf.cell(200, 13, txt = key + ": " + str(item), ln = tracker, align = 'L')
                tracker += 1
                total += float(item)

    pdf.cell(200, 5, txt="_" * 100, ln=tracker, align='C')
    tracker += 1
    pdf.cell(200, 15, txt = "Income total: " + str(round(total,2)), ln=tracker, align = 'L')
    tracker += 1

    #Expense
    pdf.set_font("Helvetica", size = 20)

    pdf.cell(200, 20, txt = "Expense", ln = 1, align = 'C')
    pdf.cell(200, 10, txt=" " * 100, ln=3, align='C')
    pdf.set_font("Times", size = 13)

    total = 0; 
    for key in expense:
        for item in expense[key]:

                pdf.cell(200, 13, txt = key + ": " + str(item), ln = tracker, align = 'L')
                tracker += 1
                total += float(item)

    pdf.cell(200, 5, txt="_" * 100, ln=tracker, align='C')
    tracker += 1
    pdf.cell(200, 15, txt = "Expense total: " + str(round(total,2)), ln=tracker, align = 'L')

    pdf.output('created.pdf')
    return send_file('created.pdf', as_attachment=True, download_name='created.pdf', mimetype='application/pdf')

@app.route('/graph', methods = ['POST'])
def getGraph():
    maxAmount = 0; 
    data = request.get_json()
    income = {}
    expense = {}
    connection.commit()
    cursor.execute('SELECT * FROM test')
    rows = cursor.fetchall()
    print('This starts now')
    startDate = data['startDate']
    startDate = datetime.strptime(startDate, "%Y-%m-%d").date()
    endDate = data['endDate']
    endDate = datetime.strptime(endDate, "%Y-%m-%d").date()

    if(data['period'] == 'Monthly'):
        for row in rows:
            
            if(row[0] == data['username']):
                date = row[4]
                

                if((row[4] >= startDate) & (row[4] <= endDate)):
                    print("____")
                    print(date)
                    date_str = date.strftime("%Y-%m-%d")
                    print(type(date_str[5:7]))
                    print(startDate)
                    print(endDate)
                    print("____")
                    print(row[2])
                    if(row[2] == "Income"):
                        if int(date_str[5:7]) in income:
                            income[int(date_str[5:7])] = income[int(date_str[5:7])] + row[5]
                            if(income[int(date_str[5:7])]> maxAmount):
                                maxAmount = income[int(date_str[5:7])]
                        else:
                            income[int(date_str[5:7])]= row[5]
                            if(income[int(date_str[5:7])]> maxAmount):
                                maxAmount = income[int(date_str[5:7])]
                    else:
                        if int(date_str[5:7]) in expense:
                            expense[int(date_str[5:7])] =  expense[int(date_str[5:7])]  + row[5]
                            if(expense[int(date_str[5:7])] > maxAmount):
                                maxAmount = expense[int(date_str[5:7])]
                        else:
                            expense[int(date_str[5:7])]= row[5]
                            if(expense[int(date_str[5:7])] > maxAmount):
                                maxAmount = expense[int(date_str[5:7])]
    if(data['period'] == 'Yearly'):
        for row in rows:
            
            if(row[0] == data['username']):
                date = row[4]
                
                if((row[4] >= startDate) & (row[4] <= endDate)):
                    print("____")
                    print(date)
                    date_str = date.strftime("%Y-%m-%d")
                    print(type(date_str[0:4]))
                    print(startDate)
                    print(endDate)
                    print("____")
                    print(row[2])
                    if(row[2] == "Income"):
                        if int(date_str[0:4]) in income:
                            print("Add to income")
                            income[int(date_str[0:4])] = income[int(date_str[0:4])] + row[5]
                            if(income[int(date_str[0:4])] > maxAmount):
                                maxAmount = income[int(date_str[0:4])] 
                        else:
                            print("Add to income")
                            income[int(date_str[0:4])] = row[5]
                            if(income[int(date_str[0:4])] > maxAmount):
                                maxAmount = income[int(date_str[0:4])] 
                    else:
                        if int(date_str[0:4]) in expense:
                            expense[int(date_str[0:4])] = expense[int(date_str[0:4])] + row[5]
                            if(expense[int(date_str[0:4])] > maxAmount):
                                maxAmount = expense[int(date_str[0:4])]
                            print("Add to expense")
                        else:
                            expense[int(date_str[0:4])] = row[5]
                            if(expense[int(date_str[0:4])] > maxAmount):
                                maxAmount = expense[int(date_str[0:4])]
                            print("Add to expense")
    print("This is income")
    print(income)
    print("This is expense")
    print(expense)

    sendData = {
        "Income1": income,
        "Expense1": expense,
        "max": maxAmount,
    }

                    

        
            
    return jsonify({'message': sendData}, 200)


@app.route('/ai', methods = ['POST'])
def returnResponse():
    model = joblib.load('model.pkl')
    vectorizer = joblib.load('vectorizer.pkl')
    data = request.get_json()
    question = vectorizer.transform([data])
    prediction = model.predict(question)
    print(type(prediction[0]))
    



    return jsonify({'message': str(prediction[0])}, 200)


if __name__ == '__main__': #run the app
    app.run(debug=True)
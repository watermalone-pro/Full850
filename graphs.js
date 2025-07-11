  var username = document.getElementById("username").getAttribute('data-username');
  
  function getGraph(){
    let username = document.getElementById("username").getAttribute('data-username');
    let period = document.getElementById("period").value;
    let  startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    console.log("Username " + username);
    console.log("Period" + period);
    console.log("startDate" + typeof(startDate));
    console.log("endDate" + endDate);
    postData  = {
      username: username,
      startDate: startDate,
      endDate: endDate,
      period: period,
  
    }
      fetch('http://127.0.0.1:5000/graph', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)

    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      message = data[0]['message']
      income = message['Income1']
      expense = message['Expense1']
      console.log(income)
      console.log(expense)
      dateList = []
      for(let key in income){
       console.log(key);
       console.log(typeof(key));
        if(!dateList.includes(Number(key))){
          dateList.push(Number(key))
        }
      }
      for(let key in expense){
        if(!dateList.includes(Number(key))){
          dateList.push(Number(key))
        }
      }

      dateList.sort(function(a,b){
        return a-b;
      });
      
      console.log(dateList);
      incomeList = []
      expenseList = []
      for(let i = 0; i<dateList.length; i++){
        key = dateList[i].toString();
        console.log("This is the key" + key);
        if(key in income){
          incomeList.push(parseFloat(income[key]));

        }else{
          incomeList.push(0)
        }
        if(key in expense){
          expenseList.push(parseFloat(expense[key]));

        }else{
          expenseList.push(0)
        }

    }
      
      createChart(dateList, Number(message['max']).toFixed(2), incomeList, expenseList)
      
      
    })
    console.log(postData);
    
    

  }
 let chart;
  function createChart(list, maxAmount, income, expense) {
    const ctx = document.getElementById('incomeExpenseChart').getContext('2d');
    if(chart){
      chart.destroy();
    }
    chart = new Chart(ctx, {
        type: 'bar',
        data: { 
            labels: list, 
            datasets: [{
                label: 'Income',
                data: income, 
                backgroundColor: ['#168E20'],
                borderColor: ['#388E3C'],
                borderWidth: 1
            },
            {
              label: "Expense",
              data: expense, 
              backgroundColor: ['#8D2016'],
              borderColor: ['#D32F2F'],
              borderWidth: 1
          }]

        },
        options: {
            responsive: true,
            plugins: { 
                legend: { 
                    display: false 
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    min: 0,  
                    max: (maxAmount + 100),  
                    ticks: {
                        stepSize: 100, 
                        callback: function (value) {
                            return `$${Number(value).toFixed(2)}`; 
                        } 
                    }
                }
            }
        }
    }); 


  }
  



  // code for later if there is time
  // if(Number(startDate.substring(0,4)) < Number(endDate.substring(0,4))){
    //   console.log("True. startDate year is less")
    // }else if(Number(startDate.substring(5,7)) == Number(endDate.substring(5,7))){
    //   console.log(Number(startDate.substring(0,4)));
    //   console.log(Number(endDate.substring(0,4)));
    //   console.log("Both years are the same")
    //   if(Number(startDate.substring(5,7)) < Number(endDate.substring(5,7))){
    //     console.log("start date and end date same year but start is month earlier ")
    //   }else if((Number(startDate.substring(5,7)) == Number(endDate.substring(5,7))) && (Number(startDate.substring(8)) <= Number(endDate.substring(8)))){
    //     console.log("start date and end date same year and month but day earlier or same ")
    //   }else{
    //     console.log("False. Same year but either month or day")
    //   }
    // }else{
    //   console.log(Number(startDate.substring(0,4)));
    //   console.log(Number(endDate.substring(0,4)));
  
    //   console.log("false. StartDate year is more")
    // }





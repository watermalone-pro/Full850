let sameIndex = 0;
let data = {}; 
var username = document.getElementById("username").getAttribute('data-username');
console.log("This is the logged in user" + username);
document.addEventListener("DOMContentLoaded", function() {
    const filter = document.querySelector(".search-input");
    filter.addEventListener("input", function() {
        let tables = document.querySelectorAll(".table");
        let value = filter.value.toUpperCase().trim();
        for(table of tables){
            rows = table.querySelectorAll("tr");
            for(let i = 2; i<rows.length-1; i++){
                let type = rows[i].querySelector('.type1')?.value || "";
                let date = rows[i].querySelector('.date1')?.value || "";
                let amount = rows[i].querySelector('.amount1')?.value || "";
                if((type.toUpperCase().indexOf(value) > -1) || (date.toUpperCase().indexOf(value) > -1) ||
                (amount.toUpperCase().indexOf(value) > -1)){
                    rows[i].style.display = '';
                }else{
                    rows[i].style.display = 'none';
                }
            }
        }
        
    });
});
const postData = 
{User: username,

};
console.log(postData);
async function loadData(){
    const response = await fetch('http://127.0.0.1:5000/load', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({postData})
    });
    data = await response.json();
    console.log(data);
    for(let num in data){
        console.log(data[num]);
    }
    
    if(JSON.stringify(data) === "{}" ){
        sameIndex = 0;
    }else{
        sameIndex = Number(data[0][7]);

    }
    

}; 
const budgetParagraph = document.createElement('p');
budgetParagraph.classList.add('totalBudgetAmount');
budgetParagraph.innerText = 'The remaining budget is';
document.body.insertAdjacentElement('afterbegin', budgetParagraph);

loadData()
.then(() => {
    //Creating income table to ensure there will always be one
    createTable("Income");
    let tables = document.querySelectorAll(".table"); //Getting all tables initiated

    for(let num in data){ //Goes through all data from user
        
        let check = false; 
        tables = document.querySelectorAll(".table"); 

        for(let table of tables){ //of returns the values and not indexes
            if((table.querySelector(".table-title").childNodes[0].textContent == data[num][2]) && (data[num][2] != "Income")){
                console.log("This is the type" + data[num][3]);
                check = true; 
                let date = new Date(data[num][4]);
                let formattedDate = date.toISOString().split('T')[0];
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td class="hidden-column">${data[num][6]}</td>
                    <td><input type="text" value="${data[num][3]}" placeholder="Type" required class="type1" disabled></td>
                    <td><input type="date" value=${formattedDate} placeholder="Date" class="date1" disabled></td>
                    <td><input type="number" value=${data[num][5]} placeholder="Amount" required class="amount1" disabled></td>
                    <td class="actions"> 
                        <button class="sub2" style = "display:none;" onclick="submitRow(this)">Submit</button>
                        <button class="edit"onclick="editRow(this)" style="display:inline;">Edit</button>
                        <button class = "delete" style="display:inline;">Delete</button>
                    </td>
                `;
            
                table.insertBefore(newRow, table.lastElementChild); // Insert before the button row
                break;
            }
            else if(table.querySelector(".table-title").childNodes[0].textContent == data[num][2]){
                console.log("This is the type" + data[num][3]);

                check = true; 
                let date = new Date(data[num][4]);
                let formattedDate = date.toISOString().split('T')[0];
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td class="hidden-column">${data[num][6]}</td>
                    <td><input type="text" value="${data[num][3]}" placeholder="Type" required class="type1" disabled></td>
                    <td><input type="date" value=${formattedDate} placeholder="Date" class="date1" disabled></td>
                    <td><input type="number" value=${data[num][5]} placeholder="Amount" required class="amount1" disabled></td>
                    <td class="actions"> 
                        <button class="sub2" style = "display:none;" onclick="submitRow(this)">Submit</button>
                        <button class="edit"onclick="editRow(this)" style="display:inline;">Edit</button>
                        <button class = "delete" style="display:inline;">Delete</button>
                    </td>
                `;
            
                table.insertBefore(newRow, table.lastElementChild); // Insert before the button row
                
                break;
            }
        }
        if(!check){
            createTable(data[num][2]);
            tables = document.querySelectorAll(".table"); 
            let date = new Date(data[num][4]);
            let formattedDate = date.toISOString().split('T')[0];
            let tbody = document.querySelectorAll(".table");
            console.log("This is the type" + data[num][3]);

            tbody = tbody[tbody.length-1];
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td class="hidden-column">${data[num][6]}</td>
                <td><input type="text" value="${data[num][3]}" placeholder="Type" required class="type1" disabled></td>
                <td><input type="date" value=${formattedDate} placeholder="Date" class="date1" disabled></td>
                <td><input type="number" value=${data[num][5]} placeholder="Amount" required class="amount1" disabled></td>
                <td class="actions"> 
                    <button class="sub1" style="display:none;" onclick="submitRow(this)">Submit</button>
                    <button class="edit"onclick="editRow(this)" style="display:inline;">Edit</button>
                    <button class = "delete" style="display:inline;">Delete</button>
                </td>
            `;
            
            tbody.insertBefore(newRow, tbody.lastElementChild); // Insert before the button row
            budgetText(tables[tables.length-1]);
            if(data[num][8] == null){
                tables[tables.length-1].querySelector(".budget-input").value = 0;
            }else{
                tables[tables.length-1].querySelector(".budget-input").value = data[num][8]
            }
            

            
        }
    } 

    tables = document.querySelectorAll(".table"); 
    let tableTitleElement = tables[0].querySelector(".table-title");
    let totalIncomeText = document.createElement("span"); 
    totalIncomeText.innerText += "Total Income: " + Number(getTotalSpent(tables[0])).toFixed(2); 
    totalIncomeText.classList.add("totalIncome"); 
    tables[0].appendChild(totalIncomeText); 


    for(let i = 1; i<tables.length; i++){
        let spent = Number(getTotalSpent(tables[i])).toFixed(2);
        let budget = tables[i].querySelector(".budget-input").value; 
        tables[i].querySelector(".budgetSpent").innerText = "Budget Spent: " + spent;
        let left = Number(budget).toFixed(2) - spent;
        tables[i].querySelector(".budgetLeft").innerText = "Budget Left: " + left.toFixed(2);
    }

    getRemainingBudget();

    
    



});

//This function gets the overall remaining amount availabe to budget after taking 
//in account all income and expense amount
//No parameters or return value 
function getRemainingBudget(){
    let tables = document.querySelectorAll('.table'); //gets all tables
    let income = getTotalSpent(tables[0]); //income will always be the first table
    let budget = 0; 
    for(let i = 1; i < tables.length; i++){
        budget += Number(tables[i].querySelector(".budget-input").value); //Get's all budget for expense
    }
    console.log("THis is remianing budget");
    console.log(income);
    console.log(budget);
    let remainingBudget = Number(income).toFixed(2) - Number(budget).toFixed(2); //Remaining
    document.querySelector(".totalBudgetAmount").textContent = "The remaining budget is: " + Number(remainingBudget).toFixed(2);

}

function budgetText(table){
    let tableTitleElement1 = table.querySelector(".table-title"); 
    let budgetInput = document.createElement("span"); 
    budgetInput.innerText += "Budget:";  
    budgetInput.classList.add("budgetText"); 
    tableTitleElement1.appendChild(budgetInput);   

    let budgetInputBox = document.createElement("input");
    budgetInputBox.placeholder = "Input budget";
    budgetInputBox.type = "number";  
    budgetInputBox.classList.add("budget-input");  
    tableTitleElement1.appendChild(budgetInputBox);

    let budgetSubmit = document.createElement("button");
    budgetSubmit.type = "submit";
    budgetSubmit.textContent = "Submit";
    budgetSubmit.classList.add("budget-button");
    budgetSubmit.onclick = function(){
        let budgetValue = budgetSubmit.closest('tr').querySelector('.budget-input').value;
        let tableName = budgetSubmit.closest('table').querySelector('.table-title').childNodes[0].textContent;
        if(budgetValue == ""){
            budgetValue = 0;
        }
        const postData = {
            budget: budgetValue,
            table: tableName,
        };
        fetch('http://127.0.0.1:5000/budget', { //sending data with POST method to backend server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData) //stringify data for correct formating
        });
        console.log(postData);
        let spent = getTotalSpent(table);
        table.querySelector(".budgetSpent").innerText = "Budget Spent: " + Number(spent).toFixed(2);
        table.querySelector(".budgetLeft").innerText = "Budget Left: " + (Number(budgetValue) - spent).toFixed(2);
        getRemainingBudget();

        
    }
    tableTitleElement1.appendChild(budgetSubmit);

   let budgetSpent = document.createElement("span");  
    budgetSpent.innerText += "Budget Spent:";  
    budgetSpent.classList.add("budgetSpent"); 
    tableTitleElement1.appendChild(budgetSpent);   

    let budgetLeft = document.createElement("span"); 
    budgetLeft.innerText += "Budget Left:";  
    budgetLeft.classList.add("budgetLeft"); 
    tableTitleElement1.appendChild(budgetLeft);  

}

//Gets the amount spent from an expense table
//Takes in a table for parameter
//returns the amount spent 

function getTotalSpent(table){
    let spent = 0; 
    rows = table.querySelectorAll(".amount1"); //Selects values under amount column
    for(let i = 0; i<rows.length; i++){
        console.log(rows[i].value);
        if(rows[i].value == "" || rows[i].closest('tr').style.display === 'none'){
            continue;
        }else{
            spent += Number(rows[i].value); //Adds all valid amount together to get total spent
        }
    }
    return Number(spent).toFixed(2); // returns spent
    
    
}


function sub1function(element){

    let type = element.target.closest('tr').querySelector(".type1").value;
    //get the data within the rows 
    let date = element.target.closest('tr').querySelector(".date1").value;
    let amount = element.target.closest('tr').querySelector(".amount1").value;
    let index = element.target.closest('tr').querySelector(".hidden-column").textContent;
    let tableName = element.target.closest('table').querySelector(".table-title").childNodes[0].textContent;

    //data the format would be sent in 
    const postData = {
        username: username,
        password: "Huge",
        table: tableName,
        typeOf: type,
        dateOf: date,
        amountOf: amount,
        indexOf: index,
        totalIndex: sameIndex,
    };
    fetch('http://127.0.0.1:5000/data', { //sending data with POST method to backend server
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData) //stringify data for correct formating
    });
    console.log(postData);

    let spent = getTotalSpent(element.target.closest('table'));
    console.log("Spent" + spent);
    if(tableName == "Income"){
        console.log("true");
        element.target.closest('table').querySelector(".totalIncome").innerText = "Total Income: " + Number(spent).toFixed(2);

        
    }else{
        
        let budgetValue = element.target.closest('table').querySelector(".budget-input").value;
        element.target.closest('table').querySelector(".budgetSpent").innerText = "Budget Spent: " + Number(spent).toFixed(2);
        element.target.closest('table').querySelector(".budgetLeft").innerText = "Budget Left: " + (Number(budgetValue) - spent).toFixed(2);
        console.log("budget value" + budgetValue);
        console.log("What is left" + (Number(budgetValue) - spent).toFixed(2));
    }
    getRemainingBudget();

}
function sub2function(element){
    let type = element.target.closest('tr').querySelector(".type1").value;
    //get the data within the rows 
    let date = element.target.closest('tr').querySelector(".date1").value;
    let amount = element.target.closest('tr').querySelector(".amount1").value;
    let index = element.target.closest('tr').querySelector(".hidden-column").textContent;
    let tableName = element.target.closest('table').querySelector(".table-title").childNodes[0].textContent;

    //data the format would be sent in 
    const postData = {
        username: username,
        password: "Huge",
        table: tableName,
        typeOf: type,
        dateOf: date,
        amountOf: amount,
        indexOf: index,
        totalIndex: sameIndex,


    };
    fetch('http://127.0.0.1:5000/edit', { //sending data with POST method to backend server
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData) //stringify data for correct formating
    });
    
    console.log(postData);
    let spent = getTotalSpent(element.target.closest('table'));
    if(tableName == "Income"){
        element.target.closest('table').querySelector(".totalIncome").innerText = "Total Income: " + Number(spent).toFixed(2);
        
    }else{
        
        let budgetValue = element.target.closest('table').querySelector(".budget-input").value;
        element.target.closest('table').querySelector(".budgetSpent").innerText = "Budget Spent: " + Number(spent).toFixed(2);
        element.target.closest('table').querySelector(".budgetLeft").innerText = "Budget Left: " + (Number(budgetValue) - spent).toFixed(2);
    }
    getRemainingBudget();

}

function deleteRow(element){
    let index = element.target.closest('tr').querySelector(".hidden-column").textContent;
    
    const postData = {
        username: username,
        indexOf: index,
    };
    fetch('http://127.0.0.1:5000/delete', { //sending data with POST method to backend server
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData) //stringify data for correct formating
    });
  
    element.target.closest('tr').style.display = "none";
    console.log("This is the delete");
    let tableName = element.target.closest('table').querySelector(".table-title").childNodes[0].textContent;

    if(tableName == "Income"){
        let spent = getTotalSpent(element.target.closest('table'));

        element.target.closest('table').querySelector(".totalIncome").innerText = "Total Income: " + Number(spent).toFixed(2);

        
    }else{
        let spent = getTotalSpent(element.target.closest('table'));

        let budgetValue = element.target.closest('table').querySelector(".budget-input").value;
        element.target.closest('table').querySelector(".budgetSpent").innerText = "Budget Spent: " + Number(spent).toFixed(2);
        element.target.closest('table').querySelector(".budgetLeft").innerText = "Budget Left: " + (Number(budgetValue) - spent).toFixed(2);
    }
    getRemainingBudget();


    
    

}
const mutationObserver = new MutationObserver(function(mutations){ 
    console.log('mutation kind', mutations); 
    document.querySelectorAll(".sub1").forEach(function(element){  //looping through
        //all the .sub1 class buttons and add an event listener
        element.addEventListener('click', sub1function);
    });

    document.querySelectorAll(".sub2").forEach(function(element){
        setTimeout(function(){
            element.removeEventListener('click', sub1function); //remove sub1 listener 
            element.removeEventListener('click', sub2function); // remove sub2 listener to avoid build up
            element.addEventListener('click', sub2function); //add a sub2 listener
        }, 100);
        
    });

    document.querySelectorAll('.delete').forEach(function(element){
        element.removeEventListener('click', deleteRow);
        element.addEventListener('click', deleteRow);


    });

    
}); 
const parent = document.querySelector("#bod"); //main element with the id bod
mutationObserver.observe(parent, {
    childList: true, //observers if a child is added
    subtree: true,
    attributes: true,
});










/// test3.js file


totalIncome = 0;
totalExpense = 0;

function addRowFunction(button) {
    sameIndex += 1; 

    const tbody = button.closest('tbody');
    const rowCount = tbody.rows.length - 1; // Exclude the "Add Row" button row

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="hidden-column">${sameIndex}</td>
        <td><input type="text" value="" placeholder="Type" required class="type1"></td>
        <td><input type="date" value="" placeholder="Date" class="date1"></td>
        <td><input type="number" value="" placeholder="Amount" required class="amount1"></td>
        <td class="actions"> 
            <button class="sub1"onclick="submitRow(this)">Submit</button>
            <button class="edit"onclick="editRow(this)" style="display:none;">Edit</button>
            <button class = "delete" style="display:none;">Delete</button>
        </td>
    `;
    
    tbody.insertBefore(newRow, tbody.lastElementChild); // Insert before the button row
}

function createTable(tableName) {
    sameIndex += 1;

    const name = tableName || document.getElementById('tableName').value || 'Untitled Table';

    // Create a new table element
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    table.classList.add("table");

    // Create header row with the table name
    const titleRow = document.createElement('tr');
    titleRow.innerHTML = `<th colspan="5" class="table-title">${name}</th>`;
    thead.appendChild(titleRow);

    // Create another header row for column titles
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th class="hidden-column">#</th>
        <th>Type</th>
        <th>Date</th>
        <th>Amount</th> 
        <th></th>
    `;
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create initial row with input fields (Submit button visible, others hidden)
    const initialRow = document.createElement('tr');
    initialRow.innerHTML = `
        <td class="hidden-column">${sameIndex}</td>
        <td><input type="text" value="" placeholder="Type" class="type1" ></td>
        <td><input type="date" value="" placeholder="Date" class="date1"></td>
        <td><input type="number" value="" placeholder="Amount" class="amount1"></td>
        <td class="actions"> 
            <button class="sub1" onclick="submitRow(this)">Submit</button>
            <button class ="edit" onclick="editRow(this)" style="display:none;">Edit</button>
            <button class = "delete" style="display:none;">Delete</button>
        </td>
    `;
    tbody.appendChild(initialRow);

    // Create the "Add Row" button row
    const addRow = document.createElement('tr');
    addRow.innerHTML = `
        <td colspan="5" class="add-row-button">
            <button onclick="addRowFunction(this, '${tableName}')" class="table-button">Add Row</button>
        </td>
    `;
    tbody.appendChild(addRow);

    table.appendChild(tbody);
    document.getElementById('tableContainer').appendChild(table);
}

function createTable2(tableName){
    createTable(tableName);
    
    let tables = document.querySelectorAll('.table');
    let table = tables[tables.length-1];
    budgetText(table);

}





// Function to update the balance on the page 
// Gets updated balance and displays it whenever you click on the page


// Submit row (showing edit and delete buttons, disabling inputs)
function submitRow(button) {
    const row = button.closest('tr'); 
    button.classList = 'sub2'; 
    // Disable all input fields in the row
    const inputs = row.querySelectorAll('input');
    inputs.forEach(input => input.disabled = true);
    // Hide Submit, Show Edit and Delete
    row.querySelector('.sub2').style.display = 'none'; // Hide Submit
    row.querySelector('.edit').style.display = 'inline';  // Show Edit
    row.querySelector('.delete').style.display = 'inline'; // Show Delete
 }

// Edit row (enabling inputs)
function editRow(button) {
    const row = button.closest('tr');

    // Change the ID of the submit button to "sub2" after edit
    const submitButton = row.querySelector('button[onclick="submitRow(this)"]');
    submitButton.classList = 'sub2'; 

    // Enable all input fields in the row
    const inputs = row.querySelectorAll('input');
    inputs.forEach(input => input.disabled = false);

    // Hide Edit, Show Submit
    submitButton.style.display = 'inline';  // Show Submit
    row.querySelector('.edit').style.display = 'none';    // Hide Edit
    row.querySelector('.delete').style.display = 'inline'; // Show Delete
}

// Delete row

/*
document.querySelector("nav").addEventListener("click", function (event) {
    // Only toggle the nav size when clicking the nav itself, not the links
    if (event.target.tagName !== 'A' && event.target.tagName !== 'SPAN') {
      this.classList.toggle("shrink");
    }
  }); 
  */ 


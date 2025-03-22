console.log('Kaelyn change hello');
let sameIndex = 0;
let data = {}; 
const postData = 
{User: 'Kaelyn2',

};
async function loadData(){
    const response = await fetch('http://127.0.0.1:5000/load', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({postData})
    });
    data = await response.json();
    for(let num in data){
        console.log(data[num]);
    }
    
    if(JSON.stringify(data) === "{}" ){
        sameIndex = 0;
    }else{
        sameIndex = Number(data[0][7]);

    }
    console.log('Index'+sameIndex);
    console.log(typeof(sameIndex));

}; 
const budgetParagraph = document.createElement('p');
budgetParagraph.classList.add('totalBudgetAmount');
budgetParagraph.innerText = 'The remaining budget is 44444444444444444444444444444444444';
document.body.insertAdjacentElement('afterbegin', budgetParagraph);

loadData()
.then(() => {
    createTable("Income");
    console.log("tables is starting");
    for(let num in data){
        
        let check = false; 
        let tables = document.querySelectorAll(".table")
        for(let table of tables){ //of returns the values and not indexes
            if(table.querySelector(".table-title").textContent == data[num][2]){
                check = true; 
                let date = new Date(data[num][4]);
                let formattedDate = date.toISOString().split('T')[0];
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td class="hidden-column">${data[num][6]}</td>
                    <td><input type="text" value=${data[num][3]} placeholder="Type" required class="type1" disabled></td>
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
        };
        if(!check){
            createTable(data[num][2])
            let date = new Date(data[num][4]);
            let formattedDate = date.toISOString().split('T')[0];
            let tbody = document.querySelectorAll(".table");
            tbody = tbody[tbody.length-1];
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td class="hidden-column">${data[num][6]}</td>
                <td><input type="text" value=${data[num][3]} placeholder="Type" required class="type1" disabled></td>
                <td><input type="date" value=${formattedDate} placeholder="Date" class="date1" disabled></td>
                <td><input type="number" value=${data[num][5]} placeholder="Amount" required class="amount1" disabled></td>
                <td class="actions"> 
                    <button class="sub1" style="display:none;" onclick="submitRow(this)">Submit</button>
                    <button class="edit"onclick="editRow(this)" style="display:inline;">Edit</button>
                    <button class = "delete" style="display:inline;">Delete</button>
                </td>
            `;
            
            tbody.insertBefore(newRow, tbody.lastElementChild); // Insert before the button row
        }
    }
    
    
});



function getTotalExpense(){
    console.log("Function is starting");
    let tables = document.querySelectorAll(".table")
    console.log(tables);
    let totalExpense = 0;
    for(let table of tables){
        console.log(table.querySelector(".amount1").textContent);
    }
}
console.log("Get total expense function");
getTotalExpense();

function sub1function(element){
    console.log("sub1 is clicked");
    console.log("this works");
    console.log(element);
    console.log(element.target);
    let type = element.target.closest('tr').querySelector(".type1").value;
    //get the data within the rows 
    let date = element.target.closest('tr').querySelector(".date1").value;
    let amount = element.target.closest('tr').querySelector(".amount1").value;
    let index = element.target.closest('tr').querySelector(".hidden-column").textContent;
    let tableName = element.target.closest('table').querySelector("thead tr th.table-title").textContent;

    console.log(tableName);
    //data the format would be sent in 
    const postData = {
        username: "Kaelyn2",
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
}
function sub2function(element){
    console.log("sub2 is clicked");
    let type = element.target.closest('tr').querySelector(".type1").value;
    //get the data within the rows 
    let date = element.target.closest('tr').querySelector(".date1").value;
    let amount = element.target.closest('tr').querySelector(".amount1").value;
    let index = element.target.closest('tr').querySelector(".hidden-column").textContent;
    let tableName = element.target.closest('table').querySelector("thead tr th.table-title").textContent;

    console.log(tableName);
    //data the format would be sent in 
    const postData = {
        username: "Kaelyn2",
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
    console.log("This is the post data");
    console.log(postData);
}

function deleteRow(element){
    let index = element.target.closest('tr').querySelector(".hidden-column").textContent;
    console.log(element);
    console.log(element.target);
    const postData = {
        username: "Kaelyn2",
        indexOf: index,
    };
    fetch('http://127.0.0.1:5000/delete', { //sending data with POST method to backend server
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData) //stringify data for correct formating
    });
    console.log("This is the post data");
    console.log(postData);
    console.log("Row that should delete");
    element.target.closest('tr').style.display = "none";

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
        console.log('Right delete function');
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
        <td><input type="number" value="" onchange="calculateTotal(this, '${tableName}')" placeholder="Amount" class="amount1"></td>
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



function calculateTotal(input, tableName) {
    const tbody = input.closest('tbody');
    const rows = tbody.querySelectorAll('tr');
    let cumulativeTotal = 0;

 

    // Update the global totals based on the table
    if (tableName === 'Income') {
        totalIncome = cumulativeTotal;
    } else if (tableName === 'Expense') {
        totalExpense = cumulativeTotal;
    }

    // Update the balance whenever totals change
    updateBalance();
}

// Function to update the balance on the page 
// Gets updated balance and displays it whenever you click on the page
function updateBalance() {
    const balance = totalIncome - totalExpense;
    const balanceElement = document.getElementById('balance');
    balanceElement.textContent = `Balance: $${balance.toFixed(2)}`;
}

// Submit row (showing edit and delete buttons, disabling inputs)
function submitRow(button) {
    const row = button.closest('tr'); 
    button.classList = 'sub2'; 
    // Disable all input fields in the row
    const inputs = row.querySelectorAll('input');
    inputs.forEach(input => input.disabled = true);
    console.log('delete row');
    console.log(row.querySelector('.delete'));
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


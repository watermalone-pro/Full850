// console.log("This is page test3.js");
// totalIncome = 0;
// totalExpense = 0;
// function createTable(tableName) {
//     const name = tableName || document.getElementById('tableName').value || 'Untitled Table';

//     // Create a new table element
//     const table = document.createElement('table');
//     const thead = document.createElement('thead');
//     const tbody = document.createElement('tbody');

//     // Create header row with the table name
//     const titleRow = document.createElement('tr');
//     titleRow.innerHTML = `<th colspan="5" class="table-title">${name}</th>`;
//     thead.appendChild(titleRow);

//     // Create another header row for column titles
//     const headerRow = document.createElement('tr');
//     headerRow.innerHTML = `
//         <th class="hidden-column">#</th>
//         <th>Type</th>
//         <th>Date</th>
//         <th>Amount</th>
//         <th>Total Amount</th> 
//         <th></th>
//     `;
//     thead.appendChild(headerRow);
//     table.appendChild(thead);

//     // Create initial row with input fields (Submit button visible, others hidden)
//     const initialRow = document.createElement('tr');
//     initialRow.innerHTML = `
//         <td class="hidden-column">0</td>
//         <td><input type="text" value="" placeholder="Type" class="type1" ></td>
//         <td><input type="date" value="" placeholder="Date" class="date1"></td>
//         <td><input type="number" value="" onchange="calculateTotal(this, '${tableName}')" placeholder="Amount" class="amount1"></td>
//         <td class="total-amount">0.00</td> 
//         <td class="actions"> 
//             <button class="sub1" onclick="submitRow(this)">Submit</button>
//             <button class ="edit" onclick="editRow(this)" style="display:none;">Edit</button>
//             <button class = "delete" style="display:none;">Delete</button>
//         </td>
//     `;
//     tbody.appendChild(initialRow);

//     // Create the "Add Row" button row
//     const addRow = document.createElement('tr');
//     addRow.innerHTML = `
//         <td colspan="5" class="add-row-button">
//             <button onclick="addRowFunction(this, '${tableName}')" class="table-button">Add Row</button>
//         </td>
//     `;
//     tbody.appendChild(addRow);

//     table.appendChild(tbody);
//     document.getElementById('tableContainer').appendChild(table);
// }

// function addRowFunction(button, tableName) {
//     const tbody = button.closest('tbody');
//     const rowCount = tbody.rows.length - 1; // Exclude the "Add Row" button row

//     const newRow = document.createElement('tr');
//     newRow.innerHTML = `
//         <td class="hidden-column">${rowCount}</td>
//         <td><input type="text" value="" placeholder="Type" required class="type1"></td>
//         <td><input type="date" value="" placeholder="Date" class="date1"></td>
//         <td><input type="number" value="" onchange="calculateTotal(this, '${tableName}')" placeholder="Amount" required class="amount1"></td>
//         <td class="total-amount">0.00</td>
//         <td class="actions"> 
//             <button class="sub1"onclick="submitRow(this)">Submit</button>
//             <button class="edit"onclick="editRow(this)" style="display:none;">Edit</button>
//             <button class = "delete" style="display:none;">Delete</button>
//         </td>
//     `;
    
//     tbody.insertBefore(newRow, tbody.lastElementChild); // Insert before the button row
//     calculateTotal(newRow.querySelector('input[type="number"]'), tableName); // Recalculate totals
//     updateRowNumbers(tbody); // Update row numbers
// }

// // Function to update row numbers based on their position
// // function updateRowNumbers(tbody) {
// //     const rows = tbody.querySelectorAll('tr');
// //     rows.forEach((row, index) => {
// //         if (row.querySelector('.hidden-column')) {
// //             row.querySelector('.hidden-column').textContent = index;
// //         }
// //     });
// // } 

// // Function to calculate the total for each table and update the balance
// function calculateTotal(input, tableName) {
//     const tbody = input.closest('tbody');
//     const rows = tbody.querySelectorAll('tr');
//     let cumulativeTotal = 0;

//     // Calculate the cumulative total for each row in the table
//     rows.forEach((row) => {
//         const amountInput = row.querySelector('input[type="number"]');
//         if (amountInput) {
//             const value = parseFloat(amountInput.value) || 0;
//             cumulativeTotal += value;
//             const totalCell = row.querySelector('.total-amount');
//             totalCell.textContent = cumulativeTotal.toFixed(2); // Update total for this row
//         }
//     });

//     // Update the global totals based on the table
//     if (tableName === 'Income') {
//         totalIncome = cumulativeTotal;
//     } else if (tableName === 'Expense') {
//         totalExpense = cumulativeTotal;
//     }

//     // Update the balance whenever totals change
//     updateBalance();
// }

// // Function to update the balance on the page 
// // Gets updated balance and displays it whenever you click on the page
// function updateBalance() {
//     const balance = totalIncome - totalExpense;
//     const balanceElement = document.getElementById('balance');
//     balanceElement.textContent = `Balance: $${balance.toFixed(2)}`;
// }

// // Submit row (showing edit and delete buttons, disabling inputs)
// function submitRow(button) {
//     const row = button.closest('tr'); 
//     button.classList = 'sub2'; 
//     // Disable all input fields in the row
//     const inputs = row.querySelectorAll('input');
//     inputs.forEach(input => input.disabled = true);
//     console.log('delete row');
//     console.log(row.querySelector('.delete'));
//     // Hide Submit, Show Edit and Delete
//     row.querySelector('.sub2').style.display = 'none'; // Hide Submit
//     row.querySelector('.edit').style.display = 'inline';  // Show Edit
//     row.querySelector('.delete').style.display = 'inline'; // Show Delete
//  }

// // Edit row (enabling inputs)
// function editRow(button) {
//     const row = button.closest('tr');

//     // Change the ID of the submit button to "sub2" after edit
//     const submitButton = row.querySelector('button[onclick="submitRow(this)"]');
//     submitButton.classList = 'sub2'; 

//     // Enable all input fields in the row
//     const inputs = row.querySelectorAll('input');
//     inputs.forEach(input => input.disabled = false);

//     // Hide Edit, Show Submit
//     submitButton.style.display = 'inline';  // Show Submit
//     row.querySelector('.edit').style.display = 'none';    // Hide Edit
//     row.querySelector('.delete').style.display = 'inline'; // Show Delete
// }

// // Delete row

// /*
// document.querySelector("nav").addEventListener("click", function (event) {
//     // Only toggle the nav size when clicking the nav itself, not the links
//     if (event.target.tagName !== 'A' && event.target.tagName !== 'SPAN') {
//       this.classList.toggle("shrink");
//     }
//   }); 
//   */ 
  
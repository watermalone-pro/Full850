const apiKey = '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';
let button = document.querySelector(".submitQuestion");
let reply = document.querySelector(".response");
button.addEventListener('click', function(){
    let question = document.querySelector('.questionInput').value;
    console.log(question);
    fetch('http://127.0.0.1:5000/ai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(question)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        response = data[0]['message'];
        if(response == "Add Transactions"){
            reply.innerText = "To add a transaction to either income or expense tables, navigate to 'Home' page. Scroll to table that you want to add a transaction to. Click add row, fill out the information for such transaction, and then hit 'Submit' to save the data."
        }
        if(response == "Create Graph"){
            reply.innerText = "To create a graph, navigate to 'Graph'. This graph will show the relationship between income and expenses in a set period of time. Choose a start date and end date. Then in the drop down, choose either monthly or yearly for how data will be grouped on the x axis and hit submit for the graph."
        }
        if(response == "Edit Transactions"){
            reply.innerText = "To edit a transaction, click the 'Edit' button. Edit the needed data and hit 'Submit' to save."
        }
        if(response == "Delete Transactions"){
            reply.innerText = "To delete a transaction, simply click the 'Delete' button. If successfully deleted, the row should disappear and changes will be saved"
        }
        if(response == "Filter for Transactions"){
            reply.innerText = "To filter for a specific transaction, head to 'Home' Page. Find the search bar on the top left of the page and search in keys words to find specific transactions in income or expense tables."
        }
        if(response == "Download Report"){
            reply.innerText = "To download a report, go to 'Home' Page. On the top right of the page, click download report to get a report generated of the summary and total income and expenses."
        }
        if(response == "Update Account Information"){
            reply.innerText = "To update account information, navigate to 'Account'. There, your username and email will show and password is hidden. To make a change either to username, email, and password, enter the new desired username, email, or password. If there are information you don't want to change, simply leave as blank. Click 'Update' and information will be updated and saved."
        }
    })

});

<html lang="en"> 
<head> 
<meta charset="UTF-8">   
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>  
<title>FBLA</title>  
<link rel="stylesheet" href="test.css">   

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
 <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head> 
<body >  
<header>  
    <div class = "container">  

        </a>
        <nav>   
            
            <ul>
            <li><a href = "home.php"><span class="icon material-symbols-outlined">home</span><p>Home</p></a></li> 
                <li><a href = "graphs.php"><span class="icon material-symbols-outlined">bar_chart</span> <p>Graph</p></a></li> 
                <li><a href="chatbox.html"><span class="icon material-symbols-outlined">live_help</span><p>Chatbox</p></a></li> 
                <li><a href = "questions.php"><span class="icon material-symbols-outlined">question_mark</span><p>Questions</p></a></li>
                <li><a href = "update_setting.php"><span class="icon material-symbols-outlined">account_circle</span><p>Account</p></a></li>
             <div class="active"></div>
            </ul> 
        </nav>
    </div>
   
</header>
    <div class="header"> 
        <p class="header-text">Q&A</p>   
        <select class="select__input" id="selTheme">
                <option value="auto">Auto</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select> 

    </div>   
    <div class="questions"> 

        <h1>How do I add a transaction?</h1>  
        <p class="answers">Navigate to 'Home'. Navigate to the chosen table to add the transaction. Click add row and fill information based on type, date, and amount. Click 'Submit' to save. </p>
        <h1>Can I change a transaction's information after I add them?</h1> 
        <p class="answers">Yes, you can. Go to the row that needs to be changed, click 'Edit'. Make the edit and then click 'Submit' to save.</p>
        <h1>Where can I change the admin's username, email or password</h1> 
        <p class="answers">Go to Account page in the Navigation Bar and insert your new information. If you wish to keep the older information, simply apply the older information in or keep it blank. After, hit 'Update'.</p> 
        <h1>How can I download a report?</h1> 
        <p class="answers">Navigate to 'Home' and click download.</p>  
        <h1>How do I get the graph to show data?</h1> 
        <p class="answers">Select a date in the past for the start date and make sure that end date is closer to the present. Select yearly if start date is not in the same year as the end date.</p>
        <h1>How do I filter for specific transactions?</h1>
        <p class="answers">To filter for a specific transaction, navigate to 'Home' page and search key words in the search bar</p>

    </div> 
    <script> 
    function applyTheme(theme) {
  document.body.classList.remove("theme-auto", "theme-light", "theme-dark");
  document.body.classList.add(`theme-${theme}`);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "auto";

  applyTheme(savedTheme);

  for (const optionElement of document.querySelectorAll("#selTheme option")) {
    optionElement.selected = savedTheme === optionElement.value;
  }

  document.querySelector("#selTheme").addEventListener("change", function () {
    localStorage.setItem("theme", this.value);
    applyTheme(this.value);
  });
});
</script>
</body>  
</html> 
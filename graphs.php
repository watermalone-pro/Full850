<?php
session_start();
$_SESSION['username'];
$_SESSION['password'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Income vs Expenses Chart</title> 
    <link rel="stylesheet" href="test.css">   
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> 

    <div id='username' data-username ="<?php echo htmlspecialchars($_SESSION['username']); ?>"></div>

</head> 
<header> 

        <div class="container">    
            <!-- Nav Bar --> 
            <nav> 
                <ul>
                    <li><a href="home.php"><span class="icon material-symbols-outlined">home</span><p>Home</p></a></li> 
                    <li><a href="graphs.php"><span class="icon material-symbols-outlined">bar_chart</span><p>Graph</p></a></li>  
                    <li><a href="chatbox.html"><span class="icon material-symbols-outlined">live_help</span><p>Chatbox</p></a></li> 
                    <li><a href="questions.php"><span class="icon material-symbols-outlined">question_mark</span><p>Questions</p></a></li>
                    <li><a href="update_setting.php"><span class="icon material-symbols-outlined">account_circle</span><p>Account</p></a></li> 
                    <div class="active"></div>
                </ul> 
            </nav>
        </div>
    </header>  
<body> 
    <div class="graph-container">
    <h2 class="IncomeVsExpenseText">Graph of Income and Expense</h2>
<form>
   
    <div class=date-container> 
    <div class="startDate">
    <label class="startDateText" for="startDate">Start Date:</label>
    <input type="date" id="startDate" required></div>

    <div class ="endDate">
    <label class= "endDateText" for="endDate">End Date:</label>
    <input type="date" id="endDate" required>  
    </div>
    </div>

    <select id = "period">  
        <option>Monthly</option> 
        <option>Yearly</option>
    </select>
    <button class="date-button" type="button" onclick = "getGraph()">Submit</button> 
</form>

<canvas id="incomeExpenseChart"></canvas>

<script> applyTheme
        //Finds body and sees if there are any classes being applied then classes get removed 
        //Gets the theme the user selected and applies it to body
        function applyTheme(theme) {
      document.body.classList.remove("theme-auto", "theme-light", "theme-dark");
      document.body.classList.add(`theme-${theme}`);
    }
    //Theme from user's browser gets selected and made as auto 
    document.addEventListener("DOMContentLoaded", () => {
      const savedTheme = localStorage.getItem("theme") || "auto";
    
      applyTheme(savedTheme);
    
      for (const optionElement of document.querySelectorAll("#selTheme option")) {
        optionElement.selected = savedTheme === optionElement.value;
      }
    //Theme that the user selected is saved 
      document.querySelector("#selTheme").addEventListener("change", function () {
        localStorage.setItem("theme", this.value);
        applyTheme(this.value);
      }); 
    });
    </script> 


<script src="graphs.js" defer></script> 
</div> 
</body> 

   

    
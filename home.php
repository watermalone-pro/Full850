<?php
session_start(); //initalize session variables that are global
$_SESSION['username'];
$_SESSION['password'];
?>
<html lang="en">
<head> 
    <meta charset="UTF-8">   
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>  
    <title>FBLA 2025</title>  
    <link rel="stylesheet" href="test.css">   
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <script src="test3.js" defer></script>

</head> 
<div id='username' data-username ="<?php echo htmlspecialchars($_SESSION['username']); ?>"></div>

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
    <div id = "welcome">Welcome "<?php echo htmlspecialchars($_SESSION['username']); ?>"</div>
    <div class="header-content"> 
        <!-- Search Button--> 
         <hr>
        <div class = "search"> 
            <span class="search-icon material-symbols-outlined">search</span> 
            <input class = "search-input" id="search-bar" type="text" placeholder="Search"> 
        <div id="search-bar-results"></div>
        </div>  
        <button class="download-button" onclick = "getPDF()" id="download-button"type="submit">Download Report</button> 
        </div>
    <main id = "bod"> 
        <!--Load income and expense table-->
        <div id="tableContainer"></div>  
        <!--Create table function for budgeting-->
        <div class="table-name-container">
            <label class="table-name" for="tableName">Table Name:</label>
            <input class="table-input" type="text" id="tableName" placeholder="Enter table name">  
            <button class="table-button" onclick="createTable2()">Create Table</button>

        </div>
    </main>  
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

    <script src="learn.js" defer></script>
    <script src="download.js" defer></script>
</body>
</html>
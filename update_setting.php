<?php
session_start();
$username = $_SESSION['username'];
$email = $_SESSION['email'];
$password = $_SESSION['password'];

 
?>
<html lang="en"> 
<head> 
<meta charset="UTF-8">   
<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Update User</title>
<link rel = "stylesheet" href = "update_setting.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
<link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

    <script>
        function showError(id) {
            document.getElementById(id).style.display = 'block';
        }
    </script>
</head>
<body>
<header> 
    <div class = "container">   
        
    </a>
        <nav> 
            <ul>
                <li><a href = "home.php"><span class="icon material-symbols-outlined">home</span><p>Members</p></a></li> 
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
        <p class="header-text">Update User</p>   
        
        <select class="select__input" id="selTheme">
                <option value="auto">Auto</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
        </select>
    </div>




    <form method="POST" action="update_setting.php">
        <p>
            <label class="updateText" for="username">Username</label><br> 
            <p id="username-length" style="display: none; color: red;">Username must be eight characters</p><p id="username-error" style="display: none;">Username is already taken</p>
            <input type="text" name="username" id="username" placeholder="<?php echo htmlspecialchars($username); ?>"><br>
        </p>
        <p>
            <label class="updateText"  for="email">Email</label><br> 
            <p id="email-error" style="display: none; color: red;">Email is already taken</p>
            <input type="email" name="email" id="email" placeholder="<?php echo htmlspecialchars($email); ?>" ><br>
        </p>
        <p>
            <label class="updateText" for="password">New Password</label><br> 
            <p id="password-error" style="display: none; color: red;">Password must be eight character</p>
            <input type="password" name="password" id="password" placeholder ="........"><br>
        </p>
        
        <p><button class="update_button" type="submit" name="update_button">Update</button></p>
       
    </form>


<div class="logout_container">
   <a href="logout.php"> <button class="logout_button">Logout</button></a>
 </div>
    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $new_user = $_POST['username'];
        $new_email = $_POST['email'];
        $new_password = $_POST['password'];
        $check = true; 
        $errors['password_error'] = null;
        $errors['username_length'] = null;
        $errors['username_error'] = null;
        $errors['email_error'] = null;

        $servername = "127.0.0.1";
        $user = "root";
        $password = "K@C12345";
        $database = "testDB";
        $connection = new mysqli($servername, $user, $password, $database);

        if ($connection->connect_error) {
            die("Connection failed: " . $connection->connect_error);
        }

        if ($new_password != '' && strlen($new_password) < 8) {
            $errors['password_error'] = "Password must be at least 8 characters long";
            $check = false;
        }
    
        if ($new_user != '' && strlen($new_user) < 8) {
            $errors['username_length'] = "Username must be at least 8 characters long";
            $check = false;
        }

        $sql = "SELECT * FROM users";
        $result = $connection->query($sql);

    

        if (!$result) {
            die("Invalid query: " . $connection->error);
        }

        while ($row = $result->fetch_assoc()) {
            if ($new_user != $username && $row['Username'] == $new_user) {
                $errors['username_error'] = "Username is already taken. Please use another";
                $check = false;
            }
            if ($new_email != $email && $row['Email'] == $new_email) {
                $errors['email_error'] = "Email is already taken";
                
                $check = false;
            }
        }

        if($errors['password_error'] != null){
            echo "<script>showError('password-error');</script>";
        }

        if($errors['username_length'] != null){
            echo "<script>showError('username-length');</script>";
        }

        if($errors['username_error'] != null){
            echo "<script>showError('username-error');</script>";
        }

        if($errors['email_error'] != null){
            echo "<script>showError('email-error');</script>";
        }

        
    

        if($check){
            if($new_password != $password && $new_password != ''){
                $stmt = $connection->prepare("UPDATE users SET Password = ? WHERE Username = ?");
                $stmt->bind_param("ss", $new_password, $username);
                

                if ($stmt->execute()) {
                    $_SESSION['password'] = $new_password;
                    echo "Update Successful";
                } else {
                    echo "Update Failed: " . $stmt->error;
                }
                $_SESSION['password'] = $new_password;

                $stmt->close();

            }

            if($new_email != $email && $new_email != ''){
                $stmt = $connection->prepare("UPDATE users SET Email = ? WHERE Username = ?");
                $stmt->bind_param("ss", $new_email, $username);
                echo $new_user;
                echo $username;

                if ($stmt->execute()) {
                    $_SESSION['email'] = $new_email;
                    echo "Update Successful";
                } else {
                    echo "Update Failed: " . $stmt->error;
                }
                $_SESSION['email'] = $new_email;

                $stmt->close();

            }
            
            if($new_user != $username && $new_user != ''){
                $stmt = $connection->prepare("UPDATE users SET Username = ? WHERE Username = ?");
                $stmt->bind_param("ss", $new_user, $username);
                echo $new_user;
                echo $username;

                $new = $connection->prepare("UPDATE test SET Username = ? WHERE Username = ?");
                $new->bind_param("ss", $new_user, $username);
                $new ->execute();

                

                $stmt->execute();

                $_SESSION['username'] = $new_user; 

                $stmt->close();
                $new->close();

            }
            

        }

        
            

        $connection->close();
    }
    ?> 
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
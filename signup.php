<?php
session_start();
$servername = "127.0.0.1";
$username = "root";
$password = "K@C12345";
$database = "testDB";
$connection = new mysqli($servername, $username, $password, $database);

if ($connection->connect_error){
    die("Connection failed: " . $connection->connect_error);
}
    

?>

<!DOCTYPE html>
<html lang="en"> 
<head> 
<meta charset="UTF-8">    
<meta http-equiv="X-UA-Compatible" content="IE-edge"> 
<meta name="viewport" content="width=device-width, initial-scale=1.0" />  
<title>FBLA</title>  
<link rel="stylesheet" href="css1.css">     
 
</head> 
<body class="body"> 
    <div class="account-container"> 
        <?php
            if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['register_button'])) {
                header("Location: /members.php");
                exit;
            }
        ?>
            
        <form action="email_verify.php" method="post" class="account-form" id="createAccount"> 
            <h3 class="form__title">Create Account</h3> 
            <div class="form__message form__message--error"></div>

                <p id="username-error" style="display: none; color: red;">Username needs to be eight characters</p><p id="username-error1" style="display: none; color: red">Username is already taken</p>
            <div class="form__input-group"> 
                <input name="username" type="text" id="signupUsername" class="form__input" autofocus placeholder="Username"> 
                <div class="form__input-error-message"></div>
            </div>   

                <p id="email-error" style="display: none; color: red;">Email is already taken</p>
            <div class="form__input-group"> 
                <input type="email" name="user_email" class="form__input" autofocus placeholder="Email Address"> 
                <div class="form__input-error-message"></div>
            </div>  

                
                <p id="password-error" style="display: none; color: red">Password needs to be eight characters</p>
            <div class="form__input-group"> 
                <input type="password" name="password" class="form__input" autofocus placeholder="Password"> 
                <div class="form__input-error-message"></div>
            </div>   

            <button type="submit" class="form__button" name="register_buttton" onclick="location.href='email_verify.php'">Continue</button>
        
            <p class="form__text"> 
                <a class="form__link" href="login.php" id="linkLogin" >Already have an account? Sign in</a>
            </p>
        </form>  
    </div>
    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Assign POST parameters to variables with a fallback to null if not set
        $username_error = isset($_POST['username_error']) ? $_POST['username_error'] : null;
        $email_error = isset($_POST['email_error']) ? $_POST['email_error'] : null;
        $password_error = isset($_POST['password_error']) ? $_POST['password_error'] : null;
        $username_length = isset($_POST['username_length']) ? $_POST['username_length'] : null;
    
        // Check each variable and handle accordingly with debugging output
        if ($username_error !== null) { // if username stores an error, display block
            echo "<script>
                var username_error = document.getElementById('username-error1');
                username_error.style.display = 'block';
            </script>";
        } //shows user the semantic error of username already in database
    
        if ($email_error !== null) {
            echo "<script>
                var email_error = document.getElementById('email-error');
                email_error.style.display = 'block';
            </script>"; 
        } //semantic error of email already in database
    
        if ($password_error !== null) {
            echo "<script>
                var password_error = document.getElementById('password-error');
                password_error.style.display = 'block';
            </script>";
        } //semantic error of password being too short in length
    
        if ($username_length !== null) {
            echo "<script>
                var username_length = document.getElementById('username-error');
                username_length.style.display = 'block';
            </script>";
        } 
    }
    ?>
</body> 
</html>
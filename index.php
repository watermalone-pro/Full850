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

            
        <form action="index.php" method="post" class="account-form" id="createAccount"> 
            <h3 class="form__title">Create Account</h3> 
            <div class="form__message form__message--error"></div>

                <p id="username-error" style="display: none; color: red;">Username is taken or needs to be eight characters</p><p id="username-error1" style="display: none; color: red">Username is already taken</p>
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

            <button type="submit" class="form__button" name="register_buttton" onclick="location.href='signup.php'">Continue</button>
        
            <p class="form__text"> 
                <a class="form__link" href="login.php" id="linkLogin" >Already have an account? Sign in</a>
            </p>
        </form>  
    </div>
    <?php
    $login_user = ' ';
    $login_email = ' ';
    $login_password = ' ';
    $user_valid = true; 
    $email_valid = true; 
    $password_valid = true; 
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
       $login_user = $_POST['username'];
       $login_email = $_POST['user_email'];
       $login_password = $_POST['password'];
       
        $host = "127.0.0.1";
        $user = "root";
        $password = "K@C12345";
        $database = "testDB";

        $connection = mysqli_connect($host, $user, $password, $database);

        $qry = mysqli_query($connection, "SELECT * FROM users");
        while($result = mysqli_fetch_array($qry)){
            if(($login_user == $result['Username']) || (strlen($login_user) < 8)){
                $user_valid = false; 
                

            }
            
            if($login_email == $result['Email']){
                $email_valid = false;
                
                
            }

            if(strlen($login_password) < 8){
                $password_valid = false;
                
            }
        }
        if($user_valid && $email_valid && $password_valid){
            $conn = new mysqli($host, $user, $password, $database);
            $stmt = $conn -> prepare("INSERT INTO users(Username, Email, Password) VALUES(?, ?, ?)");
            $stmt -> bind_param("sss",$login_user, $login_email, $login_password);
            $stmt -> execute();
            $_SESSION['username'] = $login_user;
            $_SESSION['password'] = $login_password; 
            $_SESSION['email'] = $login_email;
            $stmt -> close();
            $conn -> close();
            header('location:/home.php');
            exit;
            

        }
        
       
        

        
    
    ?>

    <script>
    var userErrorElement = document.getElementById('username-error');
    var emailErrorElement = document.getElementById('email-error');
    var passwordErrorElement = document.getElementById('password-error');
    
    // Show/hide elements based on validation results
    userErrorElement.style.display = <?php echo $user_valid ? "'none'" : "'block'"; ?>;
    emailErrorElement.style.display = <?php echo $email_valid ? "'none'" : "'block'"; ?>;
    passwordErrorElement.style.display = <?php echo $password_valid ? "'none'" : "'block'"; ?>;
    </script>
    <?php
    if (isset($connection)) {
        mysqli_close($connection);
    }
}   
?>

</body> 
</html>
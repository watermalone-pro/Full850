<?php
session_start();
?>

<html lang="en"> 
<head> 
<meta charset="UTF-8">    
<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
<meta name="viewport" content="width=device-width, initial-scale=1.0" />  
<title>FBLA</title>  
<link rel="stylesheet" href="css1.css">     
</head> 
<body class="body"> 
    <form action="login.php" method="post" class="account-form" id="login"> 
    <div class="account-container"> 
    <h3 class="form__title">Login</h3> 
    
        <!-- Shows error messages on form -->
        <p id="error-message" style="display: none; color: red">Either Email, Username, or Password is incorrect</p>
        <div class="form__message form__message--error"></div>
        <div class="form__input-group"> 
            <input type="text" name="email" class="form__input" autofocus placeholder="Email or Username"> 
            <div class="form__input-error-message"></div>
        </div> 
        <div class="form__input-group"> 
            <input type="password" name="password" class="form__input" autofocus placeholder="Password"> 
            <div class="form__input-error-message"></div>
        </div>  
        <button class="form__button" name="login-button" type="submit">Continue</button>
        </p> 
        <p class="form__text"> 
            <a class="form__link" href="signup.php" id="linkCreateAccount">Don't have an account? Create account</a>
        </p>
    </form>   
    </div>  

    <?php
    $login_user = '';
    $login_password = '';

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $_SESSION['login_user'] = $_POST['email'];
        $login_user = $_SESSION['login_user'];
        $_SESSION['login_password'] = $_POST['password'];
        $login_password = $_SESSION['login_password'];
        
        $servername = "127.0.0.1";
        $username = "root";
        $password = "PrincessBella45!";
        $database = "test_schema";
        $connection = new mysqli($servername, $username, $password, $database);

        if($connection->connect_error){
            die("connection failed: " . $connection->connect_error);
        }

        $sql = "SELECT * FROM email_verify";
        $result = $connection->query($sql);

        if(!$result){
            die("Invalid query: " . $connection->error);
        }

        $found = false;

        while ($row = $result->fetch_assoc()) {
            if (($row["Username"] == $login_user || $row["verified_email"] == $login_user) && $row["password"] == $login_password) {
                echo $login_user;
                echo $login_password;
                $found = true;
                $_SESSION['username'] = $row["Username"];
                $_SESSION['email'] = $row['verified_email'];
                header('location:/index.php');
                exit;
            }
        }

        if(!$found){
            echo "<script>
                var message = document.getElementById('error-message');
                message.style.display = 'block';
              </script>";
        }

        $connection->close();
        session_destroy();
    }

    if (isset($_SESSION['login_user'])) {
        $login_user = $_SESSION['login_user'];
    }
    if (isset($_SESSION['login_password'])) {
        $login_password = $_SESSION['login_password'];
    }
    ?>
</body> 
</html> 
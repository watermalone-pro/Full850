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
            <a class="form__link" href="index.php" id="linkCreateAccount">Don't have an account? Create account</a>
        </p>
    </form>   
    </div>  

    <?php
    $login_user = ' ';
    $login_password = ' ';
    $login_email = ' ';
    $valid = false; 
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $login_user = $_POST['email'];
        $login_password = $_POST['password'];
        

        $host = "127.0.0.1";
        $user = "root";
        $password = "K@C12345";
        $database = "testDB";

        $connection = mysqli_connect($host, $user, $password, $database);

        $qry = mysqli_query($connection, "SELECT * FROM users");
        while($result = mysqli_fetch_array($qry))
        {
            if(($login_user == $result["Username"] && $login_password == $result["Password"]) || ($login_user == $result['Email'] && $login_password == $result["Password"])){
                $valid = true; 
                $login_email = $result['Email'];
            }
        }

        if($valid){
            $_SESSION['username'] = $login_user; 
            $_SESSION['password'] = $login_password;
            $_SESSION['email'] = $login_email;

            
            header('location:/home.php');
            exit;
        }
        


    
    ?>
    <script>
        var message = document.getElementById("error-message");
        message.style.display = <?php echo $valid? "'none'" : "'block'"; ?>;

    </script>
    <?php
        if (isset($connection)) {
                mysqli_close($connection);
        }
    }
    ?>
</body> 
</html> 
<?php 
session_start(); // Start the session to be able to destroy it
session_destroy(); // Destroy the session

// Remove any debug statements or ensure they come after the header
header('Location:/login.php'); 
exit();


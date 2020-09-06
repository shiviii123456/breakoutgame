<?php
session_start();
    if(!isset($_SESSION['email']))
    {
        header('location:login.php');
    }
 ?>
 
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>frontpage</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Welcome,<?php echo $_SESSION['name']; ?></h1>
    <div class="image">
       <img src="https://stackabuse.s3.amazonaws.com/media/introduction-to-phaser-3-building-breakout-4.png" alt=" game loading">
        <button id="btn1" class="btn" onclick="window.location.href ='index.html'">Start Game</button>
    </div>   
</body>
</html>



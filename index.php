
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login</title>
    <link href="https://fonts.googleapis.com/css2?family=Lexend+Peta&display=swap" rel="stylesheet">
    <style>
    *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;   
    font-family: 'Lexend Peta', sans-serif; 
    }
    body{
        background-image: url(https://cdn5.vectorstock.com/i/1000x1000/78/04/open-book-background-flat-design-vector-5877804.jpg);
        padding: 0;
        margin: 0;
        background-position: center;
        background-size: cover;
        font-family: 'Lexend Peta', sans-serif;
        
    }
    .hea{
        margin-top: 10px;
        width: 400px;
 
     
        height: 50px;
        
        background-color:rgb(219, 216, 216);
        border-radius: 10px;
         margin-bottom: 0 px;
         justify-content: center;
         display: flex;
         margin-left: 450px;
        
        }
    .star{
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100px;
    
    }
    #logo{
        padding: 10px;
        height: 60px;
        color: bisque;
        font-weight: bold;
       background-image: linear-gradient(black,white);
        font-size: 30px;
        display: flex;
        justify-content: center;
       border-radius: 15px;
    }
    
    .topcontainer{

        margin: 20px 10px 101px 500px ;
        justify-content: center;
        height: 50px;
        width: 50px;

    }  

    #frst, #second, #thrd, #forth, #fifth, #sixth{

        justify-content: center;
        width: 265px;
        padding: 10px 0px 0px 18px;
        height: 50px;
        background-color:rgb(235, 168, 168);
        height: auto;

    }
    .abc{

      
      margin-top: 250px;
      margin-left: 450px;
      margin-right: 450px;
      display: flex;
      padding: 10px 50px 10px 0px;
      justify-content: space-evenly;


    }

    .abc a{
        
        padding: 10px 10px 10px 10px;
        background-color: lightpink;


    }
    #abcd{

        height: 40px;
        border-radius: 10px;
        background-color: lightblue;
        padding: 0px 10px 0px 10px ;
        }
        a:hover{
            color: black;
            transform: scale(1.2);
        }
</style>

</head>

<body>
<?php
        include 'connect.php';
        if(isset($_POST['submit']))
        {
            $frstname = mysqli_real_escape_string($conn,  $_POST['myname']);
            $lastname =  mysqli_real_escape_string($conn,  $_POST['mname']);
            $email = mysqli_real_escape_string ($conn,  $_POST['myemail']);
            $mobileno = mysqli_real_escape_string($conn,  $_POST['myno']);
            $pas =  mysqli_real_escape_string($conn,  $_POST['psw']);
            $confrmpassword = mysqli_real_escape_string($conn,  $_POST['pass']);
          
       
            $passs = md5($pas);
            $cpasss = md5($confrmpassword);
        
            $emailquery = " select * from studentdata where email='$email' ";
             $query = mysqli_query($conn,$emailquery);
             $emailcount=mysqli_num_rows($query);

             function isvalidemail($email){
                 return filter_var($email,FILTER_VALIDATE_EMAIL) && preg_match('/@.+\.',$email);

             }

           if($emailcount>0)
           {
               echo "email already registered";
    
           }
           else
           {
               

               if($pas === $confrmpassword){
              
                $sql = "insert into studentdata(firstname,lastname,email,mobilenumber,passw,cnfrmpassword) values('$frstname','$lastname','$email','$mobileno','$passs','$cpasss')";
              
               
                $execute= mysqli_query($conn,$sql);
                if($execute)
                {
                    echo "inserted successfully";
                    header("location: login.php");
                }
                else
                {
                   echo "not inserted";
                }
              }
               else
               {
                echo " password not matching";
               }
        
            
            }
    }

    ?>
 
      <div class="star">
        <nav>
            <label id="logo">Apni kaksha</label> 
        </nav>   
    </div>
      
    <form id="form" action="" method="POST">
        <h1 class="hea">Create account</h1>
        <div class="topcontainer">
            <div id="frst">
                <input type="text" placeholder="First name" name="myname" required>
            </div>
            <br>
            <div id="second">

                <input type="text" placeholder="last name" name="mname" required>
            </div>
            <br>
            <div id="thrd">
                <input type="email" placeholder="Email" name="myemail" required>
            </div>
            <br>
            <div id="forth">
                <input type="number" placeholder="mobile number" name="myno" required>
            </div>
            <br>
            <div id="fifth">

                <input type="password" placeholder="Enter Password..." name="psw" required>
            </div>
            <br>
        
            <div id="sixth">

                <input type="password" placeholder="Enter Password..." name="pass" required>
            </div>
            <br>
       
        </div>
        <div class="abc">
        <button id="abcd" type="submit" name="submit">Create Account</button>
        <a href="login.php"> Login now </a>
        </div>
    </form>
</body>

</html>
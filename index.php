
<?php 
if(isset($_POST['submit'])){
    $to = "jaysureshsharma@gmail.com"; // this is your Email address
    $from = $_POST['email']; // this is the sender's Email address
    $full_name = $_POST['full_name'];
    $number = $_POST['number'];
    $subject = "Form submission";
    $subject2 = "Copy of your form submission";
    $message = $full_name . " wrote the following:" . "\n\n" . $_POST['message'];
    $message2 = "Here is a copy of your message " . $full_name . "\n\n" . $_POST['message'];

    $headers = "From:" . $from;
    $headers2 = "From:" . $to;
    mail($to,$subject,$message,$headers);
    mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
    echo "<script>
         $(window).load(function(){
             $('#thankyouModal').modal('show');
         });
    </script>";
    // echo "Mail Sent. Thank you " . $full_name . ", we will contact you shortly.";
    
    // You can also use header('Location: thank_you.php'); to redirect to another page.
    }
    ?>



<!-- Preferable use this - with sanitization -->



<?php
if(isset($_POST["submit"])) {
        // Checking For Blank Fields..
    if($_POST["full_name"]==""||$_POST["email"]==""||$_POST["number"]==""||$_POST["message"]==""){
       echo "Please fill out everything as it helps us get in touch with you sooner";}
    else
        {
        // Check if the "Sender's Email" input field is filled out
        $email=$_POST['email'];
                // Sanitize E-mail Address
        $email =filter_var($email, FILTER_SANITIZE_EMAIL);
                // Validate E-mail Address
        $email= filter_var($email, FILTER_VALIDATE_EMAIL);
        $emailConfirmed=$_POST['email'];
        if (!$email){
          echo "Don't forget to include your email address!";
                }
                else
                {
                    $subject = $_POST['number'];
                    $message = $_POST['message'];
                    $headers =  'From:' . $emailConfirmed . "\r\n"; // Sender's Email
                    $headers .= 'Cc:' . $emailConfirmed . "\r\n"; // Carbon copy to Sender
                    // Message lines should not exceed 70 characters (PHP rule), so wrap it
                    $message = wordwrap($message, 70);
                    // Send Mail By PHP Mail Function
                    mail("jaysureshsharma@gmail.com", $subject, $message, $headers);
                      echo "<script>
         $(window).load(function(){
             $('#thankyouModal').modal('show');
         });
    </script>";
                };
    }
 }
?>
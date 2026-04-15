<?php 
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require __DIR__.'/vendor/autoload.php';
    if($_SERVER["REQUEST_METHOD"]== "POST"){
        $nom = htmlspecialchars(trim($_POST["nom"]));
        $prenom = htmlspecialchars(trim($_POST["prenom"]));
        $email = htmlspecialchars(trim($_POST["email"]));
        $sujet = htmlspecialchars(trim($_POST["sujet"]));
        $message = htmlspecialchars(trim($_POST["message"]));

        $mail = new PHPMailer(true);

        try{
            // config
            $mail->isSMTP();
            $mail->Host ="ssl0.ovh.net";
            $mail->SMTPAuth = true;
            $mail->Username = 'info@acysteek.com';
            $mail->Password = '123azertY123!?';
            $mail->SMTPSecure ='ssl';
            $mail->Port = 465;

            $mail->setFrom('info@acysteek.com', 'Formulaire Contact');
            $mail->addAddress('info@acysteek.com');
            $mail->addReplyTo($email,$nom.' '.$prenom);

            $mail->isHTML(true);
            $mail->Subject = $sujet;
            $mail->Body = "Nom: $nom<br>Prenom: $prenom<br>Email: $email<br>Message: $message";

            $mail->send();

            header("Location:../frontend/success.html");
            exit();
        }catch(Exception $e){
             echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            header("Location:../frontend/error.html");
            exit();
        }
    }

?>
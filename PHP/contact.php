<?php 
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require __DIR__.'/vendor/autoload.php';
    $c = require __DIR__.'/private/config.php';
    if($_SERVER["REQUEST_METHOD"]== "POST"){
        $nom = !empty($_POST["nom"]) ? htmlspecialchars(trim($_POST["nom"])) : "Anonyme";
        $prenom = !empty($_POST["prenom"]) ? htmlspecialchars(trim($_POST["prenom"])) : "";
        $email = !empty($_POST["email"]) ? htmlspecialchars(trim($_POST["email"])) : "";
        $sujet = !empty($_POST["sujet"])  ? htmlspecialchars(trim($_POST["sujet"])) : "Sans sujet";
        $message = !empty($_POST["message"]) ? htmlspecialchars(trim($_POST["message"])) : "";

        if(empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)){
            error_log("formulaire contact: adresse email invalide: $email");
            header("Location:../frontend/error.html");
        }
        if(empty($sujet)){
            error_log("formulaire contact: sujet invlide: $sujet" );
            header("Location:../frontend/error.html");
        }
        if(empty($message ) || strlen($message)< 10){
            error_log("formulaire contact: message invalide: $message" );
             header("Location:../frontend/error.html");
        }
        $mail = new PHPMailer(true);

        try{
            // config
            $mail->isSMTP();
            $mail->Host = $c["smtp_host"];
            $mail->SMTPAuth = true;
            $mail->Username = $c["smtp_user"];
            $mail->Password = $c["smtp_pwd"];
            $mail->SMTPSecure =$c["smtp_secure"];
            $mail->Port = $c["smtp_port"];

            $mail->setFrom($c["smtp_user"], 'Formulaire Contact');
            $mail->addAddress($c["smtp_user"]);
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
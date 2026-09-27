<?php


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

    require __DIR__.'/vendor/autoload.php';
    require_once __DIR__.'/helpers.php';
    


    $dotenv =Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    if($_SERVER["REQUEST_METHOD"]== "POST"){
        $nom = !empty($_POST["nom"]) ? htmlspecialchars(trim($_POST["nom"])) : "Anonyme";
        $prenom = !empty($_POST["prenom"]) ? htmlspecialchars(trim($_POST["prenom"])) : "";
        $email = !empty($_POST["email"]) ? htmlspecialchars(trim($_POST["email"])) : "";
        $sujet = !empty($_POST["sujet"])  ? htmlspecialchars(trim($_POST["sujet"])) : "";
        $message = !empty($_POST["message"]) ? htmlspecialchars(trim($_POST["message"])) : "";

        if(empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)){
            error_log("formulaire contact: adresse email invalide: $email");
            repondre(false,"adresse email invalide.",400);
        }
        if(empty($sujet)){
            error_log("formulaire contact: service invalide: $sujet" );
            repondre(false,"service invalide",400);
        }   
        if(empty($message ) || strlen($message)< 10){
            error_log("formulaire contact: message invalide: $message" );
            repondre(false,"message invalide",400);
            
        }
        if(strcasecmp($email, $_ENV["SMTP_USER"]) === 0){
            error_log("formulaire contact: tentative d'usurpation d'email: $email");
            repondre(false,"tentative d'usurpation d'email",400);

        }
        $mail = new PHPMailer(true);

        try{
            // config
            $mail->isSMTP();
            $mail->Host = $_ENV["SMTP_HOST"];
            $mail->SMTPAuth = true;
            $mail->Username = $_ENV["SMTP_USER"];
            $mail->Password = $_ENV["SMTP_PWD"];
            $mail->SMTPSecure =$_ENV["SMTP_SECURE"];
            $mail->Port = $_ENV["SMTP_PORT"];

            $mail->setFrom($_ENV["SMTP_USER"], 'Formulaire Contact');
            $mail->addAddress($_ENV["SMTP_USER"]);
            $mail->addReplyTo($email,$nom.' '.$prenom);

            $mail->isHTML(true);
            $mail->Subject = " Acysteek Inc - $sujet";
            $mail->Body =
             "
            <p>De: $nom $prenom</p>
            <p><strong>Email:</strong>$email</p>
            <p>Message:<br> $message</p>
            <p style='font-size:12px;color:#555;'>Ce message a été envoyé automatiquement via le formulaire de contact du site AcySteek.</p>
            ";

            $mail->send();

            repondre(true,"Vôtre message a été bien envoyé",200);
        }catch(Exception $e){
             error_log("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
             repondre(false,"Une erreur est survenue veuillez reessayer",500);
        }
    }


?>
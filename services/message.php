<?php 
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require __DIR__.'/vendor/autoload.php';
    require_once __DIR__.'/helpers.php';
       
    $dotenv =Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $noms = !empty($_POST["chat_nom"]) ? htmlspecialchars(trim($_POST["chat_nom"])) : "Anonyme";
        $email = !empty($_POST["id_email"]) ? htmlspecialchars(trim($_POST["id_email"])) : "";
        $message = !empty($_POST["id_message"]) ? htmlspecialchars(trim($_POST["id_message"])) : "";

            if(empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)){
                error_log("formulaire chat: adresse email invalide: $email");
                repondre(false,"Adresse email invalide.",400);
             
            }
            if(empty($message ) || strlen($message)< 10){
                error_log("formulaire chat: message invalide: $message" );
                repondre(false,"Message invalide",400);
              
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
            $mail->Password =  $_ENV["SMTP_PWD"];
            $mail->SMTPSecure =$_ENV["SMPT_SECURE"];
            $mail->Port = $_ENV["SMTP_PORT"];

            $mail->setFrom($_ENV["SMTP_USER"], 'Formulaire Contact');
            $mail->addAddress($_ENV["SMTP_USER"]);
            $mail->addReplyTo($email,$noms);

            $mail->isHTML(true);
            $mail->Subject = "Acysteek Inc - Nouveau message de $noms";
            $mail->Body = "
            <p>De: $noms</p>
            <p><strong>Email:</strong>$email</p>
            <p>Message:<br> $message</p>
            <p style='font-size:12px;color:#555;'>Ce message a été envoyé automatiquement via le formulaire de contact du site AcySteek.</p>
            ";
            $mail->send();

            repondre(true,"Message envoyé avec succès",200);
           
        }catch(Exception $e){
            error_log("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
            repondre(true,"Une erreur est survenue veuillez reessayer",500);
            
        }

    }

?>
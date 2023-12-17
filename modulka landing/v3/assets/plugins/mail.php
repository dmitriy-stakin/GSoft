<?php
header( "refresh:0;url=/thanks.html" );

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/vendor/autoload.php';

if (count($_POST) > 0) {
    $message = '<b>Имя:</b> ' . ($_POST['ur-name'] ? $_POST['ur-name'] : 'Аноним') . '<br>';
    $message .= '<b>Телефон:</b> ' . ($_POST['ur-phone'] ? $_POST['ur-phone'] : 'Не указано') . '<br>';
    if($_POST['ur-rest']) {
        $message .= '<b>Название ресторана:</b> ' . $_POST['ur-rest'] . '<br>';
    }
    if($_POST['ur-city']) {
        $message .= '<b>Город:</b> ' . $_POST['ur-city'] . '<br>';
    }
    
    $mail = new PHPMailer(true);
    try {
        $mail->SMTPDebug = 0;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'mail.gandi.net';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'main@sellkit.cc';                     //SMTP username
        $mail->Password   = '1DbSb**3';                  //SMTP password
        $mail->SMTPSecure = 'ssl';            //Enable implicit TLS encryption
        $mail->Port       = 465;  
        $mail-> CharSet   = 'UTF-8';
        
        //Recipients
        $mail->setFrom('main@sellkit.cc', 'Mail Tester');
        $mail->addAddress('main@sellkit.cc');
        $mail->addReplyTo('main@sellkit.cc');

        //Content
        $mail->isHTML(true);                                        //Set email format to HTML
        $mail->Subject = 'Заявка с сайта Sell Kit';
        $mail->Body    = $message;

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

}

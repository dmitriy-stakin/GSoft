<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/vendor/autoload.php';

if (count($_POST) > 0) {
    $message = '<b>Имя:</b> ' . ($_POST['ur-name'] ? $_POST['ur-name'] : 'Аноним') . '<br>';
    $message .= '<b>Телефон:</b> ' . ($_POST['ur-phone'] ? $_POST['ur-phone'] : 'Не указано') . '<br>';
    if($_POST['ur-city']) {
        $message .= '<b>Город:</b> ' . $_POST['ur-city'] . '<br>';
    }
    if($_POST['ur-rest']) {
        $message .= '<b>Название организации:</b> ' . $_POST['ur-rest'] . '<br>';
    }
    if($_POST['ur-type']) {
        $message .= '<b>Тип бизнеса:</b> ' . $_POST['ur-type'] . '<br>';
    }
   

    $data = [
        'title' => "Новый лид от ".($_POST['ur-name'] ? $_POST['ur-name'] : 'Аноним'),
        'name' => ($_POST['ur-name'] ? $_POST['ur-name'] : 'Аноним'),
        'phone' => ($_POST['ur-phone'] ? $_POST['ur-phone'] : 'Не указано'),
        'ur-city' =>($_POST['ur-city'] ? $_POST['ur-city'] : 'Не указано'),
        'ur-type' =>'Название организации:' . $_POST['ur-rest'],
        'ur-type' =>'Тип бизнеса:' . $_POST['ur-type']
    ];
   
   
   
$queryUrl = 'https://sellkit.bitrix24.ru/rest/1/no9al0f410bhvx4w/crm.lead.add.json';
$queryData = http_build_query(array(
 'fields' => array(
	 "TITLE" => $data['title'],
	 "NAME" => $data['name'],
	 "STATUS_ID" => "NEW",
	 "OPENED" => "Y",
	 "ASSIGNED_BY_ID" => 1,
	 "PHONE" => array(array("VALUE" => $data['phone'], "VALUE_TYPE" => "WORK" )),
	 "COMMENTS" => $data['ur-type'],
     "ADDRESS_CITY" =>$data['ur-city']
 ),
 'params' => array("REGISTER_SONET_EVENT" => "Y")
));

$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_SSL_VERIFYPEER => 0,
  CURLOPT_POST => 1,
  CURLOPT_HEADER => 0,
  CURLOPT_RETURNTRANSFER => 1,
  CURLOPT_URL => $queryUrl,
  CURLOPT_POSTFIELDS => $queryData,
));

$result = curl_exec($curl);
curl_close($curl);
   
   
   
   
   
   
   /*
   
   
    $link = "https://b24-vdiwgp.bitrix24.ru/rest/1/j00b0c30gf8jwg14/crm.lead.add.json?";
    $url = urlencode("FIELDS[TITLE]=".$data['title'].
           "&FIELDS[NAME]=".$data['name']."&FIELDS[PHONE][0][VALUE]=".$data['phone']."&FIELDS[PHONE][0][VALUE_TYPE]=WORK&".
           "FIELDS[COMMENTS]=".$data['ur-type']."&FIELDS[ADDRESS_CITY]=".$data['ur-city']);
   
  
    $curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => $link.$url,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'Cookie: qmb=0.'
  ),
));
$response = curl_exec($curl);
curl_close($curl);
*/
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
        $mail->setFrom('main@sellkit.cc', 'SellKit Bot');
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

header( "refresh:0;url=/thanks.html" );
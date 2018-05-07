<?php
    $name = htmlspecialchars(urldecode(trim($_POST['feedback-name'])));
    $phone = htmlspecialchars(urldecode(trim($_POST['feedback-tel'])));
    $message = htmlspecialchars(urldecode(trim($_POST['feedback-message'])));
    $mail = trim($_POST['feedback-mail']);
    $check = htmlspecialchars(urldecode(trim($_POST['phone-check'])));

    $subject = '=?utf-8?B?'.base64_encode('Сообщение из формы сайта').'?=';
    $to = 'kafe@lukomorie96.ru';

    $nameCheck = !empty ($name);
    $phoneCheck = !empty ($phone);
    $messageCheck = !empty ($message);
    $mailCheck = !empty ($mail);

    if ($nameCheck && $phoneCheck && $messageCheck && $mailCheck && !$check) {
        mail($to, $subject, 'Имя: '.$name.'<br/>'.'
        Контактный телефон: '.$phone.'<br/>'.'
        Эл. почта: '.$mail.'<br/>'.'
        Сообщение: '.$message, "Content-Type: text/html; charset=utf-8");

        $redirect = isset($_SERVER['HTTP_REFERER'])? $_SERVER['HTTP_REFERER']:'thanx.html';
        header("Location: $redirect");
        exit();
    } else {
        $redirect = isset($_SERVER['HTTP_REFERER'])? $_SERVER['HTTP_REFERER']:'index.html';
        header("Location: $redirect");
        exit();
    }
?>

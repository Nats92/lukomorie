<?php
  $name = htmlspecialchars(urldecode(trim($_POST['name'])));
  $phone = htmlspecialchars(urldecode(trim($_POST['mobile-phone'])));
  $message = htmlspecialchars(urldecode(trim($_POST['message'])));
  $mail = trim($_POST['mail']);
  $check = htmlspecialchars(urldecode(trim($_POST['phone'])));

  $subject = '=?utf-8?B?'.base64_encode('Сообщение из формы сайта').'?=';
  $to = 'kafe@lukomorie96.ru';

  if (empty ($check)){
  mail($to, $subject, 'Имя: '.$name.'<br/>'.'
  Контактный телефон: '.$phone.'<br/>'.'
  Эл. почта: '.$mail.'<br/>'.'
  Сообщение: '.$message, "Content-Type: text/html; charset=utf-8");

  $redirect = isset($_SERVER['HTTP_REFERER'])? $_SERVER['HTTP_REFERER']:'redirect-form.html';
  header("Location: $redirect");
  exit();}
  else {
  $redirect = isset($_SERVER['HTTP_REFERER'])? $_SERVER['HTTP_REFERER']:'redirect-form.html';
  header("Location: $redirect");
  exit();
  }
?>

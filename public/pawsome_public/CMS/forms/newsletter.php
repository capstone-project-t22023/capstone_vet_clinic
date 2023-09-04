<?php
include 'main.php';
// Get all subscribers from the database
$stmt = $pdo->prepare('SELECT * FROM subscribers');
$stmt->execute();
$subscribers = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en-AU">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,minimum-scale=1">
      		<title>Send Newsletter</title>
        <!-- CSS FILE-->
        <link href="newsletter_style.css" rel="stylesheet" type="text/css">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.1.1/css/all.css">
	
	</head>
	<body>

		<form class="send-newsletter-form" method="post" action="">

			<h1><i class="fa-regular fa-envelope"></i>Send Newsletter</h1>

			<div class="fields">

                <label for="recipients">Recipients</label>
                <div class="multi-select-list">
                    <?php foreach ($subscribers as $subscriber): ?>
                    <label>
                        <input type="checkbox" class="recipient" name="recipients[]" value="<?=$subscriber['email']?>"> <?=$subscriber['email']?>
                    </label>
                    <?php endforeach; ?>
                </div>

                <label for="subject">Subject</label>
                <div class="field">
                    <input type="text" id="subject" name="subject" placeholder="Subject" required>
                </div>

                <label for="template">Email Template</label>
                <div class="field">
                    <textarea id="template" name="template" placeholder="Enter your HTML template code here..." required></textarea>
                </div>

                <div class="responses"></div>

			</div>

			<input id="submit" type="submit" value="Send">

		</form>

	</body>
</html>
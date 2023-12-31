<?php
include 'main.php';
// Ensure post variable exists
if (isset($_POST['email_addr'])) {
	// Validate email address
	if (!filter_var($_POST['email_addr'], FILTER_VALIDATE_EMAIL)) {
		exit(json_encode(array("status" => "failed", "msg" => "Please provide a valid email address!")));
	}
	// Check if email exists in the database
	$stmt = $pdo->prepare('SELECT * FROM subscribers WHERE email = ?');
	$stmt->execute([ $_POST['email_addr'] ]);
	if ($stmt->fetch(PDO::FETCH_ASSOC)) {
		exit(json_encode(array("status" => "failed", "msg" => "You're already a subscriber!")));
	}
	// Insert email address into the database
	$stmt = $pdo->prepare('INSERT INTO subscribers (email,date_subbed) VALUES (?,?)');
	$stmt->execute([ $_POST['email_addr'], date('Y-m-d\TH:i:s') ]);
	// Output success response
	exit(json_encode(array("status" => "success", "msg" => "Thank you for subscribing!")));
} else {
	// No post data specified
	exit(json_encode(array("status" => "failed", "msg" => "Please provide a valid email address!")));
}
?>
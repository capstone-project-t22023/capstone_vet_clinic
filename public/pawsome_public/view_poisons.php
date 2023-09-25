<?php
// Establish a database connection (replace with your credentials)
$conn = new mysqli("localhost", "root", "", "pet_poisons");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve selected animal type from the form
$animal_type = $_GET['animal_type'];

// Retrieve poison data based on the selected animal type
$sql = "SELECT * FROM poisons WHERE animal_type = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $animal_type);
$stmt->execute();
$result = $stmt->get_result();

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Pet Poison Guide - <?php echo $animal_type; ?></title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.5.0/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <h1>Pet Poison Guide - <?php echo $animal_type; ?></h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Symptoms<th>
                    <th>Urgency Level</th>
                </tr>
            </thead>
            <tbody>
                <?php
                while ($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>" . $row['name'] . "</td>";
                    echo "<td>" . $row['description'] . "</td>";
                    echo "<td>" . $row['symptoms'] . "</td>";
                    echo "<td>" . $row['urgency_level'] . "</td>";
                    echo "</tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
</body>
</html>

<?php
$stmt->close();
$conn->close();
?>

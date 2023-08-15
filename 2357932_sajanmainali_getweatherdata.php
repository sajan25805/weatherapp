<?php
$host = "localhost";
$username = "root";
$password = "";
$dbname = "climates";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = array();

$sql = "SELECT `description`, `temperature`,  `city`, `date`, `day_of_week`, `icon` FROM `data_weather` WHERE `city` = 'Guntersville' ORDER BY `id` ASC LIMIT 7";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

$conn->close();
header('Content-Type: application/json');
echo json_encode($data);
?>



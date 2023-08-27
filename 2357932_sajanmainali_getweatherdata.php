<?php
$host = "sql310.infinityfree.com";
$username = "if0_34903045";
$password = "b8dnH6582MqW0Q";
$dbname = "if0_34903045_climates";

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



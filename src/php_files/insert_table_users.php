<?php
// Retrieve POST data
$post_data = json_decode(file_get_contents("php://input"), true);

// Database connection parameters
$serverName = "tcp:sdproject.database.windows.net,1433";
$connectionOptions = array(
    "UID" => "vin1632", 
    "pwd" => "M@hl@ol@", 
    "Database" => "sdproject", 
    "LoginTimeout" => 30, 
    "Encrypt" => 1, 
    "TrustServerCertificate" => 0
);

// Establishing the connection
$conn = sqlsrv_connect($serverName, $connectionOptions);

if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}

// Prepare the SQL statement
$sql = "INSERT INTO users (Name, Surname, DOB, Event, Business, Education) VALUES (?, ?, ?, ?, ?, ?)";
$params = array(
    $post_data['Name'], 
    $post_data['Surname'], 
    $post_data['DOB'], 
    $post_data['Event'], 
    $post_data['Business'], 
    $post_data['Education']
);

// Execute the query
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
}

echo json_encode(array("message" => "Data inserted successfully"));

// Clean up resources
sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>

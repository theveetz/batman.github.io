<?php
include '../includes/db.php';
session_start();

if (!isset($_SESSION['username'])) {
    header('Location: ../login/login.php');
    exit();
}

$username = $_SESSION['username'];
$stmt = $db->prepare("SELECT * FROM users WHERE username = :username");
$stmt->bindValue(':username', $username, SQLITE3_TEXT);
$result = $stmt->execute();

if ($user = $result->fetchArray()) {
    // User found
} else {
    echo "User not found";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <header>
        <h1>Welcome, <?php echo $username; ?></h1>
        <nav>
            <a href="../logout/logout.php">Logout</a>
        </nav>
    </header>
    <main>
        <p>Username: <?php echo $user['username']; ?></p>
    </main>
</body>
</html>

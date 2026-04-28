<?php
$host = "sql200.infinityfree.com";     // Servidor
$user = "if0_41754312";          // Usuario de MySQL
$pass = "VxO7HKAitXJGEI";              // Contraseña (vacía si usas XAMPP)
$db   = "if0_41754312_visitas";       // Nombre de tu base de datos


$conexion = new mysqli($host, $user, $pass, $db);

// Verificar conexión
if ($conexion->connect_error) {
    die("Error en la conexión a la base de datos: " . $conexion->connect_error);
}
?>

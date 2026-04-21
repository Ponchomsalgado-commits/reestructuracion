<?php
$host = "localhost";     // Servidor
$user = "root";          // Usuario de MySQL
$pass = "";              // Contraseña (vacía si usas XAMPP)
$db   = "registrobd";       // Nombre de tu base de datos

$conexion = new mysqli($host, $user, $pass, $db);

// Verificar conexión
if ($conexion->connect_error) {
    die("Error en la conexión a la base de datos: " . $conexion->connect_error);
}
?>

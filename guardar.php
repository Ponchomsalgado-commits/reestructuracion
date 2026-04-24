<?php
include("conexion.php");

// Obtener los datos del formulario
$nombre = $_POST['nombre'];
$ciudad = $_POST['ciudad'];
$edad = $_POST['edad'];
$sexo = $_POST['sexo'];
$celular = $_POST['celular'];
$lugar = $_POST['lugar_nacimiento'];
$fecha = $_POST['fecha_nacimiento'];
$grado = $_POST['grado_estudio'];
$comentario = $_POST['comentarios'];

//Obtener primer nombre
$partes_nombre = explode(' ', $nombre);
$primer_nombre = $partes_nombre[0];

$sql = "INSERT INTO apellidos (nombre, ciudad, edad, sexo, celular, lugar_nacimiento, fecha_nacimiento, grado_estudio, comentarios)
        VALUES ('$nombre', '$ciudad', '$edad', '$sexo', '$celular', '$lugar', '$fecha', '$grado', '$comentario')";

if ($conexion->query($sql) === TRUE) {
    $partes_nombre = explode(' ', $nombre);
    $primer_nombre = $partes_nombre[0];

    header("Location: menu.html?n=" . urlencode($primer_nombre) . "&e=" . urlencode($edad)); 
    exit();

} else {
    echo "Error al guardar: " . $conexion->error;
}

$conexion->close();
?>
<?php
session_start();
$password_correcta = "INKLU2026"; 

if (isset($_POST['password'])) {
    if ($_POST['password'] === $password_correcta) {
        $_SESSION['acceso_concedido'] = true;
    } else {
        $error = "Código de acceso incorrecto";
    }
}

if (!isset($_SESSION['acceso_concedido']) || $_SESSION['acceso_concedido'] !== true) {
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>InkluEdu - Acceso Privado</title>
    <link rel="stylesheet" href="style.css">
    <style>
        body { display: flex; justify-content: center; align-items: center; height: 100vh; background: #c1e3e0; font-family: sans-serif; margin:0; }
        .card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center; width: 300px; }
        input { padding: 10px; width: 80%; margin: 15px 0; border: 1px solid #ccc; border-radius: 5px; }
        .boton { background-color: #1abc9c; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer; font-size: 16px; }
    </style>
</head>
<body>
    <div class="card">
        <img src="img/InkluEdu.svg" alt="Logo" style="height: 70px;">
        <h2>Prototipo Privado</h2>
        <p>Introduce el código del tríptico:</p>
        <?php if(isset($error)) echo "<p style='color:red'>$error</p>"; ?>
        <form method="POST" action="">
            <input type="password" name="password" placeholder="Código" required>
            <button type="submit" class="boton">Entrar</button>
        </form>
    </div>
</body>
</html>
<?php
    exit(); 
} 
?>
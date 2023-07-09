<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Morpion</title>
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
<select id="level" name="level" value="1">
        <option value="1">Level 1</option>
        <option value="2">Level 2</option>
        <option value="3">Level 3</option>
    </select>
    <select id="commenceur" name="commenceur" value="1">
        <option id="commenceurJoueur" value="1">Le joueur commence</option> 
        <option id="commenceurOrdinateur" value="0">L'ordinateur commence</option> 
    </select>
    <button id="rejouer">Rejouer</button>
<?php
    for( $j=0; $j<3; $j++ ) {
        echo "<div class='rows'>";
        for( $i=0; $i<3; $i++ ) {
            $n=$i+$j*3+1;
            echo "<div class='carre' id='carre-$n'></div>";
        }
        echo "</div>";
    }
?>
    <div id="message"></div>
    <script src="./js/script.js"></script>
</body>
</html>
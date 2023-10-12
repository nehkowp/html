<!doctype html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="
	width=device-width, initial-scale=1.0">
	<title>isBorisHere</title>
	<link rel="stylesheet" type="text/css" href="style.css">
	<link rel="shortcut icon" type="image/png" href="/faviconhome.png"/>
</head>
<body>
	<form method="post">
	<div class="container">
		<h2>isBorisHere</h2>
		<div class="row100">
			<div class="col">
				<div class="inputBox">
					<input type="text" name="prenom" id="prenom"required="required">
					<span class="text">Name</span>
					<span class="line"></span>
				</div>
			</div>
		<div class="row100">
			<div class="col">
				<input type="submit" id="formenvoi" name="formenvoi"value="Envoyer" class="bouton_submit">
			</div>
		</div>
	</div>

	</form>

	<div class="texte">
	<?php

		if(isset($_POST["formenvoi"])){
			$prenom =$_POST['prenom'];
			$nom=$_POST['nom'];
			$age=$_POST['age'];
			$email=$_POST['email'];
			$adresse=$_POST['adresse'];

			echo "Vous avez était enregistré en tant que ".$prenom." ".$nom;
			echo "<br>";
			echo "Vous âge est donc de ".$age;
			echo "<br>";
			echo "Nous pourrons vous contacter à cette e-mail".$email;
			echo "<br>";
			echo "Vous habitez à cette adresse : ".$adresse;



		}
	?>
	</div>

</body>

</html>

<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <title>Blacklist</title>
  </head>
  <body>
  
  <div class="container-fluid">
  <h1 class="text-center">Подтверждение регистрации Черный список</h1>
      <header>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
		  <div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
			  <li class="nav-item">
					<a class="nav-link" href="index.php">Главная</a>
			  </li>
			  	<li class="nav-item">
				<a class="nav-link" href="add.php">Добавить</a>
			  </li>
			  <li class="nav-item">
				<a class="nav-link" href="reg.php">Регистрация</a>
			  <li class="nav-item active">
				<a class="nav-link" href="auth.php">Вход</a>
			  </li>		
			  </li>			
			  <li class="nav-item">
				<a class="nav-link" id="logOut" href="javascript::void(0);">Выход</a>
			  </li>
			</ul>
		  </div>
		</nav>
	</header>
<div id="activationForm">
<script id="activationData" type="text/x-handlebars-template">
<div>
{{email}}
<br><a href="../auth.php">Перейти для входа</a>
</div> </script>
</div>	




    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
 <script src="content/js/handlebars/handlebars-v4.0.12.js"></script>
  <script src="content/js/global.js"></script>
 <script src="content/js/logout.js"></script>
 
 <script src="content/js/activation.js"></script>
 
  </body>
</html>

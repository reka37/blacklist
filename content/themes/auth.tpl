<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" href="content/css/main.css">
    <title>Blacklist</title>
  </head>
  <body> 
  <div class="container-fluid">
  <h1 class="text-center item animated fadeInRight">Вход Черный список</h1>
  <header class="item animated fadeInRight">
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<div id="accessNo" class="mr-sm-2">
					<script id="accessDataNo" type="text/x-handlebars-template">
						<ul class="navbar-nav mr-auto">
							 <li class="nav-item">
								<a class="nav-link" href="index.php">Главная</a>
							  </li>
								<li class="nav-item">
								<a class="nav-link" href="add.php">Добавить</a>
							  </li>
							  <li class="nav-item">
								<a class="nav-link" href="reg.php">Регистрация</a>
							  </li>										
								<li class="nav-item active">
								<a class="nav-link" href="auth.php">Вход</a>
							  </li> 
						</ul>	  
					</script>
				</div>
			<div id="accessYes">
				<script id="accessDataYes" type="text/x-handlebars-template">
					<ul class="navbar-nav mr-auto">
						<li class="nav-item active">
							<a class="nav-link" href="index.php">Главная</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="add.php">Добавить</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="reg.php">Регистрация</a>
						</li>		
					<li class="nav-item">
						<a class="nav-link" id="logOut" onclick="logOut()" href="javascript::void(0);">Выход</a>
					</li>
					</ul>
				</script>
			</div>		  			
		  </div>
		</nav>
	</header>
<form class="item animated fadeInRight">
  <div class="form-group">
    <label for="userLogin">Ваш email</label>
    <input type="email" class="form-control" id="userLogin" aria-describedby="emailHelp" placeholder="Введите email">
  </div>
  <div class="form-group">
    <label for="userPassword">Пароль</label>
    <input type="password" class="form-control" id="userPassword" placeholder="Пароль">
  </div>
  <button id="authBtn" type="submit" class="btn btn-primary">Войти</button>
</form>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
 <script src="content/js/handlebars/handlebars-v4.0.12.js"></script>
  <script src="content/js/global.js"></script>
 <script src="content/js/logout.js"></script>
 <script src="content/js/auth.js"></script>
  </body>
</html>

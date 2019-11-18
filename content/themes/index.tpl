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
  <h1 class="text-center item animated fadeInRight">Черный список</h1>
    <header class="item animated fadeInRight">
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<div id="accessNo" class="mr-sm-2">
					<script id="accessDataNo" type="text/x-handlebars-template">
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
<form id="addBadUserForm" class="display_none item animated fadeInRight">
  <div class="form-group">
    <label for="exampleInputEmail1">Имя</label>
    <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Введите имя">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Фамилия</label>
    <input type="text" class="form-control" id="surname" placeholder="Введите фамилию">
  </div>
<div class="form-group">
    <label for="exampleInputEmail1">Отчество</label>
    <input type="text" class="form-control" id="patronymic" aria-describedby="emailHelp" placeholder="Введите Отчество">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Город</label>
    <input type="text" class="form-control" id="city" placeholder="Введите город">
  </div><div class="form-group">
    <label for="exampleInputEmail1">Телефон</label>
    <input type="text" class="form-control" id="phone" aria-describedby="emailHelp" placeholder="Введите телефон">
  </div>
  <button type="submit" id="searchBtn" class="btn btn-primary">Поиск</button>
</form>
<div id="accessForm" class="item animated fadeInRight">
	<script id="accessData" type="text/x-handlebars-template">
		<div>
			<a href="auth.php">Войдите</a> или <a href="reg.php">зарегистрируйтесь</a> для использования сервиса!!!
		</div> 
	</script>
</div>		
<div>
	<table class="table" id="badUsersData">
	 <script id="categoryData" type="text/x-handlebars-template">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Имя</th>
      <th scope="col">Фамилия</th>
      <th scope="col">Отчество</th>
	  <th scope="col">Город</th>
      <th scope="col">Телефон</th>
	  <th scope="col">Комментарий</th>
	  <th scope="col">Подробнее</th>
    </tr>
  </thead>
  <tbody>
  {{#list results}} 
    <tr data-categoryid="{{id}}" data-addprogram="{{id}}">
      <th scope="row">{{id}}</th>
      <td>{{name}}</td>
	  <td>{{surname}}</td>
      <td>{{patronymic}}</td>
      <td>{{city}}</td>
	  <td>{{phone}}</td>
      <td>{{comment}}</td>
	  <td><a href="../detail.php?phone={{phone}}">Сcылка</a></td>
    </tr>	
	{{/list}}
	</script>
  </tbody>
</table>
	</div>
	</div>	 
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
	<script src="content/js/global.js"></script>
	<script src="content/js/logout.js"></script>
	<script src="content/js/index.js"></script>
	<script src="content/js/handlebars/handlebars-v4.0.12.js"></script>
  </body>
</html>

$(document).ready(function () {
	
	Handlebars.registerHelper('list', function (context, options) {
    var ret = "";

    for (var i = 0, j = context.length; i < j; i++) {
        ret = ret + options.fn(context[i]);
    }

		return ret;
	});
		
	function activation() {
		var params = window
    .location
    .search
    .replace('?','')
    .split('&')
    .reduce(
        function(p,e){
            var a = e.split('=');
            p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        },
        {}
    );
	console.log(params['email']);
	let email = params['email'];
	// создаем объект, который будем передавать на сервер
	
		let json = {
			"email": email
		};
		json = JSON.stringify(json);
		
	// отправляем данные на сервер и получаем ответ
	$.post(
	  global_address + "api/ApiAuth.php?action=activation",
		json).done((data) => { // если сервер работает корректно

	var srcActivationTable = $('#activationData').html();
	var tempActivationTable = Handlebars.compile(srcActivationTable);	
			// делаем проверку на правильность данных
			if (data.result == false) {

				$('#authForm').trigger('reset');

				// делаем кнопку активной
				$('button').removeAttr('disabled');
				var data_ = { email: 'Ошибка, Ваш email отсутствует в базе данных!' };
				$('#activationForm').html(tempActivationTable(data_));
			} else {
				
			var data_ = { email: 'Успешно!!! Вы подтвердили регистрацию!!!' };
				$('#activationForm').html(tempActivationTable(data_));
			}
		}).fail(() => { // если произошла ошибка соединения с сервером

			// выводим сообщение для пользователя
			// $('#error-server').addClass('show');
			alert('error server');

			// делаем кнопку активной
			$('button').removeAttr('disabled');
		});
	}
	activation();
	function authUser() {
		
	// получаем значения полей логина и пароля
	let email = $('#userLogin').val();
	let password = $('#userPassword').val();

	// создаем объект, который будем передавать на сервер
	let json = {
		"email": email,
		"password": password
	};

	json = JSON.stringify(json);
	// отправляем данные на сервер и получаем ответ
	$.post(
	  global_address + "api/ApiAuth.php?action=login",
		json).done((data) => { // если сервер работает корректно
		
			// делаем проверку на правильность данных
			if (data.result == false) {

				// если данные неверны, выводим сообщение
				// $('#error-auth').addClass('show');
				alert('error');

				// сбрасываем значения формы
				$('#authForm').trigger('reset');

				// делаем кнопку активной
				$('button').removeAttr('disabled');
			} else {
				let url = global_address + "index.php";
				$(location).attr('href', url);
			}
		}).fail(() => { // если произошла ошибка соединения с сервером

			alert('error server');
			// делаем кнопку активной
			$('button').removeAttr('disabled');
		});
	}

	$('#authBtn').on('click', function() { alert('fd');	
		authUser();
		// добаляем форме метод submit
		//$('#activationForm').submit();
	});
});
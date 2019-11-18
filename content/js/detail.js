// регистрируем Handlebars


$(document).ready(function() {
	
	Handlebars.registerHelper('list', function (context, options) {
    var ret = "";

    for (var i = 0, j = context.length; i < j; i++) {
        ret = ret + options.fn(context[i]);
    }

		return ret;
	});
	
		function detail() {
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
//	console.log(params['email']);
	let phone = params['phone'];
	// создаем объект, который будем передавать на сервер
		let json = {
			"phone": phone
		};
		json = JSON.stringify(json);
		
		 // обращаемся к таблице, копируем содержимое элемента в переменную
    var srcCategoryTable = $('#categoryData').html();

    // компилируем шаблон и создаем объект Handlebars
    var tempCategoryTable = Handlebars.compile(srcCategoryTable);
		
		
	// отправляем данные на сервер и получаем ответ
	$.post(
	  global_address + "api/ApiBadusers.php?action=detail",
		json).done((data) => { // если сервер работает корректно
	//data.result = true;
	
			// делаем проверку на правильность данных
			if (data.result == false) {

				// если данные неверны, выводим сообщение
				// $('#error-auth').addClass('show');
				//alert('error');

				// сбрасываем значения формы
				$('#authForm').trigger('reset');

				// делаем кнопку активной
				$('button').removeAttr('disabled');
				var data_ = { email: 'Ошибка, Ваш email отсутствует в базе данных!' };
				$('#activationForm').html(tempActivationTable(data_));
			} else {
				
				
		$('#badUsersData').html(tempCategoryTable(data));		
				
				
	
			}
		}).fail(() => { // если произошла ошибка соединения с сервером

			// выводим сообщение для пользователя
			// $('#error-server').addClass('show');
			alert('error server');

			// делаем кнопку активной
			$('button').removeAttr('disabled');
		});
	}
	detail();
	
	
    const errorTextServer = 'На сервере произошла ошибка! Пожалуйста, перезагрузите страницу.',
          errorAddCategory = 'Ошибка при добавлении категории. Попробуйте позже.',
          errorAddProgram = 'Ошибка при добавлении программы. Попробуйте позже.',
          errorEditCategory = 'Ошибка при изменении категории. Попробуйте позже.',
          errorEditProgram = 'Ошибка при изменении программы. Попробуйте позже.',
          errorDelCategory = 'Ошибка при удалении категории. Попробуйте позже.',
          errorDelProgram = 'Ошибка при удалении программы. Попробуйте позже.';

    function errorMessage(text) {
        $('#errorMessage').text(text);
        $('#errorMessage').removeClass('hide');
    }

    function errorGetData(text) {
        $('#errorGetData').text(text);
        $('#errorGetData').removeClass('hide');
    }

    function errorModal(text) {
        $('#errorModal').text(text);
        $('.modal-error').modal();
    }




});
$(document).ready(function () {
	
	var srcAccessNo = $('#accessDataNo').html();
	var tempAccessNo = Handlebars.compile(srcAccessNo);

	var srcAccessYes = $('#accessDataYes').html();
	var tempAccessYes = Handlebars.compile(srcAccessYes);
	
	getAccess();

    function getAccess() {
        // отправляем запрос на сервер
        $.post(global_address + 'api/ApiAuth.php?action=access', {}).done(function(data) { // если сервер работает корректно

		 if (data.result == false) {		  
			  $('#accessNo').html(tempAccessNo());
            } else {
				$('#accessYes').html(tempAccessYes());
				
			}			
        }).fail(function() { // если произошла ошибка соединения с сервером
            errorGetData(errorTextServer);
        });
    }
	
	
	
	
  function authUser() {
    // делаем кнопку неактивной
    $('button').attr('disabled', 'disabled');

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

            if (data.result == false) {

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

            // выводим сообщение для пользователя
            // $('#error-server').addClass('show');
            alert('error server');

            // делаем кнопку активной
            $('button').removeAttr('disabled');
        });
  }

  $('#authForm').on('submit', function(event) {
      // сбрасываем стандартный обработчик браузера для формы
      event.preventDefault();
  });

  $('#authBtn').on('click', function() { //alert('fd');
    authUser();
    // добаляем форме метод submit
    $('#authForm').submit();
  });
});
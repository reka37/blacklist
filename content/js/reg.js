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
		
  function regUser() {
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
      global_address + "api/ApiAuth.php?action=reg",
        json).done((data) => { // если сервер работает корректно
		
	var srcActivationTable = $('#activationData').html();
	var tempActivationTable = Handlebars.compile(srcActivationTable);

            if (data.result == false) {

                alert('error');

                // сбрасываем значения формы
                $('#authForm').trigger('reset');

                // делаем кнопку активной
                $('button').removeAttr('disabled');
            } else {
				
				var data_ = { message: 'Успешно! На Ваш email выслана сылка на подтверждение' };
				$('#activationForm').html(tempActivationTable(data_));
				$('button').attr('disabled', 'disabled');
            }
        }).fail(() => { // если произошла ошибка соединения с сервером
            alert('error server');

            // делаем кнопку активной
            $('button').removeAttr('disabled');
        });
  }

  $('#regForm').on('submit', function(event) {
      // сбрасываем стандартный обработчик браузера для формы
      event.preventDefault();
  });

  $('#regBtn').on('click', function() { //alert('fd');
    regUser();
    // добаляем форме метод submit
    $('#regForm').submit();
  });
});
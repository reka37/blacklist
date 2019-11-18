// регистрируем Handlebars

Handlebars.registerHelper('list', function (context, options) {
  var ret = "";

  for (var i = 0, j = context.length; i < j; i++) {
      ret = ret + options.fn(context[i]);
  }

  return ret;
});

$(document).ready(function() {

	var srcAccess = $('#accessData').html();
	var tempAccess = Handlebars.compile(srcAccess);

	var srcAccessNo = $('#accessDataNo').html();
	var tempAccessNo = Handlebars.compile(srcAccessNo);

	var srcAccessYes = $('#accessDataYes').html();
	var tempAccessYes = Handlebars.compile(srcAccessYes);
  
   getAccess();
	
    // ПОЛУЧЕНИЕ ДАННЫХ С СЕРВЕРА
    // загружаем данные в таблицу с сервера
    function getAccess() {
        // отправляем запрос на сервер
        $.post(global_address + 'api/ApiAuth.php?action=access', {}).done(function(data) { // если сервер работает корректно
            // записываем полученный результат в нашу таблицу
           
		 if (data.result == false) {

            $('#accessForm').html(tempAccess());
			  
			  $('#accessNo').html(tempAccessNo());
			  
			  $('#addBadUserForm').css('display', 'none');
               // alert('error');

            } else {
				$('#accessYes').html(tempAccessYes());
				
				$('#addBadUserForm').css('display', 'block');
			}			
        }).fail(function() { // если произошла ошибка соединения с сервером
            errorGetData(errorTextServer);
        });
    }
	
    // добавление центра
    function addBadUser() {
        // записываем введенные значения
        let name = $('#name').val(),
            surname = $('#surname').val(),
            patronymic = $('#patronymic').val(),
            city = $('#city').val(),
            phone = $('#phone').val(),
            comment = $('#comment').val();
              
        // создаем объект
        let BadUser = {
            "name": name,
            "surname": surname,
            "patronymic": patronymic,
            "city": city,
            "phone": phone,
            "comment": comment
        };

        BadUser = JSON.stringify(BadUser);
        $.post(global_address + "api/ApiBadusers.php?action=addBadUser", BadUser).done(function(data) { // если сервер работает корректно
            if(data.result) { // делаем проверку ответа от сервера
                // если возвращается true
                let url = global_address + "index.php";

                $(location).attr('href', url);

            } else { // если возвращается false
                // показываем сообщение об ошибке
                alert('Errore');
            }
        }).fail(function() {
            // показываем сообщение об ошибке
            alert('No server connect');
        });
    }

    $('#addBadUserForm').on('submit', function(event) {
        event.preventDefault();
    });

    $('#addBadUser').on('click', function() { 
		addBadUser();
    });
});

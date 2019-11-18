// регистрируем Handlebars
$(document).ready(function() {
	
	Handlebars.registerHelper('list', function (context, options) {
		var ret = "";
		for (var i = 0, j = context.length; i < j; i++) {
			ret = ret + options.fn(context[i]);
		}
		return ret;
	});
	
	var srcAccess = $('#accessData').html();
	var tempAccess = Handlebars.compile(srcAccess);
	
	var srcAccessNo = $('#accessDataNo').html();
	var tempAccessNo = Handlebars.compile(srcAccessNo);
	
	var srcAccessYes = $('#accessDataYes').html();
	var tempAccessYes = Handlebars.compile(srcAccessYes);
	
	getAccess();
	
    function getAccess() {
        // отправляем запрос на сервер
        $.post(global_address + 'api/ApiAuth.php?action=access', {}).done(function(data) { // если сервер работает корректно
            // записываем полученный результат в нашу таблицу
            
		 if (data.result == false) {

              $('#accessForm').html(tempAccess());
			  
			  $('#accessNo').html(tempAccessNo());
			  
			  $('#addBadUserForm').css('display', 'none');

            } else {
				$('#accessYes').html(tempAccessYes());
				
				$('#addBadUserForm').css('display', 'block');
			}			
        }).fail(function() { // если произошла ошибка соединения с сервером
            errorGetData(errorTextServer);
        });
    }
	
    var srcCategoryTable = $('#categoryData').html();

    // компилируем шаблон и создаем объект Handlebars
    var tempCategoryTable = Handlebars.compile(srcCategoryTable);
	
    function getCategoryList() {
		
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
        // отправляем запрос на сервер
        $.post(global_address + 'api/ApiBadusers.php?action=getBadusersSearch', BadUser).done(function(data) { // если сервер работает корректно
            // записываем полученный результат в нашу таблицу
            $('#badUsersData').html(tempCategoryTable(data));


        }).fail(function() { // если произошла ошибка соединения с сервером
            errorGetData(errorTextServer);
        });
    }

    // при клике на кнопке закрытия и на области вне модального окна
    $('#modalCategory').on('hide.bs.modal', function () {
        // сбрасываем значения формы
        $('#addCategoryForm').trigger('reset');
    });

    // при клике на кнопке "Добавить"
    $('#addCategory').on('click', function() {
        // подставляем названия заголовка и кнопки в модальном окне
        $('#modalAddServicesLabel').text('Добавление категории');
        $('#addCategoryBtn').text('Добавить');
        $('#categoryLabel').text("Введите категорию: ");
    });

    // сбрасываем стандартный обработчик браузера для формы
    $('#addCategoryForm').on('submit', function(event) {
        event.preventDefault();
    });
	
	 // сбрасываем стандартный обработчик браузера для формы
    $('#addBadUserForm').on('submit', function(event) {
        event.preventDefault();
    });
	
	$('#searchBtn').on('click', function() { //alert('fd');
		getCategoryList();
    // добаляем форме метод submit
		$('#authForm').submit();
  });
});
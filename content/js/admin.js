// регистрируем Handlebars


$(document).ready(function() {
	
	Handlebars.registerHelper('list', function (context, options) {
		var ret = "";

		for (var i = 0, j = context.length; i < j; i++) {
			ret = ret + options.fn(context[i]);
		}

			return ret;
	});
	
    // обращаемся к таблице, копируем содержимое элемента в переменную
    var srcCategoryTable = $('#categoryData').html();

    // компилируем шаблон и создаем объект Handlebars
    var tempCategoryTable = Handlebars.compile(srcCategoryTable);

    getCategoryList()
	
    function getCategoryList() {
        // отправляем запрос на сервер
        $.post(global_address + 'api/ApiBadusers.php?action=getBadusers', {}).done(function(data) { // если сервер работает корректно
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
});
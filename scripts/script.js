//функция срабатывает когда весь контент загрузился
window.onload = function () {
	document.addEventListener('click', documentAction);

	//Action делегирование события click
	function documentAction(e) {
		const targetElement = e.target;
		//проверяем что устройство с тачскрином (телефон)
		//window.innerWidth -это внутренняя ширина окна (дб > 768)
		//isMobile.any() - вернет true если устройство с тачскрином
		if (window.innerWidth > 768 && isMobile.any()) {
			//если нажата кнопка стрелки 
			if (targetElement.classList.contains('menu__arrow')) {
				//родителю добавляем класс
				targetElement.closest('.menu__item').classList.toggle('_hover');
			}
			//закрытие меню при клике на пустое пространство
			//если нажали не на пункт меню и если есть "открытые" пункты меню
			if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0 ) {
					//убираем класс _hover у открытых пунктов меню 
				_removeClasses(document.querySelectorAll('.menu__item._hover'), "_hover");
	

				}
		}
	}
}

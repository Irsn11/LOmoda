const headerCityButton = document.querySelector(".header__city-button");

//записываем город
headerCityButton.textContent=localStorage.getItem('lomoda-location') || 'Ваш город?'

//событие на кнопке "город"
headerCityButton.addEventListener('click', () => {
	const city = prompt('Укажите ваш город');
	headerCityButton.textContent = city;
	localStorage.setItem('lomoda-location', city);
	
});
//блокировка скролла
const disableScroll = () => {
	//window.innerWidth - Ширина браузера
	//document.body.offsetWidth - ширина до скролла
	const widthScroll = window.innerWidth - document.body.offsetWidth;
//window.scrollY - Возвращает число пикселей, на которое документ пролистан
	document.body.dbScrollY = window.scrollY;

	document.body.style.cssText = `
	position:fixed;
	top:${-window.scrollY}px;
	left:0;
  width:100%;
	height:100vh;
	overflow:hidden;
	padding-right:${widthScroll}px;
	`;
};

const enableScroll = () => {
	document.body.style.cssText = '';
	window.scroll({
		top: document.body.dbScrollY
	})
};

//мдальное окно

const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

const cartModalOpen = () => {
	cartOverlay.classList.add('cart-overlay-open');
	disableScroll();
}

const cartModalClose = () => {
	cartOverlay.classList.remove('cart-overlay-open');
	enableScroll();
}

subheaderCart.addEventListener('click', cartModalOpen);

cartOverlay.addEventListener('click', e => {
	const target = e.target;
	if (((target.classList.contains('cart__btn-close'))) || (target.matches('.cart-overlay')))  {
		cartModalClose();
	}
	
});
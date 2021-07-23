
const headerCityButton = document.querySelector(".header__city-button");
const cartListGoods = document.querySelector(".cart__list-goods");
const cartTotalCost = document.querySelector(".cart__total-cost");
const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cardGoodBuy = document.querySelector('.card-good__buy');
//определяем хэш - часть URL содержащую якори
//location - это объект, Интерфейс Location представляет собой адрес (URL) объекта
//substring(1) - убирает первый элемент
let hash = location.hash.substring(1);
/* </Переменные>
****************************************************************************/

//получаем данные города из хранилища
//записываем город
const updateLocation = () => {
	headerCityButton.textContent =
		localStorage.getItem('lomoda-location') || 'Ваш город?'
}
//событие на кнопке "город" - записываем город в хранилище
headerCityButton.addEventListener('click', () => {
	// prompt - возвращает введенные пользователем данные 
	const city = prompt('Укажите ваш город').trim();
	if (city !== null) {
		//в	хранилище будет добавлено/обновлено соответствующее ключу значение
		localStorage.setItem('lomoda-location', city);
	}
	// обновили город 
	updateLocation();
});
// записали  город 
updateLocation();

/*получаем/вносим данные в локалсторидж
*********************************************/
const getLocalStorage = () => JSON?.parse(localStorage.getItem('card-lomoda')) || [];
const setLocalStorage = data => localStorage.setItem('card-lomoda', JSON.stringify(data));

//формируем корзину
const renderCart = () => {
	cartListGoods.textContent = '';
	let totalPrice = 0;
	const cartItems = getLocalStorage();
	cartItems.forEach((item, i) => {
		const tr = document.createElement('tr');
		tr.innerHTML = `
				<td>${i + 1}</td>
				<td>${item.brand} ${item.name}</td>
				${item.color ? `<td>${item.color}</td>` : `<td>-</td>`}
				${item.size ? `<td>${item.size}</td>` : `<td>-</td>`}
				<td>${item.cost} &#8381;</td>
				<td><button class="btn-delete" data-id='${item.id}'>&times;</button></td>
			`;
		totalPrice += item.cost;
		console.log('totalPrice: ', totalPrice);
		cartListGoods.append(tr);
	});
	cartTotalCost.textContent = totalPrice + ' ₽';
}


/*<Удаление из корзины>
*********************************/
const deleteItemCart = id => {
	//получаем данные из локалсторидж
	const cartItem = getLocalStorage();
	//получаем новый массив из объектов без удаленныго товара
	const newCartItem = cartItem.filter(item => item.id !== id);
	setLocalStorage(newCartItem);
}

/*<нажатие на кнопку удалить в модальном окне корзины>
*********************************/
cartListGoods.addEventListener('click', e => {
	//проверяем наличие товара в корзине
	if (e.target.matches('.btn-delete')) {
		//если есть удвляем , id достаем с помощью dataset
		deleteItemCart(e.target.dataset.id);
		console.log('e.target.dataset.id: ', e.target.dataset.id);
				cardGoodBuy.classList.remove('delete');
				cardGoodBuy.textContent = 'Добавить в корзину';
				//return;
		//перерисовывае корзину
		renderCart();
	}

})


/*</Удаление из корзины>
*********************************/


/*блокировка скролла
********************************************/
const disableScroll = () => {
	if (document.disableScroll) return;
	//window.innerWidth - Ширина браузера
	//document.body.offsetWidth - ширина до скролла
	const widthScroll = window.innerWidth - document.body.offsetWidth;
	//добавляем свойство
	document.disableScroll = true;

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
	document.disableScroll = false;
	document.body.style.cssText = '';
	window.scroll({
		top: document.body.dbScrollY
	})
};

/*мдальное окно
***********************************/
const cartModalOpen = () => {
	cartOverlay.classList.add('cart-overlay-open');
	//открываем корзину

	disableScroll();
	renderCart();
}

const cartModalClose = () => {
	cartOverlay.classList.remove('cart-overlay-open');
	enableScroll();
}


/* универсальная функция : запрос базы данных
************************************************/
const getData = async (server) => {
	// await  - заставит ждать получения данных т.к. fetch асинхронная функция иначе вернется промис
	const data = await fetch(server);
	if (data.ok) {
		return data.json()
	} else {
		// вызываем ошибку
		throw new Error(`Данные не были получены, ошибка ${data.status} ${data.statusText}`)
	}

};
/* получение товаров и обработка
*************************/
const getGoods = (callback, prop, value) => {
	// then - метод который содержится у промисов, вызывает колбекфункцию когда getdata отработает
	//catch   отлавливает ошибки
	//getData запрашивает у сервера данные
	getData('db.json').
		//если получили данные запускается then
		then(data => {
			//если получили value запускается фильтрация
			if (value) {
				callback(data.filter(item => item[prop] === value))
			} else {
				//если не получили value получаем все данные
				callback(data);
			}

		})
		//если данные не получили запускается ошибка
		.catch(err => {
			console.error(err)
		});
};

/*Клик по кнопке корзина = вызов функции открытия мдальное окно
***********************************/
subheaderCart.addEventListener('click', cartModalOpen);

cartOverlay.addEventListener('click', e => {
	const target = e.target;
	if (((target.classList.contains('cart__btn-close'))) || (target.matches('.cart-overlay'))) {
		cartModalClose();
	}
});


/*Страница товаров: вывод товаров на страницу
*************************************/
// если в блоке try ошибка блок catch ее отрабатывает
// try позволяет совершить ошибку но не заблакировать код
try {
	//проверяем что мы на странице товаров
	const goodsList = document.querySelector('.goods__list');
	if (!goodsList) {
		throw 'this is not a goods page'
	}
	//находим заголовок товаров
	const goodsTitle = document.querySelector('.goods__title');

	//функция изменения заголовка товаров 
	const changeGoodsTitle = () => {
		goodsTitle.textContent = document.querySelector(`[href*='#${hash}']`).textContent;

	}


	//создаем элементы
	//const createCard = (data)
	const createCard = ({ id, preview, cost, brand, name, sizes }) => {
		//создали элимент
		const li = document.createElement('li');
		//добавили класс
		li.classList.add('goods__item');
		//внутрь элемента добавили карточку
		li.innerHTML = `
		<article class="good">
      <a class="good__link-img" href="card-good.html#${id}">
        <img class="good__img" src="goods-image/${preview}" alt="">
      </a>
      <div class="good__description">
     	 <p class="good__price">${cost} &#8381;</p>
     	 <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
				
				${sizes ?
				//если да выводим размеры
				//метод  join для вывода разделителей в массиве
				`<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(' ')}</span></p>` :
				//если нет не выводим 	
				''}
    		<a class="good__link" href="card-good.html#${id}">Подробнее</a>
      </div>
    </article>
		`
		return li;
	};
	//обновляем список товаров
	//это колбек функция для getGoods
	const renderGoodsList = data => {
		//очищается весь контент
		goodsList.textContent = '';
		//перебераем данные которые вернулись с сервера
		data.forEach(item => {
			//создаем новые карточки с помощью  createCard
			const card = createCard(item);
			//выводим на страницу
			goodsList.append(card);
		});
	};

	//прослушиваем событие "при изменении хеша "
	window.addEventListener('hashchange', () => {
		const goodsTitle = document.querySelector('.goods__title');
		hash = location.hash.substring(1);
		console.log('hash: ', hash);

		//изменяем заголовок
		changeGoodsTitle();
		getGoods(renderGoodsList, 'category', hash);
	});
	//при загрузке
	changeGoodsTitle();
	getGoods(renderGoodsList, 'category', hash);
	//получаем товары по категориям 
	//renderGoodsList это колбек функция	


} catch (err) {
	console.warn('err: ', err);
}
/*</Страница товаров: вывод товаров на страницу>
*************************************/

/*Страница товара
*************************************/
try {
	//поучаем элемент - карточка товара, убедиться что мы на странице карточки товара
	const cardGood = document.querySelector('.card-good')
	if (!cardGood) {
		throw 'this is not a cart-good page';
	}
	const cardGoodImage = document.querySelector('.card-good__image');
	const cardGoodBrand = document.querySelector('.card-good__brand');
	const cardGoodTitle = document.querySelector('.card-good__title');
	const cardGoodPrice = document.querySelector('.card-good__price');
	const cardGoodColor = document.querySelector('.card-good__color');
	const cardGoodSizes = document.querySelector('.card-good__sizes');
	const cardGoodColorList = document.querySelector('.card-good__color-list');
	const cardGoodSizesList = document.querySelector('.card-good__sizes-list');
	const cardGoodBuy = document.querySelector('.card-good__buy');
	//получаем обертки селектов 
	const cardGoodSelectWrappers = document.querySelectorAll('.card-good__select__wrapper');


	const generateList = data => data.reduce((html, item, i) => html +
		`<li  class="card-good__select-item" data-id='${i}' >${item}</li>`,
		'');


	const renderCardGood = ([{ id, cost, brand, name, color, sizes, photo }]) => {
		//в объект записываем данные товара 
		const data = { brand, name, cost, id }


		cardGoodImage.src = `../goods-image/${photo}`;
		cardGoodImage.alt = `${brand} ${name}`;
		cardGoodBrand.textContent = brand;
		cardGoodTitle.textContent = name;
		cardGoodPrice.textContent = `${cost} ₽`;

		color ?
			(cardGoodColor.textContent = color[0],
				cardGoodColor.dataset.id = 0,
				cardGoodColorList.innerHTML = generateList(color)) :
			cardGoodColor.style.display = 'none';
		sizes ?
			(cardGoodSizes.textContent = sizes[0],
				cardGoodSizes.dataset.id = 0,
				cardGoodSizesList.innerHTML = generateList(sizes)) :
			cardGoodSizes.style.display = 'none';
		//проверяем есть ли товар в корзине
		//some возвращает  true или false
		if (getLocalStorage().some(item => item.id === id)) {
			cardGoodBuy.classList.add('delete');
			cardGoodBuy.textContent = 'Удалить из корзины';
		}
		//нажатие на кн корзина
		cardGoodBuy.addEventListener('click', () => {
			if (cardGoodBuy.classList.contains('delete')) {
				deleteItemCart(id);
				cardGoodBuy.classList.remove('delete');
				cardGoodBuy.textContent = 'Добавить в корзину';
				return;
				
		}
			//записываем цвет и размер
			if (color) { data.color = cardGoodColor.textContent; }
			if (sizes) { data.size = cardGoodSizes.textContent; }
			cardGoodBuy.classList.add('delete');
			cardGoodBuy.textContent = 'Удалить из корзины';
				// получаем данные из localStorage
			const cardData = getLocalStorage();
		
			//добавляем к ним наш объект
		
			cardData.push(data);
			//отправляем данные в localStorage 
			setLocalStorage(cardData);
			//localStorage.setItem('card-lomoda', JSON.stringify(cardData));

		});

	};

	cardGoodSelectWrappers.forEach(item => {
		item.addEventListener('click', (event) => {
			const target = event.target;
			if (target.closest('.card-good__select')) {
				target.classList.toggle('card-good__select__open');
			}
			if (target.closest('.card-good__select-item')) {
				const cardGoodSelect = item.querySelector('.card-good__select');
				cardGoodSelect.textContent = target.textContent;
				cardGoodSelect.dataset.id = target.dataset.id;
				cardGoodSelect.classList.remove('card-good__select__open');
			}
		});
	});

	getGoods(renderCardGood, 'id', hash);
}
catch (err) {
	console.warn('err: ', err)
}
/*</Страница товара>
*************************************/

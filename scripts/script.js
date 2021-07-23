//====================================================================================================
body {
	background-color: #f9f1e7;
}
.header {
	position: absolute;

	width: 100%;
	top: 0;
	left: 0;

	&__wrapper {
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 50;
	}

	&__body {
		display: flex;
		align-items: center;
		padding: 5px 0;
		min-height: 125px;
	}
	&__logo {
		color: #000;
		font-weight: 700;
		font-size: 24px;
		line-height: 29/24 * 100%;
	}
	&__main {
		display: flex;
		align-items: center;
		flex: 0 0 494/1240 * 100%;
	}
	&__search {
		@include adaptiv-value("padding-right", 32, 15, 1);
		//не на мобильных устройствах
		@media (min-width: $md2 + px) {
			flex: 1 1 auto;
		}
	}

	&__actions {
	}
}

.menu {
	//позволяем изменяться
	flex: 0 1 420px;
	&__icon {
	}

	&__body {
	}

	&__list {
		//не на мобильных устройствах
		@media (min-width: $md3 +px) {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-evenly;
		}
	}

	&__item {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		//разрешаем ломаться
		flex-wrap: wrap;
		margin: 0px 3px;
		//отступ безопасности если пунктов будет больше
		padding: 5px 0px;
		//на устройствах где есть мышь
		@media (any-hover: hover) {
			&:hover {
				.menu__sub-list {
					opacity: 1;
					visibility: visible;
					pointer-events: auto;
					transform: translate(0px, 0px);
				}
				.menu__arrow {
					transform: rotate(-180deg);
				}
				.menu__arrow,
				.menu__link {
					color: $orangeColar;
				}
			}
		}
		//не на мобильных устройствах
		@media (min-width: $md3 +px) {
			&._hover {
				.menu__sub-list {
					opacity: 1;
					visibility: visible;
					pointer-events: auto;
					transform: translate(0px, 0px);
				}
				.menu__arrow {
					transform: rotate(-180deg);
				}
				.menu__arrow,
				.menu__link {
					color: $orangeColar;
				}
			}
		}
	}

	&__link {
		font-weight: 500;
		color: inherit;
		transition: color 0.3s ease 0s;
	}

	&__arrow {
		margin: 0px 0px 0px 8px;
		transition: all 0.3s ease 0s;
		font-size: 8px;
	}

	&__sub-list {
		position: relative;
		background-color: $orangeColar;
		padding: 15px;
		flex: 1 1 100%;
		//не на мобильных устройствах
		@media (min-width: $md3 +px) {
			opacity: 0;
			visibility: hidden;
			min-width: 200px;
			position: absolute;
			left: 0;
			top: 100%;
			pointer-events: none;
			transform: translate(0px, 10px);
			transition: all 0.3s ease 0s;
		}
	}

	&__sub-item {
		//все кроме последнего
		&:not(:last-child) {
			margin: 0px 0px 5px 0px;
		}
	}

	&__sub-link {
		color: #fff;
		line-height: 120%;
	}
}

.actions {
	&__logo {
	}
}
.icon-menu {
}
.search-form {
	max-width: 473px;
	&__icon {
		display: none;
	}

	&__item {
		background-color: #fff;
		display: flex;
		align-items: center;
	}

	&__btn {
		flex: 0 0 45px;
		height: 45px;
		font-size: 15px;
		color: #333333;
	}

	&__input {
		color: $darkGrayColor;
		font-size: 14px;
		width: 100%;
		padding: 0px 20px 0px 0px;
	}
}
.icon-search {
}
.actions-header {
	position: relative;
	z-index: 5;
	display: grid;
	grid-template-columns: auto;
	grid-auto-flow: column;
	align-items: center;
	//миксин для адаптива
	@include adaptiv-value("gap", 32, 15, 1);

	&__item {
		&_favorites {
			color: #262f56;
			font-size: 24px;
			transition: color 0.3s ease 0s;

			//назначаем только устройствам с мышкой
			@media (any-hover: hover) {
				&:hover {
					color: $orangeColar;
				}
			}
		}

		&_user {
		}
	}

	&__icon {
		color: #262f56;
		font-size: 24px;
		transition: color 0.3s ease 0s;
		position: relative;
		display: block;
		//назначаем только устройствам с мышкой
		@media (any-hover: hover) {
			&:hover {
				color: $orangeColar;
			}
		}
	}
	span {
		position: absolute;
		width: 20px;
		height: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
.cart-header {
	&__body {
	}

	&__list {
	}
}
.cart-list {
}

//====================================================================================================

//Burger
.icon-menu {
	display: none;
	@media (max-width: $md3+px) {
		display: block;
		position: absolute;
		top: 18px;
		right: 10px;
		width: 30px;
		height: 18px;
		cursor: pointer;
		z-index: 5;
		span {
			transition: all 0.3s ease 0s;
			top: calc(50% - 1px);
			left: 0px;
			position: absolute;
			width: 100%;
			height: 2px;
			background-color: #000;
			&:first-child {
				top: 0px;
			}
			&:last-child {
				top: auto;
				bottom: 0px;
			}
		}
		&._active {
			span {
				transform: scale(0);
				&:first-child {
					transform: rotate(-45deg);
					top: calc(50% - 1px);
				}
				&:last-child {
					transform: rotate(45deg);
					bottom: calc(50% - 1px);
				}
			}
		}
	}
}

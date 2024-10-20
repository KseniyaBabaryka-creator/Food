		import tabs from './modules/tabs';
		import modal from './modules/modal';
		import timer  from './modules/timer';
		import slider  from './modules/slider';
		import cards  from './modules/cards';
		import calculator  from './modules/calculator';
		import forms  from './modules/forms';
		import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
	const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);
		
	
	tabs('.tabheader__item','.tabcontent', '.tabheader', 'tabheader__item_active');
	modal('[data-modal]', '.modal', modalTimerId);
	timer('.timer', '2025-08-11');
	slider({
		container: '.offer__slider',
		slide: '.offer__slide',
		nextArr: '.offer__slider-next',
		prevArr: '.offer__slider-prev',
		totalCounter: '#total',
		currentCouner: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner'
	});
	cards();
	calculator();
	forms('form', modalTimerId);
	
});
document.addEventListener('DOMContentLoaded', () => {

	//Tabs

	const tabs = document.querySelectorAll('.tabheader__item'),
			tabsContent = document.querySelectorAll('.tabcontent'),
			tabsParent = document.querySelector('.tabheader');

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.style.display = 'none';
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	};

	function showTabContent(i = 0) {
		tabsContent[i].style.display = 'block';
		tabs[i].classList.add('tabheader__item_active');
	};

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		};
	});

	//Timer

	const deadline = '2025-05-11'; 

	function getTimeRemaining (endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
				days = Math.floor(t / (1000 * 60 * 60 * 24)),
				hours = Math.floor((t / (1000 * 60 * 60) % 24)),
				minutes = Math.floor((t / 1000 / 60) % 60), 
				seconds = Math.floor((t / 1000) % 60);

		return {
			'total' : t,
			'days' : days,
			'hours' : hours,
			'minutes' : minutes,
			'seconds' : seconds
		};


	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
				days = timer.querySelector('#days'),
				hours = timer.querySelector('#hours'),
				minutes = timer.querySelector('#minutes'),
				seconds = timer.querySelector('#seconds'),
				timeInterval = setInterval(updateClock, 1000);
		
		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', deadline);

	// Modal

	const openBtns = document.querySelectorAll('[data-modal]'),
			modal = document.querySelector('.modal');

	openBtns.forEach(btn => {
			btn.addEventListener('click', openModal);
	});

	function openModal() {
		modal.style.display = 'block';
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}

	function closeModal() {
		modal.style.display = 'none';
		document.body.style.overflow = '';
	}
	

	

	modal.addEventListener('click', (event) => {
		if (event.target === modal || event.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && modal.style.display === 'block'){
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 50000);

	function showModalByScroll() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		};
	}

	window.addEventListener('scroll', showModalByScroll);

	//Cards

	class MenuCard{
		constructor(src, alt, title, description, price, parentSelector, ...classes){
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.description = description;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 24;
			this.changeToCZK();
		}

		changeToCZK() {
			this.price*= this.transfer;
		}

		render() {
			const element = document.createElement('div');
			
			if (this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}

			element.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.description}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> czk/день</div>
				</div>
			`;
			this.parent.append(element);

		}

	}

	new MenuCard(
		"img/tabs/vegy.jpg",
		"vegy",
		"Меню 'Фитнес'",
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		10,
		'.menu .container',
		'menu__item'
	).render();

	new MenuCard(
		"img/tabs/elite.jpg",
		"elite",
		"Меню 'Премиум'",
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		20,
		'.menu .container',
		'menu__item'
	).render();

	new MenuCard(
		"img/tabs/post.jpg",
		"post",
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		25,
		'.menu .container',
		'menu__item'
	).render();

	//Forms

	const forms = document.querySelectorAll('form');

	const message = {
		loading : 'img/form/spinner.svg',
		success : 'Спасибо! Скоро мы с вами свяжемся',
		failure : 'Что-то пошло не так'
	};

	forms.forEach(item => {
		postData(item);
	});

	function postData(form){
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
			display: block;
			margin: 0 auto;
			`; 
			
			form.insertAdjacentElement('afterend', statusMessage);

			const request = new XMLHttpRequest();
			request.open('POST', 'js/server.php');

			request.setRequestHeader('Content-type', 'application/json');
			const formData = new FormData(form);

			const object = {};
			formData.forEach((value, key) => {
				object[key] = value;
			});

			const json = JSON.stringify(object);

			request.send(json);

			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response);
					showThanksModal(message.success);
					form.reset();
					statusMessage.remove();
					
				} else showThanksModal(message.failure);
			})
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.style.display = 'none';
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class='modal__content'>
				<div class='modal__close' data-close>×</div>
				<div class='modal__title'>${message}</div>
			</div> 
		`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() =>{
			thanksModal.remove();
			prevModalDialog.style.display = 'block';
			closeModal();
		}, 4000);

	}
});
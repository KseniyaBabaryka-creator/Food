import { getResource } from "../services/services";
function cards(){
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

	

	getResource('http://localhost:3000/menu')
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		})

	

}

export default cards;
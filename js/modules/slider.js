function slider({container, slide, nextArr, prevArr, totalCounter, currentCounter, wrapper, field}){
	// Slider

	const prev = document.querySelector(prevArr),
			slider = document.querySelector(container),
			next = document.querySelector(nextArr),
			current = document.querySelector(currentCounter),
			total = document.querySelector(totalCounter),
			slides = document.querySelectorAll(slide),
			slidesWrapper = document.querySelector(wrapper),
			slidesField = document.querySelector(field),
			width = window.getComputedStyle(slidesWrapper).width;

	let slideIndex = 1;
	let offset = 0;

	if (slides.length < 10) {
		total.textContent  = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = `${slideIndex}`;
	}

	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '.5s all';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = 'relative';

	const dots = document.createElement('ol'),
			arr = [];
	dots.classList.add('carousel-indicators');
	dots.style.cssText = `
	position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
	`;
	slider.append(dots);

	for (let i = 0; i < slides.length; i++){
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;
		if (i === 0) {
			dot.style.opacity = 1;
		}
		dots.append(dot);
		arr.push(dot);
	}

	next.addEventListener('click', () => {
		if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)){
			offset = 0;
		} else {
			offset += +width.slice(0, width.length - 2);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex === slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else current.textContent = slideIndex;

		arr.forEach(dot => dot.style.opacity = .5);
		arr[slideIndex - 1].style.opacity = 1;
	})

	prev.addEventListener('click', () => {
		if (offset === 0){
			offset = +width.slice(0, width.length - 2) * (slides.length - 1)
		} else {
			offset -= +width.slice(0, width.length - 2);
		}
		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex === 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else current.textContent = slideIndex;

		arr.forEach(dot => dot.style.opacity = .5);
		arr[slideIndex - 1].style.opacity = 1;

		
	})

	arr.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = +width.slice(0, width.length - 2) * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;

			if (slides.length < 10) {
				current.textContent = `0${slideIndex}`;
			} else current.textContent = slideIndex;

			arr.forEach(dot => dot.style.opacity = .5);
			arr[slideIndex - 1].style.opacity = 1;
		})
	})
}

export default slider;
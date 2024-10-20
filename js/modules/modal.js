function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	modal.style.display = 'block';
	document.body.style.overflow = 'hidden';
	if (modalTimerId) {
		clearInterval(modalTimerId)
	};
	
}

function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.style.display = 'none';
	document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId){
	// Modal

	const openBtns = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector);

	openBtns.forEach(btn => {
			btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
	});

	
	

	

	modal.addEventListener('click', (event) => {
		if (event.target === modal || event.target.getAttribute('data-close') == '') {
			closeModal(modalSelector);
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && modal.style.display === 'block'){
			closeModal(modalSelector);
		}
	});

	

	function showModalByScroll() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', showModalByScroll);
		};
	}

	window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export {closeModal};
export {openModal};
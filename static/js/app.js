'use strict';

/***** Base functions *****/

if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = function (callback, thisArg) {
		thisArg = thisArg || window;
		for (var i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}
	};
}

/***** Get position *****/

function getPosition(el) {

	var x = 0,
		y = 0;

	while (el != null && (el.tagName || '').toLowerCase() != 'html') {
		x += el.offsetLeft || 0;
		y += el.offsetTop || 0;
		el = el.parentElement;
	}

	return {
		x: parseInt(x, 10),
		y: parseInt(y, 10)
	};
}

/* * */

function checkVisible(elm, threshold, mode) {
	threshold = threshold || 0;
	mode = mode || 'visible';

	var rect = elm.getBoundingClientRect();
	var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
	var above = rect.bottom - threshold < 0;
	var below = rect.top - viewHeight + threshold >= 0;

	return mode === 'above' ? above : (mode === 'below' ? below : !above && !below);
}

/***** Lazy load *****/

function addPath(target) {
	let imgPath;

	if (target.hasAttribute('data-src')) {
		imgPath = target.getAttribute('data-src');
		target.setAttribute('src', imgPath);

		target.removeAttribute('data-src');
	} else if (target.hasAttribute('data-srcset')) {
		imgPath = target.getAttribute('data-srcset');
		target.setAttribute('srcset', imgPath);

		target.removeAttribute('data-srcset');
	}
}

function lazyLoad() {
	let lazy = document.querySelectorAll('.lazy');

	lazy.forEach(function (el) {
		if (checkVisible(el, -500)) {
			el.dispatchEvent(eventLazy);
		}
	});
}

let eventLazy = new CustomEvent('lazyLoad');

let lazy = document.querySelectorAll('.lazy');

lazy.forEach(function (el) {
	el.addEventListener('lazyLoad', function (e) {
		let lazyMedia = this.children;

		Array.from(lazyMedia).forEach(function (el) {
			let mediaItem;
			if (el.hasAttribute('data-src') || el.hasAttribute('data-srcset')) {
				mediaItem = el;
				addPath(mediaItem);
			}
		});
		this.classList.remove('lazy');
	});
});

window.addEventListener('scroll', function () {
	/* Lazy load */
	lazyLoad();
});

lazyLoad();

/***** Class toggle *****/

function classToggle(target, className) {
	if (target.classList.contains(className) == false) {
		target.classList.add(className);

		let siblings = [...target.parentNode.children].filter((child) =>
			child !== target
		);

		siblings.forEach(function (sItem) {
			sItem.classList.remove(className)
		});
	};
}

window.addEventListener('load', () => {
	/***** Tabs *****/

	let tabsWrap = document.querySelectorAll('.tabs');

	if (tabsWrap != null) {
		tabsWrap.forEach(function (tabs) {
			let tabsHeader = tabs.querySelectorAll('.tabs-header');
			let tabContent = tabs.querySelectorAll('.tab-content');
			let tabIdx = 0;

			tabsHeader.forEach(function (tabHeader) {
				let tab = tabHeader.querySelectorAll('.tab');
				let target;

				tab.forEach(function (el, idx) {
					el.addEventListener('click', function () {
						classToggle(this, 'active');
						tabIdx = idx;

						tabContent.forEach(function () {
							let target = tabContent[idx];
							classToggle(target, 'active');
						});
					});
				});
			});
		});
	}

	/* * */

	/* Toggle btns */

	let navToggleBtn = document.querySelector('.nav-toggle');

	navToggleBtn.addEventListener('click', function () {
		this.classList.toggle('active');
		document.querySelector('header').classList.toggle('nav-open');
	});

	let filterToggleBtn = document.querySelector('.filter-toggle');

	if (filterToggleBtn != null) {
		filterToggleBtn.addEventListener('click', function () {
			this.classList.toggle('active');
			document.querySelector('.catalog-filter').classList.toggle('active');
		});
	}

	let inventoryToggle = document.querySelectorAll('.inventory-toggle');
	let inventoryWrap = document.querySelectorAll('.inventory-wrap');

	if (inventoryToggle != null && inventoryWrap != null) {
		inventoryToggle.forEach(function (toggle) {
			toggle.addEventListener('click', function () {		
				let toggleData = toggle.getAttribute('data-modal');
				
				if (this.classList.contains('active')) {
					this.classList.remove('active');
					document.querySelector(`.inventory-wrap[data-modal="${toggleData}"]`).classList.remove('active');
				} else {
					classToggle(this, 'active');
					classToggle(document.querySelector(`.inventory-wrap[data-modal="${toggleData}"]`), 'active');
				}
			});
		});

		inventoryWrap.forEach(function (wrap) {
			let inventoryClose = wrap.querySelector('.inventory-close');

			inventoryClose.addEventListener('click', function () {
				wrap.classList.remove('active');
			});
		});
	}

	/* * */


	let winRateSlider = document.getElementById('win-rate');

	if (winRateSlider != null) {

		noUiSlider.create(winRateSlider, {
			start: 30,
			behaviour: 'snap',
			range: {
				'min': [0],
				'max': [100]
			},
		});

		let winRateValWrap = document.querySelector('#win-rate .noUi-touch-area');

		if (winRateValWrap != null) {
			winRateSlider.noUiSlider.on('update', function (values) {

				winRateValWrap.innerHTML = parseInt(values) + `%`;

			});
		}
	}

	let raritySlider = document.getElementById('rarity');

	if (raritySlider != null) {

		noUiSlider.create(raritySlider, {
			start: 60,
			behaviour: 'snap',
			range: {
				'min': [0],
				'max': [100]
			},
		});

		let rarityValWrap = document.querySelector('#rarity .noUi-touch-area');

		if (rarityValWrap != null) {
			raritySlider.noUiSlider.on('update', function (values) {
				rarityValWrap.innerHTML = parseInt(values) + `%`;
			});
		}
	}
});
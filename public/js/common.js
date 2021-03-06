"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isIE11 = Object.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject;

if (isIE11) {
	document.body.classList.remove("loaded_hiding");
	$(".s404--borser").removeClass("d-none");
}

var div = document.createElement('div');
div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px'; // мы должны вставить элемент в документ, иначе размеры будут равны 0

if (!isIE11) {
	document.body.append(div);
}

var scrollWidth = div.offsetWidth - div.clientWidth;

if (!isIE11) {
	div.remove();
}

var JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	modalCall: function modalCall() {
		// alert(scrollWidth);
		$("[data-fancybox]").fancybox({
			beforeLoad: function beforeLoad() {
				if (!document.querySelector("html").classList.contains(".fixed")) document.querySelector("html").style.marginRight = scrollWidth + 'px';
			},
			afterClose: function afterClose() {
				if (!document.querySelector("html").classList.contains(".fixed")) document.querySelector("html").style.marginRight = null; // 	document.querySelector("html").classList.remove("fixed")
			}
		});
		$(".link-modal-js").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			// autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			},
			beforeLoad: function beforeLoad() {
				if (!document.querySelector("html").classList.contains(".fixed")) document.querySelector("html").style.marginRight = scrollWidth + 'px';
			},
			afterClose: function afterClose() {
				if (!document.querySelector("html").classList.contains(".fixed")) document.querySelector("html").style.marginRight = null; // 	document.querySelector("html").classList.remove("fixed")
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		var linkModal = document.querySelectorAll('.link-modal-js');

		function addData() {
			linkModal.forEach(function (element) {
				element.addEventListener('click', function () {
					var modal = document.querySelector(element.getAttribute("href"));
					var data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							var el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
		}

		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu: function toggleMenu() {
		var toggle = this.btnToggleMenuMobile;
		var menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			var toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(function (el) {
				return el.classList.toggle("on");
			});
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(function (el) {
				return el.classList.toggle("fixed");
			});
			document.querySelector("body").style.marginRight = scrollWidth + 'px'; // document.querySelector("body").style.marginRight = scrollWidth + 'px';
			// if (document.querySelector("html").style.marginRight > 0) {
			// 	document.querySelector("html").style.marginRight = 0
			// } else{
			// }
		}, {
			passive: true
		});
	},
	closeMenu: function closeMenu() {
		var menu = this.menuMobile;
		if (!menu) return;

		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(function (element) {
				return element.classList.remove("on");
			});
			menu.classList.remove("active");
			menu.classList.add("menu-hide");
			setTimeout(function () {
				menu.classList.remove("menu-hide");
			}, 4000);
			[document.body, document.querySelector('html')].forEach(function (el) {
				setTimeout(function () {
					el.classList.remove("fixed");
				}, 1500);
			}); // document.querySelector("html").style.marginRight = null;

			document.querySelector("body").style.marginRight = null;
		}
	},
	mobileMenu: function mobileMenu() {
		var _this = this;

		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', function (event) {
			var container = event.target.closest(".menu-mobile--js.active"); // (1)

			var link = event.target.closest(".navMenu__link"); // (1)

			if (!container || link) {
				_this.closeMenu();
			}
		}, {
			passive: true
		}); // window.addEventListener('resize', () => {
		// 	if (window.matchMedia("(min-width: 1200px)").matches) {
		// 		this.closeMenu();
		// 	};
		// }, { passive: true });
	},
	// /mobileMenu
	// tabs  .
	tabscostume: function tabscostume(tab) {
		var tabs = document.querySelectorAll(tab); // const indexOf = element => Array.from(element.parentNode.children).indexOf(element);

		tabs.forEach(function (element) {
			var tabs = element;
			var tabsCaption = tabs.querySelector(".tabs__caption");
			var tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
			var tabsWrap = tabs.querySelector(".tabs__wrap");
			var tabsContent = tabsWrap.querySelectorAll(".tabs__content");
			var random = Math.trunc(Math.random() * 1000);
			tabsBtn.forEach(function (el, index) {
				var data = "tab-content-".concat(random, "-").concat(index);
				el.dataset.tabBtn = data;
				var content = tabsContent[index];
				content.dataset.tabContent = data;
				if (!content.dataset.tabContent == data) return;
				var active = content.classList.contains('active') ? 'active' : '';
				console.log(el.innerHTML);
				content.insertAdjacentHTML("beforebegin", "<div class=\"tabs__btn-accordion  btn btn-primary d-block mb-1 ".concat(active, "\" data-tab-btn=\"").concat(data, "\">").concat(el.innerHTML, "</div>"));
			});
			tabs.addEventListener('click', function (element) {
				var btn = element.target.closest("[data-tab-btn]:not(.active)");
				if (!btn) return;
				var data = btn.dataset.tabBtn;
				var tabsAllBtn = this.querySelectorAll("[data-tab-btn");
				var content = this.querySelectorAll("[data-tab-content]");
				tabsAllBtn.forEach(function (element) {
					element.dataset.tabBtn == data ? element.classList.add('active') : element.classList.remove('active');
				});
				content.forEach(function (element) {
					element.dataset.tabContent == data ? (element.classList.add('active'), element.previousSibling.classList.add('active')) : element.classList.remove('active');
				});
			});
		}); // $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');
		// });
	},
	// /tabs
	inputMask: function inputMask() {
		// mask for input
		var InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			return element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}");
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie: function ifie() {},
	// sendForm() {
	// 	var gets = (function () {
	// 		var a = window.location.search;
	// 		var b = new Object();
	// 		var c;
	// 		a = a.substring(1).split("&");
	// 		for (var i = 0; i < a.length; i++) {
	// 			c = a[i].split("=");
	// 			b[c[0]] = c[1];
	// 		}
	// 		return b;
	// 	})();
	// 	// form
	// 	$(document).on('submit', "form", function (e) {
	// 		e.preventDefault();
	// 		const th = $(this);
	// 		var data = th.serialize();
	// 		th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
	// 		th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
	// 		th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
	// 		th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
	// 		$.ajax({
	// 			url: 'action.php',
	// 			type: 'POST',
	// 			data: data,
	// 		}).done(function (data) {
	// 			$.fancybox.close();
	// 			$.fancybox.open({
	// 				src: '#modal-thanks',
	// 				type: 'inline'
	// 			});
	// 			// window.location.replace("/thanks.html");
	// 			setTimeout(function () {
	// 				// Done Functions
	// 				th.trigger("reset");
	// 				// $.magnificPopup.close();
	// 				// ym(53383120, 'reachGoal', 'zakaz');
	// 				// yaCounter55828534.reachGoal('zakaz');
	// 			}, 4000);
	// 		}).fail(function () { });
	// 	});
	// },
	heightwindow: function heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', function () {
			// We execute the same script as before
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},
	animateScroll: function animateScroll() {
		$(document).on('click', "  .scroll-link", function () {
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top;
			$('html, body').animate({
				scrollTop: destination
			}, 800);
			return false;
		});
	},
	getCurrentYear: function getCurrentYear(el) {
		var now = new Date();
		var currentYear = document.querySelectorAll(el);

		if (currentYear) {
			currentYear.forEach(function (el) {
				el.innerText = now.getFullYear();
			});
		}
	},
	CustomInputFile: function CustomInputFile() {
		var file = $(".add-file input[type=file]");
		file.change(function () {
			var filename = $(this).val().replace(/.*\\/, "");
			var name = $(".add-file__btn span ");
			name.text(filename);
		});
	}
};
var $ = jQuery;

function eventHandler() {
	var _defaultSl, _Swiper;

	if (isIE11) return;
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('.tabs--js');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask(); // JSCCommon.sendForm();

	JSCCommon.heightwindow();
	JSCCommon.animateScroll();
	JSCCommon.getCurrentYear('.currentYear');
	JSCCommon.CustomInputFile();

	function counters() {
		var countbox = $('.counter-wrap-js');
		var show = true;
		if (!countbox.length && !show) return;
		$('.counter-js').css('opacity', '1');
		$('.counter-js').spincrement({
			thousandSeparator: "",
			duration: 3000
		});
		show = false;
	}

	window.onload = function () {
		document.body.classList.remove("loaded_hiding");
		var wow = new WOW({
			// mobile: false,
			animateClass: 'animate__animated',
			callback: function callback(box) {
				if (box.id == 'sAboutText') {
					// мы попали под анимацию svg
					setTimeout(function () {
						counters();
					}, 500);
				}
			}
		});
		setTimeout(function () {
			$('.top-nav').removeClass("opacity-0");
			wow.init();
		}, 1000);
	}; // JSCCommon.CustomInputFile(); 
	// let screenName;
	// screenName = document.body.dataset.bg;
	// var x = window.location.host;
	// if (screenName && x.includes("localhost:30")) {
	// 	document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	// }


	function whenResize() {
		var topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.addEventListener('scroll', function (e) {
			this.scrollY > 0 ? topNav.classList.add('fixed') : topNav.classList.remove('fixed');
		}, {
			passive: true
		});
	}

	window.addEventListener('resize', function () {
		whenResize();
	}, {
		passive: true
	});
	whenResize();
	var defaultSl = (_defaultSl = {
		speed: 500,
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true
		},
		watchOverflow: true
	}, _defineProperty(_defaultSl, "spaceBetween", 0), _defineProperty(_defaultSl, "loop", true), _defaultSl);
	var partnerSlider = new Swiper('.footer__slider--js', (_Swiper = {
		slidesPerView: 'auto',
		freeMode: true,
		loop: true,
		autoplay: true
	}, _defineProperty(_Swiper, "autoplay", {
		delay: 0,
		disableOnInteraction: false
	}), _defineProperty(_Swiper, "disableOnInteraction", true), _defineProperty(_Swiper, "spaceBetween", 0), _defineProperty(_Swiper, "speed", 1800), _Swiper));
	$(".footer__slider--js").mouseenter(function () {
		partnerSlider.autoplay.stop();
	});
	$(".footer__slider--js").mouseleave(function () {
		partnerSlider.autoplay.start();
	});
	var swiper4 = new Swiper('.sBanners__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true
	})); // modal window

	$('.sitebar--filter').on("click", ' .sitebar-link:not(.sitebar-link--back)', function (e) {
		e.preventDefault();
		$(".sitebar__title").slideUp();
		$(this).parent().siblings().slideUp();
		$(this).slideUp().next().slideDown();
	});
	$('.sitebar--filter').on("click", ' .sitebar-link--back', function (e) {
		e.preventDefault();
		$(this).parent().slideUp().prev().slideDown().parent().siblings().slideDown();
		$(".sitebar__title").slideDown();
	});
	var galBlock = document.querySelectorAll(".gal-block");
	galBlock.forEach(function (el) {
		var swiper5 = new Swiper(el.querySelector('.gal-block__slider--js'), _objectSpread(_objectSpread({}, defaultSl), {}, {
			slidesPerView: 1,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			pagination: {
				el: el.querySelector('.swiper-pagination'),
				type: 'fraction'
			},
			navigation: {
				nextEl: el.querySelector('.swiper-button-next'),
				prevEl: el.querySelector('.swiper-button-prev')
			}
		}));
	});
	var names = [];
	$(".sTimeLine .swiper-slide").each(function (i) {
		names.push($(this).data("year"));
	});
	var swiper6 = new Swiper('.sTimeLine__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 1,
		navigation: {
			nextEl: '.sTimeLine .swiper-button-next',
			prevEl: '.sTimeLine .swiper-button-prev'
		},
		pagination: {
			el: '.sTimeLine .swiper-pagination',
			clickable: true,
			renderBullet: function renderBullet(index, className) {
				return '<span class=" btn-year ' + className + '">' + names[index] + '</span>';
			}
		}
	}));
	window.addEventListener('scroll', function (e) {
		var el = document.querySelector('.top-nav');
		if (!el) return;
		var oldScroll = this.oldScroll || 0,
				newScroll = this.scrollY,
				height = el.innerHeight,
				// isScrollDown = newScroll > oldScroll,
		isScrollUp = newScroll < oldScroll && newScroll > 0,
				isScrollDown = newScroll > 0;
		el.classList.toggle('scroll-up', isScrollUp);
		el.classList.toggle('scroll-down', isScrollDown);
		this.oldScroll = newScroll;
	}); // var show = true;
	// var countbox = ".sAboutText";
	// $(window).on("scroll load resize", function () {
	// 		if (!show) return false; // Отменяем показ анимации, если она уже была выполнена
	// 		var w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
	// 		var e_top = $(countbox).offset().top; // Расстояние от блока со счетчиками до верха всего документа
	// 		var w_height = $(window).height(); // Высота окна браузера
	// 		var d_height = $(document).height(); // Высота всего документа
	// 		var e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
	// 		if (w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
	// 				$('.counter-js').css('opacity', '1');
	// 				$('.counter-js').spincrement({
	// 						thousandSeparator: "",
	// 						duration: 2000
	// 				});
	// 				show = false;
	// 		}
	// });

	$(".form-control, .form-select").each(function () {
		$(this).after('<div class="form-wrap__inputBorder">');
	});
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
} // window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }
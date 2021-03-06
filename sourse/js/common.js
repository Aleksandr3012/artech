var isIE11 = Object.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject;

if (isIE11) {
	document.body.classList.remove("loaded_hiding");

	$(".s404--borser").removeClass("d-none");
}


let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// мы должны вставить элемент в документ, иначе размеры будут равны 0
if (!isIE11) {

	document.body.append(div);
}
 
let scrollWidth = div.offsetWidth - div.clientWidth;
if (!isIE11) {

	div.remove();
}
 

const JSCCommon = {
	
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	
	modalCall() {
		
		// alert(scrollWidth);
		$("[data-fancybox]").fancybox({
			beforeLoad: function () {
				if (!document.querySelector("html").classList.contains(".fixed")) document.querySelector("html").style.marginRight = scrollWidth + 'px';
			},
			afterClose: function () {
				if (!document.querySelector("html").classList.contains(".fixed")) document.querySelector("html").style.marginRight = null;
				// 	document.querySelector("html").classList.remove("fixed")
			},
		})
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
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
			beforeLoad: function () {
				if (!document.querySelector("html").classList.contains(".fixed")) document.querySelector("html").style.marginRight = scrollWidth + 'px';
			},
			afterClose: function () {
				if (!document.querySelector("html").classList.contains(".fixed")) document.querySelector("html").style.marginRight = null;
			// 	document.querySelector("html").classList.remove("fixed")
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal-js');
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
			
			document.querySelector("body").style.marginRight = scrollWidth + 'px';
			// document.querySelector("body").style.marginRight = scrollWidth + 'px';
			// if (document.querySelector("html").style.marginRight > 0) {

			// 	document.querySelector("html").style.marginRight = 0
			// } else{
			// }

		}, { passive: true });
	},
	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;
		if (menu.classList.contains("active")) {

			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			menu.classList.remove("active");
			menu.classList.add("menu-hide");
			setTimeout(() => {
				menu.classList.remove("menu-hide"); 
			}, 4000);
			[document.body, document.querySelector('html')].forEach(el => {
				setTimeout(() => {
					el.classList.remove("fixed")
				}, 1500);
			});
			// document.querySelector("html").style.marginRight = null;
			document.querySelector("body").style.marginRight = null
		}

	},
	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".navMenu__link"); // (1)
			if (!container || link) {
				this.closeMenu();
				
			}
		}, { passive: true });

		// window.addEventListener('resize', () => {
		// 	if (window.matchMedia("(min-width: 1200px)").matches) {
		// 		this.closeMenu();
			
		// 	};
		// }, { passive: true });
	},
	// /mobileMenu

	// tabs  .
	tabscostume(tab) {
		const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		tabs.forEach(element => {
			let tabs = element;
			const tabsCaption = tabs.querySelector(".tabs__caption");
			const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
			const tabsWrap = tabs.querySelector(".tabs__wrap");
			const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
			const random = Math.trunc(Math.random() * 1000);
			tabsBtn.forEach((el, index) => {
				const data = `tab-content-${random}-${index}`;
				el.dataset.tabBtn = data;
				const content = tabsContent[index];
				content.dataset.tabContent = data;
				if (!content.dataset.tabContent == data) return;

				const active = content.classList.contains('active') ? 'active' : '';
				console.log(el.innerHTML);
				content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary d-block mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
			})


			tabs.addEventListener('click', function (element) {
				const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
				if (!btn) return;
				const data = btn.dataset.tabBtn;
				const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
				const content = this.querySelectorAll(`[data-tab-content]`);
				tabsAllBtn.forEach(element => {
					element.dataset.tabBtn == data
						? element.classList.add('active')
						: element.classList.remove('active')
				});
				content.forEach(element => {
					element.dataset.tabContent == data
						? (element.classList.add('active'), element.previousSibling.classList.add('active'))
						: element.classList.remove('active')
				});
			})
		})

		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() { 
		
	},
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
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {

		$(document).on('click', "  .scroll-link", function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 800);

			return false;
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelectorAll(el);

		if (currentYear) {

			currentYear.forEach(function(el){

				el.innerText = now.getFullYear();
			})
		}
	},

	CustomInputFile: function CustomInputFile() {
		var file = $(".add-file input[type=file]");
		file.change(function () {
			var filename = $(this).val().replace(/.*\\/, "");
			var name = $(".add-file__btn span ");
			name.text(filename);

		});
	},
};
const $ = jQuery;

function eventHandler() {
	if (isIE11) return;
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('.tabs--js');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();
	JSCCommon.getCurrentYear('.currentYear');
	JSCCommon.CustomInputFile();



	function counters() {

		var countbox = $('.counter-wrap-js');
		var show = true; 
		if (!countbox.length && !show)  return; 
			$('.counter-js').css('opacity', '1');
			$('.counter-js').spincrement({
				thousandSeparator: "",
				duration: 3000
			});
			show = false;  
	}
	window.onload = function () {

		document.body.classList.remove("loaded_hiding")
		var wow = new WOW({
			// mobile: false,
			animateClass: 'animate__animated',
			callback: function (box) {
				if (box.id == 'sAboutText') {
					// мы попали под анимацию svg
					setTimeout(() => {
					counters();
				}, 500);
				}
			}
		});
		setTimeout(() => {
			$('.top-nav').removeClass("opacity-0");
			wow.init();
		}, 1000);

	};

	// JSCCommon.CustomInputFile(); 
	// let screenName;
	// screenName = document.body.dataset.bg;
	// var x = window.location.host;
	// if (screenName && x.includes("localhost:30")) {
	// 	document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	// }



	function whenResize() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.addEventListener('scroll', function (e) {
			this.scrollY > 0
				? topNav.classList.add('fixed')
				: topNav.classList.remove('fixed');
		}, { passive: true })

	}

	window.addEventListener('resize', () => {
		whenResize();

	}, { passive: true });

	whenResize();


	let defaultSl = {
		speed: 500,
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		
		// pagination: {
		// 	el: ' .swiper-pagination',
		// 	type: 'bullets',
		// 	clickable: true,
		// 	// renderBullet: function (index, className) {
		// 	// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
		// 	// }
		// },
	}

	const partnerSlider = new Swiper('.footer__slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		loop: true,
		autoplay: true,
		autoplay: {
			delay: 0,
			disableOnInteraction: false
		},
    disableOnInteraction: true,
		spaceBetween: 0,
		speed: 1800
	});

	$(".footer__slider--js").mouseenter(function() {
    partnerSlider.autoplay.stop();
  });

  $(".footer__slider--js").mouseleave(function() {
    partnerSlider.autoplay.start();
  });

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});
	// modal window
	$('.sitebar--filter').on("click", ' .sitebar-link:not(.sitebar-link--back)', function(e){
		e.preventDefault();
		$(".sitebar__title").slideUp()
		$(this).parent().siblings().slideUp()
		$(this).slideUp().next().slideDown()
	})
	$('.sitebar--filter').on("click", ' .sitebar-link--back', function(e){
		e.preventDefault();
		$(this).parent().slideUp()
		.prev().slideDown()
		.parent().siblings().slideDown()
		$(".sitebar__title").slideDown()
	})

	let galBlock= document.querySelectorAll(".gal-block");
	galBlock.forEach(function(el){

		const swiper5 = new Swiper(el.querySelector('.gal-block__slider--js'), {
			// slidesPerView: 5,
			...defaultSl,
			slidesPerView: 1, 
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			pagination: {
				el: el.querySelector('.swiper-pagination'),
				type: 'fraction',
			},
			navigation: {
				nextEl: el.querySelector('.swiper-button-next'),
				prevEl: el.querySelector('.swiper-button-prev'),
			},
		});
	})

	var names = [];
	$(".sTimeLine .swiper-slide").each(function (i) {
		names.push($(this).data("year"));
	});
	const swiper6 = new Swiper('.sTimeLine__slider--js', {
			// slidesPerView: 5,
			...defaultSl,
			slidesPerView: 1, 
		navigation: {
			nextEl: '.sTimeLine .swiper-button-next',
			prevEl: '.sTimeLine .swiper-button-prev',
		},
		pagination: {
			el: '.sTimeLine .swiper-pagination',
			clickable: true,
			renderBullet: function (index, className) {
				return '<span class=" btn-year ' + className + '">' + (names[index]) + '</span>';
			}
		}
		}); 

		



	window.addEventListener('scroll', function (e) {
		let el = document.querySelector('.top-nav');
		if (!el) return;
		const
			oldScroll = this.oldScroll || 0,
			newScroll = this.scrollY,
			height = el.innerHeight,
			// isScrollDown = newScroll > oldScroll,
			isScrollUp = newScroll < oldScroll && newScroll> 0 ,
			isScrollDown =  newScroll> 0 ;

		el.classList.toggle('scroll-up', isScrollUp);
		el.classList.toggle('scroll-down', isScrollDown);

		this.oldScroll = newScroll;
	});

	// var show = true;
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
 

	$(".form-control, .form-select").each(function(){
		$(this).after('<div class="form-wrap__inputBorder">');
	})
};
	if (document.readyState !== 'loading') {
		eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }





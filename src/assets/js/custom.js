let AA = {
	$menu: document.querySelector(".nav-wrap"),
	$subNavServices: document.querySelector(".sub-nav-services"),

	toggleLangs: () => {
		let $el = document.querySelector(".js-lang-toggler"); 
		
		if( !$el ) {
			return;
		}
		
		$el.addEventListener("click", (event) => {
			document.querySelector(".js-langs-wrap").classList.toggle("is-opened");
		});
	},
	toggleSubMenuService: () => {
		let $serviceSubMenu = document.querySelector(".sub-menu-service a");

		if( !$serviceSubMenu ){
			return;
		}

		$serviceSubMenu.addEventListener("click", (event) => {
			let $el = AA.$subNavServices;
			
			if( window.innerWidth > 1024 ){
				let toggle = () => {
					$el.classList.toggle("is-active");
				};
				
				if( $serviceSubMenu.classList.contains("is-active") ){
					toggle();
					
					setTimeout(function(){
						$el.classList.toggle("lg:hidden");
					}, 200); 
				} else {
					$el.classList.toggle("lg:hidden");
					setTimeout(function(){
						toggle();
					}, 100);
				}
				
				$serviceSubMenu.classList.toggle("is-active");
			} else { // mobile
				AA.helperOpenMobSubNav();
			}
		});
	},
	tidyHeader: () => {
		let y = window.scrollY;
		let $header = document.querySelector("header");

		if( !$header ) {
			return;
		}

		if( y > 50 ){			
			$header.classList.remove("lg:py-7", "py-2");
			$header.classList.add("lg:py-1", "py-0", "shadow-grey-500", "shadow-lg");
		} else {
			$header.classList.remove("lg:py-1", "py-0", "shadow-grey-500", "shadow-lg");
			$header.classList.add("lg:py-7", "py-2");
		}
	},
	toggleMobNav: () => {
		let $el = document.querySelector(".js-nav-toggler");
		
		if( !$el ) {
			return;
		}

		$el.addEventListener("click", () => {
			let $hamburger = document.querySelector("#hamburger");

			if( $hamburger.classList.contains("is-opened") ){
				AA.helperCloseMobNav();
			} else {
				AA.helperOpenMobNav();
			}

			$hamburger.classList.toggle("is-opened");
		});
		
		document.querySelector(".js-back-mob-nav").addEventListener("click", () => {
			AA.helperOpenMobNav();
		});
	},
	helperCloseMobNav: () => {
		AA.$menu.classList.remove("is-ready", "is-opened");

		AA.$subNavServices.classList.remove("is-ready", "is-opened");
	},
	helperOpenMobNav: () => {
		AA.$menu.classList.add("is-opened");
		AA.$menu.classList.remove("is-ready");

		AA.$subNavServices.classList.add("is-ready");
		AA.$subNavServices.classList.remove("is-opened");
	},
	helperOpenMobSubNav: () => {
		AA.$menu.classList.remove("is-opened");
		AA.$menu.classList.add("is-ready");

		AA.$subNavServices.classList.remove("is-ready");
		AA.$subNavServices.classList.add("is-opened");
	},
	clearHeaderOnResize: () => {
		setTimeout(function(){
			document.querySelector(".sub-menu-service a").classList.remove("is-active");
			document.querySelector("#hamburger").classList.remove("is-opened");
			
			AA.$subNavServices.classList.add("lg:hidden");
			AA.$subNavServices.classList.remove("is-active");
			
			AA.helperCloseMobNav();
		}, 700);
	},
	whenInViewport: () => {
		let $homeService = document.querySelectorAll(".home-service");
		let homeService = ($el) => {
		  let rect = $el.getBoundingClientRect();
	
		  if (rect.top >= 0 && rect.bottom + 50 <= (window.innerHeight || document.documentElement.clientHeight)) {
			if (!$el.querySelector(".home-service__line").classList.contains("w-full")) {
			  $el.querySelector(".home-service__line").classList.remove("w-px");
			  $el.querySelector(".home-service__line").classList.add("w-full");
			}
		  }
		}
	
		if( $homeService.length ){
			$homeService.forEach((el) => homeService(el));	
		}

		let $circleImgs = document.querySelectorAll(".circles-img");
		let circlesImgs = ($el) => {
		  let rect = $el.getBoundingClientRect();
	
		  if (rect.top >= 0 && rect.bottom + 100 <= (window.innerHeight || document.documentElement.clientHeight)) {
			if (!$el.classList.contains("translate-x-6")) {
			  $el.classList.add("translate-x-6", "translate-y-5");
			}
		  }
		}
	
		if( $circleImgs.length ){
			$circleImgs.forEach((el) => circlesImgs(el));	
		}
	},
	animateValue: function(id, start, end, duration) {
		// assumes integer values for start and end
		
		var obj = document.getElementById(id);
		var range = end - start;
		// no timer shorter than 50ms (not really visible any way)
		var minTimer = 50;
		// calc step time to show all interediate values
		var stepTime = Math.abs(Math.floor(duration / range));
		
		// never go below minTimer
		stepTime = Math.max(stepTime, minTimer);
		
		// get current time and calculate desired end time
		var startTime = new Date().getTime();
		var endTime = startTime + duration;
		var timer;
	  
		function run() {
			var now = new Date().getTime();
			var remaining = Math.max((endTime - now) / duration, 0);
			var value = Math.round(end - (remaining * range));
			obj.innerHTML = value;
			if (value == end) {
				clearInterval(timer);
			}
		}

		timer = setInterval(run, stepTime);
		run();
	},
	initAccordion: () => {
		let accordionLinks = document.querySelectorAll(".accordion-link");

		if( !accordionLinks ){
			return;
		}

		let toggle = $el => {
			$el.addEventListener("click", e => {
				e.preventDefault();
				let href = $el.getAttribute("href");

				$el.classList.toggle("is-active");
				document.getElementById(href).classList.toggle("is-opened");
			});
		};

		accordionLinks.forEach( el => toggle(el));
	},
	closePopup: () => {
		let $popup = document.querySelector(".popup-wrap");

		if( !$popup ){
			return;
		}

		$popup.addEventListener('click', function(e){   
			if (document.querySelector('.popup').contains(e.target)){
				
			} else{
				$popup.classList.toggle("hidden");
			}
		});
	},
	openPopupJobs: () => {
		let $jobs = document.querySelectorAll("a[href='#jobs']");

		if( !$jobs ){
			return;
		}

		let open = $el => {
			$el.addEventListener("click", e => {
				e.preventDefault();
				
				if( !$el.closest(".component-jobs") && document.getElementById("job-title") ){
					let job = document.getElementById("job-title").getAttribute("data-title");
					let jobId = document.getElementById("job-title").getAttribute("data-job-id");

					if( jobId ){
						jobId = ", ID: " + jobId;
					}

					document.getElementById("job-name").value = job + jobId;

					gtag('event', 'submit', {
						'event_category': 'button',
						'event_label': 'mam-zaujem',
					});
				} else {
					document.getElementById("job-name").value = "general";

					gtag('event', 'submit', {
						'event_category': 'button',
						'event_label': 'poslat-zivotopis',
					});
				}

				document.getElementById("jobsFormWrap").classList.remove("hidden");
				document.getElementById("contactFormWrap").classList.add("hidden");
				
				document.querySelector(".popup-wrap").classList.remove("hidden");
				document.querySelector("input[name='applicant']").focus();
			});
		};

		$jobs.forEach( el => open(el) );
	},
	openPopupContact: () => {
		let $contact = document.querySelectorAll("a[href='#service']");

		if( !$contact ){
			return;
		}

		let open = $el => {
			$el.addEventListener("click", e => {
				e.preventDefault();

				let url = window.location.href;
				let urlArr = url.split('/');
				urlArr.shift();
				urlArr.shift();
				urlArr.shift();
				let page = urlArr.join(" | ");

				if( !page ){
					page = 'home-page';
				}

				document.getElementById("service-name").value = page;

				document.getElementById("jobsFormWrap").classList.add("hidden");
				document.getElementById("contactFormWrap").classList.remove("hidden");
				
				document.querySelector(".popup-wrap").classList.remove("hidden");
				document.querySelector("input[name='customer']").focus();

				gtag('event', 'submit', {
					'event_category': 'Mám záujem o službu',
					'event_action': 'Mám záujem o službu',
					'event_label': 'Mám záujem o službu',
				});
			});
		};

		$contact.forEach( el => open(el) );
	},
	submitSuccess: () => {
		document.addEventListener( 'wpcf7submit', function( event ) {
			document.querySelectorAll('.form-wrap').forEach(el => {
				el.classList.add("hidden");
				setTimeout(function(){
					location.reload();
				}, 3000);
			});

			if( document.querySelector(".single") ){
				gtag('event', 'submit', {
					'event_category': 'button',
					'event_label': 'odoslany-form'
				});
			} else {
				gtag('event', 'submit', {
					'event_category': 'Služba - button - odoslať',
					'event_action': 'Služba - button - odoslať',
					'event_label': 'Služba - button - odoslať',
				});
			}

		}, false );
	},
	translator: () => {
		let $el = document.querySelectorAll(".js-translate");

		if( !$el ){
			return;
		}

		$el.forEach( el => {
			let lang = document.getElementById("lang").value;
			let translation = el.getAttribute("data-" + lang);

			if( translation ){
				el.innerHTML = translation;
			}
		});
	},
}

AA.translator();
AA.toggleLangs();
AA.toggleSubMenuService();
AA.toggleMobNav();
AA.initAccordion();
AA.closePopup();
AA.openPopupJobs();
AA.openPopupContact();
AA.submitSuccess();


document.addEventListener('scroll', function(e) {
	AA.tidyHeader();
	AA.whenInViewport();

	let $counters = document.querySelectorAll(".counter");
	let initCounter = $el => {
		let count = parseInt($el.getAttribute("data-count"));
		let id = $el.getAttribute("id");
		let interval = 600;

		if( count > 50 ){
			interval = 1800;
		} else if( count > 100 ){
			interval = 2400;
		}

		let rect = $el.getBoundingClientRect();
	
		if (rect.top >= 0 && rect.bottom - 100 <= (window.innerHeight || document.documentElement.clientHeight)) {
			if (!$el.classList.contains("is-active")) {
				$el.classList.add("is-active");

				AA.animateValue(id, 0, count, interval);
			}
		}
	}

	if( $counters.length ){
		$counters.forEach($el => initCounter($el));
	}
});

window.addEventListener('resize', AA.clearHeaderOnResize);
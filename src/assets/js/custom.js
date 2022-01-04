let AA = {
	$menu: document.querySelector(".nav-wrap"),
	$subNavServices: document.querySelector(".sub-nav-services"),

	toggleLangs: () => {
		document.querySelector(".js-lang-toggler").addEventListener("click", (event) => {
			document.querySelector(".js-langs-wrap").classList.toggle("is-opened");
		});
	},
	toggleSubMenuService: () => {
		let $serviceSubMenu = document.querySelector(".sub-menu-service a");
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

		if( y > 50 ){			
			$header.classList.remove("lg:py-7", "py-2");
			$header.classList.add("lg:py-1", "py-0", "shadow-grey-500", "shadow-lg");
		} else {
			$header.classList.remove("lg:py-1", "py-0", "shadow-grey-500", "shadow-lg");
			$header.classList.add("lg:py-7", "py-2");
		}
	},
	toggleMobNav: () => {
		document.querySelector(".js-nav-toggler").addEventListener("click", () => {
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
	cookiePolicy:() => {
		let $cookies = document.getElementById('cookies');

		if ($cookies) {
			let toggleCookies = function toggleCookies() {
				document.getElementById('cookies').classList.toggle("opened");
			};
			let acceptCookies = function acceptCookies() {
				if (typeof Storage !== "undefined") {
					localStorage.cookies = true;
					let d = new Date();
					let acceptedAt = d.getTime();
					localStorage.acceptedAt = parseInt(acceptedAt);
				}

				toggleCookies();
			};
			let now = new Date();
			let nowTime = now.getTime();

			if (localStorage.cookies === 'true') {
				if (nowTime - localStorage.acceptedAt > 900000000) {
					localStorage.cookies = false;
					toggleCookies();
				}
			} else {
				toggleCookies();
			}

			document.getElementById('close-cookies--accept').addEventListener('click', acceptCookies);
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
		$popup.addEventListener('click', function(e){   
			if (document.querySelector('.popup').contains(e.target)){
				
			} else{
				$popup.classList.toggle("hidden");
			}
		});
	},
	openPopup: () => {
		let $jobs = document.querySelectorAll("a[href='#jobs']");
		let open = $el => {
			$el.addEventListener("click", e => {
				e.preventDefault();
				
				if( !$el.closest(".component-jobs") && document.getElementById("job-title") ){
					let job = document.getElementById("job-title").getAttribute("data-title");

					document.getElementById("job-name").value = job;
				} else {
					document.getElementById("job-name").value = "general";
				}

				document.querySelector(".popup-wrap").classList.remove("hidden");
				document.querySelector("input[name='applicant']").focus();
			});
		};

		$jobs.forEach( el => open(el) );
	},
	submitSuccess: () => {
		document.addEventListener( 'wpcf7submit', function( event ) {
			document.querySelector('.form-wrap').classList.add("hidden");
			setTimeout(function(){
				location.reload();
			}, 3000);
		}, false );
	},
}

AA.toggleLangs();
AA.toggleSubMenuService();
AA.toggleMobNav();
AA.cookiePolicy();
AA.initAccordion();
AA.closePopup();
AA.openPopup();
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
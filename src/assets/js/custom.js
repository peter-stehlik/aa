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
}

AA.toggleLangs();
AA.toggleSubMenuService();
AA.toggleMobNav();

document.addEventListener('scroll', function(e) {
	AA.tidyHeader();
});

window.addEventListener('resize', AA.clearHeaderOnResize);
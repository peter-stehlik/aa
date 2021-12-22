let AA = {
	toggleLangs: () => {
		document.querySelector(".js-lang-toggler").addEventListener("click", (event) => {
			document.querySelector(".js-langs-wrap").classList.toggle("is-opened");
		});
	},
	toggleSubMenuService: () => {
		let $serviceSubMenu = document.querySelector(".sub-menu-service a");
		$serviceSubMenu.addEventListener("click", (event) => {
			let $el = document.querySelector(".sub-nav-services");
			let toggle = () => {
				$el.classList.toggle("-z-10");
				$el.classList.toggle("opacity-0");
				$el.classList.toggle("-translate-y-4");
			};
			
			if( $serviceSubMenu.classList.contains("is-active") ){
				toggle();

				setTimeout(function(){
					$el.classList.toggle("hidden");
				}, 200); 
			} else {
				$el.classList.toggle("hidden");
				setTimeout(function(){
					toggle();
				}, 100);
			}
			
			$serviceSubMenu.classList.toggle("is-active");
		});
	},
	tidyHeader: () => {
		let y = window.scrollY;
		let $header = document.querySelector("header");

		if( y > 50 ){
			$header.classList.remove("lg:py-7");
			$header.classList.remove("py-2");
			$header.classList.add("lg:py-1");
			$header.classList.add("py-0");
			$header.classList.add("shadow-grey-500");
			$header.classList.add("shadow-lg");
		} else {
			$header.classList.remove("lg:py-1");
			$header.classList.remove("py-0");
			$header.classList.remove("shadow-grey-500");
			$header.classList.remove("shadow-lg");
			$header.classList.add("lg:py-7");
			$header.classList.add("py-2");
		}
	},
}

AA.toggleLangs();
AA.toggleSubMenuService();

document.addEventListener('scroll', function(e) {
	AA.tidyHeader();
});
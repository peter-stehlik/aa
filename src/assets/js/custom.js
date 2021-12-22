let AA = {
	toggleLangs: () => {
		document.querySelector(".js-lang-toggler").addEventListener("click", (event) => {
			document.querySelector(".js-langs-wrap").classList.toggle("is-opened");
		});
	},
	toggleSubMenuService: () => {
		let $serviceSubMenu = document.querySelector(".sub-menu-service a");
		$serviceSubMenu.addEventListener("click", (event) => {
			$serviceSubMenu.classList.toggle("is-active");
			document.querySelector(".sub-nav-services").classList.toggle("-z-10");
			document.querySelector(".sub-nav-services").classList.toggle("opacity-0");
			document.querySelector(".sub-nav-services").classList.toggle("-translate-y-4");
		});
	},
}

AA.toggleLangs();
AA.toggleSubMenuService();
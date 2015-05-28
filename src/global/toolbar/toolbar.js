export class ToolbarCtrl {

	static $inject = ['$mdSidenav', '$rootScope', '$state', '$location'];
	constructor($mdSidenav, $rootScope, $state, $location) {
		var $this = this;

		$this.$mdSidenav = $mdSidenav;

		$rootScope.$on('$stateControllerLoaded', function(e, ctrl, state) {
			var navDefaults = {
					menu: {
						label: 'Menu',
						icon: 'menu',
						click: $this.toggleNav.bind($this)
					},
					back: {
						label: 'Back',
						icon: 'arrow_back',
						click: function() {
							var prev = new URL(document.referrer);
							if (
								prev.hostname === $location.$$host &&
								prev.pathname !== $location.$$path
							) {
								window.history.back();
							} else if (state.parent && state.parent.navigable) {
								$state.go(state.parent, state.parent.params);
							} else {
								$state.go('home');
							}
						}
					}
				};

			if (typeof ctrl.$nav === 'undefined') {
				ctrl.$nav = 'menu';
			}

			if (typeof ctrl.$nav === 'string') {
				$rootScope.$nav = navDefaults[ctrl.$nav] || navDefaults.menu;
			} else {
				$rootScope.$nav = ctrl.$nav;
			}
		});
	}

	toggleNav() {
		this.$mdSidenav('left').toggle();
	}
}
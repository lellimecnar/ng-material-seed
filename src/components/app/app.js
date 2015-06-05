export class AppCtrl {
	$loading = true;

	$loadingType(val) {
		var type = 'indeterminate';

		if (angular.isNumber(val)) {
			type = 'determinate';
		}

		return type;
	}

	static $inject = ['$rootScope'];
	constructor($rootScope) {
		$rootScope.$on('$stateChangeStart', () => {
			this.$loading = true;
		});

		$rootScope.$on('$stateChangeSuccess', () => {
			this.$loading = false;
		});
	}

	avatarImg(user) {
		if (user) {
			return user.avatar || '/img/default-avatar.png';
		} else {
			return null;
		}
	}

	coverImg(user) {
		if (user) {
			return user.cover || '/img/default-cover.jpg';
		} else {
			return null;
		}
	}

	bgImg(src) {
		if (src) {
			return 'url(' + src + ')';
		} else {
			return '';
		}
	}
}

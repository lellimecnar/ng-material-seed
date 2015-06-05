export class AccountLoginCtrl {
	$title = 'Login';

	$nav = 'back';

	form = {};

	formType = 'login';

	submitLabel = 'Login';

	checkUsername = false;

	static $inject = ['$rootScope', 'User', '$state', '$mdToast'];
	constructor($rootScope, User, $state, $mdToast) {
		if ($rootScope.$user) {
			$state.go('app.account');
		}

		this.$rootScope = $rootScope;
		this.User = User;
		this.$state = $state;
		this.$mdToast = $mdToast;
	}

	clear(form) {
		this.form = {};
		form.$setUntouched();
	}

	cancel(form) {
		this.clear(form);
		this.formType = 'login';
		this.submitLabel = 'Login';
		this.checkUsername = false;
	}

	submit(form) {
		if (form.$valid) {
			if (this.formType === 'register') {
				this.User.create(this.form,
					(user) => {
						this.login({
							username: user.username,
							password: this.form.password
						}, form);
					});
			} else {
				this.login(this.form, form);
			}
		}
	}

	registerClick(form) {
		this.clear(form);
		this.formType = 'register';
		this.submitLabel = 'Register';
		this.checkUsername = true;
	}

	login(user, form) {
		this.$rootScope.$loading = true;
		this.User.login(user)
			.then((result) => {
				this.$rootScope.$loading = false;

				if (result.error) {
					form.$submitted = false;
					this.$mdToast.show(
						this.$mdToast.simple()
							.content(result.error)
							.capsule(true)
					);
				} else {
					this.$state.go('app.account');
				}
			});
	}
}

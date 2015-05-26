export class LoginCtrl {
	$title = 'Login';

	form = {};

	formType = 'login';

	submitLabel = 'Login';

	checkUsername = false;

	static $inject = ['User', '$state'];
	constructor(User, $state) {
		this.User = User;
		this.$state = $state;
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
						});
					});
			} else {
				this.login(this.form);
			}
		}
	}

	registerClick(form) {
		this.clear(form);
		this.formType = 'register';
		this.submitLabel = 'Register';
		this.checkUsername = true;
	}

	login(user) {
		console.log(user);
	}
}
export class AccountEditCtrl {

	$nav = 'cancel';

	$actions = [
		{
			label: 'Save',
			icon: 'done',
			click: this.save.bind(this)
		}
	];

	static $inject = ['$rootScope', '$state', 'Upload', 'User'];
	constructor($rootScope, $state, Upload, User) {
		if ($rootScope.$user) {
			this.form = $rootScope.$user;
		} else {
			$state.go('login');
		}

		this.$rootScope = $rootScope;
		this.$state = $state;
		this.Upload = Upload;
		this.User = User;
	}

	submit(form) {
		if (form) {
			angular.forEach(form, function(field, key) {
				if (key.charAt(0) !== '$') {
					field.$validate();
				}
			});

			if (form.$valid) {
				this.User.update(this.form, (result) => {
					this.$state.go('account');
				});
			}
		}
	}

	save() {
		var selector = 'form[name="accountEditForm"]',
			el = document.querySelector(selector),
			$el = angular.element(el),
			ctrl = $el.data('$formController');

		this.submit(ctrl);
	}

	upload(type, files) {
		if (files && files.length > 0) {
			angular.forEach(files, (file) => {
				this.Upload.upload({
					url: '/api/upload',
					file: file
				}).progress((e) => {
					this.$rootScope.$loading = 100.0 * e.loaded / e.total;
				}).success((uploadResult) => {
					this.$rootScope.$loading = false;
					var data = {};
					data[type] = uploadResult.path;
					this.User.update(data, (result) => {
						this.$rootScope.$user[type] = result[type];
					});
				});
			});
		}
	}
}

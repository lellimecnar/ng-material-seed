export default class User {

	static $inject = ['$q', '$resource', '$http', '$rootScope'];
	constructor($q, $resource, $http, $rootScope) {
		this.$q = $q;
		this.$http = $http;
		this.$rootScope = $rootScope;

		var UserResource = $resource('/api/users/:userId', null, {
			create: {
				method: 'POST'
			},
			update: {
				method: 'PUT'
			},
			get: {
				withCredentials: true
			},
			profile: {
				method: 'GET',
				url: '/api/profile',
				interceptor: {
					response: (result) => {
						if (result.status === 200) {
							if (result.data.error) {
								this.$rootScope.$user = null;
							} else {
								this.$rootScope.$user = result.data;
							}
						}

						return result;
					}
				}
			},
			checkUsername: {
				method: 'GET',
				url: '/api/username/:username'
			}
		});

		UserResource.login = this.login.bind(this);
		UserResource.logout = this.logout.bind(this);

		return UserResource;
	}

	login(user) {
		return this.$http({
			method: 'POST',
			url: '/api/login',
			data: user
		}).then((result) => {
			if (!result.data.error) {
				this.$rootScope.$user = result.data;
			}
			return result.data;
		});
	}

	logout() {
		return this.$http({
			method: 'GET',
			url: '/api/logout'
		}).then((result) => {
			this.$rootScope.$user = null;
			return result;
		});
	}
}
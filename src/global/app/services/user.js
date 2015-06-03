export default class User {

	static $inject = ['$resource', '$http', '$rootScope'];
	constructor($resource, $http, $rootScope) {
		this.$http = $http;
		this.$rootScope = $rootScope;

		function responseInterceptor(result) {
			if (result.status === 200) {
				if (result.data.error) {
					$rootScope.$user = null;
				} else {
					$rootScope.$user = result.data;
				}
			}

			return result.data;
		}

		var UserResource = $resource('/api/user/:userId', null, {
				create: {
					method: 'POST'
				},
				update: {
					method: 'PUT',
					url: '/api/user',
					interceptor: {
						response: responseInterceptor
					}
				},
				get: {
					withCredentials: true
				},
				profile: {
					method: 'GET',
					url: '/api/profile',
					interceptor: {
						response: responseInterceptor
					}
				},
				checkUsername: {
					method: 'GET',
					url: '/api/user/username/:username'
				}
			});

		UserResource.login = this.login.bind(this);
		UserResource.logout = this.logout.bind(this);

		UserResource.profile();

		return UserResource;
	}

	login(user) {
		return this.$http({
			method: 'POST',
			url: '/api/user/login',
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
			url: '/api/user/logout'
		}).then((result) => {
			this.$rootScope.$user = null;
			return result;
		});
	}
}

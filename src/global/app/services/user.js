export class User {

	static $inject = ['$resource'];
	constructor($resource) {
		return $resource('/api/users/:userId', null, {
			create: {
				method: 'POST',
				interceptors: {
					responseError: function(response) {
						console.log(response)
					}
				}
			},
			update: {
				method: 'PUT'
			},
			get: {
				withCredentials: true
			},
			checkUsername: {
				method: 'GET',
				url: '/api/users/username'
			}
		});
	}
}
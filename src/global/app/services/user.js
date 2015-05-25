export class User {

	static $inject = ['$resource'];
	constructor($resource) {
		return $resource('/api/users/:userId', null, {
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
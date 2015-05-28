fullName.$import = [];
function fullName() {
	console.log(arguments);
	return function(user) {
		console.log(user);
		if (
			user &&
			user.firstName &&
			user.lastName
		) {
			return [user.firstName, user.lastName].join(' ');
		}

		return '';
	}
}

export default fullName;
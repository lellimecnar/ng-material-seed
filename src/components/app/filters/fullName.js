fullName.$import = [];
function fullName() {
	return function(user) {
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
factory.$selector = 'checkUsername';
factory.$inject = ['User', '$parse'];
function factory(User, $parse) {
	return {
		restrict: 'A',
		require: '^ngModel',
		link: function(scope, elem, attrs, ngModel) {
			ngModel.$parsers.unshift(function(val) {
				if ($parse(attrs.checkUsername)(scope) && val) {
					User.checkUsername({
						username: val
					}).$promise.then(function(result) {
						ngModel.$setValidity('username', !result.exists);
					});
				}

				return val;
			});
		}
	};
}

export default factory;
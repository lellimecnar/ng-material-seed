snakeCase.$import = [];
function snakeCase() {
	return function(str) {
		return (str || '').replace(/[^\w]+/, '_');
	}
}

export default snakeCase;
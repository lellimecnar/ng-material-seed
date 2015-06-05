snakeCase.$import = [];
function snakeCase() {
	return function(str) {
		return (str || '').replace(/[^\w]+/g, '_');
	}
}

export default snakeCase;

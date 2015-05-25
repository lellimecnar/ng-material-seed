import angular from 'angular';
import 'angular-resource';
import oauth2 from 'oauth2';
import cookie from 'angular-cookie';

export default function(app) {
	app.requires = app.requires.concat([
		'ngResource',
		oauth2.name
	]);

	config.$inject = ['OAuthProvider'];
	function config(OAuthProvider) {
		OAuthProvider.configure({
			baseUrl: 'https://localhost:8080',
			clientId: '1fJaOYUhIA5VaD69EkGcreX94ERvrfG7',
			clientSecret: 'H1jNESlWRSE6W6b9T9QOjrfVUMvVHdAwGEubZiqQoPzwJSUP',
			grantPath: '/api/token',
			revokePath: '/api/revoke'
		});
	}

	return config;
}
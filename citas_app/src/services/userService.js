const axios = require('axios');

/**
 * Carga de los parámetros genéricos del servicio RESTful
 */
//let host = 'http://localhost:4000';
let host = 'http://localhost/ApiRest/public';

/**
 * Función encargada de recuperar los datos de un usuario a partir de su id.
 */
exports.loadUser = function (email, password, next) {
	let path = '/api/users/signin';

	let userData = {
		email: email,
		password: password
	};

	let options = {
		baseURL: host,
		url: path,
		method: 'post',
		data: userData
	};

	// Se invoca el servicio RESTful con las opciones configuradas previamente y con los datos del usuario.
	invokeService(options, function (user, err) {
		if (err) {
			next(null, err);
		} else {
			next(user.data.user, null);
		}
	});
};

/**
 * Función encargada de crear un nuevo usuario con los datos dados.
 */
exports.createUser = function (name, email, password, confirm_password, next) {
	let path = '/api/users/signup';
	// let path = '/users?name=' + name + '&email=' + email;

	let userData = {
		name: name,
		email: email,
		password: password,
		confirm_password: confirm_password
	};

	let options = {
		baseURL: host,
		url: path,
		method: 'post',
		data: userData
	};

	// Se invoca el servicio RESTful con las opciones configuradas previamente y con los datos del usuario.
	invokeService(options, function (user, err) {
		if (err) {
			next(null, err);
		} else {
			next(user.data.user, null);
		}
	});
};

exports.searchUser = function (userId, next) {
	let path = '/api/users/' + userId;

	let options = {
		baseURL: host,
		url: path,
		method: 'get'
	};

	// Se invoca el servicio RESTful con las opciones configuradas previamente y con los datos del usuario.
	invokeService(options, function (user, err) {
		if (err) {
			next(null, err);
		} else {
			next(user.data.user, null);
		}
	});
}

function invokeService(config, next) {
	axios(config)
		.then(function (response) {
			console.log(response);
			next(response, null);
		})
		.catch(function (error) {
			console.log(error);
			next(null, error);
		})
}
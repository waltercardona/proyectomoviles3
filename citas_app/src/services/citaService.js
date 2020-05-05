const axios = require('axios');

/**
 * Carga de los parámetros genéricos del servicio RESTful
 */
var host = 'http://localhost:4000';
//var host = 'http://localhost/ApiRest/public';


/**
 * Función encargada de recuperar todos los usuarios.
 */
exports.loadCitas = function (userId, next) {
	var path = 'api/citas';

	var paramsData = {
		userId: userId
	};

	var options = {
		baseURL: host,
		url: path,
		method: 'get',
		params: paramsData
	};

	// Se invoca el servicio RESTful con las opciones configuradas previamente y con los datos del usuario.
	invokeService(options, function (res, err) {
		if (err) {
			next(null, err);
		} else {
			next(res.data.citas, null);
		}
	});
};

exports.loadCita = function(citaId, userId, next)
{
	var path = 'api/citas/edit';

	var paramsData = {
		citaId: citaId,
		userId: userId
	};

	var options = {
		baseURL: host,
		url: path,
		method: 'get',
		params: paramsData
	};

	// Se invoca el servicio RESTful con las opciones configuradas previamente y con los datos del usuario.
	invokeService(options, function (res, err) {
		if (err) {
			next(null, err);
		} else {
			next(res.data.cita, null);
		}
	});
}

/**
 * Función encargada de recuperar los datos de un usuario a partir de su id.
 */
exports.loadUser = function (email, password, next) {
	var path = '/api/users/signin';

	var userData = {
		email: email,
		password: password
	};

	var options = {
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
 * Función encargada de modificar los datos del usuario.
 */
exports.editCita = function (citaId, name, lastname, birth, city, neighborhood, phone, userId, next) {
	var path = '/api/citas/edit/' + citaId;

	var userData = {
		name: name,
		lastname: lastname,
		birth: birth,
		city : city,
		neighborhood : neighborhood,
		phone : phone,
		userId : userId
	};

	var options = {
		baseURL: host,
		url: path,
		method: 'put',
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
 * Función encargada de eliminar un usuario por su id.
 */
exports.deleteCita = function (citaId, userId, next) {
	var path = '/api/citas/delete/' + citaId;

	var paramsData = {
		userId: userId
	};

	var options = {
		baseURL: host,
		url: path,
		method: 'delete',
		params: paramsData
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
exports.createCita = function (id_number, name, lastname, birth, city, neighborhood, phone, userId, next) {
	var path = '/api/citas/new-cita';
	// var path = '/users?name=' + name + '&email=' + email;

	var userData = {
		id_number: id_number,
		name: name,
		lastname: lastname,
		birth: birth,
		city : city,
		neighborhood : neighborhood,
		phone : phone,
		userId : userId
	};

	var options = {
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
const usersCtrl = {};

const User = require('../models/User');

const bcrypt = require('bcrypt-nodejs');

usersCtrl.prueba = (req, res) => {
    res.status(200).send({
        message: "Probando una accion del controlador de usuario"
    })
}

usersCtrl.findById = (req, res)=>{
    User.findById(req.params.id, (err, user) => {
        if (err) {
            // Para evitar que otro usuario elimine una cita que no le pertenece.
            res.status(404).send({
                message: "No autorizado"
            });
        } else {
            res.status(200).send({user})
        }
    });
}

usersCtrl.signin = (req, res) => {
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email:email}, (err, user)=>{
        if(err)
        {
            err.status(500).send({message:'Error en la peticion'});
        }
        else
        {
            if(!user)
            {
                res.status(404).send({message:'Usuario no encontrado'});
            }
            else
            {
                //Comprobar la contraseña
                bcrypt.compare(password, user.password, function(err, check){
                    if(check)
                    {
                        //devolver los datos del usuario logueado
                        if(params.gethash)
                        {
                            //devolver un token con jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            })
                        }
                        else
                        {
                            res.status(200).send({user});
                        }
                    }
                    else
                    {
                        res.status(404).send({message:'El usuario no ha podido loguearse'})
                    }

                });
            }
        }
    });
}

usersCtrl.signup = (req, res) => {
    const errors = [];
    const {
        name,
        email,
        password,
        confirm_password
    } = req.body;
    if (password != confirm_password) {
        errors.push({
            text: 'Passwords do not match.'
        });
    }
    if (password.lenght < 4) {
        errors.push({
            text: 'Passwords must be at least 4 characters.'
        });
    }
    if (errors.length > 0) {
        res.status(404).send(errors);
    } else {
        User.findOne({email: email}, (err, user)=>{
            if (err) {
                res.status(404).send(err);
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                // Encriptar Contraseña
                bcrypt.hash(password, null, null, function(err, hash){
                    if(err)
                    {
                        res.status(200).send({message:'No se pudo encriptar la contraseña'});
                    }
                    else
                    {
                        newUser.password = hash
                        newUser.save((err, userStored)=>{
                            if(err)
                            {
                                res.status(200).send({message:'Error al guardar el usuario'});
                            }
                            else
                            {
                                if(!userStored)
                                {
                                    res.status(404).send({message:'No se ha registrado el usuario'});
                                }
                                else
                                {
                                    res.status(200).send({user: userStored});
                                }
                            }
                        });
                    }
                });
            }
        });
        
    }
};

usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Your session has been closed successfully.');
    res.redirect('/users/signin');
};

module.exports = usersCtrl;
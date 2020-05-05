const citasCtrl = {};

const Cita = require('../models/Cita');

citasCtrl.createNewCita = (req, res) => {
    const {
        id_number,
        name,
        lastname,
        birth,
        city,
        neighborhood,
        phone,
        userId
    } = req.body;
    Cita.findOne({
        id_number: id_number
    },(err, cita)=>{
        if (cita) { // Para evitar crear cita duplicada
            res.status(404).send({message:"La cita ya existe"});
        }
        else
        {
            const newCita = new Cita({
                id_number,
                name,
                lastname,
                birth,
                city,
                neighborhood,
                phone
            });
            newCita.user = userId;
            newCita.save((err, cita)=>{
                if(err)
                {
                    res.status(404).send({message:"No se pudo crear la cita"});
                }
                else
                {
                    res.status(200).send({message:"Cita creada correctamente"});
                }
            });
        }
    });
};

citasCtrl.renderCitas = (req, res) => {
    const userId = req.query.userId;
    // Sólo muestra las citas creadas por el usuario que inició sesión y las organiza por fecha de creación descendente.
    Cita.find({
        user: userId
    }, (err, citas) => {
        if (err) {
            err.status(500).send({
                message: 'Error en la peticion'
            });
        } else {
            res.status(200).send({
                citas
            });
        }
    }).sort({
        createdAt: 'desc'
    });
};

citasCtrl.renderEditForm = (req, res) => {
    const userId = req.query.userId;
    const citaId = req.query.citaId;
    Cita.findById(citaId, (err, cita) => {
        if (cita.user != userId) { // Para evitar que otro usuario edite una cita que no le pertenece.
            res.status(404).send({
                message: "Cita no encontrada"
            });
        } else {
            res.status(200).send({
                cita: cita
            });
        }
    });
};

citasCtrl.updateCita = (req, res) => {
    const {
        name,
        lastname,
        birth,
        city,
        neighborhood,
        phone,
        userId
    } = req.body;
    Cita.findById(req.params.id, (err, cita) => {
        // Para evitar que otro usuario edite una cita que no le pertenece.
        if (cita.user != userId) {
            res.status(404).send({
                message: "Cita no autorizada"
            })
        } else {
            Cita.findByIdAndUpdate(req.params.id, {
                name,
                lastname,
                birth,
                city,
                neighborhood,
                phone
            }, (err, cita) => {
                if (err) {
                    res.status(404).send({
                        message: "Ocurrio un error al actualizar la cita"
                    });

                } else {
                    res.status(201).send({
                        message: "Cita actualizada correctamente"
                    });
                }
            });
        }
    });
};

citasCtrl.deleteCita = (req, res) => {
    const userId = req.query.userId;
    Cita.findById(req.params.id, (err, cita) => {
        if (cita.user != userId) {
            // Para evitar que otro usuario elimine una cita que no le pertenece.
            res.status(404).send({
                message: "No autorizado"
            });
        } else {
            Cita.findByIdAndDelete(req.params.id, (err, cita) => {
                if (err) {
                    res.status(404).send({
                        message: "No se pudo borrar la cita"
                    });
                } else {
                    res.status(201).send({
                        message: "Cita borrada correctamente"
                    });
                }
            });
        }
    });
};

module.exports = citasCtrl;
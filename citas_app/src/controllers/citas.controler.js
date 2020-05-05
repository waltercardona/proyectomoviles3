const citasCtrl = {};

const citaService = require('../services/citaService');

citasCtrl.renderCitaForm = (req, res) => {
    res.render('citas/new-cita');
};

citasCtrl.createNewCita = async (req, res) => {
    const { id_number, name, lastname, birth, city, neighborhood, phone } = req.body;

    citaService.createCita(id_number, name, lastname, birth, city, neighborhood, phone, req.user._id, function (user, err) {
        if (err) {
            req.flash('error_msg', 'Se ha producido un error. Contacte con el administrador');
            return res.redirect('/citas');
        } else {
            req.flash('success_msg', 'Cita Added Successfully!');
            res.redirect('/citas');
        }
    });
};

citasCtrl.renderCitas = async (req, res) => {
    // Sólo muestra las citas creadas por el usuario que inició sesión y las organiza por fecha de creación descendente.
    citaService.loadCitas(req.user._id, function (citas, err) {
        if (err) {
            req.flash('error_msg', 'Se ha producido un error. Contacte con el administrador');
        } else {
            res.render('citas/all-citas', { citas });
        }
    });
};

citasCtrl.renderEditForm = async (req, res) => {
    citaService.loadCita(req.params.id, req.user._id,  function (cita, err) {
        if (err) {
            req.flash('error_msg', 'Not Authorized.');
            return res.redirect('/citas');
        } else {
            res.render('citas/edit-cita', { cita });
        }
    });
};

citasCtrl.updateCita = async (req, res) => {
    const { name, lastname, birth, city, neighborhood, phone } = req.body;
    citaService.editCita(req.params.id, name, lastname, birth, city, neighborhood, phone, req.user._id,  function (cita, err) {
        if (err) {
            req.flash('error_msg', 'Not Authorized.');
            return res.redirect('/citas');
        } else {
            req.flash('success_msg', 'Cita Updated Successfully!');
            res.redirect('/citas');
        }
    });
};

citasCtrl.deleteCita = async (req, res) => {
    citaService.deleteCita(req.params.id, req.user._id,  function (cita, err) {
        if (err) {
            req.flash('error_msg', 'Not Authorized.');
            return res.redirect('/citas');
        } else {
            req.flash('success_msg', 'Cita Deleted Successfully!');
            res.redirect('/citas');
        }
    });
};

module.exports = citasCtrl;


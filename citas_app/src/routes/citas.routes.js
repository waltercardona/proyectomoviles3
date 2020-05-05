const { Router } = require('express')
const router = Router();

const { renderCitaForm, 
    createNewCita, 
    renderCitas, 
    renderEditForm, 
    updateCita, 
    deleteCita 
} = require('../controllers/citas.controler');

const { isAuthenticated } = require('../helpers/auth');

// New Cita
router.get('/citas/add', isAuthenticated, renderCitaForm);
router.post('/citas/new-cita', isAuthenticated, createNewCita);

// Get All Citas
router.get('/citas', isAuthenticated, renderCitas);

// Edit Cita
router.get('/citas/edit/:id', isAuthenticated, renderEditForm);
router.put('/citas/edit/:id', isAuthenticated, updateCita);

// Delete Cita
router.delete('/citas/delete/:id', isAuthenticated, deleteCita);


module.exports = router;
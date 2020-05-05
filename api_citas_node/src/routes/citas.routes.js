const { Router } = require('express')
const router = Router();

const {  
    createNewCita, 
    renderCitas, 
    renderEditForm, 
    updateCita, 
    deleteCita 
} = require('../controllers/citas.controler');

// New Cita
router.post('/citas/new-cita', createNewCita);

// Get All Citas
router.get('/citas', renderCitas);

// Edit Cita
router.get('/citas/edit', renderEditForm);
router.put('/citas/edit/:id', updateCita);

// Delete Cita
router.delete('/citas/delete/:id', deleteCita);


module.exports = router;
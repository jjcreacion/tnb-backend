const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceControllers');

router.post('/', serviceController.createService);
router.get('/', serviceController.getAllService);
router.get('/:id', serviceController.getServiceById);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);
router.get('/all/data/', serviceController.getAllServiceAllData);

module.exports = router;
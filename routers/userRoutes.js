const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/verify/email', userController.verifyEmail);
router.post('/verify/phone', userController.verifyPhone);
router.post('/login/email', userController.verifyUserEmail); 

module.exports = router;

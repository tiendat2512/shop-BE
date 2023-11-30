const express = require('express');
const router = express.Router();
const UserController = require('../Controller/UserController');
const { authMiddleWare, authUserMiddleWare } = require('../Middleware/authMiddleware');

router.post('/sign-up', UserController.createUser)
router.post('/sign-in', UserController.loginUser)
router.post('/log-out', UserController.logoutUser)
router.put('/update-user/:id',authUserMiddleWare, UserController.updateUser)
router.delete('/delete-user/:id',  authMiddleWare, UserController.deleteUser)
router.get('/getAll',authMiddleWare,UserController.getAllUsers)
router.get('/get-details/:id',authUserMiddleWare,UserController.getDetailsUser)
router.post('/refresh-token',UserController.refreshToken)





module.exports = router;
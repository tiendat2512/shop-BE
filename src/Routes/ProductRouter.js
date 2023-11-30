const express = require('express');
const router = express.Router();
const ProductController = require('../Controller/ProductCotroller');
const { authMiddleWare } = require('../Middleware/authMiddleware');



router.post('/create', ProductController.createProduct)
router.put('/update/:id',authMiddleWare, ProductController.updateProduct)
router.get('/get-details/:id', ProductController.getDetailProduct)
router.delete('/delete/:id',authMiddleWare, ProductController.deleteProduct)
router.get('/get-all',ProductController.getAllProducts)
router.get('/get-all-type', ProductController.getAllType)





module.exports = router;
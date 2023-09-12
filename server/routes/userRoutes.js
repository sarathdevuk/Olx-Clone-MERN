const express=require('express');
const productController = require('../controller/productController');
const userController = require('../controller/uesrController');
const upload = require('../multer');
const router=express.Router();

router.post('/userSignup',userController.userRegister)

router.post('/userLogin',userController.userLogin)

router.post('/addProduct',upload.single('file'),productController.addProduct)

router.get('/getProduct',productController.getProducts)

router.get('/getCategory',productController.getCategory)

router.get('/viewProduct/:id',productController.viewProduct)

router.get('/checkAuth',userController.checkAuth)

router.get('/logout',userController.userLogout)

module.exports=router 
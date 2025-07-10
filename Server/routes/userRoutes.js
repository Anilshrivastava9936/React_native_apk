const express=require('express')
const { registerController, loginController, updateUserController, requireSignIn } = require('../controllers/userController')


//router object
const router=express.Router()




//router
router.post('/register',registerController)
router.post('/login',loginController)
router.post('/update-user',requireSignIn,updateUserController)


//export
module.exports=router;
const express = require("express");
const router = express.Router();

const {login, signup, logout} = require("../controllers/auth.controller");
const {verifyToken,isAdmin} = require("../middlewares/auth.middleware");

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);

//testing protected routes for single middleware
router.get("/test", verifyToken, (req,res) =>{
    res.json({
        success:true,
        message:'Welcome to the Protected route for TESTS',
    });
});

router.get("/admin", verifyToken, isAdmin, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for Admin',
    });
});

module.exports = router;
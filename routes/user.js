const express = require("express");
const router = express.Router();
const { handUserSingup, handleUserLogin } = require("../controllers/user.js")




router.post('/', handUserSingup);
router.post('/login', handleUserLogin);

module.exports = router;
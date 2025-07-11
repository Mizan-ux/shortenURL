const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { route } = require("./user");


router.get('/', async (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    console.log(req.user);
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render('home', {
        urls: allUrls,
    });
})

router.get('/singup', (req, res) => {
    return res.render('singup');
})

router.get('/login', (req, res) => {
    return res.render('login');
})

module.exports = router;
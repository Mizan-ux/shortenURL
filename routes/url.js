const express = require("express");
const { handleNewGenerageShortURL, mergingURL, analyticsOfClicks, getAllUrls } = require("../controllers/url.js");
const router = express.Router();

router.post('/', handleNewGenerageShortURL);
router.get('/:shortId', mergingURL);
router.get('/analytics/:shortID', analyticsOfClicks);
router.get('/test/data', getAllUrls);
module.exports = router;

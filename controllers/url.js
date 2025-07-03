const shortid = require('shortid');
const URL = require("../models/url.js");
async function handleNewGenerageShortURL(req, res) {
    const data = req.body;
    if (!data.url) return res.status(400).json({ error: 'url is required' });
    const shortID = shortid.generate();
    await URL.create({
        shortId: shortID,
        redirectURL: data.url,
        visitHistory: [],
        createdBy: req.user._id,
    })
    return res.render('home', { id: shortID });
    // return res.json({ id: shortID });
}

async function mergingURL(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: { timestamp: Date.now() },
        }
    })
    res.redirect(entry.redirectURL);
}


async function analyticsOfClicks(req, res) {
    const shortId = req.params.shortID;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}

async function getAllUrls(req, res) {
    const allUrls = await URL.find({});
    // const html = `
    // <html>
    //     <head></head>
    //     <body>
    //         <ol>
    //             ${allUrls.map((data) => `<li>http://localhost:8001/url/${data.shortId} </br> Redirect TO - ${data.redirectURL} - ${data.visitHistory.length}</li>`)}
    //         </ol>
    //     </body>
    // </html>
    // `;
    // return res.end(html);
    return res.render('home', {
        urls: allUrls,
    });
}
module.exports = {
    handleNewGenerageShortURL,
    mergingURL,
    analyticsOfClicks,
    getAllUrls,
}
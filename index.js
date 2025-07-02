const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url.js");
const ejs = require("ejs");
const staticRoute = require('./routes/staticRoute.js');
const { connectToMongoDB } = require("./connect.js");
const app = express();
const PORT = 8001;

app.set("view engine", "ejs");
app.set('views', path.resolve('./views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectToMongoDB("mongodb://localhost:27017/short-url")
    .then(() => {
        console.log('MongoDB connected');
    })
app.use("/url", urlRoute);
app.use("/", staticRoute);


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})
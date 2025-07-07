const express = require("express");
const path = require("path");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const { restricToLoggedinUserOnly, checkAuth } = require("./middlewares/auth.js");
const urlRoute = require("./routes/url.js");
const staticRoute = require('./routes/staticRoute.js');
const userRoute = require("./routes/user.js")

const { connectToMongoDB } = require("./connect.js");
const app = express();
const PORT = 8001;

app.set("view engine", "ejs");
app.set('views', path.resolve('./views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


connectToMongoDB(Enter here your database URL)
    .then(() => {
        console.log('MongoDB connected');
    })



app.use("/url", restricToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})

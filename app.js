//Essential imports
const fs = require('fs'); 
const express = require('express');
const app = express();
const Feed = require('./models/Feed');

//API Routes imports
const verifytoken = require('./verifytoken');
const verifyadmin = require('./verifyadmin');
const authRoute = require('./api_routes/authRouter');
const userRoute = require('./api_routes/userRouter');
const adminRoute = require('./api_routes/adminRouter');

//Environment config
require('dotenv').config();

//DB connect
require('./db_handler');

//Server certificates
const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.crt")
}

//Server setup
require('https').createServer(options, app)
.listen(process.env.PORT, () => {
    console.log("Server connected. Listening on port: " + process.env.PORT);
});

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/auth', authRoute);
app.use('/api/user', verifytoken, userRoute);
app.use('/api/admin', verifyadmin, adminRoute);
app.use( express.static(__dirname + './front' ) );

//route for news section
app.route('/api/feeds')
.get(async (req, res) => {
    try{
        const feeds = await Feed.find();
        res.json({error: false, message: feeds});
    } catch {
        res.status(500).json({error: true, message: "Database operation error"});
    }
})
.all((req, res) => {
    res.status(400).json({error: true, message: "Method not allowed!"});
})

//send the index.html on every page refresh and let angular handle the routing
app.get('/*', (req, res, next) => {
    console.log("Reloading");
    res.sendFile('index.html', { root: __dirname });
});
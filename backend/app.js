require('dotenv').config();

const express = require('express');
const DataBase = require('./Database/DB/db');
const user = require('./Routes/user/user');
const admin = require('./Routes/admin/admin');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const oauthSetup = require('./Routes/google/config')
const auth = require('./Routes/google/configRoute')

const app = express();
const port = process.env.PORT;


DataBase()

app.use(cors({
    origin:"http://localhost:8081",
    methods: "",
    allowedHeaders: '',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret:"session",
    resave:false,
    saveUninitialized:true,
    cookie: {secure: false}
}));



app.use(passport.initialize());
app.use(passport.session())

app.use('/admin', admin)
app.use('/users', user);
app.use('/auth', auth)


app.get('/',(req, res) => {
    res.send("This is the home page")
})

app.listen(port, () => {
    console.log(`app running on port ${port}`)
});

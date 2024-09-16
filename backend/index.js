require('dotenv').config();

const express = require('express');
const DataBase = require('./Database/DB/db');
const user = require('./Routes/user/user');
const admin = require('./Routes/admin/admin');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT;


DataBase()

app.use(cors({
    origin:"",
    methods: "",
    allowedHeaders: '',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())

app.use('/admin', admin)
app.use('/users', user);

app.listen(port, () => {
    console.log(`app running on port ${port}`)
});

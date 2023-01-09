const express = require('express');
const app = express();
var cors = require('cors');
const path = require('path');

const UserRoute = require('./route/user');

const sequelize = require('./util/database');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', UserRoute);

sequelize
    // .sync({force: true})
    .sync()

    .then(result => {
        app.listen(4000);
    })
    .catch(err => console.log(err));

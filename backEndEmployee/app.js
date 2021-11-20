const express = require('express'),
    app = express(),
    http = require('http').Server(app),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    config = require('./config/config'),
    db = require('./database/database')
    // init = require('./init/init')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
// init.CreateEmployee()

app.use('', require('./routes/index.routes'))


http.listen(config.port, () => {
    console.log('Server is running in port', config.port);
});
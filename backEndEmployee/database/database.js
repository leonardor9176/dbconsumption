const mongoose = require('mongoose'),
    config = require('../config/config')

mongoose.connect(config.Urldb)
    .then(db => console.log('Connected to db at '+ Date()))
    .catch(err => console.log(err))

module.exports = mongoose

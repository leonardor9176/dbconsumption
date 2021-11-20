const {Router} = require('express'),
    router = Router();

router.use('/employee', require('./employee.routes'));

module.exports = router
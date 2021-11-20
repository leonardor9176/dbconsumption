const express = require('express'),
    router = express.Router(),
    ctrlEmployee = require('../controllers/employee.controller')

router.post('/', ctrlEmployee.create);
router.delete('/:_id', ctrlEmployee.delete);
router.get('/', ctrlEmployee.list);
router.get('/:document', ctrlEmployee.showEmployee);
router.put('/:_id', ctrlEmployee.update);

module.exports = router;
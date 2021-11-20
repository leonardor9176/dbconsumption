console.log('hello there, creating new employee')
const employee = require('../models/employee.model')

exports.CreateEmployee = function () {
    let newEmployee = new employee(
        {
            name: 'empleado 1',
            document: '123456',
            phone: '311254678',
            email: 'empleado1@mail',
            salary: 500000,
            genter: 'm',
            dob: Date.now(),
        }
    )
    newEmployee.save()
}

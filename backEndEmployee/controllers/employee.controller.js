const messages = require('../config/messages');

const ctrlEmployee = {},
    Employee = require('../models/employee.model'),
    message = require('../config/messages')


    ctrlEmployee.create = async (req, res) => {
    try {
        const newEmployee = new Employee({
            name: req.body.name,
            document: req.body.document,
            phone: req.body.phone,
            email: req.body.email,
            salary: req.body.salary,
            gender: req.body.gender,
            dob: req.body.dob
        });
        await newEmployee.save();
        res.json({ msg: messages.employee.postSuccess, status: true });
    }
    catch(error){
        res.json({msg: messages.employee.postError, error: error})
    }
};

ctrlEmployee.list = async (req, res) => {
    const employees = await Employee.find();
    res.json({data: employees, status: true});
}

ctrlEmployee.showEmployee = async (req, res) => {
    const { document } = req.params;
    const employee = await Employee.findOne({ document: document });
    console.log(employee)
    res.json({data: employee, status: true});
}

ctrlEmployee.delete = async (req, res) => {
    console.log('delete called in controller\n'+req.params)
    const { _id } = req.params;
    const employee = await Employee.deleteOne({ _id: _id });
    res.json({ msg: message.employee.deleteSuccess })
}

ctrlEmployee.update = async (req, res) => {
    const { _id } = req.params;
    const employee = await Employee.findByIdAndUpdate({ _id: _id },
        {
            name: req.body.name.trim(),
            document: req.body.document.trim(),
            phone: req.body.phone,
            email: req.body.email.trim(),
            salary: req.body.salary,
            gender: req.body.gender.trim(),
            dob: req.body.dob,
            uptadedAt: Date.now()
        });
    res.json({ msg: message.employee.updateSuccess });
}

module.exports = ctrlEmployee;
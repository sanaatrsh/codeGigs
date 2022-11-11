const { Sequelize } = require('sequelize');
const sequlize = new Sequelize('codegig',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
    })

sequlize.authenticate()
    .then(() => console.log('database connected!'))
    .catch((err) => console.log(err))

module.exports = sequlize;
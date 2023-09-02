const Sequelize = require("sequelize")
const config = require('config')
const sequelize = new Sequelize(config.get('database'), config.get('user'), config.get('password'), {
    dialect: "mysql",
    host: config.get('host'),
    define: {
        timestamps: false
    }
})

module.exports = sequelize
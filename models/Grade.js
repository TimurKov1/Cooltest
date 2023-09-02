const Sequelize = require("sequelize")
const config = require('config')
const sequelize = require('../vendor/bd')

const Grade = sequelize.define("grades", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Grade
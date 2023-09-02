const Sequelize = require("sequelize")
const config = require('config')
const sequelize = require('../vendor/bd')

const Question = sequelize.define("questions", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    test_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Question
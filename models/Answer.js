const Sequelize = require("sequelize")
const config = require('config')
const sequelize = require('../vendor/bd')

const Answer = sequelize.define("answers", {
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
    is_right: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    question_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Answer
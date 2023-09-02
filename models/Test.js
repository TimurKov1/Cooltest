const Sequelize = require("sequelize")
const config = require('config')
const sequelize = require('../vendor/bd')

const Test = sequelize.define("tests", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    teacher_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    create_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    time: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    questions: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    grade_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    update_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
});

module.exports = Test
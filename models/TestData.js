const Sequelize = require("sequelize")
const config = require('config')
const sequelize = require('../vendor/bd')

const TestData = sequelize.define("tests_data", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    student_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    test_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mark: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    questions: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    duration: {
        type: Sequelize.STRING,
        allowNull: false
    },
    is_done: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
});

module.exports = TestData
const Sequelize = require("sequelize")
const config = require('config')
const sequelize = require('../vendor/bd')

const QuestionData = sequelize.define("questions_data", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    question_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    student_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    answer_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
});

module.exports = QuestionData
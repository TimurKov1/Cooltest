const Sequelize = require("sequelize")
const config = require('config')
const sequelize = require('../vendor/bd')

const Teacher = sequelize.define("teachers", {
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
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    create_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    update_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
});

module.exports = Teacher
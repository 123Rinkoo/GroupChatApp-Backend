const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Group= sequelize.define('ChatGroup', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Name: Sequelize.STRING,
    // CreatedUserId: Sequelize.INTEGER,
    CreatedBy: Sequelize.STRING
});
module.exports=Group;
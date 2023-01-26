const Sequelize = require('sequelize');

const sequelize = require('../util/database');
 
const GroupMessage= sequelize.define('ChatGroupmessage', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Message: Sequelize.STRING,
    UserName: Sequelize.STRING,
    GroupId: Sequelize.INTEGER
});
module.exports=GroupMessage;
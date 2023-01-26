const Sequelize = require('sequelize');

const sequelize = require('../util/database');
 
const GroupMembers= sequelize.define('ChatGroupmembers', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    IsAdmin: Sequelize.BOOLEAN,
    GroupName: Sequelize.STRING,
    
    // UserId: Sequelize.INTEGER,
    // GroupId: Sequelize.INTEGER
});
module.exports=GroupMembers;
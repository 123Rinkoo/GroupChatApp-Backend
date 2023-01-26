const express = require('express');
var cors = require('cors');
const path = require('path');
const app = express();

const User= require('./model/user');
const Message=require('./model/messages');
const Group=require('./model/group');
const GroupMembers=require('./model/groupmembers');
const GroupMessage = require('./model/groupmessage');


const UserRoute = require('./route/user');
const MesssageRoute=require('./route/message');
const ChatGroup=require('./route/group');

const sequelize = require('./util/database');
const bodyParser = require('body-parser');

app.use(cors({
    origin: "*",  
  method: ["GET", "POST"], 
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', UserRoute);
app.use(MesssageRoute);
app.use(ChatGroup);

Message.belongsTo(User);
User.belongsToMany(Group, { through: GroupMembers });
Group.belongsToMany(User, { through: GroupMembers });
// GroupMembers.belongsTo(GroupMessage);
GroupMessage.belongsTo(GroupMembers);

sequelize
    // .sync({force: true})
    .sync()
    .then(result => {
        app.listen(4000);
    })
    .catch(err => console.log(err));

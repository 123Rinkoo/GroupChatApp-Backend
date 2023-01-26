const Message=require('../model/messages');
const { Op } = require("sequelize");
const GroupMessage=require('../model/groupmessage');
const GroupMembers = require('../model/groupmembers');


exports.sendmessage=(req,res,next)=>{
//  console.log(req.body.key1, 'this is userid',req.user.id);

 Message.create({Message: req.body.key1, userId: req.user.id, UserName: req.user.name})
 .then(result=> {
    return res.status(200).json({success: true})})
 .catch(err=>console.log(err)); 
}; 

exports.getmessage=(req, res, next)=>{
    // console.log('its coming');
    if(req.query.lastId==undefined)
    {
       var  lastmessageId=-1;
    }
    else
    {
        var lastmessageId=req.query.lastId;
    }
    console.log(req.query.lastId);
    Message.findAll({where: {id: {[Op.gt]:lastmessageId}}})
    .then(messages=>res.json(messages))
    .catch(err=>console.log(err));
}

exports.sendGroupMessage=(req, res, next)=>{
    const userid=req.user.id;
    const chatgroupID=req.body.key1;
    const message=req.body.key2;
    
    GroupMembers.findOne({where: {userId: userid, ChatGroupId: chatgroupID}})
    .then(result=>{
        if(result.IsAdmin==true){
            var username=`${req.user.name}(admin)`;
        }
        else{
            var username=req.user.name;
        }
        GroupMessage.create({Message: message,UserName:username,GroupId: chatgroupID, ChatGroupmemberId: result.id})
        .then(result=>{
            return res.status(200).json({success: true});
        })
        .catch(err=>{
            return res.status(500).json({success: false});
        });
    })
    .catch();
} 

exports.getGroupMessage=(req, res, next)=>{
    console.log(req.query.CGI);
    
    if(req.query.lastId==undefined)
    {
       var  lastmessageId=-1;
    }
    else
    {
        var lastmessageId=req.query.lastId;
    }
    // console.log(req.query.lastId);
    GroupMessage.findAll({where: {GroupId: req.query.CGI, id: {[Op.gt]:lastmessageId}}})
    .then(messages=>res.json(messages))
    .catch(err=>console.log(err));
}


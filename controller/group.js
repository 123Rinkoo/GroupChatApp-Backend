const { reset } = require('nodemon');
const Group = require('../model/group');
const GroupMembers = require('../model/groupmembers');
const User=require('../model/user');

exports.createGroup = (req, res, next) => {
    console.log('its coming', req.body.key1);
    // console.log(req.user);
    Group.create({ Name: req.body.key1, CreatedUserId: req.user.id, CreatedBy: req.user.name })
        .then(result => {
            Group.findOne({ where: { Name: req.body.key1 } })
                .then(detail => {
                    // console.log(detail.id);
                    GroupMembers.create({ IsAdmin: true, GroupName: detail.Name ,userId: req.user.id, ChatGroupId: detail.id })
                        .then()
                        .catch();
                })
                .catch();

            return res.status(200).json({ success: true, GroupDetail: result })
        })
        .catch(err => { return res.status(500).json({ success: false, result: "Can't form group now!" }) });
}

exports.GetAllGroup = (req, res, next) => {
    // console.log(req.user)
    GroupMembers.findAll({ where: { userId: req.user.id } })
        .then(result=>{
            return res.status(200).json({ success: true, result: result }) ;
        })
        .catch(err => {
            return res.status(500).json({ success: false, message: "Can't form group member" })
        });
}

exports.addmember=async (req, res, next)=>{
    // const Groupname=req.body.key1;
    // const emailid=req.body.key2;
    // console.log('its coming addmember', Groupname, emailid);
    var userid;
    await User.findOne({where: {email: req.body.key2 }})
    .then(result=>{
        userid=result.id;
    })
    .catch();
    GroupMembers.findOne({where: {IsAdmin: false, GroupName: req.body.key1, userId: userid, ChatGroupId: req.body.key3} })
    .then(data=>{
        if(data){
            return res.status(409).json({ success: false, message: "Member is also Present!" }) ;
        }
        if(!data){
            // console.log("data is not present")
            GroupMembers.create({IsAdmin: false, GroupName: req.body.key1, userId: userid, ChatGroupId: req.body.key3 })
            .then(result=>{
                console.log('done');
                return res.status(200).json({ success: true, message: "Member is succesfully added!" }) ;
            })
            .catch(err=>{
                return res.status(500).json({ success: false, message: "Can't add member now!" }) ;
            })   
        }
    })
    .catch(err=>{
        console.log(err);
    });
}
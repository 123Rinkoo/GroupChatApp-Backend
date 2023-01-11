const Message=require('../model/messages');

exports.sendmessage=(req,res,next)=>{
//  console.log(req.body.key1, 'this is userid',req.user.id);
 Message.create({Message: req.body.key1, userId: req.user.id, UserName: req.user.name})
 .then(result=> {
    return res.status(200).json({success: true})})
 .catch(err=>console.log(err)); 
}; 

exports.getmessage=(req, res, next)=>{
    console.log('its coming');
    Message.findAll()
    .then(messages=>res.json(messages))
    .catch(err=>console.log(err));
}
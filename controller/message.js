const Message=require('../model/messages');

exports.sendmessage=(req,res,next)=>{
//  console.log(req.body.key1, 'this is userid',req.user.id);
 Message.create({Message: req.body.key1, userId: req.user.id})
 .then()
 .catch(err=>console.log(err)); 
}; 
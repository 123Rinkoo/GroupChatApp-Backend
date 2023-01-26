const express = require('express');
const router = express.Router();
const MessageController = require('../controller/message');
const authUser=require('../middleware/auth');

router.post("/sendmessage",authUser.authenticate, MessageController.sendmessage);
router.get('/getmessage', MessageController.getmessage)
router.post('/sentgroupmsg',authUser.authenticate, MessageController.sendGroupMessage);
router.get('/getgroupmsg', MessageController.getGroupMessage);

module.exports = router;
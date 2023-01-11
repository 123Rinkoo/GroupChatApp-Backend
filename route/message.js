const express = require('express');
const router = express.Router();
const MessageController = require('../controller/message');
const authUser=require('../middleware/auth');

router.post("/sendmessage",authUser.authenticate, MessageController.sendmessage);
router.get('/getmessage', MessageController.getmessage)

module.exports = router;
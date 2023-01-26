const express = require('express');
const router = express.Router();
const groupController = require('../controller/group');
const authUser=require('../middleware/auth');


router.post("/creategroup",authUser.authenticate, groupController.createGroup);
router.get('/getAllGroups',authUser.authenticate, groupController.GetAllGroup);
router.post('/addmember', groupController.addmember);

module.exports = router; 
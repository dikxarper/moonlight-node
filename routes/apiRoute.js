const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const uploadAvatar = require('../middleware/uploadAvatar');
const uploadConquest = require('../middleware/uploadConquest');


router.post("/user/create", uploadAvatar.single('avatar'), uploadConquest.single('conquest'), async (req, res) => {
    const { avatar, conquest } = req.files;
    const { fullName, history } = req.body;

    if (!avatar && !conquest && !fullName && !history) {
        return res.status(404).json({message: "Some fields are required!"}) 
    }

    const user = new User({
        fullName,
        history, 
        avatar, 
        conquest
    })
    try {
        await user.save();
        res.status(200).json({message: "User added"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"})
    }
})

module.exports = router;
const express = require('express');
const router = express.Router();
const Posts = require('../models/Posts');

router.post ('/api/posts/createPost', async (req, res) => {
    let post = await Posts.create ({
        user: req.body.user,
        img: req.body.img,
        caption: req.body.caption
    })
    await post.save();
    return res.status(200).json({ success: true, message: 'post created successfully' });
})

module.exports = router;
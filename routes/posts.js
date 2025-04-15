const express = require('express');
const router = express.Router();
const data = require('../data'); 
const { validatePost } = require('../middleware/validatepost');


router.put('/:id', (req, res) => {
    const { title, content } = req.body;
    const postId = req.params.id;

    // find the post by its ID
    const post = data.posts.find(post => post.id == postId);

    if (post) {
        // update the post's title and content
        post.title = title;
        post.content = content;

        // return a success response
        res.status(200).json({ message: 'Post updated successfully', post });
    } else {
        // if the post was not found
        res.status(404).json({ message: 'Post not found' });
    }
});

// create a new post
router.post('/new', validatePost,  (req, res) => {
    const newPost = { ...req.body, date: new Date(), id: data.posts.length + 1 };
    data.posts.push(newPost);
    res.redirect('/');
});

// delete a post
router.post('/:id/delete', (req, res) => {
    const postIndex = data.posts.findIndex(post => post.id == req.params.id);
    data.posts.splice(postIndex, 1);
    res.redirect('/');
});

module.exports = router;
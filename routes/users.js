const express = require('express');
const router = express.Router();
const data = require('../data'); 


router.post('/new', (req, res) => {
    console.log(req.body);
    const newUser = { ...req.body, id: data.users.length + 1 };
    data.users.push(newUser);
    res.redirect('/');
});


router.post('/:id/delete', (req, res) => {
    const userIndex = data.users.findIndex(user => user.id == req.params.id);
    data.users.splice(userIndex, 1);
    res.redirect('/');
});

module.exports = router;
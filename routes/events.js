var express = require('express');

module.exports = function(app, io) {

    /**
     * Handles a new post event from Timeline Core
     * Emits a 'new_post' event so any listening sockets can process it
     *
     * POST /events/post
     */
    app.post('/events/post', function (req, res, next) {
        io.of('/' + req.body.username.toUpperCase()).emit('new_post', req.body.post);
        res.json({
            success: true,
            message: "New Post event successfully emitted"
        });
    });

};

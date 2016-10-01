var express = require('express');
var router = express.Router();

var timelineApi = require('../services/TimelineAPIService.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    // Get the username from the request
    var username = req.subdomains.reverse().join('.');
    if(username != "" && username != "www") {
        timelineApi.getUserPosts(username)
            .then(function (posts) {
                res.render('blog', {
                    title: username,
                    username: username.toUpperCase(),
                    posts: posts
                });
            })
            .catch(function(err) {
                res.render('blog_404', {
                    username: username
                });
            });
    } else {
        res.render('index', {
            title: 'Timejar',
            content: 'Welcome to Timejar'
        });
    }
});

module.exports = router;

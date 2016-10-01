var express = require('express');
var router = express.Router();

var timelineApi = require('../services/TimelineAPIService.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    timelineApi.getUserPosts("test")
        .then(function(posts) {
            res.render('blog', {
                title: 'Test Blog',
                username: 'TEST',
                posts: posts
            });
        });
});

router.get('/:username', function (req, res, next) {

});

module.exports = router;

/**
 * Created by jq on 1/10/2016.
 */

var TIMELINE_API_BASE_URL = "https://109bl48szj.execute-api.ap-southeast-2.amazonaws.com";

var request = require('request');

/**
 * Retrieves a user's posts via the Timeline API
 * @param username
 * @returns {Promise}
 */
module.exports.getUserPosts = function (username) {
    var url = TIMELINE_API_BASE_URL + "/dev/user/" + username + "/posts";

    return new Promise(function (resolve, reject) {
        request.get(url)
            .on('response', function (res) {
                if (res.statusCode == 200) {
                    res.on('data', function(data) {
                        var postStrs = JSON.parse(data).posts;
                        var posts = postStrs.map(function(post) {
                            return JSON.parse(post);
                        });
                        resolve(posts);
                    });
                }
                else {
                    console.log("ERROR " + res.statusCode);
                    reject({success: false});
                }
            });
    });
};
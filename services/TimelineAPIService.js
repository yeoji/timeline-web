/**
 * This API service utilizes the Timeline Core API
 * Created by jq on 1/10/2016.
 */

var TIMELINE_API_BASE_URL = "https://109bl48szj.execute-api.ap-southeast-2.amazonaws.com";

var request = require('request');
var moment = require('moment');

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
                    res.on('data', function (data) {
                        data = JSON.parse(data);
                        if (data.success) {
                            var postStrs = data.posts;
                            var posts = postStrs.map(function (post) {
                                return JSON.parse(post);
                            });

                            // sort posts via timestamp (newest to oldest)
                            posts = posts.sort(function (p1, p2) {
                                if (moment(p1.Timestamp).isBefore(p2.Timestamp)) return 1;
                                else return -1;
                            });
                            resolve(posts);
                        } else reject(data.message);
                    });
                }
                else {
                    console.log("ERROR " + res.statusCode);
                    reject({success: false});
                }
            });
    });
};
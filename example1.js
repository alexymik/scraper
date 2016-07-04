// example1.js - Example #1 - Goes to http://www.horseheadspickapart.com/content.php?id=46 and returns the HTML

var request = require('request');

var host = 'http://www.horseheadspickapart.com';
var page = 'content.php?id=46';

var options = {
    method: 'get',
    uri: host + '/' + page,
    json: true
};

request(options, function (error, response, body) {
    if (error) {
        return console.error('Error: ' + console.dir(error));
    }

    console.dir(body);

});
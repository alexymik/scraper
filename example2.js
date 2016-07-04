// example2.js - Example #2 - Goes to http://www.horseheadspickapart.com/content.php?id=46
// and returns a JSON array of vehicle results

var request = require('request');
var cheerio = require('cheerio');

var host = 'http://www.horseheadspickapart.com';
var page = 'content.php?id=46';

var options = {
    method: 'get',
    uri: host + '/' + page,
    json: true
};

var results = [];

request(options, function (error, response, body) {
    if (error) {
        return console.error('Error: ' + console.dir(error));
    }

    var $ = cheerio.load(body);
    
    $('#featured_content').each(function() {
        
        var vehicle = $(this).find('h4').text(); // Get vehicle
        var date_added = $(this).find('h4').next().text();
        var image = $(this).prev().find('img').attr('src'); // Get image
        
        results.push({
            'vehicle': vehicle,
            'date_added': date_added,
            'image': host + '/' + image,
            //'full_image': host + '/' + image.replace(/resized_/g, '').replace(/&w=(\d+)/g, '')
        })
    });
    
    console.dir(results);
});
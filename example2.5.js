// example2.5.js - Example #2.5 - Goes to http://www.horseheadspickapart.com/content.php?id=46
// and emails a JSON array of matched vehicle results

require('dotenv').config();
var request = require('request');
var cheerio = require('cheerio');

var host = 'http://www.horseheadspickapart.com';
var page = 'content.php?id=46';
var my_car = 'honda';

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
            'full_image': host + '/new_photos/' + image.match(/(IMG_\d\d\d\d\.JPG)/g)
        })
    });

    //console.dir(results);

    var matched_cars = []; // Pretend this is some NoSQL magic
    var raggedy_html = '<html><body><ul>'; // For the email
    
    Object.keys(results).forEach(function(key) {
        if (results[key]['vehicle'].toLowerCase().includes(my_car.toLowerCase())) {
            
            matched_cars.push(results[key]);

            raggedy_html += '<li>';
            raggedy_html += '<a href="' + results[key]['full_image'] + '"><img src="' + results[key]['image'] + '" ></a><br>';
            raggedy_html += results[key]['vehicle'] + '<br>';
            raggedy_html += results[key]['date_added'];
            raggedy_html += '</li>';
        }
    });

    raggedy_html += '</ul></body></html>';

    //console.dir(matched_cars);

    // Mostly copy/pasted from the SendGrid example
    var helper = require('sendgrid').mail;
    var from_email = new helper.Email('noreply@scraping.bot');
    var to_email = new helper.Email(process.env.DESTINATION_EMAIL_ADDRESS);
    var subject = matched_cars.length + ' ' + my_car + ' vehicles in the lot today!';
    var content = new helper.Content('text/html', raggedy_html);
    var mail = new helper.Mail(from_email, subject, to_email, content);

    var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY)
    var requestBody = mail.toJSON()
    var sg_request = sg.emptyRequest()
    sg_request.method = 'POST'
    sg_request.path = '/v3/mail/send'
    sg_request.body = requestBody
    sg.API(sg_request, function (response) {
        console.log(response.statusCode)
        console.log(response.body)
        console.log(response.headers)
    })
    
});
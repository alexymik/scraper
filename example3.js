// example2.js - Example #2 - Goes to http://www.horseheadspickapart.com/content.php?id=46
// and returns a JSON array of vehicle results

var request = require('request-promise');
var cheerio = require('cheerio');
var async = require('async');

var host = 'http://row52.com/';
var page = 'Search/Index?Page=1&MakeId=145&ModelId=0&Year=&Distance=50&Sort=DateAdded&SortDirection=desc&ZipCode=14850';

var options = {
    method: 'get',
    uri: host + '/' + page,
    json: true,
    headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
    }
};

var results = Array();

request(options).then(function(response) {

    var $ = cheerio.load(response);
    
    var num_of_pages = $('.pagingform > span.count').first().text().match(/(\d+)/g)[0];

    num_of_pages = parseInt(num_of_pages);

    var pages_to_scrape = Array();

    // Commit this sin because I don't know how to do this using async properly and have a deadline
    for (var i = 1; i <= num_of_pages; i++) {
        // Get an array of page numbers eg. [1, 2, 3]
        pages_to_scrape.push(i);
    }

    async.forEach(pages_to_scrape, function (page_number, callback) {

        var page_url = host + '/' + 'Search/Index?Page=' + page_number + '&MakeId=145&ModelId=0&Year=&Distance=50&Sort=DateAdded&SortDirection=desc&ZipCode=14850';
        var page_options = options;
        page_options.uri = page_url;

        request(page_options).then(function(page_result) {

            var $ = cheerio.load(page_result);

            $('.vin > span[itemprop="name"]').each(function() {
                results.push($(this).text());
            });

            callback();
        }).error(function(error) {
            callback('Error ' + error.statusCode + ': ' + error.message);
        });
        
    }, function(error) {
        if (error) {
            console.log('Error: ' + error);
        }
        
        console.log('Got ' + results.length + ' VINs');

        var parsed_results = Array();
        
        async.forEach(results, function(vin, vin_callback) {
            var vin_url = host + '/' + 'Vehicle/Vin/' + vin;
            var vin_options = options;
            
            vin_options['uri'] = vin_url;
            
            request(vin_options).then(function(vin_result) {

                parsed_results[vin] = {};
                
                $ = cheerio.load(vin_result);

                $('tbody > tr').each(function() {
                    var property = $(this).find('td').first().text().toString();
                    var value = $(this).find('td.subtle').text().toString();
                    parsed_results[vin][property] = value;
                });

                vin_callback();
            }).error(function(error) {
                vin_callback('Error ' + error.statusCode + ': ' + error.message);
            });

        }, function(error) {
            if (error) {
                console.log('Error: ' + error);
            }
            
            console.dir(parsed_results);
        });

    });

    }).error(function(error) {
        return console.error('Error: ' + console.dir(error));
    
});
# Web scraping examples

A collection of web scraping examples written in Node.js. Ordered from simplest to increasingly complicated.

## Setup

1. Clone repo
2. Run `npm install`
3. Rename default.env to .env and fill in the provided blanks

### Example 1

The most simple example, performs a HTTP GET request to a site and prints the HTML content to the console.

Run with `node example1.js`

### Example 2

Building on Example 1, we use the [cheerio](https://github.com/cheeriojs/cheerio) library to parse the HTML and get a collection of results.

### Example 2.5

Directly adding on to example 2 by adding [SendGrid](https://github.com/sendgrid/sendgrid-nodejs) email support. Does a simple text match on a vehicle and sends the results in an HTML email.


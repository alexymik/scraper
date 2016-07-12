# Web scraping examples

A collection of web scraping examples written in Node.js. Ordered from simplest to increasingly complicated.

## Presentation

View the presentation on [Google Slides](https://docs.google.com/presentation/d/15lEQx40_kiz2W3ZAxekUQIzRTPxE1H4j7W8aK-vSeEw/edit?usp=sharing)

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

### Example 3

Example 3 is the most complicated. 3 sets of requests are made:

1. Gets the number of pages
2. Hits each page once to get a list of vehicles identification numbers
3. Sends each VIN to an endpoint to get vehicle data

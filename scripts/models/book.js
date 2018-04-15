'use strict';

let app = app || {}; // Change to var if it's BROKEN!

const ENV = {};

ENV.isProduction = window.location.protocol === 'https';
ENV.productionApiUrl = 'https://bookapp-madhutamajay.github.io/book-list-client/';
ENV.developmentApiUrl = 'http://127.0.0.1:3000/';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl :ENV.developmentApiUrl;


(function(module) {

  function Book(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }
  
  Book.all = [];

  Book.prototype.toHtml = function() {
    var template = Handlebars.compile($('#book-list-template').text());

    this.isbn = this.isbn;
    this.image_url = this.image_url;
    this.description = marked(this.description);

    return template(this);
  }


  module.Book = Book;
})(app);
'use strict';

var app = app || {}; // Change to var if it's BROKEN!

const ENV = {};

ENV.isProduction = window.location.protocol === 'https';
ENV.productionApiUrl = 'https://bookapp-madhutamajay.github.io/book-list-client';
ENV.developmentApiUrl = 'http://127.0.0.1:5000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl :ENV.developmentApiUrl;


(function(module) {
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Book(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }
  
  Book.all = [];

  Book.prototype.toHtml = function() {
    var template = Handlebars.compile($('#book-list-template').text());

    // this.isbn = this.isbn;
    // this.image_url = this.image_url;
    // this.description = marked(this.description);

    return template(this);
  }
  
  Book.loadAll = rows => {
    rows.sort((a,b) => a.title.localCompare(b.title));
    Book.all = rows.map(bookObject => new Book(bookObject));
  };

  Book.fetchAll = callback => {
    $.get(`${ENV.apiUrl}/api/v1/books`)
      .then(results => {
        Book.loadAll(results);
      })
      .then(callback)
      .catch(errorCallback);
  };

  module.Book = Book;
})(app);
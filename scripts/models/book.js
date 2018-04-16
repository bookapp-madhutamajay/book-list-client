'use strict';

var app = app || {}; // Change to var if it's BROKEN!

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://git.heroku.com/mr-tr-js-booklist.git';
ENV.developmentApiUrl = 'http://localhost:5000';
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
    //rows.sort((a,b) => a.title.localCompare(b.title));
    rows.sort((a,b) => b.title - a.title);
    Book.all = rows.map(bookObject => new Book(bookObject));
  };

  Book.fetchAll = callback => {
    // console.log(window.location.protocol, ENV.isProduction,ENV.apiUrl);
    $.get(`${ENV.apiUrl}/api/v1/books`)
      .then(results => {
        console.log(results);
        Book.loadAll(results);
      })
      .then(callback)
      .catch(errorCallback);
  };

  module.Book = Book;
})(app);
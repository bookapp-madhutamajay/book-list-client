'use strict';
var app = app || {};

(function(module){
  const bookView = {};
  bookView.initIndexPage = () => {
    $('.container').hide();
    $('.book-view').show();
    console.log('init index page')
    app.Book.all.map(book => $('#book-list').append(book.toHtml()));
  };
  module.bookView = bookView;

})(app);

//Shorthand for $(document).ready()
$(function() {
  console.log('DOM loaded');
  app.Book.fetchAll(app.bookView.initIndexPage);
});
'use strict';

var app = {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https';
ENV.productionApiUrl = 'https://bookapp-madhutamajay.github.io/book-list-client/';
ENV.developmentApiUrl = 'http://127.0.0.1:3000/';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl :ENV.developmentApiUrl;

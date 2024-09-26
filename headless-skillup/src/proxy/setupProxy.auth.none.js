const { createProxyMiddleware } = require('http-proxy-middleware');
const {REACT_APP_HOST_URI } = process.env;

/*
    Set up a proxy with AEM for local development
    In a production enviroment this proxy should be set up at the webserver level or absolute URLs should be used.
*/

module.exports = function(app) {
  app.use(
    ['/content', '/graphql'],
    createProxyMiddleware({
      target: REACT_APP_HOST_URI,
      changeOrigin: true
    })
  );
};


define([
  'backbone'
  ],
  function (Backbone) {
    return Backbone.Router.extend({
      routes: {
        '': 'index',
        "test": "testindex"
      },
      index: function() {
        console.log('Hello index');
      },
      testindex: function() {
        console.log('Hello testindex');
      }
    });
  });

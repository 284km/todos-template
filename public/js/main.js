(function() {
  require.config({
    paths: {
      jquery: 'vendor/jquery/dist/jquery',
      underscore: 'vendor/underscore/underscore',
      backbone: 'vendor/backbone/backbone',
      'backbone.localStorage': 'vendor/backbone.localStorage/backbone.localStorage'
    },
    shim: {
      underscore: {
        exports: '_'
      },
      backbone: {
        exports: 'Backbone',
        deps: ['jquery', 'underscore']
      }
    }
  });

  require(['jquery', 'underscore', 'backbone', 'routers/app_router', 'collections/TodoList', 'views/AppView'], function($, _, Backbone, Router, TodoList, AppView) {
    var appview, router, todolist;
    router = new Router();
    todolist = new TodoList();
    appview = new AppView({
      router: router,
      collection: todolist
    });

    return $(function() {
      $('body').append(appview.render().el);
      return Backbone.history.start({
        pushState: true
      });
    });
  });

}).call(this);

require.config
  paths:
    jquery: 'vendor/jquery/dist/jquery',
    underscore: 'vendor/underscore/underscore',
    backbone: 'vendor/backbone/backbone',
    'backbone.localStorage' : 'vendor/backbone.localStorage/backbone.localStorage',
    'handlebars' : 'vendor/handlebars/handlebars',
  shim:
    underscore:
      exports: '_'
    backbone:
      exports: 'Backbone',
      deps: ['jquery', 'underscore'],

require [
  'jquery',
  'underscore',
  'backbone',
  'routers/app_router',
  'collections/TodoList',
  'views/AppView',
  ],
  ($, _, Backbone, Router, TodoList, AppView) ->
    router = new Router()
    todolist = new TodoList()
    appview = new AppView(
      router: router,
      collection: todolist,
    )

    $ ->
      $('body').append(appview.render().el)
      Backbone.history.start(pushState: true)


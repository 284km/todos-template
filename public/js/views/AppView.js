define([
  'jquery',
  'underscore',
  'backbone',
  './TodoView'
//  './ListView',
//  './ShowView',
//  './EditView',
//  './NewView',
//  'jst/pc'
],
function ($, _, Backbone, TodoView
//  , ListView, ShowView, EditView, NewView, JST
  ) {

  var AppView = Backbone.View.extend({

//    el: $("#todoapp"),
    el: "#todoapp",

    // Our template for the line of statistics at the bottom of the app.
//    statsTemplate: _.template($('#stats-template').html()),

    events: {
      "keypress #new-todo":  "createOnEnter",
      "click #clear-completed": "clearCompleted",
      "click #toggle-all": "toggleAllComplete"
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
      this.input = this.$("#new-todo");
      this.allCheckbox = this.$("#toggle-all")[0];

      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'all', this.render);

      this.main = $('#main');
      this.footer = this.$('footer');

      this.collection.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
//      var done = this.collection.done().length;
//      var remaining = this.collection.remaining().length;

      if (this.collection.length) {
        this.main.show();
        this.footer.show();
//        this.footer.html(this.statsTemplate({done: done, remaining: remaining}));
      } else {
        this.main.hide();
        this.footer.hide();
      }

//      this.allCheckbox.checked = !remaining;
      return this;
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(todo) {
      var view = new TodoView({model: todo});
      this.$("#todo-list").append(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
      this.collection.each(this.addOne, this);
//      Todos.each(this.addOne, this);
    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      if (!this.input.val()) return;

      this.collection.create({title: this.input.val()});
      this.input.val('');
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
      _.invoke(this.collection.done(), 'destroy');
      return false;
    },

    toggleAllComplete: function () {
      var done = this.allCheckbox.checked;
      this.collection.each(function (todo) { todo.save({'done': done}); });
    }

  });
  return AppView;

});

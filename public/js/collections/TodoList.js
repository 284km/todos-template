define([
  'backbone',
  'backbone.localStorage',
  'models/Todo'
],
function (Backbone, LocalStorage, Todo) {

  // Singleton
  var instance;

  var TodoList = Backbone.Collection.extend({
    model: Todo,
    localStorage: new LocalStorage('todos-backbone'),

    done: function() {
      return this.where({done: true});
    },

    // Filter down the list to only todo items that are still not finished.
//    remaining: function() {
//      return this.where({done: false});
//    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
//    nextOrder: function() {
//      if (!this.length) return 1;
//      return this.last().get('order') + 1;
//    },

    // Todos are sorted by their original insertion order.
    comparator: 'order'

  });

  return TodoList;
});

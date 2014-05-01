define([
  'underscore',
  'backbone'
  ],
  function (_, Backbone) {
    return Backbone.Model.extend({

      defaults: function() {
        return {
          title: "empty todo...",
//          order: Todos.nextOrder(),
          done: false
        };
      },

      // Toggle the `done` state of this todo item.
      toggle: function() {
        this.save({done: !this.get("done")});
      }

    });
  }
);

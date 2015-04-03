Template.list.helpers({
    todoList: function () {
        return Todo.find({done: false}, {sort: {createdAt: -1}});
    }
});

Template.list.events({
    'submit .addTodo': function(event) {
        event.preventDefault();

        var $newTodo = $('.newTodo');

        Todo.insert({
          task: $newTodo.val(),
          createdAt: new Date(),
          done: false
        });

        $newTodo.val('');
    },

    'click .check': function(event) {
        event.preventDefault();

        var id = $(event.target).data('id');

        Todo.update({ _id: id }, {$set: { done: true }});

    }
});

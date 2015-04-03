Template.list.helpers({
    todoList: function () {
        return Todo.find({}, {sort: {createdAt: -1}});
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
    }
});

Template.list.helpers({
    todoList: function () {
        Session.setDefault('incomplete', true);
        Session.setDefault('complete', false);

        var incomplete = Session.get('incomplete');
        var complete = Session.get('complete');
        var query;

        if (incomplete && complete) {
            query = [true, false];
        } else {
            query = [complete];
        }

        return Todo.find({done: {$in: query}}, {sort: {createdAt: -1}});
    },

    activeFilter: function () {
        return Session.get('incomplete') && 'incomplete' || 'complete';
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

    'click .check.true': function(event) {
        event.preventDefault();

        var id = $(event.target).data('id');

        Todo.update({ _id: id }, {$set: { done: false }});
    },

    'click .check:not(.true)': function(event) {
        event.preventDefault();

        var id = $(event.target).data('id');

        Todo.update({ _id: id }, {$set: { done: true }});
    },

    'click input[type=checkbox]': function(event) {
        var incomplete = $('#incomplete').is(':checked');
        var complete = $('#complete').is(':checked');

        // if both have been unchecked then recheck the last one
        if (!incomplete && !complete) {
            $(event.target).prop('checked', true);
        } else {
            Session.set('incomplete', incomplete);
            Session.set('complete', complete);            
        }
    }
});

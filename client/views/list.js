Template.list.helpers({
    todoList: function() {
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

    activeFilter: function() {
        if (Session.get('incomplete') && Session.get('complete') || Todo.find().count() === 0) {
            return '';
        } else if (Session.get('incomplete')) {
            return 'incomplete';
        } else {
            return 'complete';
        }
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

        var target = $(event.target);
        var id = target.data('id');

        Todo.update({ _id: id }, {$set: { done: !target.hasClass('true') }});
    },

    'click .delete': function(event) {
        event.preventDefault();

        var target = $(event.target);
        var id = target.data('id');

    swal({
        title: 'Are you sure?',
        text: 'Are you sure you want to delete this task?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Delete',
        closeOnConfirm: false
    }, function() {
        Todo.remove({ _id: id });

        swal(
            'Deleted!',
            'Successfully deleted the task.',
            'success'
        );
    });

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

Template.list.helpers({
    /**
     * Reactive data source for todo list. Updates when the filter checkboxes change
     */
    todoList: function() {
        // default filter setup - incomplete only
        Session.setDefault('incomplete', true);
        Session.setDefault('complete', false);

        // booleans to show inomplete/complete tasks
        // session variables used to make this reactive
        var incomplete = Session.get('incomplete');
        var complete = Session.get('complete');

        var query;

        // make 'query' array to include only records with 'done' matching
        // a value in the array.
        if (incomplete && complete) {
            query = [true, false];
        } else {
            query = [complete];
        }

        return Todo.find({done: {$in: query}, userId: Meteor.userId()}, {sort: {createdAt: -1}});
    },

    /**
     * Function to get the text to show the name of the active filter
     * @return {string} the active filter
     */
    activeFilter: function() {
        // if both are true or the list is empty then no filter text should be shown
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

        Meteor.call('addTask', $newTodo.val());

        $newTodo.val('');
    },

    'click .check': function(event) {
        event.preventDefault();

        var target = $(event.target); 
        var isDone = !target.hasClass('true');

        Meteor.call('updateTask', this._id, isDone);
    },

    'click .delete': function(event) {
        event.preventDefault();

        var id = this._id;

        swal({
            title: 'Are you sure?',
            text: 'Are you sure you want to delete this task?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Delete',
            closeOnConfirm: false
        }, function() {
            Meteor.call('deleteTask', id);

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

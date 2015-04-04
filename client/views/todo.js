Template.todo.helpers({
    getStatus: function(done) {
        return done && 'Complete' || 'Incomplete';
    },

    getIcon: function(done) {
        return done && 'fa-times' || 'fa-check';
    },

    getStatusTitle: function(done) {
        return done && 'Mark task incomplete' || 'Mark task complete';
    }
});

Template.todo.helpers({
    getStatus: function(done) {
        return done && 'Complete' || 'Incomplete';
    },

    getSymbol: function(done) {
        return done && '✗' || '✓';
    },

    getStatusTitle: function(done) {
        return done && 'Mark task incomplete' || 'Mark task complete';
    }
});

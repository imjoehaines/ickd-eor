Meteor.publish('todo', function() {
    return Todo.find();
});

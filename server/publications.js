Meteor.publish('todo', function() {
    return Todo.find({ userId: this.userId });
});

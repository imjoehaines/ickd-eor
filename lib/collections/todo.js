Todo = new Mongo.Collection('todo');

Meteor.publish('todo', function () {
    return Todo.find();
});

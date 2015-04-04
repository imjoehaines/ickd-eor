Meteor.methods({
    addTask: function(text) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Todo.insert({
            task: text,
            createdAt: new Date(),
            done: false,
            userId: Meteor.userId()
        });
    },

    deleteTask: function(taskId) {
        Todo.remove(taskId);
    },

    updateTask: function(taskId, isDone) {
        Todo.update({ _id: taskId }, { $set: { done: isDone }});
    }
});

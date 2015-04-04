Meteor.methods({
    addTask: function(text) {
        if (!Meteor.userId() || !text || text.trim().length === 0) {
            return;
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

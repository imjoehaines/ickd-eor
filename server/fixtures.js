if (Todo.find().count() === 0) {
    Todo.insert({
        task: 'finish this',
        createdAt: new Date(),
        status: 'In progress'
    });
}
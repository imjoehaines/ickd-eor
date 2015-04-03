if (Todo.find().count() === 0) {
    Todo.insert({
        task: 'Do something',
        createdAt: new Date(),
        done: false
    });

    Todo.insert({
        task: 'Ajskj kjasdk',
        createdAt: new Date(),
        done: false
    });

    Todo.insert({
        task: 'Alsdjf dshfljks',
        createdAt: new Date(),
        done: false
    });

    Todo.insert({
        task: 'Oaskhas uyasiuh',
        createdAt: new Date(),
        done: false
    });

    Todo.insert({
        task: 'Oaskjhas iusadj',
        createdAt: new Date(),
        done: false
    });
}
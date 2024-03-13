const cron = require('node-cron');
const Task = require('../models/task.model');
let mongoose=require('mongoose');
cron.schedule('0 0 * * *', async () => {
    try {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dayAfterTomorrow = new Date(today);
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

        const tasksToUpdate = await Task.find({ due_date: { $lt: tomorrow } });

        tasksToUpdate.forEach(async task => {
            const dueDate = new Date(task.due_date);
            const diffInDays = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
            let priority = 0;

            if (diffInDays === 0) {
                priority = 0;
            } else if (diffInDays <= 2) {
                priority = 1;
            } else if (diffInDays <= 4) {
                priority = 2;
            } else {
                priority = 3;
            }

            task.priority = priority;
            await task.save();
        });

        console.log('Task priorities updated successfully.');
    } catch (error) {
        console.error('Error updating task priorities:', error);
    }
});

'use strict'
import task from '../models/task.model.js'

class TaskService {
    async getTaskById(taskId) {
        return await task.findById(taskId);
    }

    async createTask(task) {
        return await task.create(task);
    }

    async updateTask(taskId, task) {
        return await task.findByIdAndUpdate(taskId, task, { new: true });
    }

    async deleteTask(taskId) {
        return await task.findByIdAndDelete(taskId);
    }

    async getAllTasks() {
        return await task.find();
    }
}

export default TaskService
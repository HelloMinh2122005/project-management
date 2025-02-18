'use strict'
import Task from '../models/task.model.js'
import User from '../models/user.model.js'
import Project from '../models/project.model.js'

class TaskService {
    async getTaskById(taskId) {
        return await Task.findById(taskId);
    }

    async createTask(task) {
        const newTask = await Task.create(task);
        if (!newTask) {
            throw new Error('Task not created');
        }

        const project = await Project.findById(task.project);
        if (!project) {
            throw new Error('Project not found in get task');
        }

        const user = await User.findById(project.owner);
        if (!user) {
            throw new Error('User not found in get task');
        }

        console.log(user);
        user.tasks.push(newTask._id);
        await user.save();

        return newTask;
    }

    async updateTask(taskId, task) {
        return await Task.findByIdAndUpdate(taskId, task, { new: true });
    }

    async deleteTask(taskId) {
        const deletedTask = await Task.findByIdAndDelete(taskId);
        const project = await Project.findById(deletedTask.project);
        const user = await User.findById(project.owner);
        user.tasks = user.tasks.filter(task => task._id !== taskId);
        await user.save();

        return deletedTask;
    }

    async getAllTasks() {
        return await Task.find();
    }
}

export default TaskService
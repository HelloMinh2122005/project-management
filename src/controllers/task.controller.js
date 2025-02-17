'use strict'

class TaskController {
    constructor(taskService) {
        this.TaskService = taskService;
    }

    async createTask(req, res) {
        try {
            const task = await this.TaskService.createTask(req.body);
            return res.status(201).send(task);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    async getTaskById(req, res) {
        try {
            const task = await this.TaskService.getTaskById(req.params.id);
            if (!task) {
                return res.status(404).send('Task not found');
            }
            return res.status(200).send(task);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    async getAllTasks(req, res) {
        try {
            const tasks = await this.TaskService.getAllTasks();
            return res.status(200).send(tasks);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    async updateTask(req, res) {
        try {
            const task = await this.TaskService.updateTask(req.params.id, req.body);
            if (!task) {
                return res.status(404).send('Task not found');
            }
            return res.status(200).send(task);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    async deleteTask(req, res) {
        try {
            const task = await this.TaskService.deleteTask(req.params.id);
            if (!task) {
                return res.status(404).send('Task not found');
            }
            return res.status(200).send('Task deleted successfully');
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
}

export default TaskController; 
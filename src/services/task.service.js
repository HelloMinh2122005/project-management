const task = require('../models/tasks.models')

const addTask = async (req, res) => {
    try {
        const newTask = await task.create(req.body)
        return res.status(201).json('new task created', newTask)
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    addTask
}
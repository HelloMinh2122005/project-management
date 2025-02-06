const task = require('../models/tasks.models')

const addTask = async (req, res) => {
    try {
        const newTask = await task.create(req.body)
        return res.status(201).json({
            message: 'new task created',
            newTask
        })
    } catch (error) {
        throw new Error(error)
    }
}

const getMemberByTaskID = async (req, res) => {
    try {
        const members = await task.find({ id: req.body.task })
        if (!members) {
            return res.status(400).json({ message: 'Members not found' })
        }
        return res.status(200).json({
            message: 'Members found',
            members
        })
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    addTask,
    getMemberByTaskID
}
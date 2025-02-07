const task = require('../../models/tasks.models')

const getMemberByTaskID = async (req, res, sendResponse = true) => {
    try {
        const members = await task.find({ id: req.body.task })
        if (!members) {
            if (sendResponse) {
                return res.status(404).json({ message: 'Members not found' })
            }
            throw new Error('Members not found')
        }
        if (sendResponse) {
            return res.status(200).json({
                message: 'Members found',
                members
            })
        }
        return members
    } catch (error) {
        throw new Error(error)
    }
}

const getProjectIdByTaskId = async (taskId, res, sendResponse = true) => {
    try {
        const projectID = await task.findOne(taskId).project
        if (!projectID) {
            if (sendResponse) {
                return res.status(404).json({ message: 'Project not found' })
            }
            throw new Error('Project not found')
        }

        if (sendResponse) {
            return res.status(200).json({
                message: 'Project found',
                projectID
            })
        }
        return projectID
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getMemberByTaskID,
    getProjectIdByTaskId
}
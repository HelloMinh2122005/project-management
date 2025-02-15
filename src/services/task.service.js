'use strict'

class TaskService {
    async getTaskById(taskId) {
        return await task.findById(taskId);
    }
}

export default TaskService
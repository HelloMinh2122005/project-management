'use strict'

import requestRoot from './../../models/request.model.js';
const { REQUEST, FRIEND_REQUEST, PROJECT_JOIN_REQUEST, TASK_JOIN_REQUEST } = requestRoot;

class RequestFactory {
    static async createRequest(type, payload) {
        const newRequest = await REQUEST.create(payload);
        if (!newRequest)
            throw new Error('Cannot create base request');
        switch (type) {
            case 'friend':
                const friendRequest = await FRIEND_REQUEST.create({ request: newRequest._id });
                if (!friendRequest)
                    throw new Error('Cannot create friend request');
                return (await friendRequest.populate('request'));
            case 'project':
                const projectRequest = await PROJECT_JOIN_REQUEST.create({ request: newRequest._id, project: payload.attributes.project });
                if (!projectRequest)
                    throw new Error('Cannot create project request');
                return (await projectRequest.populate('request'));
            case 'task':
                const taskRequest = await TASK_JOIN_REQUEST.create({ request: newRequest._id, task: payload.attributes.task });
                if (!taskRequest)
                    throw new Error('Cannot create task request');
                return (await taskRequest.populate('request'));
        }
    }

    static async getRequestAndPopulate(type, requestId) {
        switch (type) {
            case 'friend':
                return await FRIEND_REQUEST.findById(requestId).populate('request').populate('sender');
            case 'project':
                return await PROJECT_JOIN_REQUEST.findById(requestId).populate('request').populate('project');
            case 'task':
                return await TASK_JOIN_REQUEST.findById(requestId).populate('request').populate('task');
        }
    }
}

export default RequestFactory;
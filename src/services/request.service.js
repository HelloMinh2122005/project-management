'use strict'

import requestRoot from '../models/request.model.js';
const { REQUEST, FRIEND_REQUEST, PROJECT_JOIN_REQUEST, TASK_JOIN_REQUEST } = requestRoot;
import RequestFactory from './utils/requestFactory.js';

class RequestService {
    async createRequest(type, payload) {
        return await RequestFactory.createRequest(type, payload);
    }

    async getRequestAndPopulate(type, requestId) {
        return await RequestFactory.getRequestAndPopulate(type, requestId);
    }

    async getAllRequests() {
        return await REQUEST.find();
    }

    async getRequestById(requestId) {
        return await REQUEST.findById(requestId);
    }

    async deleteRequest(requestId) {
        return await Promise.all([
            REQUEST.findByIdAndDelete(requestId),
            FRIEND_REQUEST.findByIdAndDelete(requestId),
            PROJECT_JOIN_REQUEST.findByIdAndDelete(requestId),
            TASK_JOIN_REQUEST.findByIdAndDelete(requestId)
        ])
    }

    async getRequestForUser(type = "", userID, getForSender = true) {
        const query = getForSender ? { sender: userID } : { receiver: userID };
        switch (type) {
            case 'friend':
                return await FRIEND_REQUEST.find(query).populate('request').populate('sender');
            case 'project':
                return await PROJECT_JOIN_REQUEST.find(query).populate('request').populate('project');
            case 'task':
                return await TASK_JOIN_REQUEST.find(query).populate('request').populate('task');
            default:
                return await REQUEST.find(query);
        }
    }
}

export default RequestService;
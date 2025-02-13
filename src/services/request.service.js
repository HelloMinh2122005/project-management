'use strict'

import requestRoot from '../models/request.model.js';
const { REQUEST, FRIEND_REQUEST, PROJECT_JOIN_REQUEST, TASK_JOIN_REQUEST } = requestRoot;
import RequestFactory from './utils/requestFactory.js';

class RequestService {
    async createRequest(type, payload) {
        return await RequestFactory.createRequest(type, payload);
    }

    async getAllRequests() {
        return await REQUEST.find();
    }

    async getRequestById(requestId) {
        return await REQUEST.findById(requestId);
    }

    async deleteRequest(requestId) {
        return await REQUEST.findByIdAndDelete(requestId);
    }
}

export default RequestService;
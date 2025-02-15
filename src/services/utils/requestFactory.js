'use strict'

import requestRoot from './../../models/request.model.js';
const { REQUEST, FRIEND_REQUEST, PROJECT_JOIN_REQUEST, TASK_JOIN_REQUEST } = requestRoot;

class RequestFactory {
    static async createRequest(type, payload) {
        const mapping = {
            friend: {
                model: FRIEND_REQUEST,
                getSubAttributes: (payload) => payload.attributes
            },
            project: {
                model: PROJECT_JOIN_REQUEST,
                getSubAttributes: (payload) => payload.attributes
            },
            task: {
                model: TASK_JOIN_REQUEST,
                getSubAttributes: (payload) => payload.attributes
            }
        };

        const config = mapping[type];
        if (!config) {
            throw new Error('Invalid request type');
        }

        const subAttributes = config.getSubAttributes(payload);
        const subEntry = await config.model.create(subAttributes);
        if (!subEntry) {
            throw new Error(`Error creating ${type} request sub-entry`);
        }

        const newAttributes = {
            ...payload.attributes,
            subEntryId: subEntry._id
        };

        const mainRequestPayload = {
            ...payload,
            attributes: newAttributes,
        };

        const newRequest = await REQUEST.create(mainRequestPayload);
        if (!newRequest) {
            throw new Error('Error creating main request');
        }
        return newRequest;
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
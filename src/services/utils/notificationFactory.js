'use strict'

import notification from './../../models/notification.model.js';
const { Notification, RequestNotification, ProjectNotification, TaskNotification } = notification;

class NotificationFactory {

    constructor({ RequestService, ProjectService, TaskService }) {
        this.RequestService = RequestService;
        this.ProjectService = ProjectService;
        this.TaskService = TaskService;
    }

    async createBaseNotification(payload, title, message) {
        const newNotification = await Notification.create({
            ...payload,
            title,
            message,
        });
        if (!newNotification) {
            throw new Error('Error creating notification');
        }
        return newNotification;
    }

    async createNotification(type, type_model, payload) {
        if (type !== 'request') {
            throw new Error('Unsupported notification type');
        }
        const requestId = payload.requestId;
        const request = await RequestService.getRequestById(requestId);
        if (!request) throw new Error('Request not found');

        const status = request.status;
        const recipientRequest = request.recipient;
        const senderRequest = request.sender;
        const recipientNotification = payload.recipient;

        switch (type_model) {
            case 'friend': {
                let title, message;
                switch (status) {
                    case 'pending':
                        title = 'New friend request';
                        message = senderRequest.name === recipientNotification.name
                            ? `You have sent a friend request to ${recipientRequest.name}`
                            : `${senderRequest.name} wants to be your friend`;
                        break;
                    case 'accepted':
                        title = 'Friend request accepted';
                        message = recipientNotification.name === recipientRequest.name
                            ? `${recipientRequest.name} has accepted your friend request`
                            : `You have accepted ${senderRequest.name}'s friend request`;
                        break;
                    case 'rejected':
                        title = 'Friend request rejected';
                        message = recipientNotification.name === recipientRequest.name
                            ? `${recipientRequest.name} has rejected your friend request`
                            : `You have rejected ${senderRequest.name}'s friend request`;
                        break;
                    default:
                        throw new Error('Unsupported status for friend request');
                }
                const newNotification = await this.createBaseNotification(payload, title, message);
                const newReqNotif = await RequestNotification.create({
                    notification: newNotification._id,
                    request: requestId,
                });
                if (!newReqNotif) throw new Error('Error creating request notification');
                return newNotification;
            }
            case 'project': {
                let title, message;
                const projectId = payload.attributes.project;
                const project = await ProjectService.getProjectById(projectId);
                if (!project) throw new Error('Project not found');
                const ownerName = project.owner.name;
                const projectTitle = project.title;

                if (payload.type === 'modification') {
                    title = 'Project modification';
                    message = recipientNotification.name === ownerName
                        ? `You have modified project ${projectTitle}`
                        : `${ownerName} has modified project ${projectTitle}`;
                } else {
                    switch (status) {
                        case 'pending':
                            title = 'New project join request';
                            message = senderRequest.name === recipientNotification.name
                                ? `You have sent a join request to ${projectTitle}`
                                : `${senderRequest.name} wants to join your project ${projectTitle}`;
                            break;
                        case 'accepted':
                            title = 'Project join request accepted';
                            message = senderRequest.name === recipientNotification.name
                                ? `${ownerName} has accepted your project request for ${projectTitle}`
                                : `You have accepted ${senderRequest.name}'s request to join project ${projectTitle}`;
                            break;
                        case 'rejected':
                            title = 'Project join request rejected';
                            message = senderRequest.name === recipientNotification.name
                                ? `${ownerName} has rejected your project request for ${projectTitle}`
                                : `You have rejected ${senderRequest.name}'s request to join project ${projectTitle}`;
                            break;
                        default:
                            throw new Error('Unsupported status for project request');
                    }
                }
                const newNotification = await this.createBaseNotification(payload, title, message);
                if (payload.type === 'request') {
                    const newReqNotif = await RequestNotification.create({
                        notification: newNotification._id,
                        request: requestId,
                    });
                    if (!newReqNotif) throw new Error('Error creating project request notification');
                } else {
                    const newProjNotif = await ProjectNotification.create({
                        notification: newNotification._id,
                        project: projectId,
                    });
                    if (!newProjNotif) throw new Error('Error creating project modification notification');
                }
                return newNotification;
            }
            case 'task': {
                let title, message;
                const taskId = payload.attributes.task;
                const task = await TaskService.getTaskById(taskId);
                if (!task) throw new Error('Task not found');
                const taskTitle = task.title;
                const project = await ProjectService.getProjectById(task.project);
                if (!project) throw new Error('Project not found');
                const ownerName = project.owner.name;

                if (payload.type === 'modification') {
                    title = 'Task modification';
                    message = recipientNotification.name === ownerName
                        ? `You have modified task ${taskTitle}`
                        : `${ownerName} has modified task ${taskTitle}`;
                } else {
                    switch (status) {
                        case 'pending':
                            title = 'New task join request';
                            message = senderRequest.name === recipientNotification.name
                                ? `You have sent a join request to ${taskTitle}`
                                : `${senderRequest.name} wants to join task ${taskTitle}`;
                            break;
                        case 'accepted':
                            title = 'Task join request accepted';
                            message = senderRequest.name === recipientNotification.name
                                ? `${ownerName} has accepted your task request for ${taskTitle}`
                                : `You have accepted ${senderRequest.name}'s request to join task ${taskTitle}`;
                            break;
                        case 'rejected':
                            title = 'Task join request rejected';
                            message = senderRequest.name === recipientNotification.name
                                ? `${ownerName} has rejected your task request for ${taskTitle}`
                                : `You have rejected ${senderRequest.name}'s request to join task ${taskTitle}`;
                            break;
                        default:
                            throw new Error('Unsupported status for task request');
                    }
                }
                const newNotification = await this.createBaseNotification(payload, title, message);
                if (payload.type === 'request') {
                    const newReqNotif = await RequestNotification.create({
                        notification: newNotification._id,
                        request: requestId,
                    });
                    if (!newReqNotif) throw new Error('Error creating task request notification');
                } else {
                    const newTaskNotif = await TaskNotification.create({
                        notification: newNotification._id,
                        task: taskId,
                    });
                    if (!newTaskNotif) throw new Error('Error creating task modification notification');
                }
                return newNotification;
            }
            default:
                throw new Error('Unsupported type_model for request notification');
        }
    }

    async getNotificationAndPopulate(type_model, notificationId) {
        switch (type_model) {
            case 'request':
                return await RequestNotification.findById(notificationId).populate('notification').populate('request');
            case 'project':
                return await ProjectNotification.findById(notificationId).populate('notification').populate('project');
            case 'task':
                return await TaskNotification.findById(notificationId).populate('notification').populate('task');
            default:
                throw new Error('Unsupported type_model for notification');
        }
    }
}

export default NotificationFactory;
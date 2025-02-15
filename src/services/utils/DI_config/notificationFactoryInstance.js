import RequestService from '../../request.service.js';
import ProjectService from '../../project.service.js';
import TaskService from '../../task.service.js';
import NotificationFactory from '../notificationFactory.js';

const notificationFactory = new NotificationFactory({
    RequestService,
    ProjectService,
    TaskService
});

export default notificationFactory;
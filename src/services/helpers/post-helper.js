const { getAllMembersByIdProject } = require('./project-helper');
const { getProjectIdByTaskId } = require('../helpers/task-helper');

const getRecipients = async (body) => {
    try {
        let recipients;
        if (body.project) {
            const members = await getAllMembersByIdProject(body.project, res, false);
            recipients = members.map(member => member._id);
        } else if (body.task) {
            const project = await getProjectIdByTaskId(body.task, res, false);
            const members = await getAllMembersByIdProject(project, res, false);
            recipients = members.map(member => member._id);
        } else if (body.friend) {
            recipients = body.friend;
        } else if (body.manager) {
            recipients = body.manager;
        } else if (body.member) {
            recipients = body.member;
        }
        if (!recipients) {
            throw new Error('Recipients not found');
        }
        return recipients;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getRecipients
}
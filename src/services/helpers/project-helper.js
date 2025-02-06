const user_project = require('../../models/users-projects');

const getAllMembersByIdProject = async (project) => {
    try {
        const members = await user_project.find({ project });
        if (!members || !members.length) {
            throw new Error('Members not found');
        }
        return members;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getAllMembersByIdProject
};
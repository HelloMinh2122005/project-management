const user_project = require('../../models/users-projects');

const getAllMembersByIdProject = async (project, res, sendResponse = true) => {
    try {
        const members = await user_project.find({ project });
        if (!members || !members.length) {
            if (sendResponse) {
                return res.status(404).json({ message: 'Members not found' });
            }
            else
                throw new Error('Members not found');
        }
        if (sendResponse) {
            return res.status(200).json({
                message: 'Members found',
                members
            });
        }
        return members;
    } catch (error) {
        throw new Error(error);
    }
};

const getProjectByMember = async (req, res, sendResponse = true) => {
    try {
        const projectIDs = await user_project.find({ user: req.body.member }).map(up => up.project);
        if (!projectIDs || projectIDs.length === 0) {
            if (sendResponse) {
                return res.status(404).json({ message: 'Projects not found' });
            }
            else
                throw new Error('Projects not found');
        }

        const projects = await project.find({ _id: { $in: projectIDs } });

        if (!projects || projects.length === 0) {
            if (sendResponse) {
                return res.status(404).json({ message: 'Projects not found' });
            }
            else
                throw new Error('Projects not found');
        }

        if (sendResponse) {
            return res.status(200).json({
                message: 'Projects found',
                projects
            });
        }
        return projects;

    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getAllMembersByIdProject,
    getProjectByMember
};
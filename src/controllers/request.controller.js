'use strict'

class RequestController {
    constructor(requestService) {
        this.RequestService = requestService;
    }

    async createRequest(req, res) {
        try {
            const request = await this.RequestService.createRequest(req.body.type, req.body);
            return res.status(201).send(request);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    async getRequestAndPopulate(req, res) {
        try {
            const request = await this.RequestService.getRequestAndPopulate(req.params.type, req.params.id);
            if (!request) {
                return res.status(404).send('Request not found');
            }
            return res.status(200).send(request);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    async getAllRequests(req, res) {
        try {
            const requests = await this.RequestService.getAllRequests();
            return res.status(200).send(requests);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    async getRequestById(req, res) {
        try {
            const request = await this.RequestService.getRequestById(req.params.id);
            if (!request) {
                return res.status(404).send('Request not found');
            }
            return res.status(200).send(request);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    async deleteRequest(req, res) {
        try {
            const request = await this.RequestService.deleteRequest(req.params.id);
            if (!request) {
                return res.status(404).send('Request not found');
            }
            return res.status(200).send('Request deleted successfully');
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    async getRequestForUser(req, res) {
        try {
            const requests = await this.RequestService.getRequestForUser(req.params.type, req.params.userID, req.query.getForSender);
            return res.status(200).send(requests);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
}

export default RequestController;
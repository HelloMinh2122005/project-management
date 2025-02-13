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
}

export default RequestController;
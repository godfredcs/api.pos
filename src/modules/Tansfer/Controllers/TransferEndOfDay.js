const { TransferEndOfDay, Op } = require('../../../database');

// Function for getting all credit transfers in the system.
exports.getAll = function (req, res) {
    TransferEndOfDay.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

// Function for getting credit transfers by date.
exports.getByDate = function (req, res) {
    const { from, to } = req.query;

    TransferEndOfDay.findAll({
        where: {
            created_at: {
                [Op.gte]: from,
                [Op.lte]: to
            }
        }
    })
        .then(data => {
            if (!data) {
                return res.status(404).json({
                    error: {
                        message: "Transfer end of day not found"
                    }
                });
            }

            return res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

// Function for creating a new credit transfer in the system.
exports.create = function (req, res) {
    if (!req.body.amount) {
        return res.status(401).json({
            error: {
                message: "Please provide all required entries"
            }
        });
    }

    TransferEndOfDay.create(req.body)
        .then(transfer_start_of_day => {
            TransferEndOfDay.findById(transfer_start_of_day.id)
                .then(data => res.status(201).json(data))
        })
        .catch(error => res.status(500).json(error));
};

exports.get = function (req, res) {
    TransferEndOfDay.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).json({
                    error: {
                        message: "Transfer start of day entry not found"
                    }
                });
            }

            return res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.update = function (req, res) {
    TransferEndOfDay.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).json({
                    error: {
                        message: "Transfer end of day entry not found"
                    }
                });
            }

            TransferEndOfDay.updateAttributes(req.body)
                .then(updated_data => {
                    res.status(200).json(updated_data);
                })
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.delete = function (req, res) {
    TransferEndOfDay.destroy({ where: { id: req.params.id } })
        .then(data => {
            if (!data) {
                return res.status(404).json({
                    error: {
                        message: "Transfer end of day entry not found"
                    }
                });
            }

            res.status(200).json({
                success: {
                    message: "Transfer end of day entry successfully deleted"
                }
            });
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

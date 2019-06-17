const { TransferStartOfDay, TransferEndOfDay, Op } = require('../../../database');

// Function for getting all credit transfers in the system.
exports.getAll = function (req, res) {
    TransferStartOfDay.findAll()
        .then(transfer_start_of_days => {
            res.status(200).json(transfer_start_of_days);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

// Function for getting credit transfers by date.
exports.getByDate = function (req, res) {
    const { from, to } = req.query;

    TransferStartOfDay.findAll({
        where: {
            created_at: {
                [Op.gte]: from,
                [Op.lte]: to
            }
        }
    })
        .then(transfer_start_of_days => {
            if (!transfer_start_of_days) {
                return res.status(404).json({
                    error: {
                        message: "Transfer start of day not found"
                    }
                });
            }

            res.status(200).json(transfer_start_of_days);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

// Function for getting credit transfers by date.
exports.getForToday = function (req, res) {
    const { from, to } = req.query;

    TransferStartOfDay.find({
        where: {
            created_at: {
                [Op.gte]: from,
                [Op.lte]: to
            }
        },
        // include: [ TransferEndOfDay ]
    })
        .then(transfer_start_of_day => {
            if (!transfer_start_of_day) {
                return res.status(404).json({
                    error: {
                        message: "Transfer start of day not found"
                    }
                });
            }

            res.status(200).json(transfer_start_of_day);
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

    TransferStartOfDay.create(req.body)
        .then(transfer_start_of_day => {
            TransferStartOfDay.findById(transfer_start_of_day.id)
                .then(data => res.status(201).json(data))
        })
        .catch(error => res.status(500).json(error));
};

exports.get = function (req, res) {
    TransferStartOfDay.findById(req.params.id)
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
    TransferStartOfDay.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).json({
                    error: {
                        message: "Transfer start of day entry not found"
                    }
                });
            }

            TransferStartOfDay.updateAttributes(req.body)
                .then(updated_data => {
                    res.status(200).json(updated_data);
                })
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.delete = function (req, res) {
    TransferStartOfDay.destroy({ where: { id: req.params.id } })
        .then(data => {
            if (!data) {
                return res.status(404).json({
                    error: {
                        message: "Transfer start of day entry not found"
                    }
                });
            }

            res.status(200).json({
                success: {
                    message: "Transfer start of day entry successfully deleted"
                }
            });
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

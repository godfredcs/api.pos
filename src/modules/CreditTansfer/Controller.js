const CreditTransfer = require('./Model');

// Function for getting all credit transfers in the system.
exports.getAll = (req, res, next) => {
    CreditTransfer.findAll()
        .then(creditTransfer => {
            res.status(200).json(creditTransfer);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

// Function for getting credit transfers by date.
exports.getByDate = (req, res, next) => {
    const { from, to } = req.query;

    CreditTransfer.findAll({
        where: {
            created_at: {
                [Op.gte]: from,
                [Op.lte]: to
            }
        }
    })
        .then(credit_transfers => {
            if (!credit_transfers) {
                return res.status(404).json({
                    error: {
                        message: "Jackpot not found"
                    }
                });
            }

            res.status(200).json(credit_transfers);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

// Function for creating a new credit transfer in the system.
exports.create = (req, res, next) => {
    if (req.body.number && req.body.amount) {
        CreditTransfer.create(req.body)
            .then(creditTransfer => {
                CreditTransfer.findById(creditTransfer.id)
                    .then(foundCreditTransfer => {
                        res.status(201).json(foundCreditTransfer);
                    })
            })
            .catch(error => {
                res.status(500).json(error);
            });
    } else {
        res.status(401).json({
            error: {
                message: "Please provide all required entries"
            }
        });
    }
};

exports.get = (req, res, next) => {
    CreditTransfer.findById(req.params.id)
        .then(creditTransfer => {
            if (!creditTransfer) {
                return res.status(404).json({
                    error: {
                        message: "Credit transfer entry not found"
                    }
                });
            }

            res.status(200).json(creditTransfer);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.update = (req, res, next) => {
    CreditTransfer.findById(req.params.id)
        .then(creditTransfer => {
            if (!creditTransfer) {
                return res.status(404).json({
                    error: {
                        message: "Credit transfer entry not found"
                    }
                });
            }

            creditTransfer.updateAttributes(req.body)
                .then(updatedCreditTransfer => {
                    res.status(200).json(updatedCreditTransfer);
                })
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.delete = (req, res, next) => {
    CreditTransfer.destroy({ where: { id: req.params.id } })
        .then(creditTransfer => {
            if (!creditTransfer) {
                return res.status(404).json({
                    error: {
                        message: "Credit transfer entry not found"
                    }
                });
            }

            res.status(200).json({
                success: {
                    message: "Credit transfer entry successfully deleted"
                }
            });
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

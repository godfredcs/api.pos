const { CreditCardType, Op } = require('../../../database');

/** Function for getting all credit transfers in the system */
exports.getAll = function (req, res) {
    CreditCardType.findAll()
        .then(cards => {
            res.status(200).json(cards);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

/** Funciton for getting credit transgers by date */
exports.getByDate = function (req, res) {
    const { from, to } = req.query;

    CreditCardType.findAll({
        where: {
            created_at: {
                [Op.gte]: from,
                [Op.lte]: to
            }
        }
    })
        .then(cards => {
            if (!cards) {
                return res.status(404).json({
                    error: {
                        message: "Jackpot not found"
                    }
                });
            }

            res.status(200).json(cards);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

/** Function for creating a new credit transfer in the system */
exports.create = function (req, res) {
     if (!req.body.name) {
        return res.status(401).json({
            error: {
                message: "Please provide all required entries"
            }
        });
     }

    CreditCardType.create(req.body)
        .then(card => {
            CreditCardType.findById(card.id)
                .then(foundCard => {
                    res.status(201).json(foundCard);
                })
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.get = function (req, res) {
    CreditCardType.findById(req.params.id)
        .then(card => {
            if (!card) {
                return res.status(404).json({
                    error: {
                        message: "Credit transfer entry not found"
                    }
                });
            }

            res.status(200).json(card);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.update = function (req, res) {
    CreditCardType.findById(req.params.id)
        .then(card => {
            if (!card) {
                return res.status(404).json({
                    error: {
                        message: "Credit transfer entry not found"
                    }
                });
            }

            card.updateAttributes(req.body)
                .then(updatedCard => {
                    res.status(200).json(updatedCard);
                })
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.delete = function (req, res) {
    CreditCardType.destroy({ where: { id: req.params.id } })
        .then(card => {
            if (!card) {
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
        .catch(error => res.status(500).json(error));
};

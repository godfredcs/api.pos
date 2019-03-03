const { Jackpot, Op } = require('../../database');

exports.getAll = function (req, res) {
    Jackpot.findAll()
        .then(jackpot => {
            res.status(200).json(jackpot);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.getByDate = function (req, res) {
    const { from, to } = req.query;

    Jackpot.findAll({
        where: {
            created_at: {
                [Op.gte]: from,
                [Op.lte]: to
            }
        }
    })
        .then(jackpots => {
            if (!jackpots) {
                return res.status(404).json({
                    error: {
                        message: "Jackpot not found"
                    }
                });
            }

            res.status(200).json(jackpots);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.create = function (req, res) {
    if (req.body.amount) {
        Jackpot.create(req.body)
            .then(jackpot => {
                Jackpot.findById(jackpot.id)
                    .then(foundJackpot => {
                        res.status(201).json(foundJackpot);
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

exports.get = function (req, res) {
    Jackpot.findById(req.params.id)
        .then(jackpot => {
            if (!jackpot) {
                return res.status(404).json({
                    error: {
                        message: "Jackpot entry not found"
                    }
                });
            }

            res.status(200).json(jackpot);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.update = function (req, res) {
    Jackpot.findById(req.params.id)
        .then(jackpot => {
            if (!jackpot) {
                return res.status(404).json({
                    error: {
                        message: "Jackpot entry not found"
                    }
                });
            }

            jackpot.updateAttributes(req.body)
                .then(updatedJackpot => {
                    res.status(200).json(updatedJackpot);
                })
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.delete = function (req, res) {
    Jackpot.destroy({ where: { id: req.params.id } })
        .then(jackpot => {
            if (!jackpot) {
                return res.status(404).json({
                    error: {
                        message: "Jackpot entry not found"
                    }
                });
            }

            res.status(200).json({
                success: {
                    message: "Jackpot entry successfully deleted"
                }
            });
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

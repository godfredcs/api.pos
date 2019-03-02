const modules = require('../index');
const Football = modules.Football;

exports.getAll = (req, res, next) => {
    Football.findAll()
        .then(football => {
            res.status(200).json(football);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.getByDate = (req, res, next) => {
    const { from, to } = req.query;

    Football.findAll({
        where: {
            created_at: {
                [Op.gte]: from,
                [Op.lte]: to
            }
        }
    })
        .then(footballs => {
            if (!footballs) {
                return res.status(404).json({
                    error: {
                        message: "Jackpot not found"
                    }
                });
            }

            res.status(200).json(footballs);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.create = (req, res, next) => {
    if (req.body.name && Number(req.body.number_of_people) && Number(req.body.unit_charge)) {
        req.body.amount = Number(req.body.number_of_people) * Number(req.body.unit_charge);

        Football.create(req.body)
            .then(football => {
                Football.findById(football.id)
                    .then(foundFootball => {
                        res.status(201).json(foundFootball);
                    })
            })
            .catch(error => {
                res.status(500).json(error);
            });
    } else {
        res.status(401).json({
            error: {
                message: "Please provide all required and correct entries"
            }
        });
    }
};

exports.get = (req, res, next) => {
    Football.findById(req.params.id)
        .then(football => {
            if (!football) {
                return res.status(404).json({
                    error: {
                        message: "Football match not found"
                    }
                });
            }

            res.status(200).json(football);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.update = (req, res, next) => {
    Football.findById(req.params.id)
        .then(football => {
            if (!football) {
                return res.status(404).json({
                    error: {
                        message: "Football match not found"
                    }
                });
            }

            if (req.body.number_of_people && Number(req.body.number_of_people) && req.body.unit_charge && Number(req.body.unit_charge)) {
                req.body.amount = Number(req.body.number_of_people) * Number(req.body.unit_charge);
            } else if (req.body.number_of_people && Number(req.body.number_of_people)) {
                req.body.amount = Number(req.body.number_of_people) * Number(football.unit_charge);
            } else if (req.body.unit_charge && Number(req.body.unit_charge)) {
                req.body.amount = Number(req.body.unit_charge) * Number(football.number_of_people);
            }

            football.updateAttributes(req.body)
                .then(updatedFootball => {
                    res.status(200).json(updatedFootball);
                })
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.delete = (req, res, next) => {
    Football.destroy({ where: { id: req.params.id } })
        .then(football => {
            if (!football) {
                return res.status(404).json({
                    error: {
                        message: "Football match not found"
                    }
                });
            }

            res.status(200).json({
                success: {
                    message: "Football match successfully deleted"
                }
            });
        })
        .catch(error => {
            res.status(500).json(error);
        });
};
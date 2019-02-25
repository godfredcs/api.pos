const MobileMoney = require('./Model');

exports.getAll = (req, res, next) => {
    MobileMoney.findAll()
        .then(mobileMoney => {
            res.status(200).json(mobileMoney);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.getByDate = (req, res, next) => {
    const { from, to } = req.query;

    MobileMoney.findAll({
        where: {
            created_at: {
                [Op.gte]: from,
                [Op.lte]: to
            }
        }
    })
        .then(mobileMoneys => {
            if (!mobileMoneys) {
                return res.status(404).json({
                    error: {
                        message: "Mobile Money not found"
                    }
                });
            }

            res.status(200).json(mobileMoneys);
        })
        .catch(error => {
            res.status(500).json(error);
        });
}

exports.create = (req, res, next) => {
    const { name, type, phone, commission, amount } = req.body;

    if (name && type && phone && commission && amount) {
        MobileMoney.create(req.body)
            .then(mobileMoney => {
                MobileMoney.findById(mobileMoney.id)
                    .then(foundMobileMoney => {
                        res.status(201).json(foundMobileMoney);
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
    MobileMoney.findById(req.params.id)
        .then(mobileMoney => {
            if (!mobileMoney) {
                return res.status(404).json({
                    error: {
                        message: "Mobile money transaction not found"
                    }
                });
            }

            res.status(200).json(mobileMoney);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.update = (req, res, next) => {
    MobileMoney.findById(req.params.id)
        .then(mobileMoney => {
            if (!mobileMoney) {
                return res.status(404).json({
                    error: {
                        message: "Mobile money transaction does not exist"
                    }
                });
            }

            mobileMoney.updateAttributes(req.body)
                .then(updatedMobileMoney => {
                    MobileMoney.findById(updatedMobileMoney.id)
                        .then(foundMobileMoney => {
                            res.status(201).json(updatedMobileMoney);
                        })
                })
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.delete = (req, res, next) => {
   MobileMoney.destroy({ where: { id: req.params.id } })
        .then(mobileMoney => {
            if (!mobileMoney) {
                return res.status(404).json({
                    error: {
                        message: "Mobile money transaction does not exist"
                    }
                });
            }

            res.status(200).json({
                success: {
                    message: "Mobile money transaction has been successfully deleted"
                }
            })
        })
        .catch(error => {
            res.status(500).json(error);
        });
};




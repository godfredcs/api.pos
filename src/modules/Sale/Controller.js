const Sale = require('./Model');

exports.getByDate = (req, res, next) => {
    const { from, to } = req.query;

    /* Sale.findAll({
        where: {
            created_at: {
                [Op.gte]: from,
                [Op.lte]: to
            }
        },
        include: [ Item ]
    })
        .then(sales => {
            if (!sales) {
                return res.status(404).json({
                    error: {
                        message: "Sales not found"
                    }
                });
            }

            res.status(200).json(sales);
        })
        .catch(error => {
            res.status(500).json(error);
        }); */
        return res.status(200).json({hello: 'hey yall'});
};

exports.getAll = (req,res, next) => {
    /* Sale.findAll({ include: [ Item ]})
        .then(sales => {
            if (!sales) {
                return res.status(404).json({
                    error: {
                        message: "No sales were found"
                    }
                });
            }

            res.status(200).json(sales);
        })
        .catch(error => {
            res.status(500).json(error);
        }); */
        return res.status(200).json({hello: 'hey yall'});
};

exports.create = (req, res, next) => {
    /* if (req.body.item_id && (req.body.unit_quantity || req.body.whole_quantity)) {
        if (!Number(req.body.item_id) || (!Number(req.body.unit_quantity) && !Number(req.body.whole_quantity))) {
            return res.status(401).json({
                error: {
                    message: "Please provide the correct entries"
                }
            });
        }

        Item.findById(req.body.item_id)
            .then(item => {
                let unit_amount = Number(req.body.unit_quantity) * Number(item.unit_price);
                let whole_amount = Number(req.body.whole_quantity) * Number(item.whole_price);

                req.body.amount = unit_amount + whole_amount;

                Sale.create(req.body)
                    .then(sale => {
                        Sale.findById(sale.id, { include: [ Item ] })
                            .then(foundSale => {
                                res.status(201).json(foundSale);
                            })
                    })
                })
                .catch(error => {
                    res.status(500).json(error);
                });

    } else {
        res.status(401).json({
            error: {
                message: "Item id and quantity are required"
            }
        });
    } */
    return res.status(200).json({hello: 'hey yall'});
};

exports.get = (req, res, next) => {
    /* Sale.findById(req.params.id, { include: [ Item ]})
        .then(sale => {
            if (!sale) {
                return res.status(404).json({
                    error: {
                        message: "Sale not found"
                    }
                });
            }

            res.status(200).json(sale);
        })
        .catch(error => {
            res.status(500).json(error);
        }); */
        return res.status(200).json({hello: 'hey yall'});
};

exports.update = (req, res, next) => {
    /* Sale.findById(req.params.id, { include: [ Item ] })
        .then(sale => {
            if (!sale) {
                return res.status(404).json({
                    error: {
                        message: "Sale not found"
                    }
                });
            }

            if (req.body.quantity && Number(req.body.quantity) && req.body.item_id && Number(req.body.item_id)) {
                Item.findById(sale.item_id)
                    .then(item => {
                        req.body.amount = Number(item.unit_price) * Number(req.body.quantity);

                        sale.updateAttributes(req.body)
                            .then(updatedSale => {
                                res.status(200).json(updatedSale);
                            });
                    })
            } else {
                res.status(401).json({
                    error: {
                        message: "Please provide all correct entries"
                    }
                });
            }

        })
        .catch(error => {
            res.status(500).json(error);
        }); */
        return res.status(200).json({hello: 'hey yall'});
};

exports.delete = (req, res, next) => {
    /* Sale.destroy({ where: { id: req.params.id } })
        .then(sale => {
            if (!sale) {
                return res.status(404).json({
                    error: {
                        message: "Sale does not exist"
                    }
                });
            }

            res.status(200).json({
                success: {
                    message: "Sale has been successfully deleted"
                }
            })
        })
        .catch(error => {
            res.status(500).json(error);
        }); */
        return res.status(200).json({hello: 'hey yall'});
};

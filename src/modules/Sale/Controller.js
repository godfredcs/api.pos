const { Sale, Item, Op } = require('../../database');

exports.getByDate = function (req, res) {
    const { from, to } = req.query;

    Sale.findAll({
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
        });
};

exports.getAll = function (req,res) {
    Sale.findAll({
        include: [ Item ],
        order: [
            ['created_at', 'DESC']
        ],
    })
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
        });
};

exports.create = function (req, res) {
    if (!Number(req.body.item_id) || !Number(req.body.quantity)) {
        return res.status(401).json({
            error: {
                message: "Item id and quantity are required and should be integers"
            }
        });
    }

    Item.findById(req.body.item_id)
        .then(item => {
            if (!item) {
                return res.status(404).json({ error: 'Item not found' });
            }

            if (Number(item.quantity) < Number(req.body.quantity)) {
                return res.status(412).json({ error: 'Quantity should not be more than the quantity available' });
            }

            item.updateAttributes({ quantity: Number(item.quantity) - Number(req.body.quantity) })
                .then(updatedItem => {
                    req.body.amount = Number(req.body.quantity) * Number(item.unit_price);

                    Sale.create(req.body)
                        .then(sale => {
                            Sale.findById(sale.id, { include: [ Item ] })
                                .then(foundSale => res.status(201).json(foundSale))
                        })
                    })
        })
        .catch(error => res.status(500).json(error));
};

exports.get = function (req, res) {
    Sale.findById(req.params.id, { include: [ Item ]})
        .then(sale => {
            if (!sale) {
                return res.status(404).json({ error: "Sale not found" });
            }

            res.status(200).json(sale);
        })
        .catch(error => res.status(500).json(error));
};

exports.update = function (req, res) {
    Sale.findById(req.params.id, { include: [ Item ] })
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
        });
};

exports.delete = function (req, res) {
    Sale.destroy({ where: { id: req.params.id } })
        .then(sale => {
            if (!sale) {
                return res.status(404).json({
                    error: { message: "Sale does not exist" }
                });
            }

            res.status(200).json({
                success: { message: "Sale has been successfully deleted" }
            })
        })
        .catch(error => res.status(500).json(error));
};

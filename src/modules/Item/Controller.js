const { Item, Sale } = require('../../database');

exports.all = function (req, res) {
    Item.findAll({ include: [ Sale ] })
        .then(items => {
            res.status(200).json(items);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.create = function (req, res) {
    if (!req.body.name || !req.body.quantity || !req.body.unit_price) {
        return res.status(401).json({ error: "Item name, quantity and unit price are required" });
    }

    let details = {
        name: req.body.name,
        quantity: req.body.quantity,
        unit_price: req.body.unit_price
    };

    if (req.file) {
        details[req.file.fieldname] = req.file.path;
    }

    Item.create(details)
        .then(item => {
            Item.findById(item.id, { include: [ Sale ] })
                .then(foundItem => {
                    res.status(201).json(foundItem);
                })
        })
        .catch(error => res.status(500).json(error));
};

exports.show = function (req, res) {
    Item.findById(req.params.id, { include: [ Sale ] })
        .then(item => {
            if (!item) {
                return res.status(404).json({
                    error: {
                        message: "Item not found"
                    }
                });
            }

            res.status(200).json(item);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.update = function (req, res) {
    Item.findById(req.params.id, { include: [ Sale ] })
        .then(item => {
            if (!item) {
                return res.status(404).json({
                    error: {
                        message: "Item not found"
                    }
                });
            }

            let updates = {};

            // populate the updates object with the request.
            for (const prop in req.body) {
                updates[prop] = req.body[prop];
            }

            // if there is a file (i.e. image), add it to the updates object.
            if (req.file) {
                updates[req.file.fieldname] = req.file.path;
            }

            item.updateAttributes(updates)
                .then(updatedItem => {
                    res.status(201).json(updatedItem);
                })
                .catch(error => {
                    res.status(500).json(error);
                });
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.delete = function (req, res) {
    Item.destroy({ where: { id: req.params.id }})
        .then(item => {
            if (!item) {
                return res.status(404).json({
                    error: {
                        message: "Item not found"
                    }
                });
            }

            res.status(200).json({
                success: {
                    message: 'Item deleted successfully'
                }
            })
        })
        .catch(error => res.status(500).json(error));
};

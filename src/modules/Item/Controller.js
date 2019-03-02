const modules = require('../index');
const Item = modules.Item;
const Sale = modules.Sale;


exports.getAll = (req, res, next) => {
    Item.findAll({ include: [ Sale ] })
        .then(items => {
            res.status(200).json(items);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.create = (req, res, next) => {
    if (req.body.name && req.body.unit_price && req.body.whole_price) {
        let details = {
            name: req.body.name,
            unit_price: req.body.unit_price,
            whole_price: req.body.whole_price,
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
            .catch(error => {
                res.status(500).json(error);
            });
    } else {
        res.status(401).json({
            error: {
                message: "name and unit price are required"
            }
        });
    }
};

exports.get = (req, res, next) => {
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

exports.update = (req, res, next) => {
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

exports.delete = (req, res, next) => {
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
        .catch(error => {
            res.status(500).json(error);
        });
};

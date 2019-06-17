const { Role, User } = require('../../database');

exports.getAll = function (req, res) {
    Role.findAll({
        order: [
            ['created_at', 'DESC']
        ]
    })
        .then(roles => res.status(200).json(roles))
        .catch(error => res.status(500).json(error));
};

exports.create = function (req, res) {
    if (req.body.name) {
        Role.create(req.body)
            .then(role => {
                Role.findById(role.id)
                    .then(foundRole => res.status(201).json(foundRole))
            })
            .catch(error => res.status(500).json(error));
    } else {
        res.status(401).json({
            error: { message: "Please provide all required entries" }
        });
    }
};

exports.show = function (req, res) {
    Role.findById(req.params.id)
        .then(role => {
            if (!role) {
                return res.status(404).json({
                    error: { message: "Role entry not found" }
                });
            }

            res.status(200).json(role);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.update = function (req, res) {
    Role.findById(req.params.id)
        .then(role => {
            if (!role) {
                return res.status(404).json({
                    error: { message: "Role entry not found" }
                });
            }

            Role.updateAttributes(req.body)
                .then(updatedRole => {
                    res.status(200).json(updatedRole);
                })
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.delete = function (req, res) {
    Role.destroy({ where: { id: req.params.id } })
        .then(role => {
            if (!role) {
                return res.status(404).json({
                    error: { message: "Role entry not found" }
                });
            }

            res.status(200).json({
                success: { message: "Role entry successfully deleted" }
            });
        })
        .catch(error => res.status(500).json(error));
};

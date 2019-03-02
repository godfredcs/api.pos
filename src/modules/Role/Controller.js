const modules = require('../index');
const Role = modules.Role;

exports.getAll = (req, res) => {
    Role.findAll()
        .then(roles => res.status(200).json(roles))
        .catch(error => res.status(500).json(error));
};

exports.create = (req, res, next) => {
    if (req.body.name) {
        Role.create(req.body)
            .then(role => {
                Role.findById(Role.id)
                    .then(foundRole => {
                        res.status(201).json(foundRole);
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
    Role.findById(req.params.id)
        .then(role => {
            if (!role) {
                return res.status(404).json({
                    error: {
                        message: "Role entry not found"
                    }
                });
            }

            res.status(200).json(role);
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

exports.update = (req, res, next) => {
    Role.findById(req.params.id)
        .then(role => {
            if (!role) {
                return res.status(404).json({
                    error: {
                        message: "Role entry not found"
                    }
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

exports.delete = (req, res, next) => {
    Role.destroy({ where: { id: req.params.id } })
        .then(role => {
            if (!role) {
                return res.status(404).json({
                    error: {
                        message: "Role entry not found"
                    }
                });
            }

            res.status(200).json({
                success: {
                    message: "Role entry successfully deleted"
                }
            });
        })
        .catch(error => {
            res.status(500).json(error);
        });
};

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../../database');

// Function for getting all users in the system.
exports.getUsers = (req, res, next) => {
    User.findAll({ include: [ Role ] })
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

// Function for creating a new user.
exports.createUser = (req, res, next) => {
    if (req.body.password) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: {
                        message: "Something unexpected happened"
                    }
                });
            }

            if (hash) {
                req.body.password = hash;

                User.create(req.body)
                    .then(user => {
                        if (!user) {
                            return res.status(500).json({
                                error: {
                                    message: "Please enter all the required credentials"
                                }
                            });
                        }

                        const token = jwt.sign(
                            {
                                email: user.email,
                                id: user.id
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "30d"
                            }
                        );

                        user.dataValues.api_token = token;

                        res.status(201).json(user);
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    })
            }
        });
    } else {
        return res.status(500).json({
            error: {
                message: "Password is required"
            }
        })
    }
};

// Function for logging a user into the system.
exports.login = (req, res, next) => {
    User.findOne({ include: [ Role ], where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    error: {
                        message: 'User does not exist'
                    }
                });
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            error: {
                                message: "User authentication failed"
                            }
                        });
                    }

                    if (result) {
                        const token = jwt.sign(
                            {
                                email: user.email,
                                id: user.id
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "30d"
                            }
                        );

                        user.dataValues.api_token = token;

                        return res.status(200).json(user);
                    }

                    res.status(401).json({
                        error: {
                            message: "User authentication failed"
                        }
                    });
                });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

// Function for getting a specific user by id.
exports.showUser = (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    error: {
                        message: "User does not exist"
                    }
                });
            }

            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

// Function for updating a specific user in the system.
exports.updateUser = (req, res, next) => {
    let updates = {};

    // populate the updates object with the request.
    for (const prop in req.body) {
        updates[prop] = req.body[prop];
    }

    // if there is a file (i.e. profile image), add it to the updates object.
    if (req.file) {
        updates[req.file.fieldname] = req.file.path;
    }

    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    error: {
                        message: "User does not exist"
                    }
                });
            }

            if (updates.password && updates.old_password) {
                bcrypt.compare(updates.old_password, user.password, (err, result) => { // Check if the old password is correct.
                    if (err) {
                        return res.status(401).json({
                            error: {
                                message: "User authentication failed"
                            }
                        });
                    }

                    if (result) {
                        bcrypt.hash(updates.password, 10, (err, hash) => { /// hash the new password.
                            if (err) {
                                res.status(500).json(err);
                            }

                            if (hash) {
                                updates.password = hash;
                            }

                            user.updateAttributes(updates)
                                .then(updatedUser => {
                                    User.findOne({ include: [ Role ], where: { id: updatedUser.id }})
                                        .then(user => res.status(201).json(user));
                                })
                                .catch(err => {
                                    res.status(500).json(err);
                                });
                        });
                    }
                });
            } else {
                user.updateAttributes(updates)
                    .then(updatedUser => {
                        User.findOne({ include: [ Role ], where: { id: updatedUser.id }})
                            .then(user => res.status(201).json(user));
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

// Function for deleting a specific user in the system by id.
exports.deleteUser = (req, res, next) => {
    User.destroy({ where: { id: req.params.id } })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    error: {
                        message: "User not found"
                    }
                });
            }

            console.log('you just deleted this ', user)

            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};
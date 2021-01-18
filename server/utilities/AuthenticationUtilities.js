const AuthenticationUtilities = (bcrypt, Configuration) => {
    const { saltRounds, jwt, secret, expiration } = Configuration;

    const passwordEncrypt = (password) => {
        return (callback, value) => {
            //const value = bcrypt.hash(password, saltRounds);
            return callback(value, undefined);
        };
    };

    const checkPassword = (hashedPassword, plainTextPassword) => {
        return (callback, value) => {
            //const value = bcrypt.compare(hashedPassword, plainTextPassword);
            return callback(value, undefined);
        };
    };

    const sign = (email, status) => {
        const token = jwt.sign({
            exp: expiration,
            data: {
                email: email,
                status: status
            }
        }, secret);

        return token;
    };

    const verify = (req, res, next) => {
        let authHeader = req.headers["authorization"];

        if (!authHeader) {
            res.send({
                isError: true,
                message: `Cannot authenticate user`
            });
        } else {
            const token = authHeader.split(" ")[1];

            if (!token) {
                res.send({
                    isError: true,
                    message: `Cannot authenticate user`
                });
            } else {
                jwt.verify(token, secret, (err, payload) => {
                    if (err) {
                        res.send({
                            isError: true,
                            message: err.message
                        });
                    } else if (payload.data.status !== "active") {
                        res.send({
                            isError: true,
                            message: `User: ${payload.data.email} has status: ${payload.data.status}`
                        });
                    } else {
                        next();
                    }
                });
            };
        }
    };

    return Object.freeze({
        passwordEncrypt,
        checkPassword,
        sign,
        verify
    });
};

module.exports = AuthenticationUtilities;

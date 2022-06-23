const jwt = require('jsonwebtoken');

const checkLogIn = (req, res, next) => {
    const {authorization} = req.headers;
    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const {username, userId} = decoded;
        req.username = username;
        req.userId = userId;
        next();
    } catch (error) {
        next('authorization error');
    }
}

module.exports = checkLogIn;
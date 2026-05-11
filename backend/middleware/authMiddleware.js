id="q7r9mz"
const jwt = require("jsonwebtoken");

const SECRET = "secretkey";

function auth(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                message: "Invalid token"
            });
        }

        req.user = decoded;
        next();
    });
}

module.exports = auth;

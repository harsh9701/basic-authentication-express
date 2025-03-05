const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");

module.exports.isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const isTokenBlacklisted = await blacklistModel.findOne({ token });

        if (isTokenBlacklisted) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = user;
        next();

    } catch (err) {
        next(err);
    }
}

module.exports.isSeller = async (req, res, next) => {
    try {
        const user = req.user;

        if (user.role !== "seller") {
            return res.status(401).json({ message: "Unauthorized" });
        }

        next();

    } catch (err) {
        next(err);
    }
}
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");

module.exports.signup = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const isUserExist = await userModel.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({ message: "User already exist" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashPassword,
            role
        });

        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(201).json({ message: "User created successfully", user, token });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports.signing = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await userModel.findOne({ email }, { password: 1 });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(201).json({ message: "User signed in successfully", user, token });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports.logout = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }

        const isTokenBlacklisted = await blacklistModel.findOne({ token });

        if (isTokenBlacklisted) {
            return res.status(400).json({ message: "Token is already blacklisted" });
        }

        await blacklistModel.create({ token });

        return res.status(200).json({ message: "Logout successfully" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

module.exports.getProfile = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);

        return res.status(200).json({ message: "User fetched successfully", user });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}
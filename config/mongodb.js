const mongoose = require("mongoose");

const connectToDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URL).then(() => {
            console.log("Mongodb connected");
        }).catch((err) => {
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToDB;
const jwt = require("./../lib/jwt");
const SECRET = require("./../config/secret");

const db = require("./../data/database");

const generateToken = async (user) => {
    const payload = {
        id: user.id,
        role: user.role
    };

    const token = await jwt.sign(payload, SECRET);
    return token;
}

const loginUser = async (data) => {
    const user = db.find((obj) => obj.username === data.username);

    console.log(user);
}

module.exports = {
    loginUser
}
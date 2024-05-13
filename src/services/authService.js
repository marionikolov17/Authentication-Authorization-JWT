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

    if (!user) {
        throw new Error("Username or password are incorrect!");
    }

    const isValidPassword = user.password === data.password;

    if (!isValidPassword) {
        throw new Error("Username or password are incorrect!");
    }

    const token = await generateToken(user);
    return token;
}

module.exports = {
    loginUser
}
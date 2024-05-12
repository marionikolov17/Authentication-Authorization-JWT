const jwt = require("./../lib/jwt");
const SECRET = require("./../config/secret");

const generateToken = async (user) => {
    const payload = {
        id: user.id,
        role: user.role
    };

    const token = await jwt.sign(payload, SECRET);
    return token;
}
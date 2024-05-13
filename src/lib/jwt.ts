import jwt from "jsonwebtoken";

export const sign = (token: any, secret: any) => {
    return new Promise((resolve, reject) => {
        jwt.sign(token, secret, {}, (err, payload) => {
            if (err) {
                reject (err);
            } else {
                resolve(payload);
            }
        })
    })
};

export const verify = (token: any, secret: any) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, {}, (err, payload) => {
            if (err) {
                reject (err);
            } else {
                resolve(payload);
            }
        })
    })
}

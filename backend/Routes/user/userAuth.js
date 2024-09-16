const jwt = require('jsonwebtoken');

const jwt_secret = "mysecret"

const verify = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    try {
        if(!token){
            return res.status(301).json({message: "Access denied because you lack credentials"})
        }
        const decoded = jwt.verify(token, jwt_secret);
        req.userID = decoded.userID;
        next();
    } catch (error) {
        console.log("Token verrification error", error.message);
        return res.status(201).json({msg: "no token"});
    }
}

module.exports = verify;
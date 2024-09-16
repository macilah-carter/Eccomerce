const jwt = require('jsonwebtoken');

const jwt_secret = "mysecret"

const verifyAdmin = (req, res, next) => {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];
    try {
        if(!token){
            return res.status(301).json({message: "Access denied you lack credential for admin"});
        }
        const decoded = jwt.verify(token, jwt_secret);
        if(decoded.role !== 'admin'){
            return res.status(301).json({message: "Access denied you are not admin"});
        }
        req.adminId = decoded.adminId;
        next();
    } catch (error) {
        console.log('Token verification error', error.message);
        return res.status(500).json({message: "Token is not valid"})
    }
};

module.exports = verifyAdmin;
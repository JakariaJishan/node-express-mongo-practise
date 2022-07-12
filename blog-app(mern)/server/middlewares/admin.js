const User = require("../models/user");

const isAdmin = (req,res,next) => {
    const user = new User()
    console.log(req.user);
    if(!req?.user?.isAdmin) {
        return res.status(403).send({ message:"restricted"})
    }
    next()
}

module.exports = isAdmin
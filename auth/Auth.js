const jwt = require("express-jwt");

const AccessToken = (clientid) => {
return jwt.sign(clientid,process.env.TOKEN_SECRET, {expiresIn:'1800s'});
}

module.exports = {AccessToken}


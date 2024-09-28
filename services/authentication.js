const JWT = require('jsonwebtoken');
const secret = '$uperMan!sShitASSHOLE!@#$!@#!@#!@#!@#!@#$@#$%##%^$%&&%^&^&*^&(^$%^%&%&*%^&^*(%^&%^&%$%FGBDRGBdkjghkjth2345643%^$%^#4tlkfkhdkfgjh45k6456'


function createTokenForUSer(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        profileImageURL: user.profileImageURL,
        role: user.role
    };
    const token = JWT.sign(payload, secret);
    return token
}

function validateToken(token){
    const payload = JWT.verify(token, secret)
    return payload
}

module.exports = {
    createTokenForUSer,
    validateToken
}
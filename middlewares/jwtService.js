const jwt =require('jsonwebtoken');


class jwtServices {
constructor(secretKey,expiresIn="1d"){

    this.secretKey=secretKey,
    this.expiresIn=expiresIn
}

jwtSign(payload){

const token=jwt.sign(this.secretKey, {expiresIn: this.expiresIn})

return token
};

jwtVerify(token){
    return jwt.verify(token,this.secretKey)

}}
module.export=jwtServices;
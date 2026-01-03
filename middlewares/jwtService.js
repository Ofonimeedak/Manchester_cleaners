const jwt =require('jsonwebtoken');


class jwtServices {
constructor(SECRETE_KEY,expiresIn="1d"){

    this.SECRETE_KEY=SECRETE_KEY,
    this.expiresIn=expiresIn
}

jwtSign(payload){

const token=jwt.sign(this.SECRETE_KEY, {expiresIn: this.expiresIn})

return token
};

jwtVerify(token){
    return jwt.verify(token,SECRETE_KEY)

}}
module.export=jwtServices;
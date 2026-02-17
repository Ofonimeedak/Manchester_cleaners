const jwt =require('jsonwebtoken');


class jwtServices {
constructor(secretKey,expiresIn="1d"){

    this.secretKey=secretKey,
    this.expiresIn=expiresIn
}

sign(payload){

return jwt.sign( payload, this.secretKey, {expiresIn: this.expiresIn})

};

verify(token){
    return jwt.verify(token,this.secretKey)

}
}
module.export=jwtServices;
class AuthController{


    constructor(authServices){
        this.authServices=authServices;
    };

   async signup(req,res){

    const dto= new UserDto(req.body);
    try{
        
        const user= await this.authServices.register(dto);
        res.status(201).json({result : user, mesage: "user created succefully"})
    }catch(error){ res.status(500).json({message:error.details});

   }
}

login(req,res){



}

}
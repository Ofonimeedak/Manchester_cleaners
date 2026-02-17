require('dotenv').config();
if(!process.env.JWT_SECRET){
    throw new Error("Error loading secret key");
}
const UserRepository=require('./Repository/userRepository');
const AuthService=require('./service/authService');
const UserController=require('./controller/userController');
const JwtService=require('./middlewares/jwtService');
const userModel=require('./model/user')
const { UserDto, LoginDto } =require('./Dtos/authDto');


const jwt= new JwtService(process.env.JWT_SECRET);
const userRepo= new UserRepository(userModel);
const authService=new AuthService(userRepo,jwt,UserDto,LoginDto);
const  userController=new UserController(authService);

module.exports=userController;



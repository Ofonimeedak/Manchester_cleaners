class UserDto {
  constructor(email, password, role, isVerified, isActive) {
    (this.email = email),
      (this.password = password),
      (this.role = role),
      (this.isVerified = isVerified),
      (this.isActive = isActive),
      this.validate();
  }

  validate() {
    const errors = [];

    if (!email) {
      errors.push("Please provide a valid email");
    }

    if (!password|| this.password.length < 6) {
      errors.push("password must be atleast 6 characters");
    }

    if (!role) {
      errors.push("All users are role specific, please provide a role");
    }

    if (errors.length > 0) {
      const error = new Error("Validation error");
      error.details = errors;
      throw error;
    }
  }
}

class LoginDto {

  constructor(email,password){
    this.email=email,
    this.password=password;
    this.validate();
  }
  validate(){
      const errors=[]
    if(!email){
      errors.push("valid email is required")
    };
    if(!password || password.lenght<6){
      errors.push("Invalid password entered");
    }
    if (errors.length>0){

      const error= new Error("Validation error");
      error.details=errors;
      throw error;
    }
  }

}

module.export={UserDto, LoginDto};
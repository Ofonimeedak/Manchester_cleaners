class CustormerDto {
  constructor({
    firstName,
    lastName,
    phone,
    defaultLocation,
    avatar,
    dob
  
  }) {

    (this.firstName = firstName),
      (this.lastName = lastName),
      (this.phone = phone),
      (this.defaultLocation= defaultLocation),
      (this.avatar = avatar),
      (this.dob = dob);
      this.validate();
  };

  validate(){

const errors = [];

    if (!firstName || !lastName) {
      errors.push("Please provide  first and Last names");
    }

    if (!this.dob|| this.dob < 16) {
      errors.push("user must be atleast 16 years old");
    }

if(errors.length>0){

  const error= new Error("validation error");
  error.details=errors;
  throw error;
}

  }
}

 module.exports=CustormerDto;
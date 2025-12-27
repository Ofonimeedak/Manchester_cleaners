class createCustormerDto {
  constructor({
    firstName,
    lastName,
    email,
    phone,
    postCode,
    address,
    avatar,
    dob,
    role,
    isVerified
  }) {

    if(!email || !firstName ||!password ||postCode){

        throw new Error(" please provide all necessary field")
    };
    (this.firstName = firstName),
      (this.lastName = lastName),
      (this.email = email),
      (this.phone = phone),
      (this.postCode = postCode),
      (this.address = address),
      (this.avatar = avatar),
      (this.dob = dob);
      this.role=role,
      this.isVerified=isVerified
  }
}

 module.exports=createCustormerDto;
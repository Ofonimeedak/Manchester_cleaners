class createVendorDto {
  constructor({
    firstName,
    lastName,
    email,
    password,
    postCode,
    address,
    ni,
    visaType,
    workType,
    dob,
    images,
    avatar,
    phone,
  }) {

    if(!firstName || !email ||!password || ni){

        throw new Error(" Provide all fields to sign up")
    }
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.address = address;
    this.avatar = avatar;
    this.dob = dob;
    this.ni = ni;
    this.images = images;
    this.phone = phone;
    this.postCode = postCode;
    this.visaType = visaType;
    this.workType = workType;
  }
}


class outputDto {
constructor({firstName,
    lastName,
    email,
    location
    }){
    this.lastName=lastName,
    this.email=email,
    this.location=location,
    this.firstName=firstName

};


}
module.exports= {createVendorDto,outputDto}
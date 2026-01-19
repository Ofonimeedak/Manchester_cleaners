

class CleanerDto {
  constructor({
    firstName,
    lastName,
    email,
    password,
    location,
    niNumber,
    visaType,
    workType,
    dob,
    idImages,
    avatar,
    phone,
    bio,
    rating,
    totalReviews,
    availability,
    services,
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.dob = dob;
    this.niNumber = niNumber;
    this.idImages = idImages;
    this.phone = phone;
    this.location = location;
    this.visaType = visaType;
    this.workType = workType;
    (this.bio = bio),
    (this.rating = rating),
    (this.totalReviews = totalReviews),
    (this.availability = availability),
    (this.services = services),
    this.validate();
  }

  validate() {
    const errors = [];

    if (!this.email) {
      errors.push("A valid email is required");
    }
    if (!this.firstName || this.lastName) {
      errors.push("first and last name required");
    }

    if (!this.password || this.password.length < 6) {
      errors.push("Password should be atleast 6 characters");
    }
    if (!this.ni || !this.visaType || !this.workType) {
      errors.push("please provide your right to work credentials");
    }

    if (!this.dob || this.dob < 18) {
      errors.push("Please provide an eligible date of birth");
    }

    if (!this.availability) {
      errors.push("Please provide an update on your avaialability for work ");
    }

    if (this.services < 0) {
      errors.push("Cleaner must atleast render one services");
    }
    if (errors.length > 0) {
      const error = new Error("validation errors");
      error.details = errors;
      throw error;
    }
  }
}

module.exports = { CleanerDto };

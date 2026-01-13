import mongoose from "mongoose";
import User from "../../model/user.js";

class UserRepository {
  constructor(model = User) {
    this.model = model;
  }

  async createUser(userData) {
    const user = new this.model(userData);
    return await user.save();
  }

  async findUserByEmail(email) {
    return await this.model.findOne({ email });
  }

  async findUserById(id) {
    return await this.model.findById(id);
  }

  async updateUserVerificationStatus(id, status) {
    return await this.model.findByIdAndUpdate(
      id,
      { isVerified: status },
      { new: true }
    );
  }

  async deleteUser(id) {
    return await this.model.findByIdAndDelete(id);
  }

}

export default UserRepository;

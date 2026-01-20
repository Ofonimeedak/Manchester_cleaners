import CustomerProfile from "../model/customerProfile.js";

class CustomerRepository {
  constructor(model = CustomerProfile) {
    this.model = model;
  }

  async createCustomerProfile(customerData) {
    const customer = new this.model(customerData);
    return await customer.save();
  }

  async findCustomerByUserId(userId) {
    return await this.model.findOne({ user: userId }).populate("user");
  }

  async findCustomerById(id) {
    return await this.model.findById(id).populate("user");
  }

  async getAllCustomers(filters = {}) {
    return await this.model.find(filters).populate("user");
  }

  async findCustomersByLocation(postCode) {
    return await this.model
      .find({ "defaultLocation.postCode": postCode })
      .populate("user");
  }

  async updateCustomerProfile(id, updateData) {
    return await this.model.findByIdAndUpdate(id, updateData, { new: true });
  }

  async updateCustomerLocation(id, locationData) {
    return await this.model.findByIdAndUpdate(
      id,
      { defaultLocation: locationData },
      { new: true }
    );
  }

  async updateCustomerAvatar(id, avatarUrl) {
    return await this.model.findByIdAndUpdate(
      id,
      { avatar: avatarUrl },
      { new: true }
    );
  }

  async deleteCustomerProfile(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async countCustomers(filters = {}) {
    return await this.model.countDocuments(filters);
  }

  async customerExists(userId) {
    return await this.model.exists({ user: userId });
  }
}

export default CustomerRepository;

import Service from "../model/service.js";

class ServiceRepository {
  constructor(model = Service) {
    this.model = model;
  }

  async createService(serviceData) {
    const service = new this.model(serviceData);
    return await service.save();
  }

  async findServiceById(id) {
    return await this.model.findById(id).populate("cleaner");
  }

  async findServicesByCleanerId(cleanerId) {
    return await this.model.find({ cleaner: cleanerId }).populate("cleaner");
  }

  async findServicesByCategory(category) {
    return await this.model.find({ category }).populate("cleaner");
  }

  async getAllServices(filters = {}) {
    return await this.model.find(filters).populate("cleaner");
  }

  async getActiveServices(filters = {}) {
    return await this.model.find({ isActive: true, ...filters }).populate("cleaner");
  }

  async updateService(id, serviceData) {
    return await this.model.findByIdAndUpdate(id, serviceData, { new: true }).populate("cleaner");
  }

  async deleteService(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async deactivateService(id) {
    return await this.model.findByIdAndUpdate(id, { isActive: false }, { new: true });
  }

  async activateService(id) {
    return await this.model.findByIdAndUpdate(id, { isActive: true }, { new: true });
  }

  async findServicesByPriceRange(minPrice, maxPrice) {
    return await this.model.find({
      pricePerHour: { $gte: minPrice, $lte: maxPrice }
    }).populate("cleaner");
  }
}

export default ServiceRepository;

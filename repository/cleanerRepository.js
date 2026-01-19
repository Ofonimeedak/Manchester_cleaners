import CleanerProfile from "../model/cleanerProfile.js";

class CleanerRepository {
  constructor(model = CleanerProfile) {
    this.model = model;
  }

  async createCleanerProfile(cleanerData) {
    const cleaner = new this.model(cleanerData);
    return await cleaner.save();
  }

  async findCleanerByUserId(userId) {
    return await this.model.findOne({ user: userId }).populate("user").populate("services");
  }

  async findCleanerById(id) {
    try {
      const cleaner = await this.model.findById(id).populate("user").populate("services");
      return cleaner;
    } catch (error) {
      throw new RepositoryError("Failed to fetch cleaner profile", error);
    }
  }

  async findCleanerByEmail(email) {
    return await this.model
      .findOne({ email })
      .populate("user")
      .populate("services");
  }

  async getAllCleaners(filters = {}) {
    return await this.model.find(filters).populate("user").populate("services");
  }

  async findAvailableCleaners() {
    return await this.model
      .find({ availability: "available" })
      .populate("user")
      .populate("services");
  }

  async findCleanersByLocation(longitude, latitude, maxDistance = 50000) {
    return await this.model
      .find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
            $maxDistance: maxDistance,
          },
        },
      })
      .populate("user")
      .populate("services");
  }

  async findTopRatedCleaners(minRating = 1.0) {
    return await this.model
      .find({ rating: { $gte: minRating } })
      .sort({ rating: -1 })
      .populate("user")
      .populate("services");
  }

  async updateCleanerProfile(id, updateData) {
    return await this.model.findByIdAndUpdate(id, updateData, { new: true });
  }

  async updateCleanerAvailability(id, availability) {
    return await this.model.findByIdAndUpdate(
      id,
      { availability },
      { new: true }
    );
  }

  async updateCleanerRating(id, newRating, totalReviews) {
    return await this.model.findByIdAndUpdate(
      id,
      { rating: newRating, totalReviews },
      { new: true }
    );
  }

  async addServiceToCleaner(cleanerId, serviceId) {
    return await this.model.findByIdAndUpdate(
      cleanerId,
      { $push: { services: serviceId } },
      { new: true }
    );
  }

  async removeServiceFromCleaner(cleanerId, serviceId) {
    return await this.model.findByIdAndUpdate(
      cleanerId,
      { $pull: { services: serviceId } },
      { new: true }
    );
  }

  async deleteCleanerProfile(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async countCleaners(filters = {}) {
    return await this.model.countDocuments(filters);
  }
}

export default CleanerRepository;

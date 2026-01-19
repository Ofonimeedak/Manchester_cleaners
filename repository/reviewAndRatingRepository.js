import Review from "../model/reviewAndRating.js";

class ReviewAndRatingRepository {
  constructor(model = Review) {
    this.model = model;
  }

  async createReview(reviewData) {
    const review = new this.model(reviewData);
    return await review.save();
  }

  async findReviewById(id) {
    return await this.model.findById(id).populate("booking").populate("cleaner").populate("customer");
  }

  async findReviewsByCleanerId(cleanerId) {
    return await this.model.find({ cleaner: cleanerId }).populate("booking").populate("cleaner").populate("customer");
  }

  async findReviewsByCustomerId(customerId) {
    return await this.model.find({ customer: customerId }).populate("booking").populate("cleaner").populate("customer");
  }

  async findReviewByBookingId(bookingId) {
    return await this.model.findOne({ booking: bookingId }).populate("booking").populate("cleaner").populate("customer");
  }

  async getAllReviews(filters = {}) {
    return await this.model.find(filters).populate("booking").populate("cleaner").populate("customer");
  }

  async getReviewsByRating(minRating, maxRating = 5) {
    return await this.model.find({
      rating: { $gte: minRating, $lte: maxRating }
    }).populate("booking").populate("cleaner").populate("customer");
  }

  async getAverageRatingForCleaner(cleanerId) {
    const result = await this.model.aggregate([
      { $match: { cleaner: cleanerId } },
      { $group: { _id: "$cleaner", averageRating: { $avg: "$rating" }, totalReviews: { $sum: 1 } } }
    ]);
    return result.length > 0 ? result[0] : null;
  }

  async updateReview(id, reviewData) {
    return await this.model.findByIdAndUpdate(id, reviewData, { new: true }).populate("booking").populate("cleaner").populate("customer");
  }

  async deleteReview(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

export default ReviewAndRatingRepository;

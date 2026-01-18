
import Cleaner from "../model/cleaner.js";
import User from "../model/User.js";
import CleanerToVerifyFileDto from "../Dtos/cleanerToVerifyFileDto.js";

class CleanerVerificationRepository {
  constructor(userModel = User, cleanerModel = Cleaner) {
    this.User = userModel;
    this.Cleaner = cleanerModel;
  }

  async getPendingCleaners() {
    const cleaners = await this.Cleaner.find({ status: "pending" });
    return cleaners.map(c => new CleanerToVerifyFileDto(c));
  }
  async bulkApproveCleaners(userIds) {
    await this.User.updateMany(
      { _id: { $in: userIds } },
      { $set: { isVerified: true } }
    );

    return await this.Cleaner.updateMany(
      { userId: { $in: userIds } },
      { $set: { status: "approved" } }
    );
  }

  async bulkRejectCleaners(userIds) {
    await this.User.updateMany(
      { _id: { $in: userIds } },
      { $set: { isVerified: false } }
    );

    return await this.Cleaner.updateMany(
      { userId: { $in: userIds } },
      { $set: { status: "rejected" } }
    );
  }

  async getCleanerByUserId(userId) {
    const cleaner = await this.Cleaner.findOne({ userId });
    if (!cleaner) return null;
    return new CleanerToVerifyFileDto(cleaner);
  }
}

export default CleanerVerificationRepository;

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
  constructor(userRepository, jwtSecret, jwtExpiresIn = "1d") {
    this.userRepo = userRepository;
    this.jwtSecret = jwtSecret;
    this.jwtExpiresIn = jwtExpiresIn;
  }

  async register(dto) {
   
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const userData = {
      ...dto,
      password: hashedPassword,
      isVerified: false, 
      blocked: false, 
    };

    const user = await this.userRepo.createUser(userData);
    return user;
  }

  async login(dto) {
    const user = await this.userRepo.findUserByEmail(dto.email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    if (user.blocked) {
      throw new Error("This account is blocked. Contact support.");
    }

    if (user.isVerified === false) {
      throw new Error("User not verified by admin yet.");
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      this.jwtSecret,
      { expiresIn: this.jwtExpiresIn }
    );

    return { user, token };
  }

  async blockUser(id) {
    return await this.userRepo.updateUserVerificationStatus(id, { blocked: true });
  }

  async unblockUser(id) {
    return await this.userRepo.updateUserVerificationStatus(id, { blocked: false });
  }
}

export default AuthService;


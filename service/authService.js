const bcrypt = require("bcrypt");
const jwtService = require("../middlewares/jwtService.js");
//const userRepository = require("../repository/userRepository.js");
//const { UserDto, LoginDto } = require("../Dtos/userDto.js");

class AuthError extends Error {
  constructor(message, status = 401) {
    super(message);
    this.name = "AuthError";
    this.status = status;
  }
}

class AuthService {
  constructor(userRepository, jwtService, UserDto,LoginDto) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
    this.UserDto = UserDto;
    this.LoginDto=LoginDto
  }

  async register(userData) {
    const dto = new this.UserDto(userData);
    const entity = dto.toEntity();

    const existingUser = await this.userRepository.findUserByEmail(dto.email);
    if (existingUser) {
      throw new ConflictError("User alreday exist");
    }

    entity.password = await bcrypt.hash(dto.password, 10);

    const newUser = await this.userRepository.createUser(entity);
    return newUser;
  }

  async login(userData) {
    const dto = new this.LoginDto(userData);
    const user = await this.userRepository
      .findUserByEmail(dto.email)
      .select("+password");

    if (!user) throw new AuthError("Invalid credentials");

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new AuthError("Invalid credentials");

    if (!user.isActive)
      throw new AuthError("Account blocked. Contact support.", 403);
    if (!user.isVerified)
      throw new AuthError("User not verified by admin yet.", 403);

    const token = this.jwtService.sign({
      userId: user._id,
      role: user.role,
    });

    return {
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  async blockUser(id) {
    return await this.userRepository.updateUser(id, { isActive: false });
  }

  async unblockUser(id) {
    return await this.userRepository.updateUser(id, { isActive: true });
  }
}

module.exports = AuthService;

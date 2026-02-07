const AuthService = require("../service/authService");

class UserController {
  constructor(AuthService) {
    this.AuthService = AuthService;
  }

  signup = async (req, res, next) => {
    const dto = req.body;
    try {
      const newUser = await this.AuthService.register(dto);
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (err) {
      next(err);
    }

    login = async (req, res, next) => {
      const dto = req.body;
      try {
        const token = await this.AuthService.login(dto);
        res.status(200).json({ message: "Loging successdul", token: token });
      } catch (err) {
        next(err);
      }
    };
  };
}

module.exports = UserController;

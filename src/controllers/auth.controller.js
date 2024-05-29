const { validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const logger = require("../loggers/logger");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ error: "El correo y/o la contraseña son incorrectos" });
    }

    const passwordCorrecto = await user.comparePassword(password);
    if (!passwordCorrecto) {
      return res
        .status(403)
        .json({ error: "El correo y/o la contraseña son incorrectos" });
    }

    const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ login: true, userId: user.id, token });
  } catch (error) {
    logger.error("Error al iniciar sesion", error);
    res.status(500).json({ message: "Error al iniciar sesion" });
  }
};

const register = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(422).json({ errors: result.array() });
  }

  const { username, email, password } = req.body;

  try {
    const user = new User({
      username,
      email,
      password,
    });

    await user.save();

    res.json({ register: true, userId: user.id });
  } catch (error) {
    logger.error("Error al registrarse", error);
    res.status(500).json({ message: "Error al registrarse" });
  }
};

const logout = (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.json({ data: null, error: "No se pudo cerrar la sesion" });
      } else {
        res.json({ data: "Cierre de sesion exitoso", error: null });
      }
    });
  } else {
    res.json({ data: null, error: "No hay una sesion activa" });
  }
};

const googleFailure = (req, res) => {
  res.json({ data: null, error: "El inicio de sesion fallo - GOOGLE" });
};

const githubFailure = (req, res) => {
  res.json({ data: null, error: "El inicio de sesion fallo - GITHUB" });
};

const googleSuccess = (req, res) => {
  res.json({ data: null, success: "El inicio de sesion fue exitoso - GOOGLE" });
};

const githubSuccess = (req, res) => {
  res.json({ data: null, success: "El inicio de sesion fue exitoso - GITHUB" });
};

module.exports = {
  login,
  register,
  logout,
  googleFailure,
  googleSuccess,
  githubFailure,
  githubSuccess,
};

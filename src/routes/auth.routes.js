const express = require("express");
const { login, register } = require("../controllers/auth.controller");
const { body } = require("express-validator");
const {
  errorMidleware,
  requestValidation,
} = require("../middlewares/common.middleware");
const passport = require("passport");
const router = express.Router();

router.post("/login", login, errorMidleware);

router.post(
  "/register",
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("El correo es requerido")
      .isEmail()
      .withMessage("El correo es incorrecto"),
    body("password")
      .notEmpty()
      .withMessage("La contraseña es requerida")
      .isLength({ min: 6, max: 12 })
      .withMessage("La contraseña debe tener entre 6 y 12 caracteres")
      .custom((value, { req }) => value === req.body.password_confirmation)
      .withMessage("Las contraseñas no coincide"),
  ],
  requestValidation,
  register,
  errorMidleware
);

router.get("/logout", (req, res) => {
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
});

router.get("/login/github/failure", (req, res) =>
  res.json({ data: null, error: "El inicio de sesion fallo - GITHUB" })
);
router.get("/login/github/success", (req, res) =>
  res.json({ data: null, success: "El inicio de sesion fue exitoso - GITHUB" })
);

router.get(
  "/login/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/login/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api/login/github/failure",
    successRedirect: "/api/login/github/success",
  })
);

router.get("/login/google/failure", (req, res) =>
  res.json({ data: null, error: "El inicio de sesion fallo - GOOGLE" })
);
router.get("/login/google/success", (req, res) =>
  res.json({ data: null, success: "El inicio de sesion fue exitoso - GOOGLE" })
);

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/login/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/login/google/failure",
    successRedirect: "/api/login/google/success",
  })
);

module.exports = router;

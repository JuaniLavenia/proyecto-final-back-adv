const logger = require("../loggers/logger");
const User = require("../models/User");

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, {
      email: 1,
      _id: 1,
      username: 1,
      subscription: 1,
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Info del usuario", usuario: user });
  } catch (error) {
    logger.error("Error al obtener el usuario", error);
    res
      .status(500)
      .json({ message: "Error al obtener el usuario", error: error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      { email: 1, _id: 1, username: 1, subscription: 1 }
    );
    res.status(200).json({ message: "Lista de usuarios", usuarios: users });
  } catch (error) {
    logger.error("Error al obtener los usuarios", error);
    res
      .status(500)
      .json({ message: "Error al obtener los usuarios", error: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const selectedUser = user.toObject();
    const { _id, email, username } = selectedUser;
    res.status(200).json({
      message: "Usuario modificado",
      usuario: { _id, email, username },
    });
  } catch (error) {
    logger.error("Error al modificar el usuario", error);
    res
      .status(500)
      .json({ message: "Error al modificar el usuario", error: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    logger.error("Error al eliminar el usuario", error);
    res
      .status(500)
      .json({ message: "Error al eliminar el usuario", error: error });
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { subscription } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { subscription },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const validSubscriptions = ["Iron", "Gold", "Platinum"];
    if (!validSubscriptions.includes(subscription)) {
      return res
        .status(400)
        .json({ message: "No se encontro el nivel de suscripción" });
    }

    res.status(200).json({
      message: "Suscripción actualizada exitosamente",
    });
  } catch (error) {
    logger.error("Error al suscribirse", error);
    res.status(500).json({ message: "Error al suscribirse", error: error });
  }
};

const getLoanHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("loanHistory.bookId");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user.loanHistory);
  } catch (error) {
    logger.error("Error obteniendo historial de préstamos", error);
    res
      .status(500)
      .json({
        message: "Error obteniendo historial de préstamos",
        error: error,
      });
  }
};

const getPurchaseHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("purchaseHistory.bookId");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user.purchaseHistory);
  } catch (error) {
    logger.error("Error obteniendo historial de compras", error);
    res
      .status(500)
      .json({ message: "Error obteniendo historial de compras", error: error });
  }
};

module.exports = {
  getUserInfo,
  getUsers,
  updateUser,
  deleteUser,
  updateSubscription,
  getLoanHistory,
  getPurchaseHistory,
};

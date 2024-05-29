const express = require("express");
const router = express.Router();
const {
  getUserInfo,
  getUsers,
  updateUser,
  deleteUser,
  updateSubscription,
  getLoanHistory,
  getPurchaseHistory,
} = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/users", authMiddleware, getUsers);
router.get("/user/:id", authMiddleware, getUserInfo);

router.put("/user/:id", authMiddleware, updateUser);
router.put("/user/:id/subscription", authMiddleware, updateSubscription);

router.delete("/user/:id", authMiddleware, deleteUser);

router.get("/user/:id/loan-history", authMiddleware, getLoanHistory);

router.get("/user/:id/purchase-history", authMiddleware, getPurchaseHistory);

module.exports = router;

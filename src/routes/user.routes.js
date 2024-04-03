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

router.get("/users", getUsers);
router.get("/user/:id", getUserInfo);

router.put("/user/:id", updateUser);
router.put("/user/:id/subscription", updateSubscription);

router.delete("/user/:id", deleteUser);

router.get("/user/:id/loan-history", getLoanHistory);

router.get("/user/:id/purchase-history", getPurchaseHistory);

module.exports = router;

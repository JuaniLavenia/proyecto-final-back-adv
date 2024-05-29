const { Router } = require("express");
const { payment } = require("../controllers/payment.controller");

const router = Router();

router.post("/payment", payment);
router.post("/webhook", (req, res) =>
  res.json({ message: "Aqui recibimos comuniaciones desde mercado pago" })
);
router.get("/success", (req, res) => res.send("caso de compra exitosa"));
router.get("/failure", (req, res) => res.send("caso de compra fallida"));

module.exports = router;

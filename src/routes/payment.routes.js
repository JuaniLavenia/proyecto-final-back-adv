const { Router } = require('express');
const { createOrder, findPayment, handleWebhook } = require('../controllers/payment.controller');

const router = Router();

router.get('/payment', findPayment);
router.post('/create-order', createOrder);
router.post('/webhook', handleWebhook);
router.get('/success', (req, res) => res.send('Caso de compra exitosa'));
router.get('/failure', (req, res) => res.send('Caso de compra fallida'));
router.get('/pending', (req, res) => res.send('Caso de compra pendiente'));

module.exports = router;

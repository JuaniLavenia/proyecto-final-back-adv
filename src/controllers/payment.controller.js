const mercadopago = require('mercadopago');

const payment = async (req, res) => {
    await mercadopago.configure({
        access_token: process.env.MERCADOPAGO_KEY
    });
    const result = await mercadopago.preferences.create({
        items: [
            {
                title: 'Laptop',
                unit_price: 5000,
                currency_id: 'ARS',
                quantity: 1,
            },
        ],
        notification_url: 'https://1zwgjv94-7070.brs.devtunnels.ms/webhook',
        back_urls: {
            success:'http://localhost:3000/vuelta-success.html',
            pending: 'http://localhost:3000/vuelta-pending.html',
            failure:'http://localhost:3000/vuelta-failure.html',
        },
    });

    res.json(result);
};

const manejarFin = async (req, res) => {
    mercadopago.configure({
        access_token: 'TEST-3046566279301127-051110-c61a7b70dc142661d9a7f0d056ccd73f-159062169'
    });

    if (req.query.topic === 'merchant_order') {
        const data = await mercadopago.merchant_orders.findById(req.query.id);

        console.log(data);
    }

    res.status(204);
};

module.exports = {
    payment,
    manejarFin
};

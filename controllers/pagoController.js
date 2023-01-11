const pago = require('../database/models').Pago;
const express = require("express")
const mp = require("mercadopago")
require("dotenv").config()


const token = process.env.ACCESS_TOKEN
/* const app = express()
const port = 5000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log(`Servidor en puerto ${port}`)
}) */

mp.configure({
    access_token: token
})

const generaPago = async (req, res) => {
    let { title, description, unitPrice, quantity } = req.body
    console.log(title);
    console.log(description);
    console.log(unitPrice);
    console.log(quantity);
    try {
        //Crea referencia
        let preferencia = {
            back_urls: {
                success: "https://localhost:3000/MercadoPago/aprobado.html",
                failure: "https://localhost:3000/MercadoPago/fallo.html",
                pending: "https://localhost:3000/MercadoPago/pendiente.html"
            },
            auto_return: "approved",
            external_reference: "prueba123",
            items: [
                {
                    title: req.body.title,
                    description: req.body.description,
                    unit_price: unitPrice,
                    quantity: 1
                }
            ]
        }
        mp.preferences.create(preferencia)
            .then(function (response) {
                console.log(response.body)
                res.redirect(response.body.init_point)
            }).catch(function (err) {
                console.log(err)
            })
    } catch (error) {
        console.log(error)
        res.send({
            resultado: "No pudo generarse el pago",
            error: error.Message
        })
    }
}

module.exports = { generaPago };
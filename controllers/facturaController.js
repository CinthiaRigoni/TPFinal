const Factura = require('../database/models').Factura;
const Pedido = require('../database/models/').Pedido;

//Devuelve todas las facturas
const getFacturas = async (req, res) => {
    try {
        let result = await Factura.findAll({
            include: {
                model: Pedido,
                required: true,
            }
        });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

//Crea una nueva factura
const createFactura = async (req, res) => {
    let { fecha, numero, montoDescuento, formaPago, nroTarjeta, totalVenta, totalCosto, pedido_id } = req.body;
    try {
        //Verifica que haya un pedido asociado
        let pedido = await Pedido.findByPk(pedido_id);
        if (!pedido) {
            res.send("No se encontro pedido asociado")
            return;
        }
        //Se crea el elemento
        let newFactura = await Factura.create({
            fecha: fecha,
            numero: numero,
            montoDescuento: montoDescuento,
            formaPago: formaPago,
            nroTarjeta: nroTarjeta,
            totalVenta: totalVenta,
            totalCosto: totalCosto,
            pedido_id: pedido_id
        });
        console.log(newFactura);
        res.send("Se creo Factura");
    } catch (error) {
        console.log(error);
        res.send({
            resultado: "No se pudo crear Factura",
            error: error.parent.sqlMessage
        })
    }
}

//Elimina el elemento
const deleteFactura = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        //Se busca el elemento
        let factura = await Factura.findByPk(idArt);
        if (!factura) {
            res.send("No se encontro la factura")
            return;
        }
        await factura.destroy();
        res.send("Factura eliminada")
    } catch (error) {
        res.send(error);
    }
}

//Actualiza un elemento
const updateFactura = async (req, res) => {
    try {
        let { fecha, numero, montoDescuento, formaPago, nroTarjeta, totalVenta, totalCosto, pedido_id } = req.body;
        let idFact = parseInt(req.params.id);
        //Se busca el elemento, si no existe, envia un mensaje
        let factura = await Factura.findByPk(idFact);
        if (!factura) {
            res.send("No se encontro Factura")
            return;
        }
        //Se verifica que exista el Pedido asociado
        let pedido = await Pedido.findByPk(pedido_id);
        if (!pedido) {
            res.send("No se encontro pedido asociado")
            return;
        }
        await Factura.update({
            fecha: fecha,
            numero: numero,
            montoDescuento: montoDescuento,
            formaPago: formaPago,
            nroTarjeta: nroTarjeta,
            totalVenta: totalVenta,
            totalCosto: totalCosto,
            pedido_id: pedido_id
        }, {
            where: {
                id: idFact
            }
        });
        res.send("Se actualizo Factura");
    } catch (error) {
        res.send(error);
    }
}

//Busca elemento por ID
const getFacuraId = async (req, res) => {
    try {
        let idFact = parseInt(req.params.id);
        let factura = await Factura.findByPk(idFact, {
            include: {
                model: Pedido,
                required: true
            }
        });
        if (!factura) {
            res.send("No se encontro la factura")
            return;
        }
        res.send(factura);
    } catch (error) {
        res.send(error);
    }
}

module.exports = { getFacturas, createFactura, deleteFactura, updateFactura, getFacuraId };
const DetallePedido = require('../database/models').DetallePedido;
const Pedido = require('../database/models').Pedido;
const Bebida = require('../database/models').Bebida;
const ArticuloManufacturado = require('../database/models').ArticuloManufacturado;

//Devuelve todos los elementos
const getDetallePedido = async (req, res) => {
    try {
        let result = await DetallePedido.findAll({
            include: [{
                model: Pedido,
                required: true
            },
            {
                model: Bebida,
                required: false
            },
            {
                model: ArticuloManufacturado,
                required: false
            }]
        });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

//Inserta nuevo elemento
const createDetallePedido = async (req, res) => {
    let { cantidad, subtotal, articuloManufacturado_id, bebida_id, pedido_id } = req.body;
    try {
        //Se verifica que exista el Pedido
        let pedido = await Pedido.findByPk(pedido_id);
        if (!pedido) {
            res.send("No se encontro el pedido")
            return;
        }
        //Se verifica que exista la bebida
        let bebida = await Bebida.findByPk(bebida_id);
        if (!bebida) {
            res.send("No se encontro la bebida")
            return;
        }
        //Se verifica que exista el articulo manufacturado
        let artManuf = await ArticuloManufacturado.findByPk(articuloManufacturado_id);
        if (!artManuf) {
            res.send("No se encontro el articulo manufacturado")
            return;
        }
        //Se crea elemento
        let newDetallePedido = await DetallePedido.create({
            cantidad: cantidad,
            subtotal: subtotal,
            articuloManufacturado_id: articuloManufacturado_id,
            bebida_id: bebida_id,
            pedido_id: pedido_id
        })
        console.log(newDetallePedido);
        res.send("Se creo Detalle del pedido")
    } catch (error) {
        console.log(error.parent.sqlMessage);
        res.send({
            resultado: "No se pudo crear el detalle del pedido",
            error: error.parent.sqlMessage
        })
    }
}

//Elimina el elemento
const deleteDetallePedido = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        //Se busca el elemento
        let detallePedido = await DetallePedido.findByPk(idArt);
        if (!detallePedido) {
            res.send("No se encontro detalle pedido")
            return;
        }
        await detallePedido.destroy();
        res.send("Detalle pedido eliminado")
    } catch (error) {
        res.send(error);
    }
}

//Actualiza un elemento
const updateDetallePedido = async (req, res) => {
    try {
        let { cantidad, subtotal, articuloManufacturado_id, bebida_id, pedido_id } = req.body;
        let idArt = parseInt(req.params.id);
        //Se busca el elemento, si no existe, envia un mensaje
        let detallePedido = await DetallePedido.findByPk(idArt);
        if (!detallePedido) {
            res.send("No se encontro detalle pedido")
            return;
        }
        //Se verifica que exista el Pedido
        let pedido = await Pedido.findByPk(pedido_id);
        if (!pedido) {
            res.send("No se encontro el pedido")
            return;
        }
        //Se verifica que exista la bebida
        let bebida = await Bebida.findByPk(bebida_id);
        if (!bebida) {
            res.send("No se encontro la bebida")
            return;
        }
        //Se verifica que exista el articulo manufacturado
        let artManuf = await ArticuloManufacturado.findByPk(articuloManufacturado_id);
        if (!artManuf) {
            res.send("No se encontro el articulo manufacturado")
            return;
        }
        await DetallePedido.update({
            cantidad: cantidad,
            subtotal: subtotal,
            articuloManufacturado_id: articuloManufacturado_id,
            bebida_id: bebida_id,
            pedido_id: pedido_id
        }, {
            where: {
                id: idArt
            }
        });
        res.send("Se actualizo detalle pedido");
    } catch (error) {
        res.send(error);
    }
}

//Busca elemento por ID
const getDetallePedidoId = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        let detallePedido = await DetallePedido.findByPk(idArt, {
            include: [{
                model: Pedido,
                required: true
            },
            {
                model: Bebida,
                required: false
            },
            {
                model: ArticuloManufacturado,
                required: false
            }]
        });
        if (!detallePedido) {
            res.send("No se encontro detalle pedido")
            return;
        }
        res.send(detallePedido);
    } catch (error) {
        res.send(error);
    }
}

module.exports = { getDetallePedido, createDetallePedido, deleteDetallePedido, updateDetallePedido, getDetallePedidoId };
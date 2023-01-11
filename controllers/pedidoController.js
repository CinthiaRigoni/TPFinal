const Pedido = require('../database/models').Pedido;
const EstadoPedido = require('../database/models').EstadoPedido;
const Usuario = require('../database/models').Usuario;
const Domicilio = require('../database/models').Domicilio;
const MercadoPagoDatos = require('../database/models').MercadoPagoDatos;
const BajaLogica = require('../database/models').BajaLogica;

//Trae todos los pedidos
const getPedidos = async (req, res) => {
    try {
        let result = await Pedido.findAll({
            include: [{
                model: EstadoPedido,
                required: true,
                include: [{
                    model: BajaLogica,
                    required: true,
                    where: { bajaLogica: false }
                }]
            },
            {
                model: Usuario,
                required: true,
                include: [{
                    model: BajaLogica,
                    required: true,
                    where: { bajaLogica: false }
                }]
            },
            {
                model: Domicilio,
                required: true
            },
            {
                model: MercadoPagoDatos,
                required: true
            }]
        });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

//Crea un nuevo elemento
const createPedido = async (req, res) => {
    let { fecha, numero, estadoPedido_id, horaEstimadaFin, tipoEnvio, total, usuario_id, domicilio_id, mercadoPagoDatos_id } = req.body;
    try {
        //Verifica que exista un estadoPedido
        let estadoPedido = await EstadoPedido.findByPk(estadoPedido_id);
        if (!estadoPedido) {
            res.send("No se encontro estado pedido")
            return;
        }
        //Verifica que exista un usuario
        let usuario = await Usuario.findByPk(usuario_id);
        if (!usuario) {
            res.send("No se encontro usuario")
            return;
        }
        //Verifica que exista un domicilio
        let domicilio = await Domicilio.findByPk(domicilio_id);
        if (!domicilio) {
            res.send("No se encontro domicilio")
            return;
        }
        //Verifica que existan datos de MP
        let mpDatos = await MercadoPagoDatos.findByPk(mercadoPagoDatos_id);
        if (!mpDatos) {
            res.send("No se encontraron datos de MP")
            return;
        }
        //Se crea el elemento
        let newPedido = await Pedido.create({
            fecha: fecha,
            numero: numero,
            estadoPedido_id: estadoPedido_id,
            horaEstimadaFin: horaEstimadaFin,
            tipoEnvio: tipoEnvio,
            total: total,
            usuario_id: usuario_id,
            domicilio_id: domicilio_id,
            mercadoPagoDatos_id: mercadoPagoDatos_id
        });
        console.log(newPedido);
        res.send("Se creo Pedido");
    } catch (error) {
        console.log(error);
        res.send({
            resultado: "No se pudo crear el Pedido",
            error: error.parent.sqlMessage
        })
    }
}

//Elimina el elemento
const deletePedido = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        //Se busca el elemento
        let pedido = await Pedido.findByPk(idArt);
        if (!pedido) {
            res.send("No se encontro el pedido")
            return;
        }
        await pedido.destroy();
        res.send("Pedido eliminado")
    } catch (error) {
        res.send(error);
    }
}

//Actualiza un elemento
const updatePedido = async (req, res) => {
    try {
        let { fecha, numero, estadoPedido_id, horaEstimadaFin, tipoEnvio, total, usuario_id, domicilio_id, mercadoPagoDatos_id } = req.body;
        let idPed = parseInt(req.params.id);
        //Se busca el elemento, si no existe, envia un mensaje
        let pedido = await Pedido.findByPk(idPed);
        if (!pedido) {
            res.send("No se encontro Factura")
            return;
        }
        //Verifica que exista el estado del pedido
        let estadoPedido = await EstadoPedido.findByPk(estadoPedido_id);
        if (!estadoPedido) {
            res.send("No se encontro estado de pedido")
            return;
        }
        //Verifica que exista un usuario
        let usuario = await Usuario.findByPk(usuario_id);
        if (!usuario) {
            res.send("No se encontro usuario")
            return;
        }
        //Verifica que exista un domicilio
        let domicilio = await Domicilio.findByPk(domicilio_id);
        if (!domicilio) {
            res.send("No se encontro domicilio")
            return;
        }
        //Verifica que existan datos de MP
        let mpDatos = await MercadoPagoDatos.findByPk(mercadoPagoDatos_id);
        if (!mpDatos) {
            res.send("No se encontraron datos de MP")
            return;
        }
        await Pedido.update({
            fecha: fecha,
            numero: numero,
            estadoPedido: estadoPedido,
            horaEstimadaFin: horaEstimadaFin,
            tipoEnvio: tipoEnvio,
            total: total,
            usuario_id: usuario_id,
            domicilio_id: domicilio_id,
            mercadoPagoDatos_id: mercadoPagoDatos_id
        }, {
            where: {
                id: idPed
            }
        });
        res.send("Se actualizo Pedido");
    } catch (error) {
        res.send(error);
    }
}

//Busca elemento por ID
const getPedidoId = async (req, res) => {
    try {
        let idPed = parseInt(req.params.id);
        let pedido = await Pedido.findByPk(idPed, {
            include: [{
                model: EstadoPedido,
                required: true
            },
            {
                model: Usuario,
                required: true,
                include: [{
                    model: BajaLogica,
                    required: true,
                    where: { bajaLogica: false }
                }]
            },
            {
                model: Domicilio,
                required: true
            },
            {
                model: MercadoPagoDatos,
                required: true
            }]
        });
        if (!pedido) {
            res.send("No se encontro el pedido")
            return;
        }
        res.send(pedido);
    } catch (error) {
        res.send(error);
    }
}

module.exports = { getPedidos, createPedido, deletePedido, updatePedido, getPedidoId };
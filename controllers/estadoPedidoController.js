const EstadoPedido = require('../database/models').EstadoPedido;
const BajaLogica = require('../database/models').BajaLogica;

//Devuelve todos los elementos QUE ESTAN DE ALTA
const getEstadoPedido = async (req, res) => {
    try {
        let result = await EstadoPedido.findAll({
            include: {
                model: BajaLogica,
                required: true,
                where: { bajaLogica: false }
            }
        });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}
//Devuelve todos los elementos sin importar su BAJA LOGICA
const getAllEstadoPedido = async (req, res) => {
    try {
        let result = await EstadoPedido.findAll({
            include: {
                model: BajaLogica
            }
        });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

//Inserta nuevo elemento con su baja logica
const createEstadoPedido = async (req, res) => {
    let { nombreEstado } = req.body;
    try {
        //Se crea la baja lógica
        let newBajaLogica = await BajaLogica.create({
            bajaLogica: 0,
            fechaBaja: Date.now()
        })
        //Se crea elemento
        let newEstadoPedido = await EstadoPedido.create({
            nombreEstado: nombreEstado,
            bajaLogica_id: newBajaLogica.id
        })
        console.log(newEstadoPedido);
        res.send("Se creo Estado Pedido")
    } catch (error) {
        console.log(error.parent.sqlMessage);
        res.send({
            resultado: "No se pudo crear Estado Pedido",
            error: error.parent.sqlMessage
        })
    }
}

//Busca por id el elemento y lo marca como BAJA
const bajaEstadoPedido = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        //Se busca el elemento
        let estadoPedido = await EstadoPedido.findByPk(idArt);
        if (!estadoPedido) {
            res.send("No se encontro Estado Pedido")
            return;
        }
        //Se crea primero la baja lógica
        let newBajaLogica = await BajaLogica.create({
            bajaLogica: 1,
            fechaBaja: Date.now()
        })
        await EstadoPedido.update({ bajaLogica_id: newBajaLogica.id }, {
            where: {
                id: idArt
            }
        });
        res.send("Se dio baja al Estado Pedido")
    } catch (error) {
        res.send(error);
    }
}

//Actualiza un elemento
const updateEstadoPedido = async (req, res) => {
    try {
        let { nombreEstado } = req.body;
        let idArt = parseInt(req.params.id);
        //Se busca el elemento, si no existe, envia un mensaje
        let estadoPedido = await EstadoPedido.findByPk(idArt);
        if (!estadoPedido) {
            res.send("No se encontro Estado Pedido")
            return;
        }
        await EstadoPedido.update({
            nombreEstado: nombreEstado
        }, {
            where: {
                id: idArt
            }
        });
        res.send("Se actualizo Estado Pedido");
    } catch (error) {
        res.send(error);
    }
}

//Busca elemento por ID
const getEstadoPedidoId = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        let estadoPedido = await EstadoPedido.findByPk(idArt, {
            include: [{
                model: BajaLogica,
                required: true,
                where: { bajaLogica: false }
            }]
        });
        if (!estadoPedido) {
            res.send("No se encontro Estado Pedido")
            return;
        }
        res.send(estadoPedido);
    } catch (error) {
        res.send(error);
    }
}

//ELIMINA elemento
const deleteEstadoPedido = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        //Se busca el elemento
        let estadoPedido = await EstadoPedido.findByPk(idArt);
        if (!estadoPedido) {
            res.send("No se encontro el estado pedido")
            return;
        }
        await estadoPedido.destroy();
        res.send("estado pedido eliminado")
    } catch (error) {
        res.send(error);
    }
}

module.exports = { getEstadoPedido, getAllEstadoPedido, createEstadoPedido, deleteEstadoPedido, updateEstadoPedido, getEstadoPedidoId, bajaEstadoPedido };
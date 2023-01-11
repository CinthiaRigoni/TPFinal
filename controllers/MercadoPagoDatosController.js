const MercadoPagoDatos = require('../database/models').MercadoPagoDatos;
const Pago = require('../database/models').Pago;

//Crea un nuevo elemento
const createMPDatos = async (req, res) => {
    let { identificadorPago, fechaCreacion, metodoPago, estado } = req.body;
    try {
        let newMPDatos = await MercadoPagoDatos.create({
            identificadorPago: identificadorPago,
            fechaCreacion: fechaCreacion,
            metodoPago: metodoPago,
            estado: estado
        });
        console.log(newMPDatos);
        res.send("Se creo MPDatos");
    } catch (error) {
        console.log(error);
        res.send({
            resultado: "No se pudo crear MPDatos",
            error: error.parent.sqlMessage
        })
    }
}

//Trae todos los elementos
const getMPDatos = async (req, res) => {
    try {
        let result = await MercadoPagoDatos.findAll({
            include: {
                model: Pago,
                required: false
            }
        });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

//Elimina elemento por ID
const deleteMPDatos = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        //Busca el elemento
        let mpDatos = await MercadoPagoDatos.findByPk(idArt);
        if (!mpDatos) {
            res.send("No se encontró MPDatos")
            return
        }
        await mpDatos.destroy();
        res.send("MPDatps eliminado")
    } catch (error) {
        res.send(error);
    }
}

//Actualiza elemento por ID
const updateMPDatos = async (req, res) => {
    try {
        let { identificadorPago, fechaCreacion, metodoPago, estado } = req.body;
        let idArt = parseInt(req.params.id);
        //Busca el elemento por id
        let mpDatos = await MercadoPagoDatos.findByPk(idArt);
        if (!mpDatos) {
            res.send("No se encontró MPDatos")
            return;
        }
        await MercadoPagoDatos.update({
            identificadorPago: identificadorPago,
            fechaCreacion: fechaCreacion,
            metodoPago: metodoPago,
            estado: estado,
            where: {
                id: idArt
            }
        });
        res.send("Se actualizó MPDatos");
    } catch (error) {
        res.send(error);
    }
}

//Busca elemento por ID
const getMPDatosId = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        let mpDatos = await MercadoPagoDatos.findByPk(idArt, {
            include: {
                model: Pago,
                required: false
            }
        });
        if (!mpDatos) {
            res.send("No se encontro MPDatos");
            return
        }
        res.send(mpDatos);
    } catch (error) {
        res.send(error)
    }
}

module.exports = { createMPDatos, getMPDatos, getMPDatosId, updateMPDatos, deleteMPDatos };
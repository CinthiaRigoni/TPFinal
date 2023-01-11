const Bebida = require('../database/models').Bebida;
const BajaLogica = require('../database/models').BajaLogica;

//Devuelve todas las bebidas QUE ESTAN DE ALTA
const getBebidas = async (req, res) => {
    try {
        let result = await Bebida.findAll({
            include: {
                model: BajaLogica,
                required: true,
                where: { bajaLogica: false }
            },
        });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

const getAllBebidas = async (req, res) => {
    try {
        let result = await Bebida.findAll({
            include: {
                model: BajaLogica,
            },
        });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

//Inserta nueva bebida con su baja logica
const createBebidas = async (req, res) => {
    let { nombreBebida, precioCompra, precioVenta, stockActual, unidadMedida } = req.body;
    try {
        //Se crea primero la baja lógica
        let newBajaLogica = await BajaLogica.create({
            bajaLogica: 0,
            fechaBaja: Date.now()
        })
        //Se crea bebida
        let newBebida = await Bebida.create({
            nombreBebida: nombreBebida,
            precioCompra: precioCompra,
            precioVenta: precioVenta,
            stockActual: stockActual,
            unidadMedida: unidadMedida,
            bajaLogica_id: newBajaLogica.id
        })
        console.log(newBebida);
        res.send("Se creo bebida")
    } catch (error) {
        console.log(error.parent.sqlMessage);
        res.send({
            resultado: "No se pudo crear bebida",
            error: error.parent.sqlMessage
        })
    }
}

//Busca por id la bebida y lo marca como BAJA
const bajaBebidas = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        //Se busca la bebida
        let bebida = await Bebida.findByPk(idArt);
        if (!bebida) {
            res.send("No se encontro bebida")
            return;
        }
        //Se crea primero la baja lógica
        let newBajaLogica = await BajaLogica.create({
            bajaLogica: 1,
            fechaBaja: Date.now()
        })
        await Bebida.update({ bajaLogica_id: newBajaLogica.id }, {
            where: {
                id: idArt
            }
        });
        res.send("Se dio baja a bebida")
    } catch (error) {
        res.send(error);
    }
}

//Actualiza una bebida
const updateBebidas = async (req, res) => {
    try {
        let { nombreBebida, precioCompra, precioVenta, stockActual, unidadMedida } = req.body;
        let idArt = parseInt(req.params.id);
        //Se busca la bebida, si no existe, envia un mensaje
        let bebida = await Bebida.findByPk(idArt);
        if (!bebida) {
            res.send("No se encontro bebida")
            return;
        }
        await Bebida.update({
            nombreBebida: nombreBebida,
            precioCompra: precioCompra,
            precioVenta: precioVenta,
            stockActual: stockActual,
            unidadMedida: unidadMedida
        }, {
            where: {
                id: idArt
            }
        });
        res.send("Se actualizo bebida");
    } catch (error) {
        res.send(error);
    }
}

//Busca bebida por ID
const getBebidasId = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        let bebida = await Bebida.findByPk(idArt, {
            include: {
                model: BajaLogica,
                required: true,
                where: { bajaLogica: false }
            }
        });
        if (!bebida) {
            res.send("No se encontro bebida")
            return;
        }
        res.send(bebida);
    } catch (error) {
        res.send(error);
    }
}

//ELIMINA elemento
const deleteBebidas = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        //Se busca el elemento
        let bebida = await Bebida.findByPk(idArt);
        if (!bebida) {
            res.send("No se encontro la bebida")
            return;
        }
        await bebida.destroy();
        res.send("bebida eliminada")
    } catch (error) {
        res.send(error);
    }
}

module.exports = { getBebidas, getAllBebidas, createBebidas, deleteBebidas, updateBebidas, getBebidasId, bajaBebidas };
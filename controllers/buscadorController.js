const Bebida = require('../database/models').Bebida;
const ArticuloManufacturado = require('../database/models').ArticuloManufacturado;
const BajaLogica = require('../database/models').BajaLogica;
const Sequelize = require('sequelize');

//Operador by Sequelize
const Op = Sequelize.Op;

const buscarBebida = async (req, res) => {
    let { busca } = req.body;
    try {
        let result = await Bebida.findAll({
            include: {
                model: BajaLogica,
                required: true,
                where: { bajaLogica: false }
            },
            where: { nombreBebida: { [Op.like]: `%${busca}%` } }
        })
        res.send(result);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

const buscarArtManuf = async (req, res) => {
    let { busca } = req.body;
    try {
        let result = await ArticuloManufacturado.findAll({
            include: {
                model: BajaLogica,
                required: true,
                where: { bajaLogica: false }
            },
            where: { denominacion: { [Op.like]: `%${busca}%` } }
        })
        res.send(result);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { buscarBebida, buscarArtManuf };
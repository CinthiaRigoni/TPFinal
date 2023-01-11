const ArticuloManufacturadoDetalle = require('../database/models').ArticuloManufacturadoDetalle;
const ArticuloInsumo = require('../database/models').ArticuloInsumo;
const ArticuloManufacturado = require('../database/models').ArticuloManufacturado;
const BajaLogica = require('../database/models').BajaLogica;

//Devuelve todas los elementos QUE ESTAN DE ALTA
const getArticulos = async (req, res) => {
    try {
        let result = await ArticuloManufacturadoDetalle.findAll({
            include: [{
                model: BajaLogica,
                where: { bajaLogica: false }
            }, {
                model: ArticuloInsumo,
                required: true
            }, {
                model: ArticuloManufacturado,
                required: true
            }]
        });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

const getAllArticulos = async (req, res) => {
    try {
        let result = await ArticuloManufacturadoDetalle.findAll({
            include: [{
                model: BajaLogica
            }, {
                model: ArticuloInsumo,
                required: true
            }, {
                model: ArticuloManufacturado,
                required: true
            }]
        });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

//Inserta nuevo elemento con su baja logica
const createArticulo = async (req, res) => {
    let { cantidad, unidadMedida, articuloInsumo_id, articuloManufacturado_id } = req.body;
    try {
        //Se verifica que exista el Articulo Manufacturado
        let artManuf = await ArticuloManufacturado.findByPk(articuloManufacturado_id);
        if (!artManuf) {
            res.send("No se encontro Articulo Manufacturado")
            return;
        }
        //Se verifica que exista el Articulo Insumo
        let artInsumo = await ArticuloInsumo.findByPk(articuloInsumo_id);
        if (!artInsumo) {
            res.send("No se encontro Articulo Insumo")
            return;
        }
        //Se crea la baja lógica
        let newBajaLogica = await BajaLogica.create({
            bajaLogica: 0,
            fechaBaja: Date.now()
        })
        //Se crea elemento
        let newArtManufacDetalle = await ArticuloManufacturadoDetalle.create({
            cantidad: cantidad,
            unidadMedida: unidadMedida,
            articuloInsumo_id: articuloInsumo_id,
            articuloManufacturado_id: articuloManufacturado_id,
            bajaLogica_id: newBajaLogica.id
        })
        console.log(newArtManufacDetalle);
        res.send("Se creo Detalle de Articulo Manufacturado")
    } catch (error) {
        console.log(error.parent.sqlMessage);
        res.send({
            resultado: "No se pudo crear Detalle de Articulo Manufacturado",
            error: error.parent.sqlMessage
        })
    }
}

//Busca por id el elemento y lo marca como BAJA
const bajaArticulo = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        //Se busca el elemento
        let artManufDetalle = await ArticuloManufacturadoDetalle.findByPk(idArt);
        if (!artManufDetalle) {
            res.send("No se encontro Articulo Manufacturado Detalle")
            return;
        }
        //Se crea primero la baja lógica
        let newBajaLogica = await BajaLogica.create({
            bajaLogica: 1,
            fechaBaja: Date.now()
        })
        await ArticuloManufacturadoDetalle.update({ bajaLogica_id: newBajaLogica.id }, {
            where: {
                id: idArt
            }
        });
        res.send("Se dio baja al Articulo Manufacturado Detalle")
    } catch (error) {
        res.send(error);
    }
}

//Actualiza un elemento
const updateArticulo = async (req, res) => {
    try {
        let { cantidad, unidadMedida, articuloInsumo_id, articuloManufacturado_id, } = req.body;
        let idArt = parseInt(req.params.id);
        //Se busca el elemento, si no existe, envia un mensaje
        let artManufDetalle = await ArticuloManufacturadoDetalle.findByPk(idArt);
        if (!artManufDetalle) {
            res.send("No se encontro Articulo Manufacturado Detalle")
            return;
        }
        //Se verifica que exista el Articulo Manufacturado
        let artManuf = await ArticuloManufacturado.findByPk(articuloManufacturado_id);
        if (!artManuf) {
            res.send("No se encontro Articulo Manufacturado")
            return;
        }
        //Se verifica que exista el Articulo Insumo
        let artInsumo = await ArticuloInsumo.findByPk(articuloInsumo_id);
        if (!artInsumo) {
            res.send("No se encontro Articulo Insumo")
            return;
        }
        await ArticuloManufacturadoDetalle.update({
            cantidad: cantidad,
            unidadMedida: unidadMedida,
            articuloInsumo_id: articuloInsumo_id,
            articuloManufacturado_id: articuloManufacturado_id
        }, {
            where: {
                id: idArt
            }
        });
        res.send("Se actualizo Articulo Manufacturado Detalle");
    } catch (error) {
        res.send(error);
    }
}

//Busca elemento por ID
const getArticuloId = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        let artManufDetalle = await ArticuloManufacturadoDetalle.findByPk(idArt, {
            include: [{
                model: BajaLogica,
                where: { bajaLogica: false }
            }, {
                model: ArticuloInsumo,
                required: true
            }, {
                model: ArticuloManufacturado,
                required: true
            }]
        });
        if (!artManufDetalle) {
            res.send("No se encontro Articulo Manufacturado Detalle")
            return;
        }
        res.send(artManufDetalle);
    } catch (error) {
        res.send(error);
    }
}

//ELIMINA elemento
const deleteArticulo = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        //Se busca el elemento
        let articuloManufDetalle = await ArticuloManufacturadoDetalle.findByPk(idArt);
        if (!articuloManufDetalle) {
            res.send("No se encontro el articulo")
            return;
        }
        await articuloManufDetalle.destroy();
        res.send("articulo eliminado")
    } catch (error) {
        res.send(error);
    }
}

module.exports = { getArticulos, getAllArticulos, createArticulo, deleteArticulo, updateArticulo, getArticuloId, bajaArticulo };
const ArticuloInsumo = require('../database/models').ArticuloInsumo;
const RubroInsumo = require('../database/models').RubroInsumo;
const BajaLogica = require('../database/models').BajaLogica;

//Devuelve todas los elementos QUE ESTAN DE ALTA
const getArticulos = async (req, res) => {
    try {
        let result = await ArticuloInsumo.findAll({
            include: [{
                model: BajaLogica,
                required: true,
                where: { bajaLogica: false }
            }, {
                model: RubroInsumo,
                //Devuelve el elemento aunque no tenga asignado RubroInsumo
                required: false,
                include: [{
                    model: BajaLogica,
                    required: true,
                    where: { bajaLogica: false }
                }]
            }]
        });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

const getAllArticulos = async (req, res) => {
    try {
        let result = await ArticuloInsumo.findAll({
            include: [{
                model: BajaLogica
            }, {
                model: RubroInsumo,
                //Devuelve el elemento aunque no tenga asignado RubroInsumo
                required: false,
                include: [{
                    model: BajaLogica,
                    required: true,
                    where: { bajaLogica: false }
                }]
            }]
        });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

//Inserta nuevo elemento con su baja logica
const createArticulo = async (req, res) => {
    let { denominacion, precioCompra, precioVenta, stockActual, stockMinimo, unidadMedida, esInsumo, rubroInsumo_id } = req.body;
    try {
        //Se verifica que exista el Rubro Insumo
        let rubro = await RubroInsumo.findByPk(rubroInsumo_id);
        if (!rubro) {
            res.send("No se encontro rubro")
            return;
        }
        //Se crea la baja lógica
        let newBajaLogica = await BajaLogica.create({
            bajaLogica: 0,
            fechaBaja: Date.now()
        })
        //Se crea elemento
        let newArticuloInsumo = await ArticuloInsumo.create({
            denominacion: denominacion,
            precioCompra: precioCompra,
            precioVenta: precioVenta,
            stockActual: stockActual,
            stockMinimo: stockMinimo,
            unidadMedida: unidadMedida,
            esInsumo: esInsumo,
            rubroInsumo_id: rubroInsumo_id,
            bajaLogica_id: newBajaLogica.id
        })
        console.log(newArticuloInsumo);
        res.send("Se creo Articulo insumo")
    } catch (error) {
        console.log(error.parent.sqlMessage);
        res.send({
            resultado: "No se pudo crear Articulo Insumo",
            error: error.parent.sqlMessage
        })
    }
}

//Busca por id el elemento y lo marca como BAJA
const bajaArticulo = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        //Se busca el elemento
        let articuloInsumo = await ArticuloInsumo.findByPk(idArt);
        if (!articuloInsumo) {
            res.send("No se encontro Articulo Insumo")
            return;
        }
        //Se crea primero la baja lógica
        let newBajaLogica = await BajaLogica.create({
            bajaLogica: 1,
            fechaBaja: Date.now()
        })
        await ArticuloInsumo.update({ bajaLogica_id: newBajaLogica.id }, {
            where: {
                id: idArt
            }
        });
        res.send("Se dio baja al Articulo")
    } catch (error) {
        res.send(error);
    }
}

//Actualiza un elemento
const updateArticulo = async (req, res) => {
    try {
        let { denominacion, precioCompra, precioVenta, stockActual, stockMinimo, unidadMedida, esInsumo, rubroInsumo_id } = req.body;
        let idArt = parseInt(req.params.id);
        //Se busca el elemento, si no existe, envia un mensaje
        let articuloInsumo = await ArticuloInsumo.findByPk(idArt);
        if (!articuloInsumo) {
            res.send("No se encontro Articulo")
            return;
        }
        //Se verifica que exista el Rubro Insumo
        let rubro = await RubroInsumo.findByPk(rubroInsumo_id);
        if (!rubro) {
            res.send("No se encontro rubro")
            return;
        }
        await ArticuloInsumo.update({
            denominacion: denominacion,
            precioCompra: precioCompra,
            precioVenta: precioVenta,
            stockActual: stockActual,
            stockMinimo: stockMinimo,
            unidadMedida: unidadMedida,
            esInsumo: esInsumo,
            rubroInsumo_id: rubroInsumo_id
        }, {
            where: {
                id: idArt
            }
        });
        res.send("Se actualizo Articulo Insumo");
    } catch (error) {
        res.send(error);
    }
}

//Busca elemento por ID
const getArticuloId = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        let articuloInsumo = await ArticuloInsumo.findByPk(idArt, {
            include: [{
                model: BajaLogica,
                required: true,
                where: { bajaLogica: false }
            }, {
                model: RubroInsumo,
                //Devuelve el elemento aunque no tenga asignado RubroInsumo
                required: false,
                include: [{
                    model: BajaLogica,
                    required: true,
                    where: { bajaLogica: false }
                }]
            }]
        });
        if (!articuloInsumo) {
            res.send("No se encontro Articulo Insumo")
            return;
        }
        res.send(articuloInsumo);
    } catch (error) {
        res.send(error);
    }
}

//ELIMINA elemento
const deleteArticulo = async(req,res) => {
    try{
        let idArt = parseInt(req.params.id);
        //Se busca el elemento
        let articuloInsumo = await ArticuloInsumo.findByPk(idArt);
        if(!articuloInsumo){
            res.send("No se encontro el articulo")
            return;
        }
        await articuloInsumo.destroy();
        res.send("articulo eliminado")
    }catch(error){
        res.send(error);
    }
}

module.exports = { getArticulos, getAllArticulos, createArticulo, deleteArticulo, updateArticulo, getArticuloId, bajaArticulo };
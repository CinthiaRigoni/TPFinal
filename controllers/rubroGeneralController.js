const RubroGeneral = require('../database/models').RubroGeneral;
const BajaLogica = require('../database/models').BajaLogica;

//Devuelve todos los Rubros QUE ESTAN DE ALTA
const getRubros = async (req, res) => {
    try {
        let result = await RubroGeneral.findAll({
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

//Devuelve todos los rubros sin importar la Baja Logica
const getAllRubros = async (req, res) => {
    try {
        let result = await RubroGeneral.findAll({
            include: {
                model: BajaLogica,
            },
        });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

const createRubros = async (req, res) => {
    let { denominacion } = req.body
    try {
        //Se crea primero la baja lógica
        let newBajaLogica = await BajaLogica.create({
            bajaLogica: 0,
            fechaBaja: Date.now()
        })
        //Se crea Rubro
        let newRubro = await RubroGeneral.create({
            denominacion: denominacion,
            bajaLogica_id: newBajaLogica.id
        })
        console.log(newRubro);
        res.send("Se creo Rubro General")
    } catch (error) {
        console.log(error.parent.sqlMessage);
        res.send({
            resultado: "No se pudo crear rubro general",
            error: error.parent.sqlMessage
        })
    }
}

//Busca por id el rubro y lo marca como BAJA
const bajaRubros = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        //Se busca el rubro
        let rubro = await RubroGeneral.findByPk(idArt);
        if (!rubro) {
            res.send("No se encontro rubro general")
            return;
        }
        //Se crea primero la baja lógica
        let newBajaLogica = await BajaLogica.create({
            bajaLogica: 1,
            fechaBaja: Date.now()
        })
        await RubroGeneral.update({ bajaLogica_id: newBajaLogica.id }, {
            where: {
                id: idArt
            }
        });
        res.send("Se dio baja al rubro general")
    } catch (error) {
        res.send(error);
    }
}

const updateRubros = async (req, res) => {
    try {
        let { denominacion } = req.body
        let idArt = parseInt(req.params.id);
        //Se busca el rubro
        let rubro = await RubroGeneral.findByPk(idArt);
        if (!rubro) {
            res.send("No se encontro rubro general")
            return;
        }
        await RubroGeneral.update({
            denominacion: denominacion
        }, {
            where: {
                id: idArt
            }
        });
        res.send("Se actualizo Rubro general");
    } catch (error) {
        res.send(error);
    }
}

const getRubrosId = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        let rubro = await RubroGeneral.findByPk(idArt, {
            include: {
                model: BajaLogica,
                required: true,
                where: { bajaLogica: false }
            }
        });
        if (!rubro) {
            res.send("No se encontro rubro")
            return;
        }
        res.send(rubro);
    } catch (error) {
        res.send(error);
    }
}

//ELIMINA elemento
const deleteRubros = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        //Se busca el elemento
        let rubro = await RubroGeneral.findByPk(idArt);
        if (!rubro) {
            res.send("No se encontro el rubro general")
            return;
        }
        await rubro.destroy();
        res.send("rubro general eliminado")
    } catch (error) {
        res.send(error);
    }
}

module.exports = { getRubros, getAllRubros, createRubros, deleteRubros, updateRubros, getRubrosId, bajaRubros };
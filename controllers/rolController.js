const Rol = require('../database/models').Rol;
const BajaLogica = require('../database/models').BajaLogica;

//Devuelve todos los Roles QUE ESTAN DE ALTA
const getRoles = async (req, res) => {
    try {
        let rol = await Rol.findAll({
            include: {
                model: BajaLogica,
                required: true,
                where: { bajaLogica: false }
            },
        });
        res.send(rol);
    } catch (error) {
        console.log(error);
    }
}

//Devuelve todos los roles
const getAllRoles = async (req, res) => {
    try {
        let result = await Rol.findAll({
            include: {
                model: BajaLogica,
            },
        });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

const createRoles = async (req, res) => {
    let { nombreRol } = req.body;
    try {
        //Se crea primero la baja lógica
        let newBajaLogica = await BajaLogica.create({
            bajaLogica: 0,
            fechaBaja: Date.now()
        })
        //Se crea rol
        let newRol = await Rol.create({
            nombreRol: nombreRol,
            bajaLogica_id: newBajaLogica.id
        })
        console.log(newRol);
        res.send("Se creo rol")
    } catch (error) {
        console.log(error.parent.sqlMessage);
        res.send({
            resultado: "No se pudo crear rol",
            error: error.parent.sqlMessage
        })
    }
}

//Busca por id el rol y lo marca como BAJA
const bajaRoles = async (req, res) => {
    try {
        let idRol = parseInt(req.params.id);
        //Se busca el rol
        let rol = await Rol.findByPk(idRol);
        if (!rol) {
            res.send("No se encontro rol")
            return;
        }
        //Se crea primero la baja lógica
        let newBajaLogica = await BajaLogica.create({
            bajaLogica: 1,
            fechaBaja: Date.now()
        })
        await Rol.update({ bajaLogica_id: newBajaLogica.id }, {
            where: {
                id: idRol
            }
        });
        res.send("Se dio baja el rol")
    } catch (error) {
        res.send(error);
    }
}

const updateRoles = async (req, res) => {
    try {
        let { nombreRol } = req.body
        let idRol = parseInt(req.params.id);
        //Se busca el rubro
        let rol = await Rol.findByPk(idRol);
        if (!rol) {
            res.send("No se encontro rol")
            return;
        }
        await Rol.update({
            nombreRol: nombreRol
        }, {
            where: {
                id: idRol
            }
        });
        res.send("Se actualizo rol");
    } catch (error) {
        res.send(error);
    }
}

//Busca rol por id
const getRolesId = async (req, res) => {
    try {
        let idRol = parseInt(req.params.id);
        let rol = await Rol.findByPk(idRol, {
            include: {
                model: BajaLogica,
                required: true,
                where: { bajaLogica: false }
            }
        });
        if (!rol) {
            res.send("No se encontro rol")
            return;
        }
        res.send(rol);
    } catch (error) {
        res.send(error);
    }
}

//ELIMINA elemento
const deleteRoles = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        //Se busca el elemento
        let rol = await Rol.findByPk(idArt);
        if (!rol) {
            res.send("No se encontro el rol")
            return;
        }
        await rol.destroy();
        res.send("rol eliminado")
    } catch (error) {
        res.send(error);
    }
}

module.exports = { getRoles, getAllRoles, createRoles, deleteRoles, updateRoles, getRolesId, bajaRoles };
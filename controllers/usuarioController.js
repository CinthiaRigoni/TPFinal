const bcryptjs = require('bcryptjs');
const Rol = require('../database/models').Rol;
const Usuario = require('../database/models').Usuario;
const BajaLogica = require('../database/models').BajaLogica;

//EL INGRESO DE UN USUARIO NUEVO SE DEBE HACER DESDE EL CONTROLADOR "AUTHCONTROLLER"

//Devuelve todas los elementos QUE ESTAN DE ALTA
const getUsuarios = async (req, res) => {
    try {
        let result = await Usuario.findAll({
            include: [{
                model: BajaLogica,
                required: true,
                where: { bajaLogica: false }
            }, {
                model: Rol,
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

const getAllUsuarios = async (req, res) => {
    try {
        let result = await Usuario.findAll({
            include: [{
                model: BajaLogica
            }, {
                model: Rol,
                //Devuelve el elemento aunque no tenga asignado Usuario
                required: false
            }]
        });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

//Inserta nuevo elemento con su baja logica
const createUsuario = async (req, res) => {
    let { usuario, clave, rol_id, nombre, apellido, telefono, email } = req.body;
    try {
        let user = await Usuario.findOne({ where: { usuario: usuario } });
        if (user) {
            res.send("Ya existe el usuario, ingrese otro")
            return;
        }
        //Verifica que el email no haya sido registrado aun
        let mail = await Usuario.findOne({ where: { email: email } });
        if (mail) {
            res.send("Ya existe una cuenta con ese correo")
            return;
        }
        //Se verifica que exista el Rol
        let rol = await Rol.findByPk(rol_id);
        if (!rol) {
            res.send("No se encontro rol")
            return;
        }
        //Se encripta la clave
        let passHash = await bcryptjs.hash(clave, 8)
        //Se crea la baja lógica
        let newBajaLogica = await BajaLogica.create({
            bajaLogica: 0,
            fechaBaja: Date.now()
        })
        //Se crea elemento
        let newUsuario = await Usuario.create({
            usuario: usuario,
            clave: passHash,
            rol_id: rol_id,
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            email: email,
            bajaLogica_id: newBajaLogica.id
        })
        console.log(newUsuario);
        res.send("Se creo Usuario")
    } catch (error) {
        console.log(error);
        res.send({
            resultado: "No se pudo crear Usuario",
            error: error
        })
    }
}

//Busca por id el elemento y lo marca como BAJA
const bajaUsuario = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        //Se busca el elemento
        let usuario = await Usuario.findByPk(idArt);
        if (!usuario) {
            res.send("No se encontro Usuario")
            return;
        }
        //Se crea primero la baja lógica
        let newBajaLogica = await BajaLogica.create({
            bajaLogica: 1,
            fechaBaja: Date.now()
        })
        await Usuario.update({ bajaLogica_id: newBajaLogica.id }, {
            where: {
                id: idArt
            }
        });
        res.send("Se dio baja al Usuario")
    } catch (error) {
        res.send(error);
    }
}

//Actualiza un elemento
const updateUsuario = async (req, res) => {
    try {
        let { usuario, clave, rol_id, nombre, apellido, telefono, email } = req.body;
        let idArt = parseInt(req.params.id);
        //Se busca el elemento, si no existe, envia un mensaje
        let user = await Usuario.findByPk(idArt);
        if (!user) {
            res.send("No se encontro Usuario a modificar")
            return;
        }
        //Se verifica que exista el Rol
        let rol = await Rol.findByPk(rol_id);
        if (!rol) {
            res.send("No se encontro rol")
            return;
        }
        //Se encripta la clave
        let passHash = await bcryptjs.hash(clave, 8)
        //Actualiza el elemento
        await Usuario.update({
            usuario: usuario,
            clave: passHash,
            rol_id: rol_id,
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            email: email
        }, {
            where: {
                id: idArt
            }
        });
        res.send("Se actualizo Usuario");
    } catch (error) {
        res.send(error);
    }
}

//Busca elemento por ID
const getUsuarioId = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        let usuario = await Usuario.findByPk(idArt, {
            include: [{
                model: BajaLogica,
                required: true,
                where: { bajaLogica: false }
            }, {
                model: Rol,
                //Devuelve el elemento aunque no tenga asignado Usuario
                required: false,
                include: [{
                    model: BajaLogica,
                    required: true,
                    where: { bajaLogica: false }
                }]
            }]
        });
        if (!usuario) {
            res.send("No se encontro Usuario")
            return;
        }
        res.send(usuario);
    } catch (error) {
        res.send(error);
    }
}

//ELIMINA elemento
const deleteUsuario = async (req, res) => {
    try {
        let idArt = parseInt(req.params.id);
        //Se busca el elemento
        let usuario = await Usuario.findByPk(idArt);
        if (!usuario) {
            res.send("No se encontro el usuario")
            return;
        }
        await usuario.destroy();
        res.send("usuario eliminado")
    } catch (error) {
        res.send(error);
    }
}

module.exports = { getUsuarios, getAllUsuarios, createUsuario, deleteUsuario, updateUsuario, getUsuarioId, bajaUsuario };
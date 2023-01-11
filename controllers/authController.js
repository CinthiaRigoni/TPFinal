const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const Usuario = require('../database/models').Usuario;
const BajaLogica = require('../database/models').BajaLogica;


const registrar = async (req, res) => {
    try {
        let { usuario, clave, nombre, apellido, telefono, email } = req.body;
        //Verifica que el usuario no exista
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
            rol_id: 1,
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
            resultado: "No se pudo crear Usuario"
        })
    }
}

const ingresar = async (req, res) => {
    try {
        let { usuario, clave } = req.body;
        let user = await Usuario.findOne({ where: { usuario: usuario } });
        //Se verifica que exista el usuario
        if (!user || !(await bcryptjs.compare(clave, user.clave))) {
            res.status(400).json({ errors: "Usuario y/o Clave incorrectos" });
            return;
        } else {
            const id = user.id;
            const token = jwt.sign({ id: id }, process.env.JWT_KEY);
            res.cookie('jwt', token);
            res.send({ mensaje: "Autenticacion correcta", ayuda: token });
        }
    } catch (error) {
        console.log(error);
        res.send({
            resultado: "No se pudo ingresar"
        })
    }
}

const authEstandar = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ error: 'Acceso denegado' });
    try {
        const verified = jwt.verify(token, process.env.JWT_KEY)
        req.usuario = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token no es válido' })
    }
}

const authAdmin = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ error: 'Acceso denegado' });
    try {
        const verified = jwt.verify(token, process.env.JWT_KEY)
        req.usuario = verified;
        let usuario = await Usuario.findByPk(verified.id);
        if (usuario.rol_id != 1) {
            return res.status(401).json({ error: 'Acceso denegado' });
        }
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token no es válido' })
    }
}

module.exports = { registrar, ingresar, authEstandar, authAdmin };
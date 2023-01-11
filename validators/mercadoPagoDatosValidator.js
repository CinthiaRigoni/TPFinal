const { body, validationResult } = require('express-validator');

exports.validator = [
    body('fechaCreacion')
        .isDate()
        .withMessage('fechaCreacion debe ser de tipo DATE')
        .bail()
        .notEmpty()
        .withMessage('fechaCreacion Vacio')
        .bail(),

    body('identificadorPago')
        .isNumeric()
        .withMessage('Id Pago debe ser numero')
        .bail()
        .notEmpty()
        .withMessage('Id Pago Vacio')
        .bail(),

    body('metodoPago').custom((value) => {
        return value.match(/^[A-Za-z 0-9]+$/);
    })
        .withMessage('Metodo pago solo puede contener letras y numeros')
        .bail()
        .notEmpty()
        .withMessage('Campo Metodo pago vacio')
        .bail(),

    body('estado').custom((value) => {
        return value.match(/^[A-Za-z 0-9]+$/);
    })
        .withMessage('Estado solo puede contener letras y numeros')
        .bail()
        .notEmpty()
        .withMessage('Campo estado vacio')
        .bail(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next()
    }
]
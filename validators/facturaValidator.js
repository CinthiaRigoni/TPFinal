const { body, validationResult } = require('express-validator');

exports.validator = [
    body('fecha')
        .isDate()
        .withMessage('fecha debe ser de tipo DATE')
        .bail()
        .notEmpty()
        .withMessage('fecha Vacio')
        .bail(),

    body('numero')
        .isNumeric()
        .withMessage('Numero debe ser numero')
        .bail()
        .notEmpty()
        .withMessage('Campo Numero Vacio')
        .bail(),

    body('montoDescuento')
        .isDecimal()
        .withMessage('Monto descuento debe ser Decimal')
        .bail(),

    body('formaPago').custom((value) => {
        return value.match(/^[A-Za-z 0-9]+$/);
    })
        .withMessage('Forma de pago solo puede contener letras y numeros')
        .bail()
        .notEmpty()
        .withMessage('Campo Forma de pago vacio')
        .bail(),

    body('nroTarjeta')
        .isNumeric()
        .withMessage('Numero tarjeta debe ser numero')
        .bail()
        .notEmpty()
        .withMessage('Campo Numero tarjeta Vacio')
        .bail(),

    body('totalVenta')
        .isDecimal()
        .withMessage('Total Venta debe ser Decimal')
        .bail()
        .notEmpty()
        .withMessage('Total Venta vacio')
        .bail(),

    body('totalCosto')
        .isDecimal()
        .withMessage('Total costo debe ser Decimal')
        .bail()
        .notEmpty()
        .withMessage('Total costo vacio')
        .bail(),

    body('pedido_id')
        .isNumeric()
        .withMessage('pedido_id debe ser numero')
        .bail()
        .notEmpty()
        .withMessage('Campo Vacio')
        .bail(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next()
    }
]
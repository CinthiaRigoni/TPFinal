const {body, validationResult} = require('express-validator');

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

    body('tipoEnvio').custom((value) => {
            return value.match(/^[A-Za-z 0-9]+$/);
        })
        .withMessage('Tipo de envio solo puede contener letras y numeros')
        .bail()
        .notEmpty()
        .withMessage('Campo tipo de envio vacio')
        .bail(),

    body('total')
        .isDecimal()
        .withMessage('Total debe ser Decimal')
        .bail()
        .notEmpty()
        .withMessage('Total vacio')
        .bail(),

    body('horaEstimadaFin').custom((value) => {
            return value.match(/^[A-Za-z 0-9]+$/);
        })
        .withMessage('Hora estimada fin solo puede contener letras y numeros')
        .bail()
        .notEmpty()
        .withMessage('Campo hora estimada fin vacio')
        .bail(),

    body('estadoPedido_id')
        .isNumeric()
        .withMessage('EstadoPedido_id debe ser numero')
        .bail()
        .notEmpty()
        .withMessage('Campo Vacio')
        .bail(),
    
    body('usuario_id')
        .isNumeric()
        .withMessage('usuario_id debe ser numero')
        .bail()
        .notEmpty()
        .withMessage('Campo Vacio')
        .bail(),

    body('domicilio_id')
        .isNumeric()
        .withMessage('domicilio_id debe ser numero')
        .bail()
        .notEmpty()
        .withMessage('Campo Vacio')
        .bail(),

    body('mercadoPagoDatos_id')
        .isNumeric()
        .withMessage('mercadoPagoDatos_id debe ser numero')
        .bail()
        .notEmpty()
        .withMessage('Campo Vacio')
        .bail(),
]
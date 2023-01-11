const { body, validationResult } = require('express-validator');

exports.validator = [
    body('title').custom((value) => {
        return value.match(/^[A-Za-z0-9]+$/)
    })
        .withMessage('Title debe contener solo letras y numeros')
        .bail()
        .notEmpty()
        .withMessage('Campo Title vacio')
        .bail(),

    body('description').custom((value) => {
        return value.match(/^[A-Za-z 0-9]+$/);
    })
        .withMessage("Description debe contener solo letras y numeros")
        .bail()
        .notEmpty()
        .withMessage("Campo vacio")
        .bail(),

    body('unitPrice').isNumeric()
        .withMessage('Unit price debe ser Decimal')
        .bail()
        .notEmpty()
        .withMessage('Unit price vacio')
        .bail(),

    body('quantity')
        .isNumeric()
        .withMessage('Quantity debe ser numero')
        .bail()
        .notEmpty()
        .withMessage('Campo Quantity Vacio')
        .bail(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next()
    }
]
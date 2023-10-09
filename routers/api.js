const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const {check} = require('express-validator');
const {
    validarInfo,
    habitacionExiste,
    verificarDisponibilidad
} = require ('../middlewares/validators')


router.get('/hotel', apiController.getApi);

router.post('/hotel', 
    [
        check("habitación", "El número de la habitación es obligatorio y debe expresarse en números").not().isEmpty().isInt(),
        check("categoría", "Debe ingresar una categoría").notEmpty().isString(),
        check("precio", "Debe agregar el precio de la habitación expresado en USD").notEmpty().isString(),
        check("descripción", "Debe ingresar una descripción de la habitación").notEmpty().isString(),
        check("maxCapacidad", "Debe ingresar la capacidad máxima de la habitación expresada en números").notEmpty().isInt(),
        check("habitación").custom(habitacionExiste), 
        validarInfo,
    ],
    apiController.postApi);

router.put('/:id', 
    [
        check("precio", "Debe agregar el precio de la habitación expresado en USD").optional().isString(),
        check("descripción", "Debe ingresar una descripción de la habitación").optional().isString(),
        check("maxCapacidad", "Debe ingresar la capacidad máxima de la habitación expresada en números").optional().isInt(),
        check("id", "No es un ID válido").isMongoId(),
        verificarDisponibilidad, 
        validarInfo,
    ],
    apiController.putApi);

router.delete('/:id', 
    [
        check("id", "No es un ID válido").isMongoId(),
        validarInfo
    ],
    apiController.deleteApi);

router.get('/busqueda', apiController.busquedaApi)

module.exports = router


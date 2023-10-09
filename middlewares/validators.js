const {validationResult} = require('express-validator');
const {Hotel}= require('../models/hotel')

const validarInfo = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errores: errors.array()})
    }

    next();
};

const habitacionExiste = async(habitación) => {
  const hotel = await Hotel.findOne({habitación});

  if(hotel){
    throw new Error("La habitación ya se encuentra registrada")
  }
};

const verificarDisponibilidad = async (req, res, next) => {
  const { id } = req.params;

  try {
    const habitación = await Hotel.findById(id);
    if (!habitación) {
      return res.status(404).json({ mensaje: 'Habitación no encontrada' });
    }
    if (!habitación.disponibilidad) {
      return res.status(400).json({ mensaje: 'La habitación no está disponible' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error en la base de datos' });
  }
};

module.exports = {
    validarInfo,
    habitacionExiste,
    verificarDisponibilidad
}


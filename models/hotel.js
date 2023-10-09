const {Schema, model} = require('mongoose')

const schema = new Schema ({
    habitación: {
        type: Number,
        required: true
    },
    categoría: {
        type: String,
        required: true
    },
    precio: {
        type: String,
        required: true
    },
    descripción: {
        type: String,
        required: true,
    },
    disponibilidad: {
        type: Boolean,
        default: true,
    },
    maxCapacidad :{
        type: Number, 
        required: true
    },
    img: {
        type: String
    }    
})

const Hotel = model('Habitaciones', schema)
module.exports = {Hotel}

const { Hotel } = require('../models/hotel');
const axios = require('axios')

class ApiController {
    async getApi(req,res){
        const listado = await Hotel.find ();
        res.json({
            msg:"Estas son todas las habitaciones del hotel", 
            listado
        })
    }

    async postApi(req,res){
      try {
          const hotel = new Hotel(req.body)
          await hotel.save()
          res.json({
            msg:"Habitación agregada exitosamente",
            hotel
          })
      } catch (error) {
          res.json(error)
      }
    };

    async putApi(req,res){
        try {
            const {id} = req.params;

            const {precio, descripción, disponibilidad, maxCapacidad}= req.body;

            const hotel = await Hotel.findByIdAndUpdate (id, {precio, descripción, disponibilidad, maxCapacidad});

            res.json({
            msg: "Habitación actualizada exitosamente",
            hotel
            })
        } catch (error){
             res.json(error)
        }        
    }

    async deleteApi(req,res){
        const{id} = req.params;

        await Hotel.findByIdAndUpdate(id, {disponibilidad:false})

        res.json({
            msg:"Habitación borrada exitosamente"
        })
    }  
    
    async busquedaApi(req,res){
        try {
            const{data, status} = await axios.get('https://swapi.dev/api/people/1/')
            res.json(data,status)
        } catch (error) {
            res.status(404).json({data:error.response.data, status:error.response.status})
        }
    }
}  
      
module.exports = new ApiController
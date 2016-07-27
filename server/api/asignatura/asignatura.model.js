'use strict';

import mongoose from 'mongoose';

var AsignaturaSchema = new mongoose.Schema({
  // code : { type:String, require:true, unique:true}, //Revisar, es necesarios los codigos //ESPA2016
  nombre : { type:String, require:true}, //ESPAÑOL
  area : { type:String, require:true},
  docente: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  ano : { type:String, require:true},
  eliminado : {type:Boolean, default:false}
});

export default mongoose.model('Asignatura', AsignaturaSchema);


User.find({rol:'ACUDIENTE'})
.then(acudientes=>{
  var acudientesRetorno = [];
  acudientes.forEach(acudiente=>{

    Estudiante.find({acudiente:acudiente._id})
      .then(estudiantes=>{
        acudiente.estudiantes= estudiantes;

    })

  })


})

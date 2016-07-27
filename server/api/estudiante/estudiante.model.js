'use strict';

import mongoose from 'mongoose';

var EstudianteSchema = new mongoose.Schema({
    egresado : { type : Boolean, default : false },
    user : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
    acudiente : { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    grupo : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    asignaturas : [{
      asignatura : { type: mongoose.Schema.Types.ObjectId, ref: 'Asignatura'},
          actividades : [{
            actividad : { type: mongoose.Schema.Types.ObjectId, ref: 'Actividad'},
            nota: Number,
            notaEscolar : String,
            notaNacional : String
          }],
          asistencias: [{
            fecha : { type:Date, require:true},
            tipo : {type:String, require:true}
          }]


    }
  ],


  // anos : [{
  //     periodos:[{
  //       grupos:[{
  //         asignaturas:[{
  //
  //         }]
  //       }]
  //
  //     }]
  // }]

});

export default mongoose.model('Estudiante', EstudianteSchema);

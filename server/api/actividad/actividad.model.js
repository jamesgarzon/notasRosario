'use strict';

import mongoose from 'mongoose';

var ActividadSchema = new mongoose.Schema({
  codigo : { type:String, unique:true, require:true},
  titulo : { type:String, require:true},
  descripcion : { type:String, require:true},
  desempeno : { type: mongoose.Schema.Types.ObjectId, ref: 'Desempeno', require:true},
  fechaCreacion: { type: Date, default: Date.now },
  fechaRealizacion : { type:Date},
  periodo : { type: mongoose.Schema.Types.ObjectId, ref: 'Periodo', require:true},
  asignatura : { type: mongoose.Schema.Types.ObjectId, ref: 'Asignatura', require:true},
  docente : { type: mongoose.Schema.Types.ObjectId, ref: 'Asignatura', require:true}
});

export default mongoose.model('Actividad', ActividadSchema);

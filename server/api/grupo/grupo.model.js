'use strict';

import mongoose from 'mongoose';

var GrupoSchema = new mongoose.Schema({
  nombre : {type:String, unique:true, require:true}, //9B
  grado :  {type:String, unique:true, require:true},
  asignaturas : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Asignaturas', require:true}],
  ano : {type:String, require:true},
});

export default mongoose.model('Grupo', GrupoSchema);

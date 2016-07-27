'use strict';

import mongoose from 'mongoose';

var PeriodoSchema = new mongoose.Schema({
  codigo : {type:String, require:true, unique:true},
  ano : {type:String, require:true, unique:true},
  activo : {type : Boolean, default:false }
  // eliminado : {type:Boolean, default:false}  
});

export default mongoose.model('Periodo', PeriodoSchema);

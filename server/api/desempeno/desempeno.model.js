'use strict';

import mongoose from 'mongoose';

var DesempenoSchema = new mongoose.Schema({
  nombre : {type:String, require:true},
  descripcion : {type:String, require:true},
  tipo : {type:String, require:true}
});

export default mongoose.model('Desempeno', DesempenoSchema);

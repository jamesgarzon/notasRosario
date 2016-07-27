'use strict';

import mongoose from 'mongoose';

var AreaSchema = new mongoose.Schema({
  nombre: {type:String, require:true, unique:true}
});

export default mongoose.model('Area', AreaSchema);

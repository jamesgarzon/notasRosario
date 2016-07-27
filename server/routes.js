/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/acudientes', require('./api/acudiente'));
  app.use('/api/desempenos', require('./api/desempeno'));
  app.use('/api/asistencias', require('./api/asistencia'));
  app.use('/api/actividades', require('./api/actividad'));
  app.use('/api/registros', require('./api/registro'));
  app.use('/api/grupos', require('./api/grupo'));
  app.use('/api/periodos', require('./api/periodo'));
  app.use('/api/asignaturas', require('./api/asignatura'));
  app.use('/api/areas', require('./api/area'));
  app.use('/api/docentes', require('./api/docente'));
  app.use('/api/estudiantes', require('./api/estudiante'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}

import app from './app';

async function init() {
  app.listen(app.get('port'));
  console.log('Server on port', app.get('port'));
}

init();

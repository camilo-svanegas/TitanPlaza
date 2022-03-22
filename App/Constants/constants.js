
const __ENVIRONMENT = 'prod'; // local, stage, prod

var __BASE_URL;

if (__ENVIRONMENT == 'local') {
  __BASE_URL = 'http://192.168.0.14/codelabs/centros-comerciales/plaza-imperial/site/www/';
}
else if (__ENVIRONMENT == 'stage') {
  __BASE_URL = 'https://titanplaza.code-labs.com/';
}
else if (__ENVIRONMENT == 'prod') {
  __BASE_URL = 'https://www.titanplaza.com/';
}

module.exports = {

  STORAGE_TOKEN : '@token',
  STORAGE_ID_USER : '@id_user',
  STORAGE_PASS : '@pass',
  STORAGE_NAME_USER : '@name_user',
  STORAGE_AVATAR : '@avatar',
  STORAGE_EMAIL : '@email',

  BASE_URL: __BASE_URL,
  URL_AMFPHP: __BASE_URL+'amf/gateway/',
  MAPA_SOURCE_URL: __BASE_URL+'app/mapa/',
  ANALYTICS:'',

  ENVIRONMENT: __ENVIRONMENT,

  //General
  MALL_NAME: 'Titan Plaza',

  // Notifications
  BIRTHDAY_NOTIF_ID: 'birthday_notif',
  PROXIMITY_NOTIF_ID: 'proximity_notif',

  // ALERT MESSAGES
  MSG_ALERT_TITLE: 'Titan Plaza',
  MSG_ENABLE_SETTINGS_PERMISSIONS: 'Recuerda que debes habilitar los permisos de la aplicación en el panel de configuración del dispositivo.',
  MSG_ENABLE_APP_PERMISSIONS: 'Recuerda que debes habilitar todos los permisos al iniciar la aplicación.',
  MSG_GPS_OFF: 'No olvides encender el GPS de tu dispositivo para poder interactuar mejor con la aplicación.',

};

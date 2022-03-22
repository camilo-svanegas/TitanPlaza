'use strict'

import AsyncStorage from '@react-native-community/async-storage';

// import {
//   debugMe,
//   initialNotification,
//   createNotification,
//   onMessageNotification,
//   scheduleNotification,
//   getScheduledLocalNotifications,
//   cancelAllLocalNotifications,
//   cancelLocalNotification,
// } from '../utilities/Messaging'

import RNFS from 'react-native-fs';

const CONST = require('../Constants/constants');

var STORAGE_TOKEN = '@AsyncStorage:token';
var STORAGE_ID = '@AsyncStorage:id';
var STORAGE_PASS = '@AsyncStorage:pass';





function getMonthName(bdate) {
  var d = new Date(bdate.replace(/-/g, '\/'));
  var monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
  ];
  return monthNames[d.getMonth()];
}
export { getMonthName }


function getFullMonthName(bdate) {
  var d = new Date(bdate.replace(/-/g, '\/'));
  var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  return monthNames[d.getMonth()];
}
export { getFullMonthName }


function getDateDay(bdate) {
  var d = new Date(bdate.replace(/-/g, '\/'));
  return d.getDate();
}
export { getDateDay }


function getFullYear(bdate) {
  var d = new Date(bdate.replace(/-/g, '\/'));
  return d.getFullYear();
}
export { getFullYear }


function getDiffDays(end_str) {
  var start_date = new Date(); start_date.setHours(0,0,0,0);
  var end_date = new Date( end_str.replace(/-/g, '\/') ); end_date.setHours(0,0,0,0);

  var timeDiff = Math.abs( end_date.getTime() - start_date.getTime() );
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return diffDays;
}
export { getDiffDays }

function valAdult(fecha){
   //valida fecha en formato aaaa-mm-dd
    var fechaArr = fecha.split('-');
    var aho = fechaArr[0];
    var mes = fechaArr[1];
    var dia = fechaArr[2];
    var plantilla = new Date(aho, mes - 1, dia);//mes empieza de cero Enero = 0, Diciembre=11
    var hoy = new Date();
    var hoy_to_years = hoy.getTime() / 365 / 24 / 60 / 60 / 1000;
    var fecha_to_years = plantilla.getTime() / 365 / 24 / 60 / 60 / 1000;
    if (!plantilla || plantilla.getFullYear() == aho && plantilla.getMonth() == mes - 1 && plantilla.getDate() == dia)
    {
        var age_current = calcular_edad(dia, mes, aho);
        if (age_current >= 18)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }

}
export { valAdult }

function calcular_edad(dia_nacim, mes_nacim, anio_nacim)
{
    var fecha_hoy = new Date();
    var ahora_anio = fecha_hoy.getYear();
    var ahora_mes = fecha_hoy.getMonth();
    var ahora_dia = fecha_hoy.getDate();
    var edad = (ahora_anio + 1900) - anio_nacim;
    if (ahora_mes < (mes_nacim - 1))
    {
        edad--;
    }
    if (((mes_nacim - 1) == ahora_mes) && (ahora_dia < dia_nacim))
    {
        edad--;
    }
    if (edad > 1900)
    {
        edad -= 1900;
    }
    return edad;
}
export {calcular_edad}

function nameToUpperCase(json) {
  var name = json.name.toLowerCase();
  json.name = name.toUpperCase();
  return json;
}
export { nameToUpperCase }


function nameCapitalizeFirstLetter(json) {
  var name = json.name.toLowerCase();
  json.name = name.charAt(0).toUpperCase() + name.slice(1);
  return json;
}
export { nameCapitalizeFirstLetter }


function nameCapitalizeFirstLetterOfEachWord(json) {
  var name = json.name.toLowerCase();
  json.name = name.replace(/((^| )[a-z])/g, function(a, b){
    return b.toUpperCase();
  });
  return json;
}
export { nameCapitalizeFirstLetterOfEachWord }


function capitalizeFirstLetterOfEachWord(item) {
  return item.toLowerCase().replace(/((^| )[a-z])/g, function(a, b){
    return b.toUpperCase();
  });
}
export { capitalizeFirstLetterOfEachWord }


function getClasificacion(item) {
  return item.substring(item.indexOf("AÑOS")-3, item.length);
}
export { getClasificacion }


function fixHtmlCotent(item) {
  return JSON.stringify(item.replace('<p>\n\t&nbsp;</p>','').replace('<p>\n\t&nbsp;</p>','').replace('<p>\n\t&nbsp;</p>','').replace('<p>\n\t&nbsp;</p>','').replace('<p>\n\t&nbsp;</p>','').replace(/\n\t/g,'').replace(/\n/g,'').replace('"','')).toString();
}
export { fixHtmlCotent }


function saveDataJsonFile(dataJson, fileName) {
  debugMe('UTILITIES', 'saveDataJsonFile', fileName);

  if (false) return; // ToDo: disable-enable offline mode

  var path = RNFS.DocumentDirectoryPath + '/' + fileName + '.json';
  RNFS.writeFile(path, dataJson, 'utf8')
  .then((success) => {
    debugMe('UTILITIES', 'file written', path);
  })
  .catch((err) => {
    debugMe('UTILITIES', 'err', err.message);
  });   
}
export { saveDataJsonFile }


async function readDataJsonFile (fileName) {
  debugMe('UTILITIES', 'readDataJsonFile', fileName);

  var path = RNFS.DocumentDirectoryPath + '/' + fileName + '.json';

  if (RNFS.exists(path)) {
    return RNFS.readFile(path, 'utf8')
      .then((contents) => {
        debugMe('UTILITIES', 'read file', path);
        return JSON.parse(contents);
      })
      .catch((err) => {
        debugMe('UTILITIES', 'err.message', err.message);
        return JSON.parse('{}');
      });   
  }
  else {
    return new Promise(function(resolve, reject) {
      resolve('{}');
    }).then((response) => { 
      return JSON.parse(response) 
    });
  }
}
export { readDataJsonFile }


async function deleteJsonFile (fileName) {
  debugMe('UTILITIES', 'deleteJsonFile', fileName);

  var path = RNFS.DocumentDirectoryPath + '/' + fileName + '.json';

  if (RNFS.exists(path)) {
    return RNFS.unlink(path)
      .then((contents) => {
        debugMe('UTILITIES', 'delete file', path);
        return JSON.parse('{}');
      })
      .catch((err) => {
        debugMe('UTILITIES', 'err.message', err.message);
        return JSON.parse('{}');
      });
  }
  else {
    return new Promise(function(resolve, reject) {
      resolve('{}');
    }).then((response) => {
      return JSON.parse(response)
    });
  }
}
export { deleteJsonFile }


async function scheduleBirthdayNotification(update=false){
  // return; // ToDo: ignore this functionality

  try {
    var id_user = await AsyncStorage.getItem(STORAGE_ID);
    var token =await AsyncStorage.getItem(STORAGE_TOKEN);
    //var pass = await AsyncStorage.getItem(STORAGE_PASS);

    if (id_user != null && id_user != undefined && id_user != "") {
      const sesion = {
        id_user: id_user,
        token: token,
        //pass: pass,
      }

      if (sesion.id_user) {
        getScheduledLocalNotifications().then(data => {
          debugMe('getScheduledLocalNotifications', data)

          var notif_id = CONST.BIRTHDAY_NOTIF_ID;

          // if (update) {
          //   cancelLocalNotification(notif_id);
          // }

          var bnotif_arr = data.filter(notif => notif.id==notif_id)
          if (bnotif_arr.length==0 || update) {

            fetch(CONST.URL_AMFPHP, {
              method: 'POST',
              headers: { 'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "serviceName":"amf_mobile_services",
                "methodName":"getInfoUser",
                "parameters":[id_user,token]
              })
            }).then((response) => response.json())
            .then((responseJson) => {
              var infoUser = responseJson;
              if(infoUser.year != undefined && infoUser.year != null && infoUser.year != "" && infoUser.year != "0000"){

                let birth_date = infoUser.year+"-"+infoUser.month+"-"+infoUser.day;
                debugMe({birthDate: birth_date})

                var now = new Date();

                var fire_hour = 11;
                var fire_minutes = 0;
                var fire_date = new Date(now.getFullYear(), infoUser.month-1, infoUser.day, fire_hour, fire_minutes);

                debugMe('fire_date', fire_date.getTime(), fire_date)
                debugMe('now',       now.getTime(),       now,     )

                if (fire_date<now) return;

                var msg = {
                  fire_date: fire_date.getTime(), //new Date().getTime()+5000,
                  id: notif_id,
                  body: 'Feliz cumpleaños '+infoUser.name+' '+infoUser.surname+' te desea Plaza Imperial!',
                }
                _scheduleNotification(msg)

                getScheduledLocalNotifications().then(data => {
                  debugMe('getScheduledLocalNotifications', data)
                })

                /* register notif on the server */
                var title = null;
                var body = msg.body;
                var fire_date_tp = fire_date.toISOString(); //.slice(0,10)
                var custom_label = msg.id;
                var data = null;
                var active = 1;
                var local_notification = 1;

                fetch(CONST.URL_AMFPHP, {
                  method: 'POST',
                  headers: { 'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    "serviceName":"amf_mobile_services",
                    "methodName":"scheduleNotification",
                    "parameters":[id_user, title, body, fire_date_tp, custom_label, data, active, local_notification],
                  })
                }).then((response) => response.json())
                .then((responseJson) => {
                  debugMe('Notification scheduled: '+responseJson);
                });
                /* end register notif on the server */

              }
            });
          }
        })
      }
    }
  } catch (error) {
    debugMe('loadInitialState error: ' + error.message);
  }
}
export { scheduleBirthdayNotification }


async function readNotification(custom_label){
  try {
    var id_user = await AsyncStorage.getItem(STORAGE_ID);
    //var token =await AsyncStorage.getItem(STORAGE_TOKEN);
    //var pass = await AsyncStorage.getItem(STORAGE_PASS);

    if (id_user != null && id_user != undefined && id_user != "") {
      // const sesion = {
      //   id_user: id_user,
      //   token: token,
      //   //pass: pass,
      // }

      if (id_user) {
        fetch(CONST.URL_AMFPHP, {
          method: 'POST',
          headers: { 'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "serviceName":"amf_mobile_services",
            "methodName":"readNotification",
            "parameters":[id_user, custom_label],
          })
        }).then((response) => response.json())
        .then((responseJson) => {
          debugMe('Notification read: '+responseJson);
        });
      }
    }
  } catch (error) {
    debugMe('loadInitialState error: ' + error.message);
  }
}
export { readNotification }


function _scheduleNotification(msg){
  const data = {
    fire_date: msg.fire_date,
    id: msg.id,
    //title: 'Test...',
    body: msg.body,
    priority: 'high',
    show_in_foreground: true,
    sound: 'default',
    local: true,
    vibrate: 500,
    wake_screen: true,
    //badge: 1,
    //click_action: notif.click_action,

    icon: 'ic_notif',
    click_action: 'ACTION',
    opened_from_tray: true,
    local_notification: true,
  }
  scheduleNotification(data);
}


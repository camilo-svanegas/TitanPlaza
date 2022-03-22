'use strict'

import analytics from '@react-native-firebase/analytics';


const CONST = require('../Constants/constants');

async function _registerAnalytics(type,type_name,params){

    if (type == "Screen") {

         await analytics().logScreenView(params);

    }


    if (type == "Event") {
             await analytics().logEvent(type_name,params);
    }

}
export { _registerAnalytics }

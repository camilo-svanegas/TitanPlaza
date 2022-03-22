'use strict'

import React, { Component } from 'react';
import { StatusBar, Button,View, Image, Text, Platform, AppState, PermissionsAndroid, ToastAndroid, Alert } from 'react-native';

import {
  InitialState,
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  PathConfigMap,
  NavigationContainerRef,
} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import {
  createStackNavigator,
  StackScreenProps,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';

import { enableScreens } from 'react-native-screens';

import AsyncStorage from '@react-native-community/async-storage';


import {
  debugMe
} from '../Utilities/Messaging'

import Menu from './Menu';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import EditProfile from './EditProfile';
import StoresContainer from './StoresContainer';
import StoreDetails from './StoreDetails';
import StorePromotions from './StorePromotions';
import CRMProfile from './CRMProfile';
import CampaignDetail from './CampaignDetail';
import Invoices from './Invoices';
import InvoiceDetail from './InvoiceDetail';
import InvoiceCreate from './InvoiceCreate';
import Mapa from './Mapa';
import News from './News';
import NewsDetails from './NewsDetails';
import Events from './Events';
import EventDetails from './EventDetails';
import Promotions from './Promotions';

import ButtonMenu from './ButtonMenu'

import store from '../Reducers/store.js';

import { startSession, gotoScreen} from '../Reducers/action';

import { layout, text, homeLayout, interactions, spacers  } from '../Styles/TitanPlaza/Global';

import messaging from '@react-native-firebase/messaging';

import {_registerAnalytics} from "./Analytics";

const CONST = require('../Constants/constants');

const APP_COLOR = '#e92035';

const SCREENS = {
  Home: { title: 'Home', component: Home }
};

enableScreens();

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const navigationRef = React.createRef();
const routeNameRef = React.createRef();

class PrincipalNav extends Component {
   
    constructor(props,context){
      super(props,context);

      this.unsubscribe = null;
      this.unsubscribeBack = null;
      this.unsubscribeOpenApp = null;
      this.fcmTokenMsn = null;
      this.authStatus  = null;

      this.state={
        sessionOn:false,
        menuFullname:' ',
        menuEmail:' ',
        menuAvatar:' ',
        isGeoFirstTime: true,
        loading:true,
        gotoScreenCurrent:null,
        id_post :null,
        routeNameRef: null,
      }

      this.logOut = this.logOut.bind(this);
      this.requestUserPermission = this.requestUserPermission.bind(this);
      this._changeState = this._changeState.bind(this);

    }

    componentDidMount() {
     
      this.requestUserPermission().done();
      this._changeState().done();
      store.dispatch(gotoScreen(null,null))

      // let that = this;

      // this.requestUserPermission().then(()=>{this._changeState().then(()=>{
      //     that.setState({loading: false}); 
      // })});

    }

    componentDidUpdate(){
      store.dispatch(gotoScreen(this.state.gotoScreenCurrent,this.state.id_post));
    }

    componentWillUnmount(){
      if (this.unsubscribe) this.unsubscribe = null;
      if (this.unsubscribeBack) this.unsubscribeBack = null;
      if (this.unsubscribeOpenApp) this.unsubscribeOpenApp = null;
      if (this.authStatus) this.authStatus = null;
      if (this.fcmTokenMsn) this.fcmTokenMsn = null;

      store.dispatch(gotoScreen(this.state.gotoScreenCurrent,this.state.id_post))

    }

    requestUserPermission = async() => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
      if (enabled) {
        console.log('Authorization status:', authStatus);

        messaging().getToken()
        .then( fcmToken =>{
          if (fcmToken) {
            console.log('fcmToken :', fcmToken);
          }else{
            console.log("[FCMServices] user does not have a device token")
          }
        }).catch(error =>{
          console.log("[FCMServices] getToken rejected", error);
        })
        // const unsubscribe = messaging().onMessage(async remoteMessage => {
        //   let msn = remoteMessage;
         
        //   Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
        // });

        // // Register background handler
        // messaging().setBackgroundMessageHandler(async remoteMessage => {
        // //  console.log('Message handled in the background!', remoteMessage);
        // });

      }
    }


  
  _changeState = async () => {

      var id_user = store.getState().todos.id;
      var pass = store.getState().todos.pass;
      var token = store.getState().todos.token;

      if (id_user === undefined || id_user === null || id_user === "") {
        // comprobar si hay datos en AsyncStorage
        id_user = await AsyncStorage.getItem(CONST.STORAGE_ID_USER);
        pass = await AsyncStorage.getItem(CONST.STORAGE_PASS);
        token =await AsyncStorage.getItem(CONST.STORAGE_TOKEN);
      }
    
    if (id_user === undefined || id_user === null || id_user === ""){

      store.dispatch(startSession("","","","",""));

      if (this.state.sessionOn === true) {
        this.setState({sessionOn: false});
      }
      if (this.state.menuFullname != ' ') {
        this.setState({menuFullname:' '});
      }
      if (this.state.menuEmail != ' ') {
        this.setState({menuEmail:' '});
      }

      this.setState({loading: false})

    }
    else {

      this._getBasicInfoUser(id_user,token, pass);
      
      //setTimeout(() => { this.setState({sessionOn: true}) }, 1000);
    }
  }

  _getBasicInfoUser (id_user, token, pass) {

    fetch(CONST.URL_AMFPHP, { 
      method: 'POST', 
      headers: { 'Accept': 'application/json', 
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ 
        "serviceName":"amf_mobile_services",
        "methodName":"getUserInfoBasic",
        "parameters":[id_user,token]
      }) 
    }) 
    .then((response) => response.json()) 
    .then((responseJson) => { 

      //console.warn("responseJson", id_user,token, responseJson);
      

      if (responseJson == -1) {
        //No session
        this.logOut();
        this.setState({loading:false})
      }
      else {
        
        var fullname= responseJson.name+" "+responseJson.surname;

        store.dispatch(startSession(id_user,pass,token,fullname,responseJson.avatar_folder_url+"avatar.jpg",responseJson.email));
        
        setTimeout(() => { 
            this.setState({loading:false, sessionOn:true, menuAvatar:responseJson.avatar_folder_url+"avatar.jpg",menuEmail:responseJson.email, menuFullname: fullname});
         }, 100);

       this.sessionSet(id_user,pass,token,fullname,responseJson.email,responseJson.avatar_folder_url+"avatar.jpg").done();
       
      }
    }) 
    .catch((error) => {
      debugMe(error);
    });
  }

  sessionSet = async (id_user,pass,token,fullname,email,avatar) => {
    
    const id_user_sesion = [CONST.STORAGE_ID_USER, id_user]
    const pass_sesion = [CONST.STORAGE_PASS, pass]
    const token_sesion = [CONST.STORAGE_TOKEN, token]
    const fullname_sesion = [CONST.STORAGE_NAME_USER, fullname]
    const avatar_sesion = [CONST.STORAGE_AVATAR, avatar]
    const email_sesion = [CONST.STORAGE_EMAIL, email]
    
    try {

      await AsyncStorage.multiSet([id_user_sesion, pass_sesion, token_sesion, fullname_sesion, avatar_sesion, email_sesion ])    

      
    } catch(e) {
      debugMe(e)
    }

    debugMe("Done.")


  }

  logOut(){
    store.dispatch(startSession("","","","","",""));
    this.sessionSet("","","","","","","").done();
    this.clearAll().done();

  }

  clearAll = async () => {
    try {

      
      await AsyncStorage.removeItem(CONST.STORAGE_ID_USER);
      await AsyncStorage.removeItem(CONST.STORAGE_TOKEN);
      await AsyncStorage.clear();

    } catch(e) {
     //  console.log(e);
    }

    debugMe('Clear All.')
    //this.navigate('Home', { screen: 'Home' }); 
  }

    render() {

        if (this.state.loading) {
          return(
            <View style={[layout.mainContainer, layout.centerCenter, layout.white]}>
             <View style={[homeLayout.logoContainer, spacers.mb2]}>
              <Image
                resizeMode={'contain'}
                source={require('../Img/titan_plaza/logos/logo.png')}
                style={homeLayout.logo}
              />
            </View>
              <Text style={[text.mainText, text.darkgray, text.center, text.regular]} > Cargando información ... </Text>
            </View>
          );
        }
        return (

          <NavigationContainer

            ref={navigationRef}
            onReady={() => {
              routeNameRef.current = navigationRef.current.getCurrentRoute().name;
            }}
            onStateChange={async () => {
              const previousRouteName = routeNameRef.current;
              const currentRouteName = navigationRef.current.getCurrentRoute().name;

              if (previousRouteName !== currentRouteName) {
                // await analytics().logScreenView({
                //   screen_name: currentRouteName,
                //   screen_class: currentRouteName,
                // });
                 let params = {
                   screen_name: currentRouteName,
                   screen_class: currentRouteName,
                }
                _registerAnalytics("Screen","",params);
              }
              routeNameRef.current = currentRouteName;
            }}

          >
            <Drawer.Navigator drawerPosition= "right" drawerContent={(props)=><Menu {...props} onPress={()=>{this.logOut()}} sessionOn={this.state.sessionOn}
          menuAvatar={this.state.menuAvatar}
          menuFullname={this.state.menuFullname}
          menuEmail={this.state.menuEmail} />} >
              <Drawer.Screen name="Menu" 
              component={()=>(
                <Stack.Navigator screenOptions={{ animationEnabled: false }}>
                  <Stack.Screen
                    name="Home"
                    component={Home}
                    options={({ navigation, route }) => ({
                      headerTitle: "Home" ,
                      headerRight: props =>(
                        <ButtonMenu _nav = {navigation} />
                      ),
                    })}
                  /> 
                  <Stack.Screen
                    name="Register"
                    component={Register}
                    options={({ navigation, route }) => ({
                      headerTitle: "Registro" ,
                      headerRight: props =>(
                        <ButtonMenu _nav = {navigation} />
                      ),
                    })}
                  /> 
                  <Stack.Screen
                    name="Login"
                    component={Login}
                    options={({ navigation, route }) => ({
                      headerTitle: "Login" ,
                      headerRight: props =>(
                        <ButtonMenu _nav = {navigation} />
                      ),
                    })}
                  />
                  <Stack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options={({ navigation, route }) => ({
                      headerTitle: "Perfil" ,
                      headerRight: props =>(
                        <ButtonMenu _nav = {navigation} />
                      ),
                    })}
                  />
                  <Stack.Screen
                    name="StoresContainer"
                    component={StoresContainer}
                    options={({ navigation, route }) => ({
                      headerTitle: "Almacenes" ,
                      headerRight: props =>(
                        <ButtonMenu _nav = {navigation} />
                      ),
                    })}
                  />
                  <Stack.Screen
                    name="StoreDetails"
                    component={StoreDetails}
                    options={({ navigation, route }) => ({
                      headerTitle: route.params.name_store,
                      headerRight: props =>(
                        <ButtonMenu _nav = {navigation} />
                      ),
                    })}
                  />

                  <Stack.Screen
                    name="CRMProfile"
                    component={CRMProfile}
                    options={({ navigation, route }) => ({
                      headerTitle: "CRM",
                      headerRight: props =>(
                        <ButtonMenu _nav = {navigation} />
                      ),
                    })}
                  />

                   <Stack.Screen
                    name="CampaignDetail"
                    component={CampaignDetail}
                    options={({ navigation, route }) => ({
                      headerTitle: route.params.infoCampaign.name,
                      headerRight: props =>(
                        <ButtonMenu _nav = {navigation} />
                      ),
                    })}
                  />

                  <Stack.Screen
                    name="Invoices"
                    component={Invoices}
                    options={({ navigation, route }) => ({
                      headerTitle: "Facturas",
                      headerRight: props =>(
                        <ButtonMenu _nav = {navigation} />
                      ),
                    })}
                  /> 

                  <Stack.Screen
                    name="InvoiceDetail"
                    component={InvoiceDetail}
                    options={({ navigation, route }) => ({
                      headerTitle: "Factura",
                      headerRight: props =>(
                        <ButtonMenu _nav = {navigation} />
                      ),
                    })}
                  />

                   <Stack.Screen
                    name="InvoiceCreate"
                    component={InvoiceCreate}
                    options={({ navigation, route }) => ({
                      headerTitle: "Registrar Factura",
                      headerRight: props =>(
                        <ButtonMenu _nav = {navigation} />
                      ),
                    })}
                  />

                  <Stack.Screen
                    name="Mapa"
                    component={Mapa}
                    options={({ navigation, route }) => ({
                      headerTitle: "Mapa",
                      headerRight: props =>(
                        <ButtonMenu _nav = {navigation} />
                      ),
                    })}
                  />

                  <Stack.Screen
                    name="News"
                    component={News}
                    options={({ navigation, route }) => ({
                      headerTitle: "Noticias",
                      headerRight: props =>(
                        <ButtonMenu _nav = {navigation} />
                      ),
                    })}
                  />

                  <Stack.Screen
                    name="NewsDetails"
                    component={NewsDetails}
                    options={({ navigation, route }) => ({
                      headerTitle: "Noticias",
                      headerRight: props =>(
                        <ButtonMenu _nav = {navigation} />
                      ),
                    })}
                  />

                   <Stack.Screen
                    name="Events"
                    component={Events}
                    options={({ navigation, route }) => ({
                      headerTitle: "Eventos",
                      headerRight: props =>(
                        <ButtonMenu _nav = {navigation} />
                      ),
                    })}
                  />

                  <Stack.Screen
                    name="EventDetails"
                    component={EventDetails}
                    options={({ navigation, route }) => ({
                      headerTitle: "Events",
                      headerRight: props =>(
                        <ButtonMenu _nav = {navigation} />
                      ),
                    })}
                  />

                   <Stack.Screen
                    name="Promotions"
                    component={Promotions}
                    options={({ navigation, route }) => ({
                      headerTitle: "Promociones",
                      headerRight: props =>(
                        <ButtonMenu _nav = {navigation} />
                      ),
                    })}
                  />
                
                 
                </Stack.Navigator>)
                
              } >
             
            </Drawer.Screen>
            </Drawer.Navigator>
          </NavigationContainer>


      );
     
    }
}

export default PrincipalNav;

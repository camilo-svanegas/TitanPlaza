'use strict';

import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
 
import {  
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Slider,
  Alert
} from 'react-native';


import AsyncStorage from '@react-native-community/async-storage';

import { NavigationContainer, DrawerActions } from '@react-navigation/native';

import { homeLayout, layout, text, interactions, forms, spacers  } from '../Styles/TitanPlaza/Global';

import NewsCarousel from './NewsCarousel';


import DeviceInfo from 'react-native-device-info';

import analytics from '@react-native-firebase/analytics';


import {
  debugMe
} from '../Utilities/Messaging'

import store from '../Reducers/store.js';
import { startSession, gotoScreen} from '../Reducers/action';

import messaging from '@react-native-firebase/messaging';

const CONST = require('../Constants/constants');


class Button extends Component {
  handlePress(e) {
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }
  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}
        style={this.props.style}>
        <Text>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

export class Home extends Component {

   state = {
    isOpen: false,
    selectedItem: 'About',
    banners: [],
    readNot: false,
    loading:true,
    goto_screen :store.getState().todos.screen?store.getState().todos.screen:null,
    id_post : store.getState().todos.id_post?store.getState().todos.id_post:null,

  };

  controller = new AbortController();
   
  constructor(props, context) { 
    super(props, context);

    this.navigator = this.props.navigation;

     if (this.props.route.params || this.props.route.params != undefined) {
      this.route = this.props.route.params["route"]? this.props.route.params["route"]: null;
      this.token = this.props.route.params["token"]? this.props.route.params["token"]: null;
      this.id_user = this.props.route.params["id_user"]? this.props.route.params["id_user"]: null;
      this.pass = this.props.route.params["pass"]? this.props.route.params["pass"]: null;
      this.logout = this.props.route.params["logout"]? this.props.route.params["logout"]: false;
    }

    if (!this.logout) {
        if(this.id_user==undefined || this.id_user==null || this.id_user==""){
          this.sesion = {
            id_user: store.getState().todos.id,   
            token: store.getState().todos.token,
            pass: store.getState().todos.pass
          }
        }else{
          this.sesion = {
            id_user: this.id_user,   
            token: this.token,
            pass: this.pass,
          }
        }
    }else{
      this.sesion = null;
    }

    this._gotoScreen = this._gotoScreen.bind(this);

  }

  componentDidMount() {

     this.requestUserPermission().then(()=>{this._getBanners();});
   
    if(this.sesion.id_user!=undefined){
      this._getBasicInfoUser(this.sesion.id_user,this.sesion.token);
    }

    if (this.logout) {
      this.sesion = null
    }

    
  }

   componentDidUpdate(prevProps, prevState){

    if (store.getState().todos.screen != null || store.getState().todos.screen != '' ){

       if (prevState.goto_screen != store.getState().todos.screen){
        //console.log("let´s go")
        let screen = store.getState().todos.screen;
        let id_post = store.getState().todos.id_post;
         if (screen==='Events'){
            store.dispatch(gotoScreen(null,null))
            if (id_post){  
              this._gotoScreen('EventDetails',{screen:'EventDetails', id:id_post});
            }else{
               this._gotoScreen('Events', {screen:'Events', sesion:this.sesion});
            }
          }else if (screen==='News'){
            store.dispatch(gotoScreen(null,null))
            if (id_post){  
              this._gotoScreen('NewsDetails', {screen:'NewsDetails',id:id_post});
            }else{
               this._gotoScreen('News', {screen:'News', sesion:this.sesion});
            }
          }
       }

    }

  }


  componentWillUnmount(){
    this.controller.abort();
  }

   _loadInitialState = async () => {    
      
      try {
        var id_user = await AsyncStorage.getItem(CONST.STORAGE_ID_USER);
        var pass = await AsyncStorage.getItem(CONST.STORAGE_PASS);
        var token =await AsyncStorage.getItem(CONST.STORAGE_TOKEN);
       

        if (id_user != null && id_user != undefined && id_user != "") {

          this.sesion = {
            id_user: id_user,
            token: token,
            pass: pass,
          }
          this._getBasicInfoUser(this.sesion.id_user,this.sesion.token);
        }
      } catch (error) {
        debugMe('loadInitialState error: ' + error.message);
      }

         
      
  };

  requestUserPermission = async() => {

    
    this.authStatus = await messaging().requestPermission();
    const enabled =
    this.authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    this.authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      //console.log('Authorization status:', this.authStatus);

      // this.fcmTokenMsn = messaging().getToken()
      // .then( fcmToken =>{
      //   if (fcmToken) {
      //     console.log('fcmToken :', fcmToken);
      //   }else{
      //     console.log("[FCMServices] user does not have a device token")
      //   }
      // }).catch(error =>{
      //   console.log("[FCMServices] getToken rejected", error);
      // })


      this.unsubscribe = messaging().onMessage(async remoteMessage => {
        

        //console.log("mensaje not: ",remoteMessage);

        if (Object.keys(remoteMessage.data).length > 0){
          if (remoteMessage.data !== null){

            console.log('Message handled in the foreground! DATA : ', remoteMessage.data);

            let type = remoteMessage.data.type ? remoteMessage.data.type:null;
            console.log("type",type);
            if (type == "goto_screen") {
              let screen = remoteMessage.data.screen ? remoteMessage.data.screen:null;
              let id_post = remoteMessage.data.id_post ? remoteMessage.data.id_post:null;
              if (screen != "") {

                Alert.alert(
                  remoteMessage.notification.title,
                  remoteMessage.notification.body,
                  [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () =>{
                   
                    this._gotoNotification(screen,id_post);

                  } 
                  }
                  ]);
              }
            }

          }
        }


      });

      this.unsubscribeOpenApp = messaging().onNotificationOpenedApp(remoteMessage => {

        if (Object.keys(remoteMessage.data).length > 0){
          if (remoteMessage.data !== null){

            console.log('Message handled in the background! open APP DATA : ', remoteMessage.data);

            let type = remoteMessage.data.type ? remoteMessage.data.type:null;
            console.log("type",type);
            if (type == "goto_screen") {
              let screen = remoteMessage.data.screen ? remoteMessage.data.screen:null;
              let id_post = remoteMessage.data.id_post ? remoteMessage.data.id_post:null;
              if (screen != "") {
                  this._gotoNotification(screen,id_post);
                  
              }
            }
          }
        }
      });

      //Register background handler
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);

        if (Object.keys(remoteMessage.data).length > 0){
      
          if (remoteMessage.data !== null){

            console.log('Message handled in the background! DATA : ', remoteMessage.data);

            let type = remoteMessage.data.type ? remoteMessage.data.type:null;
            console.log("type",type);
            if (type == "goto_screen") {
              let screen = remoteMessage.data.screen ? remoteMessage.data.screen:null;
              let id_post = remoteMessage.data.id_post ? remoteMessage.data.id_post:null;
              if (screen != "") {
                this._gotoNotification(screen,id_post);
              }
            }
          }
        }
      });


      // Check whether an initial notification is available
      messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        //console.log("remoteMessage:   ",remoteMessage)
        if (remoteMessage) {
          if (Object.keys(remoteMessage.data).length > 0){
          if (remoteMessage.data !== null){

            console.log('Message handled in the background! DATA : ', remoteMessage.data);

            let type = remoteMessage.data.type ? remoteMessage.data.type:null;
            console.log("type",type);
            if (type == "goto_screen") {

              let screen = remoteMessage.data.screen ? remoteMessage.data.screen:null;
              let id_post = remoteMessage.data.id_post ? remoteMessage.data.id_post:null;

              if (screen != "") {
                this._gotoNotification(screen,id_post);
              }
            }
          }
        }
        }
        
      });

    }

  }

  _gotoNotification = (screen,id_post) =>{

    this.unsubscribe = null;
     store.dispatch(gotoScreen(null,null));
     this.setState({gotoScreen:null,id_post:null})

      if (screen==='Events'){
                      
        if (id_post){  
          this._gotoScreen('EventDetails',{screen:'EventDetails', id:id_post, sesion:this.sesion});
        }else{
           this._gotoScreen('Events', {screen:'Events', sesion:this.sesion});
        }
      }else if (screen==='News'){
        if (id_post){  
          this._gotoScreen('NewsDetails', {screen:'NewsDetails',id:id_post, sesion:this.sesion});
        }else{
           this._gotoScreen('News', {screen:'News', sesion:this.sesion});
        }
      }else if (screen==='Stores'){
        if (id_post){  
          this._gotoScreen('StoreDetails', {screen:'StoreDetails',id:id_post, sesion:this.sesion});
        }else{
           this._gotoScreen('StoresContainer', {screen:'StoresContainer', sesion:this.sesion, initialPage:0});
        }
      }else if (screen==='Mapa'){
        if (id_post){  
          this._gotoScreen('Mapa', {screen:'Mapa',id:id_post,sesion:this.sesion});
        }else{
           this._gotoScreen('Mapa', {screen:'Mapa', sesion:this.sesion});
        }
      }else if (screen==='Promotions'){
        if (id_post){  
          this._gotoScreen('Promotions', {screen:'Promotions',id:id_post,sesion:this.sesion});
        }else{
           this._gotoScreen('Promotions', {screen:'Promotions', sesion:this.sesion});
        }
      }

  }


  _gotoScreen(screen, params){
    this.navigator.navigate(screen, params);
  }

   _gotoRegister() { 
    //this.props.navigator.push({ component: Register, title: 'Registro', name:'Register',passProps:{}  });
    this.navigator.navigate('Register', {screen:'Register'})
  }

   _gotoStores() { 
    // send event
    // logEvent('button_click', {
    //   //'item_id': 'NA',
    //   'item_title': 'StoresContainer',
    // });

    //this.props.navigator.push({ component: StoresContainer, title: 'Almacenes', name:'StoresContainer',passProps:{sesion:this.sesion}  });
    this.navigator.navigate('StoresContainer', {screen:'StoresContainer', sesion:this.sesion, initialPage:0})
  }

  _gotoCRMProfile() { 
    this.navigator.navigate('CRMProfile', {screen:'CRMProfile', sesion:this.sesion})
  }  
  
  _gotoNews() { 
    this.navigator.navigate('News', {screen:'News', sesion:this.sesion})
  } 

  _gotoEvents() { 
    this.navigator.navigate('Events', {screen:'Events', sesion:this.sesion})
  } 

  _gotoMapa() { 
    this.navigator.navigate('Mapa', {screen:'Mapa', sesion:this.sesion})
  } 

  _gotoPromotions() { 
    this.navigator.navigate('Promotions', {screen:'Promotions', sesion:this.sesion})
  } 

  _getBasicInfoUser (id_user, token) {
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
      //console.log("responseJson", id_user,token,responseJson)

      if (responseJson == -1) {
        store.dispatch(startSession("","","","",""));
      }
      else {
        var fullname= responseJson.name+" "+responseJson.surname;
        store.dispatch(startSession(this.sesion.id_user,this.sesion.pass,this.sesion.token,fullname,responseJson.avatar_folder_url+"avatar.jpg",responseJson.email));
      }
    }) 
    .catch((error) => {
      /*console.warn(error);*/
    });
  };

  _getBanners = () => {
    fetch(CONST.URL_AMFPHP, {
      method: 'POST',
      headers: { 'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "serviceName":"amf_mobile_services",
        "methodName":"getBannersHome",
        "parameters":["", ""]
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson);
      this.setState({ banners: responseJson });
      // if (responseJson.length>0) {
      //   setTimeout(() => {
      //     this.setState({ banners: responseJson });
      //   }, 3000);
      // }
    })
    .catch((error) => {
      //console.warn(error);
    });
  }

  

  _renderMenuItems = () => {
    var all_items = [    
      {
        image: require('../Img/titan_plaza/home_menu/home_icon_shops.png'),
        title: "Almacenes",
        onPress: ()=>this._gotoScreen('StoresContainer', {screen:'StoresContainer', sesion:this.sesion, initialPage:0}),
      },      
      {
        image: require('../Img/titan_plaza/home_menu/home_icon_maps.png'),
        title: "Mapa",
        onPress: ()=>this._gotoScreen("Mapa",{screen:'Mapa', sesion:this.sesion}),
      },
      {
        image: require('../Img/titan_plaza/home_menu/home_icon_sales.png'),
        title: "Promociones",
        onPress: ()=>this._gotoScreen('Promotions', {screen:'Promotions', sesion:this.sesion}),
      },
      // {
      //   image: require('../Img/titan_plaza/home_menu/home_icon_cinema.png'),
      //   title: "Cartelera",
      //   onPress: this._gotoCartelera,
      // },       
      {
        image: require('../Img/titan_plaza/home_menu/home_icon_news.png'),
        title: "Noticias",
        onPress: ()=>this._gotoScreen('News', {screen:'News', sesion:this.sesion}),
      },
      {
        image: require('../Img/titan_plaza/home_menu/home_icon_events.png'),
        title: "Eventos",
        onPress: ()=>this._gotoScreen('Events', {screen:'Events', sesion:this.sesion}),
      },
      {
        image: require('../Img/titan_plaza/home_menu/home_icon_receipts.png'),
        title: "Facturas y Sorteos",
        onPress: ()=>this._gotoScreen('CRMProfile', {screen:'CRMProfile', sesion:this.sesion}),
      },
    ];

    var map_items = all_items.map(function(item, i){
      
        return(
          
          <TouchableOpacity
            key={i}
            onPress={item.onPress}
            style={homeLayout.homeItemMenu} > 
            <View style={homeLayout.homeItemIconContainer}>
              <Image
                source={item.image}
                resizeMode='contain'
                style={homeLayout.homeItemIcon}
              />
               <Text 
              style={[text.largeText, text.center, text.darkgray, text.smallText]}>
              {item.title}
            </Text>
            </View>
           
          </TouchableOpacity>
          
        )


     
           
    });

    return(
      <View style={homeLayout.homeItemsMenuContainer}>
        {map_items}
        
      </View>
    );
  }
  
  render() { 
    return ( 


      <View style={layout.mainContainer}>

        <ScrollView
          style={homeLayout.homeScroll}>

          <View style={homeLayout.homeHeader}>

            <View style={homeLayout.logoContainer}>
              <Image
                resizeMode={'contain'}
                source={require('../Img/titan_plaza/logos/logo.png')}
                style={homeLayout.logo}
              />
            </View>

          </View>

          { this.state.banners.length>0?
            <NewsCarousel images={this.state.banners} navigations={this.navigator} /> : null
          }

          {this._renderMenuItems()}

          <Text style={{width: '100%', textAlign: 'center', color: 'lightgray'}}>
            Ver. {DeviceInfo.getVersion()} ({DeviceInfo.getBuildNumber()})
            {(CONST.ENVIRONMENT!='prod')?(' {'+CONST.ENVIRONMENT.toUpperCase()+'}'):''}
          </Text>

        </ScrollView>

      </View>
       
    )
  }
}

module.exports = Home;
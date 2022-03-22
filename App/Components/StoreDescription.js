'use strict';

import React, { Component } from 'react'; 
import {PropTypes} from 'prop-types';

import CustomIcon from './CustomIcon.js'

import {  
  Linking,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  Alert,
  TouchableHighlight, 
  TouchableOpacity, 
  View
} from 'react-native'; 

import {
  debugMe
} from '../Utilities/Messaging'

import HTMLView from 'react-native-htmlview';

import store from '../Reducers/store.js';



const CONST = require('../Constants/constants');

var styles= require('../Styles/MyStyles');

import { layout, text, interactions, stores, htmlViewCss  } from '../Styles/TitanPlaza/Global';


export default class StoreDescription extends Component {

  static propTypes = { 
    navigator: PropTypes.object.isRequired, 

  } 

  constructor(props, context) { 
    super(props, context);

    this.navigator = this.props.navigator;
    const {state} = this.navigator;
    this.sesion = this.props.sesion ? this.props.sesion : null;

    if (this.sesion == null) {

    this.sesion = {
            id_user: store.getState().todos.id, 
            token: store.getState().todos.token,
            pass: store.getState().todos.pass,
          }


   }

    this.state = {
      id_user: this.sesion.id_user,
      token: this.sesion.token,
      loaded: false,
      infoStore : this.props.data,
      id_store: this.props.data.id_store,
      store: this.props.store
    }

  }


  _gotoLogin(){
    //this.props.navigator.push({ component: Login, title: 'Login', name:'Login',passProps:{}  });
    this.navigator.navigate('Login', {screen:'Login'})
  }

  _gotoMapa(){
    this.navigator.navigate('Mapa', {screen:'Mapa', url_store:this.state.infoStore.url_title})
  }


  _setStoreFavorite = (id_store,status,nameStore) => {
    if(this.state.id_user=="" ||  this.state.token=="" || this.state.id_user==undefined ||  this.state.token==undefined){
      Alert.alert(
        'Favoritos',
        'Debes estar logeado para poder agregar este almacen a tu lista de favoritos',
        [
          {text: 'Cancel', onPress: () => debugMe('Cancel Pressed!')},
          {text: 'Login', onPress: () => this._gotoLogin()},
        ]
      )
    }else{
      if(status==0){ status=1; }
      else if(status==1){ status=0; }

      fetch(CONST.URL_AMFPHP, {
        method: 'POST',
        headers: { 'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "serviceName":"amf_mobile_services",
          "methodName":"insertUpdateFavoritesByIdStore",
          "parameters":[id_store,this.state.id_user,status,this.state.token]
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        // if(status==1){
        //   tracker.trackEvent('Favoritos','Agregado - '+nameStore);
        // }else{
        //   tracker.trackEvent('Favoritos','Eliminado - '+nameStore);
        // }

        const {store} = this.state;
        store["favorites"] = status;
        this.setState({store});
        this.props.favoriteCallback();
      })
      .catch((error) => { //Alert.alert( 'Almacenes', 'Problemas obteniendo la información, intenta nuevamente.' );
        Alert.alert(CONST.MALL_NAME, error.message);
      });
    }
  }


  _getTwitter(){
    if(this.state.infoStore.twitter_user!='' && this.state.infoStore.twitter_user!=null){
      var shortUrl = this._getShortUrl(this.state.infoStore.twitter_user, "/");
      return(
        <View style={stores.storesSocialItem}>
          <TouchableOpacity
            style={[interactions.socialCircularButton, interactions.darkBorder,]}
            onPress={() => {
              Linking.openURL("https://twitter.com/" + this.state.infoStore.twitter_user);
            }}
            >
            <CustomIcon name='twitter' size={25} style={text.purple} />
          </TouchableOpacity>
          <Text style={[text.socialNameText, text.regular, text.darkgray, text.center]}>@{shortUrl}</Text>
        </View>
      )
    }else{
      return null;  
    }   
  } 

  _getFB(){
    if(this.state.infoStore.facebook_fp_url!='' && this.state.infoStore.facebook_fp_url!=null){
      var shortUrl = this._getShortUrl(this.state.infoStore.facebook_fp_url, "facebook.com/");
      return(
        <View style={stores.storesSocialItem}>
          <TouchableOpacity
            style={[interactions.socialCircularButton, interactions.darkBorder,]}
            onPress={() => {
              Linking.openURL(this.state.infoStore.facebook_fp_url);
            }}
            >
            <CustomIcon name='facebook' size={25} style={text.purple} />
          </TouchableOpacity>
          <Text style={[text.socialNameText, text.regular, text.darkgray, text.center]}>/{shortUrl}</Text>
        </View>
      )
    }else{
      return null;  
    }
  }

  _getShortUrl = (str, needle) => {
    var n = str.indexOf(needle);
    if (n == -1) {
      return str;
    }
    else {
      return str.substring(n+needle.length, n+needle.length+20);
    }
  }

  _renderContactInfo = () => {
    var info_data = [
      {
        icon: 'map',
        title: 'Local',
        label: this.state.infoStore.nameBuilding.toUpperCase() + ", " + this.state.infoStore.local_label,
        onPress: () => {},
      },
      {
        icon: 'cat-shipping',
        title: 'Correo Electrónico',
        label: this.state.infoStore.email_contacto,
        onPress: () => {},
      },
      {
        icon: 'cat-shipping',
        title: 'Teléfono',
        label: this.state.infoStore.telephones,
        onPress: () => {},
      },
      {
        icon: 'cat-shipping',
        title: 'Página Web',
        label: this.state.infoStore.store_web_site,
        onPress: () => Linking.openURL(this.state.infoStore.store_web_site),
      },
    ];

    var info_map = info_data.map(function(item, key, myArray) {
      return ( item.label?
        <View key={key}>
          <Text style={[text.userName, text.bold, text.darkgray, text.left]}>
            {item.title}
          </Text>
          <TouchableOpacity onPress={item.onPress}>
            <Text style={[text.mainText, text.regular, text.darkgray, text.left]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        </View>
        :null
      );
    });

    return ( <View>{info_map}</View> );
  }

  _parseTime = (attention_time) => {

    //console.log(attention_time);

    if (attention_time=="" || attention_time==null){
      return (<View></View>);
    }
    var time_days = attention_time.split("|");

    var time_map = time_days.map(function(value, key, myArray) {

      time_days[key] = time_days[key].trim();

      var time_hours = time_days[key].split("/");

      return ( time_hours.length>1?
        <View key={key}>
          <Text style={[text.userName, text.bold, text.darkgray, text.left]}>
            {time_hours[0]}
          </Text>
          <Text style={[text.mainText, text.regular, text.darkgray, text.left]}>
            {time_hours[1]}
          </Text>
        </View>
        :null
      )
    });

    return (
      <View>
        {time_map}
      </View>
    );
  }

  render() {

    return (

      <View style={layout.mainContainer}>

        <View style={layout.innerContainer}>

          <TouchableOpacity
            style={[interactions.gralButton, interactions.white, interactions.center]}
            onPress={()=>{this._gotoMapa()}}>
            <CustomIcon name='map' size={25} style={[interactions.buttonIcon, text.purple]} />
            <Text style={[text.buttonLabel, text.semibold, text.purple]}>
              VER EN EL MAPA
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[interactions.gralButton, interactions.white, interactions.center]} 
            onPress={()=>{
              this._setStoreFavorite(this.state.id_store,this.state.store.favorites,this.state.store.nameStore)
            }}>
            <CustomIcon name='heart' size={25} style={[interactions.buttonIcon, text.gray, this.state.store.favorites && text.purple] } />
            <Text style={[text.buttonLabel, text.semibold, text.gray, this.state.store.favorites && text.purple]}>
              {this.state.store.favorites?"REMOVER DE FAVORITOS":"AGREGAR A FAVORITOS"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[layout.separator, layout.light]}></View>

        <View style={layout.innerContainer}>

          { (this.state.infoStore.facebook_fp_url != '' || this.state.infoStore.twitter_user != '' )?

            <View style={stores.storeSocialContainer}>

              {this._getFB()}
              {this._getTwitter()}

            </View>: null

          }

        </View>

        <View style={[layout.separator, layout.light]}></View>

        <View style={layout.innerContainer}>

          { (this.state.infoStore.description != '' && this.state.infoStore.description != null)?
            <HTMLView 
              stylesheet={htmlViewCss} 
              style={stores.storeDescriptionContainer} 
              value={this.state.infoStore.description} />: null
              
          }

        </View>

        <View style={[layout.separator, layout.light]}></View>

        <View style={layout.innerContainer}>
          {this._renderContactInfo()}
        </View>

        <View style={[layout.innerContainer, stores.timetableContainer ]}>
          <Text style={[text.titleText, text.bold, text.darkgray, text.left]}>
            HORARIO
          </Text>
          {this._parseTime(this.state.infoStore.atention_time)}
        </View>

      </View>
      
    );
  }

  renderLoadingView() {
    return(
      <View style={[layout.mainContainer, layout.centerCenter]}>
        <Text style={[text.mainText, text.darkgray, text.center, text.regular]} > Cargando informacion del Almacen ... </Text>
      </View>
    );
  }

}


 
module.exports = StoreDescription;
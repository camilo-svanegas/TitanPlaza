'use strict';

import React, { Component } from 'react'; 
import {PropTypes} from 'prop-types';
import { WebView } from "react-native-webview";

import CustomIcon from './CustomIcon.js'
 
import {  
  Text, 
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'; 

import {
  debugMe
} from '../Utilities/Messaging'

import {
  nameCapitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfEachWord,
} from './utility'


const CONST = require('../Constants/constants');


import { layout, text, interactions } from '../Styles/TitanPlaza/Global';

export default  class Mapa2 extends Component {

   constructor(props, context) { 
    super(props, context);

    this.navigator = this.props.navigation;
    const {state} = this.navigator;



    console.log(this.props.route.params);
    if (this.props.route.params) {
      this.route = this.props.route.params["route"]? this.props.route.params["route"]: null;
      this.token = this.props.route.params["token"]? this.props.route.params["token"]: null;
      this.id_user = this.props.route.params["id_user"]? this.props.route.params["id_user"]: null;
      this.pass = this.props.route.params["pass"]? this.props.route.params["pass"]: null;
      this.url_store = this.props.route.params["url_store"]? this.props.route.params["url_store"]: null;
    }

    this.state = {
      loaded: false,
      url_store: this.url_store,
    }

    this._Mapa2 = this._Mapa2.bind(this);
  
  } 

  _Mapa2() { 
    this.navigator.navigate('Mapa2', {route:'Mapa2'})
  }


  componentDidMount(){
 
    setTimeout(() => {this.setState({loaded: true})}, 2000);
    setTimeout(() => {debugMe("loaded: true")}, 1000)
  }

  _renderLoading(){
    debugMe("render loading ...");
    return(
      <View style={[layout.mainContainer, layout.centerCenter]}>
        <Text style={[text.mainText, text.darkgray, text.center, text.regular]} > Cargando Mapa ... </Text>
      </View>
    );
  }

  renderLoadingView(){
    return(
      <View style={[layout.mainContainer, layout.centerCenter]}>
        <Text style={[text.mainText, text.darkgray, text.center, text.regular]} > Cargando Mapa ... </Text>
      </View>
    );
  }

  _updateState = (data) => {
    this.setState(data);
  }

    _gotoStoresDetailsContainer(id_store){

    //console.log(event)

    //name = capitalizeFirstLetterOfEachWord(name);
    this.navigator.navigate('StoreDetails', {screen:'StoreDetails', sesion:this.sesion, store:null, id: id_store, name_store:null, favoriteCallback:()=>this._getStores(this.state.selectCatID), tabIndex:0 })
  }

  render() {

    let url_mapa = CONST.MAPA_SOURCE_URL;
  
    //const jsEvent = 'window.ReactNativeWebView.postMessage("Hello!")'

    if (this.state.url_store!=null) {
      url_mapa = CONST.MAPA_SOURCE_URL+'almacen/'+this.state.url_store;
    }

     console.log("url_mapa",url_mapa)

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }



    return (
      <View style={layout.mainContainer}>

        <View style={{flex: 1, margin: 0,}}>

          <WebView 
            javaScriptEnabled={true} 
            domStorageEnabled={true} 
            decelerationRate="normal" 
            renderLoading = {this._renderLoading} 
            scrollEnabled = {false} 
            onLoad = {()=>{ this._updateState({loaded:true}) }}
            source={{uri:url_mapa}}
            cacheMode={'LOAD_NO_CACHE'}
            cacheEnabled={false}
           // injectedJavaScript={jsEvent}
            onMessage={(event) => {
             
            this._gotoStoresDetailsContainer(event.nativeEvent.data);
          }}
          />

        </View>

       

      </View>
    );
  }
}
 
module.exports = Mapa2;
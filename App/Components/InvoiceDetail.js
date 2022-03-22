'use strict';

import React, { Component } from 'react'; 
import {PropTypes} from 'prop-types';
 
import {  
  Text, 
  WebView, 
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  SafeAreaView,
  Modal,
  Alert,
} from 'react-native'; 


import {
  debugMe
} from '../Utilities/Messaging'
 

import { 
  colors,  
  newVoucer ,
  interactions,
  text,
  forms
} from '../Styles/TitanPlaza/Global';

import { CAMPAINGS } from '../Styles/global';
import { LOGIN } from '../Styles/global';

import ImageViewer from 'react-native-image-zoom-viewer';

const CONST = require('../Constants/constants');


import store from '../Reducers/store.js';

var styles= require('../Styles/MyStyles');

export default  class InvoiceDetail extends Component {

  constructor(props, context) {

    super(props, context);

    this.navigator = this.props.navigation;
    const {state} = this.navigator;

    this.state = {
      //_BASE_URL: 'http://192.168.0.14/codelabs/centros-comerciales/plaza-imperial/site/www/',
      userId: store.getState().todos.id,
      token: store.getState().todos.token,
      loaded: false,
      modalVisible: false,
      invoice: this.props.route.params["invoice"] ? Object.assign({}, this.props.route.params["invoice"]): [] ,
      id_invoice: this.props.route.params["id_invoice"] ? this.props.route.params["id_invoice"] : null
    }
  
  } 

  componentDidMount(){
    //tracker.trackScreenView('InvoiceDetail');
   // console.log("this.state.id_invoice",this.state.id_invoice);
    if (this.state.id_invoice > 0 && this.state.id_invoice != null) {
      this.getInvoices()
    }else{
       this.setState({
        loaded: true,
      });
    }
  }

  getInvoices = () =>{
   // console.log(this.state.userId);
   // console.log(this.state.token);

    fetch(CONST.URL_AMFPHP, { 
      method: 'POST', 
      headers: { 'Accept': 'application/json', 
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ 
        "serviceName":"amf_mobile_invoice_services",
        "methodName":"getInvoice",
        "parameters":[this.state.userId,this.state.token,this.state.id_invoice,0,-1]
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
     // console.log(responseJson[0].image_invoice)


      let e = responseJson[0];
      this.setState({
        invoice:{
          image: e.image_invoice,
          value: e.value_invoice,
          code: e.number_invoice,
          storeId: e.id_store,
          store: e.store_name,
          campaign: e.campaign,
          state: e.state,
          stateColor: this._getColorState(e.state),
          stateText: this._getTextState(e.state),
          date: e.date_invoice,
          approvalDate: e.date_invoice, // pendinete
          reasonRejection: null
        },
        loaded: true,
      });
    })
  }

   _getColorState(state){
    if(state == 1){
      return 'green'
    }else if(state == 2){
      return 'red'
    }else{
      return 'yellow'
    }
  }
  
  _getTextState(state){
    if(state == 1){
      return 'Aprobado'
    }else if(state == 2){
      return 'Rechazado'
    }else{
      return 'Pendiente'
    }
  }


  renderLoadingView(){
    return(
      <View style={styles.container}>
        <Text> Cargando detalle de la factura ... </Text> 
      </View>
    );
  }

  render() {

     if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    
    return (
      <SafeAreaView style={[newVoucer.mainContainer,{flex:1, backgroundColor: colors.white}]}> 
      <ScrollView style={[{margin:10 }]} >

        <Modal visible={this.state.modalVisible} transparent={true}>
            
            <ImageViewer imageUrls={[{ url: CONST.BASE_URL + this.state.invoice.image}]} onClick={()=>{ this.setState({modalVisible: false});}} />           
        
        </Modal>
         <View style={[newVoucer.containerImage, { height: 277 }]}>
          <TouchableOpacity onPress={()=>{ this.state.invoice.image?this.setState({modalVisible: true}):null;}} >
             <Image
               style={{width: '100%', height: '100%'}}
               source={{uri: CONST.BASE_URL + this.state.invoice.image}}
             />   
          </TouchableOpacity>
        </View>
        <View style={[newVoucer.row, {marginTop: 30}]}>
          <View style={newVoucer.column}>
            <Text style={[text.semibold]}>
              Almacen
            </Text>  
          </View>
          <View style={newVoucer.column}>
            <Text style={[text.semibold]}>
              Valor de la compra
            </Text> 
          </View>
          {/* NOMBRE DE LA TIENDA */}
          <View style={newVoucer.column}>
            <Text style={[text.semibold]}>
              {this.state.invoice.store}
            </Text>  
          </View>
          {/* VALOR DE LA FACTURA */}
          <View style={newVoucer.column}>
            <Text style={[text.semibold]}>
              $ {this.state.invoice.value}
            </Text> 
          </View>  
        </View>

        <View style={[newVoucer.row, {marginTop: 30}]}>
          <View style={newVoucer.column}>
            <Text style={[text.semibold]}>
              Fecha
            </Text>  
          </View>
          <View style={newVoucer.column}>
            <Text style={[text.semibold]}>
              Código
            </Text> 
          </View>
          {/* FECHA  DE LA FACTURA */}
          <View style={newVoucer.column}>
            <Text style={[text.semibold]}>
              {this.state.invoice.date}
            </Text>  
          </View>
          {/* CÓDIGO DE LA FACTURA */}
          <View style={newVoucer.column}>
            <Text style={[text.semibold]}>
              {this.state.invoice.code}
            </Text> 
          </View>         
        </View>

        <View style={[newVoucer.row, {marginTop: 30}]}>
          <View style={newVoucer.column}>
            <Text style={[text.semibold]}>
              Estado
            </Text>  
          </View>
          <View style={newVoucer.column}>
            <Text style={[text.semibold]}>
              Fecha de Aprobación
            </Text> 
          </View>
          {/* NOMBRE DE LA TIENDA */}
          <View style={newVoucer.column}>
            <Text style={[text.semibold, {color: this.state.invoice.stateColor}]}>
              {this.state.invoice.stateText}
            </Text>  
          </View>
          {/* VALOR DE LA FACTURA */}
          <View style={newVoucer.column}>
            <Text style={[text.semibold]}>
              {this.state.invoice.approvalDate}
            </Text> 
          </View>  
        </View>

      </ScrollView>
      </SafeAreaView>
    );
  }
}
 
module.exports = InvoiceDetail;
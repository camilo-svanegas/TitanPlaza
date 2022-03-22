'use strict';

import React, { Component } from 'react';
import {PropTypes} from 'prop-types';

import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView
} from 'react-native';
import { 
  colors,
  text,
  invoices,
  layout,
  spacers,
 } from '../Styles/TitanPlaza/Global';
 import store from '../Reducers/store.js';

import { FILTER } from '../Styles/global';
import { CAMPAINGS } from '../Styles/global';


const CONST = require('../Constants/constants');


var styles= require('../Styles/MyStyles');

export default  class Invoices extends Component { 

  constructor(props, context) {
    super(props, context);
    this.navigator = this.props.navigation;
    const {state} = this.navigator;

    this.state = {
      //_BASE_URL: 'http://192.168.0.14/codelabs/centros-comerciales/plaza-imperial/site/www/',
      userId: store.getState().todos.id,
      token: store.getState().todos.token,
      loaded: false,
      invoices: [],
    }

  } 
  
  renderLoadingView = () =>{
    return(
       <View style={[layout.mainContainer, layout.centerCenter]}>
        <Text style={[text.mainText, text.darkgray, text.center, text.regular]} > Cargando información ... </Text>
      </View>
    );
  }

  renderNoItems = () =>{
    return(
      <View style={[layout.mainContainer, layout.centerCenter]}>
        <Text style={[text.mainText, text.darkgray, text.center, text.regular]} > No hay facturas registradas. </Text>
      </View>
    );
  }

  componentDidMount = () =>{
    this.getInvoices()
    //console.log(this.state.token);
  }
  showInvoiceDetail = (invoice) => {
    
    this.navigator.navigate('InvoiceDetail', {screen:'InvoiceDetail', sesion:this.sesion, invoice: invoice })
  }

  getInvoices = () =>{
    //console.log(this.state.userId);
    //console.log(this.state.token);

    fetch(CONST.URL_AMFPHP, { 
      method: 'POST', 
      headers: { 'Accept': 'application/json', 
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ 
        "serviceName":"amf_mobile_invoice_services",
        "methodName":"getInvoice",
        "parameters":[this.state.userId,this.state.token, 0,0,-1]
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson)

      responseJson.forEach(e=>{
        var invoice = {
          image: e.image_invoice,
          value: e.value_invoice+"",
          code: e.number_invoice+"",
          storeId: e.id_store,
          store: e.store_name+"",
          campaign: e.campaign,
          state: e.state,
          stateColor: this._getColorState(e.state),
          stateText: this._getTextState(e.state),
          date: e.date_invoice+"",
          approvalDate: e.date_invoice, // pendinete
          reasonRejection: null
        }
        this.state.invoices.push(invoice);
      })
      this.setState({
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
  
  renderItemList= (voucher) =>{

    return(
      
      <TouchableOpacity 
      onPress={()=> this.showInvoiceDetail(voucher)}>
        <View style={invoices.storeItem}>

          {voucher.image.length == 0 
            ? <Text style={[text.gray, invoices.imageItem, layout.centerCenter]}>Sin imagén.</Text>
            : <Image style={invoices.imageItem} source={{uri: CONST.BASE_URL + voucher.image}}
          />
          }  

          <View style={invoices.infoItemContainer}>
            <Text style={text.gray}>{voucher.date}</Text>
            <Text style={text.semibold}>{voucher.store}</Text>
            <Text style={text.semibold}>${voucher.value}</Text>
            <Text 
            style={[{color: voucher.stateColor}]}>
            {voucher.stateText}
            </Text>
             <Text style={text.semibold}>{voucher.campaign}</Text>
          </View>
    

        </View>

      </TouchableOpacity>
    );
  }

  render() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }else if(this.state.invoices.length == 0){
      return this.renderNoItems();
    }

    return(
      <SafeAreaView style={invoices.containerList}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.invoices}
            renderItem={({item}) => this.renderItemList(item)}
          />
      </SafeAreaView>
    );
  }

}


module.exports = Invoices;
'use strict';

import React, { Component } from 'react';
 
import {  
  Text, 
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Linking,
  PermissionsAndroid
  
} from 'react-native';

import Autocomplete from 'react-native-autocomplete-input';

import { CommonActions, DrawerActions, StackActions } from '@react-navigation/native';
 
import CustomIcon from './CustomIcon.js';

import CheckBox from 'react-native-check-box'

import { 
  colors,  
  createVoucer,
  interactions,
  text,
  forms,
  layout,
  homeLayout,
  spacers,
} from '../Styles/TitanPlaza/Global';
import store from '../Reducers/store.js';
import DatePicker from 'react-native-datepicker'
import ModalSelector from 'react-native-modal-selector'

const CONST = require('../Constants/constants');


var styles= require('../Styles/MyStyles');
import { FILTER } from '../Styles/global';

export default  class InvoiceCreate extends Component {
  constructor(props, context) {

  super(props, context);

  this.navigator = this.props.navigation;
  const {state} = this.navigator;

  if (this.props.route.params) {
         this.sesion = this.props.route.params["sesion"]? this.props.route.params["sesion"]: null;
  }

  if (this.sesion == null) {

    this.sesion = {
            id_user: store.getState().todos.id, 
            token: store.getState().todos.token,
            pass: store.getState().todos.pass,
          }


  }

  this.state = {
    // userId: store.getState().todos.id,
    // token: store.getState().todos.token,
    loaded: false,
    displayQuery: 'none',
    query: '',
    _getStores: null,
    campaigns:[],
    infoCampaign: this.props.route.params["infoCampaign"]? this.props.route.params["infoCampaign"]: null,
    invoice: {
      image: this.props.route.params["imageInvoice"]? this.props.route.params["imageInvoice"]: null,
      store: {},
      value: 0,
      date: null,
      code: null
    },
    isChecked: false,
    idSelectCampaign : 0,
    urlTermCampaign : null,
    stores: [],
    error:{
      store: false,
      value: false,
      date: false,
      code: false,
    },
  }

  this._registerInvoice = this._registerInvoice.bind(this);
  this._resetInvoice = this._resetInvoice.bind(this);
}


componentDidMount(){

   if(this.sesion.id_user=="" ||  this.sesion.token=="" || this.sesion.id_user==undefined ||  this.sesion.token==undefined){

      Alert.alert(
              'Facturas',
              'Debes estar logeado para poder ingesar facturas.',
              [
                {text: 'Cancel', onPress: () => { this.setState({noFavorites:true})}},
                {text: 'Login', onPress: () => this._gotoLogin()},
              ]
          )

    }

  else if ( this.state.invoice.image == null){
     Alert.alert(
          'CRM',
          'Problemas al cargar la información, por favor vuelva a intentalo.',
          [
            {text: 'OK', onPress: () => this._gotoHome()}
          ]
      );
  }else if (this.state.infoCampaign == null){
    this._getCampaigns()
  }else{
    this.setState({idSelectCampaign: this.state.infoCampaign.id_campaigns, urlTermCampaign: this.state.infoCampaign.terms_conditions})
    this.setState({loaded:true})
  }
}


 _getCampaigns(){


      fetch( CONST.URL_AMFPHP, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'serviceName':'amf_mobile_invoice_services',
          'methodName': 'getCampaigns',
          "parameters":[this.sesion.id_user,this.sesion.token,0,0,1]
        })
      } )
      .then((response)=>response.json())
      .then((responseJson)=>{
      
        
        if(responseJson==-1){

           Alert.alert(
              'Facturas',
              'Debes estar logeado para poder ingesar facturas.',
              [
                {text: 'Cancel', onPress: () => { this.setState({noFavorites:true})}},
                {text: 'Login', onPress: () => this._gotoLogin()},
              ]
          )

        }
       
        this.setState({campaigns:responseJson});
        //console.log(this.state.campaigns);

        let camps = []

        responseJson.forEach(function(item){

          camps.push({"label":item.name, "key": item.id_campaigns});

        }) 

            this.setState({
              
              dataCampaigns: camps,
              loaded: true
            })

          
        
      })
      .catch((error) => { 

          Alert.alert( 'Factura', 'Problemas obteniendo la información, intenta nuevamente.' ); 
          //Alert.alert(CONST.MALL_NAME, error.message);
          //console.warn(error); 
        });
    }

 _getCampaignsTerms(id_campaigns){

   

    if (this.state.infoCampaign==null){
      let cam = this.state.campaigns.find(o=>o.id_campaigns === id_campaigns)
      //console.log(cam)
      this.setState({infoCampaign:cam})
    }
    



      fetch( CONST.URL_AMFPHP, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'serviceName':'amf_mobile_invoice_services',
          'methodName': 'getTermCampaign',
          "parameters":[this.sesion.id_user,this.sesion.token,id_campaigns]
        })
      } )
      .then((response)=>response.json())
      .then((responseJson)=>{
      if (responseJson){
          this.setState({
            urlTermCampaign  : responseJson
          })
      }      
        
      })
      .catch((error) => { 
          Alert.alert( 'Factura', 'Problemas obteniendo la información, intenta nuevamente.' ); 
        });
    }

 _gotoHome(){
    
    this.navigator.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: "Home",
                  params: { route:"Home" },
                }
              ],
            })
          )
  } 

  _gotoInvoiceDetail(id_invoice){

    if (this.state.infoCampaign.campaign_type ==  "CRM") {

       this.navigator.dispatch(
            CommonActions.reset({
              index: 2,
              routes: [
                {
                  name: "Home",
                  params: { route:"Home", sesion:this.sesion },
                },
                {
                  name: "CRMProfile",
                  params: { route:"CRMProfile", sesion:this.sesion, newInvoice:true},
                }, 
                {
                  name: "InvoiceDetail",
                  params: { route:"InvoiceDetail", sesion:this.sesion, id_invoice: id_invoice },
                },
              ],
            })
          )

    }else{

       this.navigator.dispatch(
            CommonActions.reset({
              index: 2,
              routes: [
                {
                  name: "Home",
                  params: { route:"Home", sesion:this.sesion },
                },
                {
                  name: "CampaignDetail",
                  params: { route:"CampaignDetail", sesion:this.sesion,  infoCampaign:this.state.infoCampaign, newInvoice:true},
                }, 
                {
                  name: "InvoiceDetail",
                  params: { route:"InvoiceDetail", sesion:this.sesion, id_invoice: id_invoice },
                },
              ],
            })
          )

    }
    
   
  }

renderLoadingView(){
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

  _registerInvoice(){
    var _prevent = false;

   // console.log("this.state.invoice.store",this.state.invoice.store)
   // console.log("this.state.invoice.store.length",Object.keys(this.state.invoice.store).length)

    if(Object.keys(this.state.invoice.store).length == 0) {
      this.state.error.store = true;
      _prevent = true;
    }else{
      this.state.error.store = false;
    }

    if(this.state.invoice.value <= 0 ){
      this.state.error.value = true;
      _prevent = true;
    }else{
      this.state.error.value = false;
    }
    
    if(this.state.invoice.date == null || this.state.invoice.date == '' ){
      this.state.error.date = true;
      _prevent = true;
    }else{
      this.state.error.date = false;
    }

    if(this.state.invoice.code == null  || this.state.invoice.code == ''){
      this.state.error.code = true;
      _prevent = true;
    }else{
      this.state.error.code = false;
    }

    if(this.state.idSelectCampaign == null  || this.state.idSelectCampaign == ''){
      
      _prevent = true;
      Alert.alert("Factura","Selecciona la campaña para asignarle la factura.") 
    }

    if(!this.state.isChecked ){
      _prevent = true;
      Alert.alert("Factura","Debes aceptar los términos y condiciones.")  
    }

    let term = this.state.isChecked ? 1:0;
    //let isCampaign = this.state.infoCampaign.id_campaigns? this.state.infoCampaign.id_campaigns: idSelectCampaign



    this.setState({error: this.state.error});

    // console.log(this.sesion.id_user);
    // console.log(this.sesion.token);
    // console.log(this.state.invoice.store.id_store);
    // console.log(this.state.invoice.code);
    // console.log(this.state.invoice.value);
    // console.log(this.state.invoice.date);
    // console.log(this.state.idSelectCampaign);
    // console.log(term);
    //console.log(this.state.invoice.image.data);

    var JSONSend = JSON.stringify({ 
      "serviceName":"amf_mobile_invoice_services",
      "methodName":"saveInvoice",
      "parameters":[this.sesion.id_user,this.sesion.token,this.state.idSelectCampaign,this.state.invoice.image.data, this.state.invoice.store.id_store, this.state.invoice.code, this.state.invoice.value, this.state.invoice.date, term, '']
    })

    if (!_prevent) {

      this.setState({loaded:false})
      fetch(CONST.URL_AMFPHP, { 
        method: 'POST', 
        headers: { 'Accept': 'application/json', 
          'Content-Type': 'application/json', 
        },
        body: JSONSend
      })
      .then((response) => response.json())
      .then((responseJson) => {

        let msnAlert = "Por favor revisar los datos de la Factura.";

        if (responseJson > 0) {
          msnAlert = "Su factura fue registrada correctamente, pronto será validada por nuestro equipo."
        }

        if (responseJson==-5) {
          msnAlert = "Por favor revisar el valor de Factura."
        }

        if (responseJson==-6) {
          msnAlert = "Por favor revisar el fecha de Factura."
        }

        if (responseJson==-4) {
          msnAlert = "Por favor revisar el Número de Factura."
        }

        if (responseJson==-9) {
          msnAlert = "Por favor subir de nuevo la foto de la Factura."
        }


        Alert.alert(
          'CRM',
          msnAlert,
          [
            {text: 'OK', onPress: () => {
                if (responseJson > 0) {
                   this._gotoInvoiceDetail(responseJson)
                }else{
                  return false;
                }
              }
             
            }
          ]
      );

      }).catch(err => { 
        this.setState({loaded:true})
        Alert.alert( 'Factura', 'Problemas obteniendo la información, intenta nuevamente.' ); 
      });
    }
  }

  setDate = (date) => {
    this.setState({
      invoice: {
        image: this.state.invoice.image,
        store: this.state.invoice.store,
        value: this.state.invoice.value,
        date: date,
        code: this.state.invoice.code
      }
    })
  }

  setStore = (_store) => {
    //console.log(_store)
    this.state.error.store = false;
    this.setState({
      displayQuery: 'none',
      query: _store.name,
      invoice: {
        image: this.state.invoice.image,
        store: Object.assign({}, _store),
        value: this.state.invoice.value,
        date: this.state.invoice.date,
        code: this.state.invoice.code
      }
    })
  }
  getStores = (_query) => {
    this.setState({
      query: _query,
      displayQuery: 'flex'
    });
    window.clearInterval(this.state._getStores);
    if(_query != '' || _query != null){
      this.state._getStores = window.setTimeout(() => {
        fetch(CONST.URL_AMFPHP, {
          method: 'POST',
          headers: { 'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "serviceName":"map_services",
            "methodName":"get_stores_like_name",
            "parameters":[_query, '', '', '']
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          //console.log('tiendassss!!! ', responseJson)
          this.setState({
            stores: responseJson,
          });
        })
        .catch((error) => {
           Alert.alert( 'Factura', 'Problemas obteniendo la información, intenta nuevamente.' ); 
        });
      }, 500);
    } else {
      this.setState({
        stores: [],
        displayQuery: 'none'
      });
    }
  }
  _gotoCRMProfile = () => { 
    this.navigator.navigate('CRMProfile', {route:'CRMProfile'});
  }

  openLink(urlGoTo){
    //console.log(urlGoTo)
    Linking.canOpenURL(urlGoTo).then(supported => { 
      if (supported) { 
        Linking.openURL(urlGoTo); 
      } else { 
        debugMe('Don\'t know how to open URI: ' + urlGoTo); 
      } 
    }).catch(err => console.error('An error occurred', err));
  } 

  _resetInvoice = ()=>{
    this.props.navigation.state.params.reset = false;
    this.setState({
      invoice: {
        image: this.props.navigation.state.params.imageInvoice,
        store: '',
        value: 0,
        date: null,
        code: null
      },
    })
  }

   _updateState = (data) => {
        this.setState(data);
    }

  _renderCampaigns = ()=>{

    if(this.state.infoCampaign != null){

      return (
          <TextInput
                      ref='name' 
                      autoCapitalize="none"  
                      style={[forms.mainInput, forms.darkInput ]}
                      underlineColorAndroid="transparent" 
                      value = {this.state.infoCampaign.name}
                      editable = {false}
                    />

      )

    }

    if ( this.state.dataCampaigns.length > 0 ){

      console.log("this.state.dataCampaigns",this.state.dataCampaigns);

        return (
             <ModalSelector 
                            data={this.state.dataCampaigns}
                            onChange={(option)=>{
                                this._updateState({selectCampaign:option.label, idSelectCampaign:option.key})
                                this._getCampaignsTerms(option.key)
                            }}>
                            <View style={[forms.mainInput, forms.darkInput]}>
                                <Text>
                                  {this.state.selectCampaign} 
                                </Text>
                            </View>
                        </ModalSelector>
        )
    }

  }

  render() {
    if(this.props.route.params.reset) this._resetInvoice();

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (

      <ScrollView style={createVoucer.mainContainer}  keyboardShouldPersistTaps={true} nestedScrollEnabled={true} >
        
        <View style={createVoucer.containerImage}>
          {
            this.state.invoice.image === null ?
            <View>
              <Text>Not image</Text>
            </View>
            :
            <Image
            style={{width: '100%', height: '100%'}}
            source={this.state.invoice.image}
            />
            
          }
          <CustomIcon name='alert' size={30} style={[text.black]} />
        </View>
        <View style={createVoucer.containerForm}>


          <View style={[forms.inputGroup,{zIndex: 3}]}>
            <View style={[forms.inputLabelCont, {marginBottom: -5}]}>
              <Text style={[text.inputLabel, text.regular, text.black]}>
                Almacen
              </Text>
            </View>
            
            <Autocomplete
            keyboardShouldPersistTaps={true}
              nestedScrollEnabled={true}
              data={this.state.stores}
              defaultValue={this.state.query}
              containerStyle={{zIndex: 3}}
              inputContainerStyle={[{borderWidth: 0, paddingVertical: 5, zIndex: 3,}]}
              listStyle={{backgroundColor: '#FFF', maxHeight: 150, zIndex: 3, display: this.state.displayQuery}}
              style={[forms.mainInput, this.state.error.store ? forms.darkInputError : forms.darkInput]}
              onChangeText={_query => this.getStores(_query)}
              renderItem={({ item, i }) => (
                <TouchableOpacity 
                style={{borderWidth: 0, zIndex: 3, backgroundColor: 'transparent', paddingVertical: 5, position:'relative'}} 
                onPress={() => this.setStore(item)}>
                  <Text>{item.name+" - "+item.local_label}</Text>
                </TouchableOpacity>
              )}
              >
              </Autocomplete>
          </View>

          <View style={forms.inputGroup}>

            <View style={forms.inputLabelCont}>
              <Text style={[text.inputLabel, text.regular, text.black]}>
                Fecha
              </Text>
            </View>

            <DatePicker
                style={[forms.mainSelect, forms.mainInput, this.state.error.date ? forms.darkInputError : forms.darkInput ]}
                date={this.state.invoice.date}
                mode="date"
                showIcon= {false}
                placeholder="Fecha de compra"
                format="YYYY-MM-DD"
                minDate="2018-01-01"
                //maxDate={today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()}
                confirmBtnText="Aceptar"
                cancelBtnText="Cancelar"
                customStyles={{
                dateInput: {
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    borderWidth: 0,
                }
                // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.setDate(date) }}/>

            <View style={forms.validateIconCont}>
                <CustomIcon name='calendar' size={18} style={text.darkgray} />
            </View>

          </View>


          <View style={forms.inputGroup}>
            <View style={forms.inputLabelCont}>
              <Text style={[text.inputLabel, text.regular, text.black]}>
                Valor
              </Text>
            </View>

            <TextInput
              ref='name' 
              autoCapitalize="none"  
              style={[forms.mainInput, this.state.error.value ? forms.darkInputError : forms.darkInput ]}
              onChangeText={(text) => this.state.invoice.value = text}
              placeholder='Valor de la factura'
              placeholderTextColor= "#B8BDCC"
              underlineColorAndroid="transparent"
              keyboardType={'numeric'}
            />
          </View>

          <View style={forms.inputGroup}>
            <View style={forms.inputLabelCont}>
              <Text style={[text.inputLabel, text.regular, text.black]}>
                Número de transacción
              </Text>
            </View>

            <TextInput
              ref='name' 
              autoCapitalize="none"  
              style={[forms.mainInput, this.state.error.code ? forms.darkInputError : forms.darkInput ]}
              onChangeText={(text) => this.state.invoice.code = text}
              placeholder='Número o código de la transacción'
              placeholderTextColor= "#B8BDCC"
              underlineColorAndroid="transparent" 
            />
          </View>
        
          <View style={forms.inputGroup}>
                    <View style={forms.inputLabelCont}>
                      <Text style={[text.inputLabel, text.regular, text.black]}>
                        Campaña
                      </Text>
                    </View>

                   {this._renderCampaigns()}
                  </View>

             <View style={forms.inputGroup}>
                <CheckBox
                  style={[{flex: 1, padding: 10} ]}
                  onClick={()=>{
                    this.setState({
                        isChecked:!this.state.isChecked
                    })
                  }}
                  isChecked={this.state.isChecked}
                  rightText="Acepta términos y condiciones."
                  checkedImage={<Image source={require('../Img/titan_plaza/forms/checkbox_on.png')}/>}
                  unCheckedImage={<Image source={require('../Img/titan_plaza/forms/checkbox_off.png')}/>}
              />
              { this.state.urlTermCampaign != null &&
                <TouchableOpacity onPress = {()=>this.openLink(CONST.BASE_URL+'campaigns/term/'+this.state.urlTermCampaign)} >
                  <Text style={[text.inputLabel, text.regular, text.purple, text.center]}> Ver Términos y condiciones aquí.</Text>
                </TouchableOpacity>
              }
            

                  </View>

        </View>

        <View style={{marginTop: 25, marginBottom: 80}}>
          <TouchableOpacity
            style={[
              interactions.gralButton,
              interactions.purple,
              interactions.center
            ]}
            onPress={this._registerInvoice}
          >
            <Text style={[text.semibold, text.white]}>
              Registrar Factura
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[interactions.center, {marginBottom: 320}]}
            onPress={this._gotoCRMProfile}
          >
            <Text style={[text.semibold, {textAlign: 'center'}]}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
 
module.exports = InvoiceCreate;
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
  ScrollView,
  Platform,
  Linking,
  FlatList,
  Modal
} from 'react-native'; 

import { 
  colors, 
  primaryGradient,  
  CRM , 
  text,
  interactions,
  carteleras,
  layout,
  invoices,
  spacers,
  homeLayout,
  Modals,
} from '../Styles/TitanPlaza/Global';


import {
  debugMe
} from '../Utilities/Messaging'
 
 import {
  getMonthName,
} from './utility'

import CustomIcon from './CustomIcon.js'
import { CAMPAINGS } from '../Styles/global';
import { BILLS } from '../Styles/global';
import store from '../Reducers/store.js';
import HTMLView from 'react-native-htmlview';

var ImagePicker = require('react-native-image-picker');

//const VoucherInfo = require('./VoucherInfo');

const CONST = require('../Constants/constants');

var styles= require('../Styles/MyStyles');

export default  class CampaignDetail extends Component {

  constructor(props, context) {

    super(props, context);

    this.navigator = this.props.navigation;
    

    this.infoCampaign = [];

    if (this.props.route.params["infoCampaign"]) {
        this.infoCampaign = this.props.route.params["infoCampaign"]? this.props.route.params["infoCampaign"]: null;
    }

    if (this.props.route.params) {
      this.sesion = this.props.route.params['sesion']?this.props.route.params['sesion']:null;
      this.newInvoice = this.props.route.params['newInvoice']?this.props.route.params['newInvoice']:false;
    }

    if (this.sesion == null) {
        this.sesion = {
          id_user: store.getState().todos.id,   
          token: store.getState().todos.token,
          pass: store.getState().todos.pass
        }  
      }

    this.state = {
      loaded: true,
      infoCampaign: this.infoCampaign,  
      invoices: [],
      tickets: [],
      modalVisible: false,
      ticketsAvailable : false,
      valTotalTicketsUser: false,
      totalTicketsAvailable: 0,
    }

    this.takePhoto = this.takePhoto.bind(this);
    this.selectPhoto = this.selectPhoto.bind(this);

  
  }

  componentDidMount(){
    //console.log(this.newInvoice);
    //tracker.trackScreenView('CampaignDetail');
    
     this.getInvoices()
     this.getTickets()
     this.getAddInvoiceValidate()
  }

  componentDidUpdate(prevProps) {
    console.log(this.newInvoice)
    console.log(prevProps.route.params['newInvoice'])

   // this.newInvoice = prevProps.route.params['newInvoice']?prevProps.route.params['newInvoice']:false;

    if (this.newInvoice !== prevProps.route.params['newInvoice']) {
      if (this.newInvoice === true) {
        this.setState({newInvoice:false});
        this.getInvoices()
        this.getTickets()
        this.getAddInvoiceValidate()

      }
       
    }

}

componentWillUnmount(){
  this.setState({newInvoice:false});
}

  getAddInvoiceValidate = () =>{
   
    fetch(CONST.URL_AMFPHP, { 
      method: 'POST', 
      headers: { 'Accept': 'application/json', 
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ 
        "serviceName":"amf_mobile_invoice_services",
       "methodName":"getValidateAddInvoice",
       "parameters":[this.sesion.id_user,this.sesion.token,JSON.stringify(this.state.infoCampaign)]
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log("getAddInvoiceValidate",responseJson);

      this.setState({
        ticketsAvailable : responseJson['ticketsAvailable'],
        valTotalTicketsUser: responseJson['valTotalTicketsUser'],
        totalTicketsAvailable: responseJson['totalTicketsAvailable'],
      });

    })
  }


  getTickets = () =>{
   
    fetch(CONST.URL_AMFPHP, { 
      method: 'POST', 
      headers: { 'Accept': 'application/json', 
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ 
        "serviceName":"amf_mobile_invoice_services",
       "methodName":"getTicketsUser",
       "parameters":[this.sesion.id_user,this.sesion.token,this.state.infoCampaign.id_campaigns,this.state.infoCampaign.id_campaign_type,true]
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("getTickets",responseJson)
     
      this.setState({
        loaded: true,
        tickets: responseJson
      });

      ////console.log("getInvoices",this.state.invoices)

    })
  }

  getInvoices = () =>{
   
    fetch(CONST.URL_AMFPHP, { 
      method: 'POST', 
      headers: { 'Accept': 'application/json', 
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ 
        "serviceName":"amf_mobile_invoice_services",
         "methodName":"getInvoice",
        "parameters":[this.sesion.id_user,this.sesion.token, 0,this.state.infoCampaign.id_campaigns,-1]
       
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      ////console.log("getTickets",responseJson)

      responseJson.forEach(e=>{
        var invoice = {
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
        }
        this.state.invoices.push(invoice);
      })
      this.setState({
        loaded: true,
      });

      ////console.log("getInvoices",this.state.invoices)

    })
  }


    openLink(urlNews){
    Linking.canOpenURL(urlNews).then(supported => { 
      if (supported) { 
        Linking.openURL(urlNews); 
      } else { 
        //debugMe('Don\'t know how to open URI: ' + urlNews); 
      } 
    });
  }  

  selectPhoto() {
     const options = {
      quality: 1.0,
      maxWidth: 1000,
      maxHeight: 1000,
      includeBase64:true,
      storageOptions: {
        skipBackup: true
      }
    };



    // Open Image Library:
    ImagePicker.launchImageLibrary(options, (response)  => {
       if (response.didCancel) {
          //console.log('User cancelled image picker');
          
        }
        else if (response.error) {
          //console.log('ImagePicker Error: ', response.error);
           

        }
        else if (response.customButton) {
          //console.log('User tapped custom button: ', response.customButton);
          

        }
        else {

          this.setState({
              loaded:true,
          }) 

          let source = { uri: response.uri };
          
          if (Platform.OS === 'android') {
            source = {uri: response.uri, isStatic: true, data: response.base64};
          } else {
            source = {uri: response.uri.replace('file://', ''), isStatic: true, data: response.base64};
          }
            this._gotoInvoiceCreate(source);
        }
    });

  }

  takePhoto() {
    const options = {
      quality: 1.0,
      maxWidth: 1000,
      maxHeight: 1000,
      includeBase64:true,
      storageOptions: {
        skipBackup: true
      }
    };

    // Launch Camera:
    ImagePicker.launchCamera(options, (response)  => {
      if (response.didCancel) {
          //console.log('User cancelled image picker');
         
        }
        else if (response.error) {
          //console.log('ImagePicker Error: ', response.error);
         
        }
        else if (response.customButton) {
          //console.log('User tapped custom button: ', response.customButton);
         
        }
        else {

          this.setState({
              loaded:true,
          }) 

          let source = { uri: response.uri };
        
          if (Platform.OS === 'android') {
            source = {uri: response.uri, isStatic: true, data: response.base64};
          } else {
            source = {uri: response.uri.replace('file://', ''), isStatic: true, data: response.base64};
          }

          this._gotoInvoiceCreate(source);
        }
    });

  }

  showInvoiceDetail = (invoice) => {
    
    this.navigator.navigate('InvoiceDetail', {screen:'InvoiceDetail', sesion:this.sesion, invoice: invoice })
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
        <Text> Cargando detalle de la campaña ... </Text> 
      </View>
    );
  }

  _gotoInvoiceCreate = (imageInvoice) => {
    this.setModalVisible(false);
    this.navigator.navigate('InvoiceCreate', {imageInvoice:imageInvoice, infoCampaign:this.state.infoCampaign})

  }


  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
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

  renderTickets =  () =>{

    let tickets = ""

    if (this.state.tickets){
      this.state.tickets.forEach(ticket =>{
          tickets += ticket.number_ticket +" | ";      
      })

      return (<Text>{tickets}</Text>);

    }else{
      return null;
    }

  }

  renderTextValidateCamp = () =>{
  
    if (!this.state.valTotalTicketsUser && this.state.infoCampaign.id_campaign_type==3 && this.state.infoCampaign.state == 1){ 

            return(<Text>Ya te fueron entregados los {this.state.infoCampaign.maxTotalTicketsUser} 
              códigos al correo electrónico registrado, gracias por tu participación. 
              Puedes acumular Puntos Titán registrando más facturas.</Text>)

    }else if (this.state.totalTicketsAvailable==0 && this.state.infoCampaign.id_campaign_type==3 && this.state.infoCampaign.state == 1){ 

           return(<Text>Ya te fueron entregados todos los códigos para la campaña o 
            ya esta no esta disponible para el ingreso de facturas, puedes acumular 
            Puntos Titán registrando más facturas."</Text>)
    }else{
      return null;
    }

  }


  render() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    let dayDateStart = (this.state.infoCampaign.date_start.split('-')[2]).split(' ')[0];
    let dayDateEnd = this.state.infoCampaign.date_end.split('-')[2].split(' ')[0];
    let monthDateStart = getMonthName(this.state.infoCampaign.date_start);
    let monthDateEnd = getMonthName(this.state.infoCampaign.date_end);
    let yearDateStart = (this.state.infoCampaign.date_start.split('-')[0]);
    let yearDateEnd = this.state.infoCampaign.date_end.split('-')[0];
    const { modalVisible } = this.state;
    

    return (
      <ScrollView style={{flex:1, backgroundColor: colors.white}}>

        

        <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible || false}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={[Modals.modalBackground]}>
              <View style={Modals.modalContainer}>
                <Text style={[text.bold, spacers.mb1,spacers.mt1,{color: colors.piPurple}]}>
                  Agregar Factura
                </Text>
                <TouchableOpacity onPress={this.selectPhoto} style={[interactions.gralButton, interactions.purple, interactions.center]}>
                  <View style={[{width: '10%'}]}>
                    <Image
                      style={Modals.ButtonIcon}
                      source={require('../Img/btns/picture.png')}
                    />
                  </View>
                  <Text style={[text.buttonLabel, text.bold, text.center, text.white, {width: '90%'}]}>
                    Cargar de Galería
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.takePhoto} style={[interactions.gralButton, interactions.purple, interactions.center]}>
                  <View style={[{width: '10%'}]}>
                    <Image
                        style={Modals.ButtonIcon}
                        source={require('../Img/btns/camara.png')}
                      />
                    </View>
                  <Text style={[text.buttonLabel, text.bold, text.center, text.white, {width: '90%'}]}>
                    Tomar Foto
                  </Text>
                </TouchableOpacity>

                 <TouchableOpacity onPress={()=>this.setModalVisible(false)} style={[interactions.gralButton, interactions.darkgray, interactions.center]}>
                 
                  <Text style={[text.buttonLabel, text.bold, text.center, text.white]}>
                    Cancelar
                  </Text>
                </TouchableOpacity>

              </View>
            </View>
          </Modal>

        <Text style={CAMPAINGS.TitleCampaing}>
          Sorteo mes de Junio
        </Text>

        <Image
          style={CAMPAINGS.DetailHeaderImageCont}
          source={{uri:CONST.BASE_URL+'campaigns/images/'+this.state.infoCampaign.image}}
        />

        <HTMLView style={CAMPAINGS.DescriptionCampaing} stylesheet={css} onLinkPress={(url) => this.openLink(url)}  value={this.state.infoCampaign.description} addLineBreaks={false} paragraphBreak={""} lineBreak={""} />

        { this.state.infoCampaign.state == 1 &&
        <View style={CAMPAINGS.DateContainer}>
          <View style={CAMPAINGS.cameraButton}>
            <CustomIcon name='calendar' size={20} style={[text.darkgray]} />
          </View>
          <View style={CAMPAINGS.DateTitle}>
              <Text style={text.darkgray, text.bold}>Válido hasta</Text>
              <Text>{dayDateEnd} de {monthDateEnd}, {yearDateEnd}</Text>
          </View>
        </View>
      }

        { this.state.infoCampaign.state == 1 && this.state.ticketsAvailable && this.state.valTotalTicketsUser &&
            <TouchableOpacity onPress={() => {
                this.setModalVisible(true);
              }} style={[interactions.gralButton, interactions.purple, interactions.center, CAMPAINGS.addBill]}>
          <View style={[{width: '10%'}]}>
            <View style={[]}>
              <CustomIcon name='camera' size={20} style={[{color: colors.white}]} />
            </View>
          </View>
          <Text style={[text.buttonLabel, text.bold, text.center, text.white, {width: '90%'}]}>
            Agregar Factura
          </Text>
        </TouchableOpacity>
        }

         { this.state.infoCampaign.state == 2 &&
        <View style={CAMPAINGS.DateContainer}>
          <View style={CAMPAINGS.cameraButton}>
            <CustomIcon name='calendar' size={20} style={[text.darkgray]} />
          </View>
          <View style={CAMPAINGS.DateTitle}>
              <Text style={text.darkgray, text.bold}>Válido hasta</Text>
              <Text>Terminada</Text>
          </View>
        </View>
      }
        
         <View style={CAMPAINGS.DateContainer}>
         
          <View style={CAMPAINGS.DateTitle}>
            
              {this.renderTextValidateCamp()}
          </View>
        </View>

         <View style={CAMPAINGS.DateContainer}>
         
          <View style={CAMPAINGS.DateTitle}>
              <Text style={text.darkgray, text.bold}>Códigos o boletas:</Text>
              {this.renderTickets()}
          </View>
        </View>

        <View style={BILLS.Bills}>
          <Text style={[text.bold, {fontSize: 16}]}>Facturas en esta Campaña
          </Text>
           <FlatList
            keyExtractor={(item, index) => index}
            data={this.state.invoices}
            renderItem={({item}) => this.renderItemList(item)}
          />
        </View>

      </ScrollView>
    );
  }
}

const css = StyleSheet.create({
  p: {
    color: '#1a1a1a',
    fontSize: 16,
    margin: 0,
    padding: 0,
  },
  b: {
    color: '#1a1a1a',
    fontSize: 16,
  },
});

 
module.exports = CampaignDetail;
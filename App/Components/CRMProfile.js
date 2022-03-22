'use strict';

import React, { Component } from 'react'; 
import {PropTypes} from 'prop-types';


import {  
  Text, 
  Modal,
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  ScrollView,
  FlatList,
  Dimensions,
  PermissionsAndroid
} from 'react-native';

import store from '../Reducers/store.js';
import { startSession} from '../Reducers/action';


import { CommonActions, DrawerActions } from '@react-navigation/native';

import CustomIcon from './CustomIcon.js'
import { CAMPAINGS} from '../Styles/global';
import { BILLS} from '../Styles/global';

import { 
  colors, 
  primaryGradient,  
  CRM , 
  text,
  interactions,
  carteleras,
  layout,
  spacers,
  homeLayout,
  Modals,
} from '../Styles/TitanPlaza/Global';

import {
  valAdult,
} from './utility';

var styles= require('../Styles/MyStyles');


const CONST = require('../Constants/constants');

import LinearGradient from 'react-native-linear-gradient';


import {
  debugMe
} from '../Utilities/Messaging'

var ImagePicker = require('react-native-image-picker');
var {height, width} = Dimensions.get('window');

export default  class CRMProfile extends Component {

  constructor(props, context) {

    super(props, context);

    this.navigator = this.props.navigation;
    const {state} = this.navigator;

    this._gotoInvoiceCreate = this._gotoInvoiceCreate.bind(this);
    this._gotoInvoices = this._gotoInvoices.bind(this);
    
    this._gotoLogin = this._gotoLogin.bind(this);

    this.takePhoto = this.takePhoto.bind(this);
    this.selectPhoto = this.selectPhoto.bind(this);

    if (this.props.route.params) {
         this.sesion = this.props.route.params["sesion"]? this.props.route.params["sesion"]: null;
    }

    //console.log("CRMProfile sesion",this.sesion);
    //console.log("CRMProfile  store.getState().todos", store.getState().todos);

    this.state = {
      userId: store.getState().todos.id,
      token: store.getState().todos.token,
      products: [],
      loaded: false,
      infoCRM : [],
      pointsCRM: 0,
      expireDate: "",
      toExpirePoints: 0,
      document_number: "",
      new_h: null,
      width_dim:width
    }

  } 

  componentDidMount(){
    this._valSessionUser();
     if ( Platform.OS === 'android' && Platform.Version >= 23) {
      this.requestCameraPermission().done();  
    }
    
  }

requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Titan Plaza",
        message:
          "Necesitamos acceder a la cámara para poder ingresar la factura.",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
      return true;
    } else {
      console.log("Camera permission denied");
     this._gotoHome()
    }
  } catch (err) {
    console.warn(err);
  }
};

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

    _getCampaignCRM(){

      fetch( CONST.URL_AMFPHP, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'serviceName':'amf_mobile_invoice_services',
          'methodName': 'getCampaigns',
          "parameters":[this.sesion.id_user,this.sesion.token,1,0]
        })
      } )
      .then((response)=>response.json())
      .then((responseJson)=>{
        ////console.log('CRM',responseJson);
        if (responseJson) { 
          this.setState({
            infoCRM: responseJson,
          })

          this._getPointsCRM(responseJson[0]['id_campaigns'])
        }
        
      })
      .catch((error) => { //Alert.alert( 'Almacenes', 'Problemas obteniendo la información, intenta nuevamente.' ); 
          Alert.alert(CONST.MALL_NAME, error.message);
          console.warn(error); 
        });
    }

    _getPointsCRM(id_campaign){

      fetch( CONST.URL_AMFPHP, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'serviceName':'amf_mobile_invoice_services',
          'methodName': 'getPointsCRM',
          "parameters":[this.sesion.id_user,this.sesion.token,id_campaign]
        })
      } )
      .then((response)=>response.json())
      .then((responseJson)=>{
        //debugMe('Points CRM',responseJson);
        if (responseJson) { 
          this.setState({
            pointsCRM: responseJson.totalPoints,
            expireDate: responseJson.expireDate,
            toExpirePoints: responseJson.toExpirePoints,
            document_number: responseJson.user.document_number,
          })
        }
        
      })
      .catch((error) => { //Alert.alert( 'Almacenes', 'Problemas obteniendo la información, intenta nuevamente.' ); 
          Alert.alert(CONST.MALL_NAME, error.message);
          console.warn(error); 
        });

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
          "parameters":[this.sesion.id_user,this.sesion.token,-1,0,-1]
        })
      } )
      .then((response)=>response.json())
      .then((responseJson)=>{
       // debugMe(responseJson);
    

            this.setState({
              
              dataCampaigns: responseJson,
              loaded: true
            })

          
        
      })
      .catch((error) => { //Alert.alert( 'Almacenes', 'Problemas obteniendo la información, intenta nuevamente.' ); 
          Alert.alert(CONST.MALL_NAME, error.message);
          console.warn(error); 
        });
    }




  _getProducts() {
    fetch(CONST.URL_AMFPHP, { 
      method: 'POST', 
      headers: { 'Accept': 'application/json', 
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ 
        "serviceName":"amf_mobile_invoice_services",
        "methodName":"getCatalogProducts",
        "parameters":[this.state.userId,this.state.token]
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      ////console.log("getCatalogProducts",responseJson);

      if(responseJson.length > 0){
        var ImageUri = CONST.BASE_URL + "campaigns/products/" + responseJson[0].image;
        Image.getSize(ImageUri, ( Width, Height ) =>
        {
          this.setState({
            new_h: Height / ((Width) / ((this.state.width_dim)* .77 )),
            products: responseJson,
            loaded: true,
          });
        },(errorMsg) =>
        {
          //console.log('ERROR!!!!!! ', errorMsg );
          this.setState({
            new_h: 1 / ((1) / ((this.state.width_dim)* .77 )),
            products: [],
            loaded: true,
          });
        });
      }
      else {
        //console.log('NO PRODUCTS!!!!!! ');
        this.setState({
          new_h: 1 / ((1) / ((this.state.width_dim)* .77 )),
          products: [],
          loaded: true,
        });
      }
    })
  }

  showProductDetail(product){
    this.navigator.navigate('ProductDetail', {route:'ProductDetail', product: product});
  }


  renderItemList = (product) => {
    return(
      <TouchableHighlight 
      onPress={()=> this.showProductDetail(product)}
      style={carteleras.carteleraCardContainer}
      >
        <View>
          <View style={[carteleras.carteleraCard, {borderRadius: 100} ]}>
            <View
              style={[
                carteleras.carteleraCardImageContainer,
                { height: "auto" }
              ]}
            >
              <Image
                resizeMode={"cover"}
                source={{ uri: CONST.BASE_URL + "campaigns/products/" + product.image }}
                style={[
                  carteleras.carteleraCardImage,
                  { width: "100%", height: this.state.new_h }
                ]}
              />
            </View>

            <View style={carteleras.carteleraCardInfoContainer}>
              <View style={carteleras.carteleraTitleContainer}>
                <Text style={[text.darkgray, text.bold, text.left,{textTransform:'capitalize'}]}>
                  {product.name}
                </Text>
                <Text style={[text.gray, text.smallText, {marginTop: 10}]}>{product.points} Pts</Text>
              </View>
            </View>
          </View>
        </View>

      </TouchableHighlight>
    );
  }

  _gotoCampaignDetail(campaign){
     this.navigator.navigate('CampaignDetail', {screen:'CampaignDetail', sesion:this.sesion, infoCampaign:campaign, newInvoice:false })
  }


  renderCampaign(campaign){
    //console.log('renderCampaign', campaign);
    return(
      <View style={[CAMPAINGS.CampeingContainer]}>
        <TouchableOpacity onPress={()=>this._gotoCampaignDetail(campaign)} style={CAMPAINGS.CampeingCard}>
          <View style={CAMPAINGS.CampeingImg}>
            <Image
                style={styles.CampaingImage}
                source={{uri:CONST.BASE_URL+'campaigns/images/'+campaign.image}}
              />
          </View>
          <View style={CAMPAINGS.CampeingTitle}>
            <Text style={[text.userName, text.bold, {color: colors.piPurple}]}>
              {campaign.name}
            </Text>
          </View>
        </TouchableOpacity>
        
      </View>
    );
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

        let source = { uri: response.uri }; 
        
        if (Platform.OS === 'android') {
         
          source = {uri: response.uri, isStatic: true, data: response.base64};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true, data: response.base64};
        }
          // this._gotoVoucherInfo(source);
          this._gotoInvoiceCreate(source);
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

   _gotoInvoiceCreate = (imageInvoice) => {
    this.setModalVisible(false);
    this.navigator.navigate('InvoiceCreate', {imageInvoice:imageInvoice})

  }

  _gotoProductCatalog = () => { 
    this.navigator.navigate('ProductCatalog', {route:'ProductCatalog', title: '', name:'', passProps:{sesion:this.sesion, pointsCRM:this.state.pointsCRM} })
  }

  _valSessionUser(){
    if(this.sesion.id_user=="" ||  this.sesion.token=="" || this.sesion.id_user==undefined ||  this.sesion.token==undefined){
      Alert.alert(
          'CRM',
          'Debes estar logeado para poder ingresar a esta seccion',
          [
            {text: 'Login', onPress: () => this._gotoLogin()},
            {text: 'Cancel', onPress: () => this._gotoHome()},
          ]
      );
    }else{
      this._getInfoUser(this.sesion.id_user,this.sesion.token)
     
    }
  }

   _getInfoUser(id_user,token){

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
        }) 
        .then((response) => response.json()) 
        .then((responseJson) => { 

            var infoUser = responseJson;
            let birthDate = "";

            //console.log(infoUser);

            
            birthDate = infoUser.year+"-"+infoUser.month+"-"+infoUser.day      
            
            if (infoUser.name=="" || infoUser.surname=="" || infoUser.email=="" || infoUser.document_number=="" || !valAdult(birthDate)  ) {
              //console.log("Goto Login")

              Alert.alert(
                'CRM',
                'Debes completar los datos en el perfil.',
                [
                  {text: 'Ir a perfil', onPress: () => this._gotoPerfil()},
                  {text: 'Cancel', onPress: () => this._gotoHome()},
                ]
              );

            }else{

            // var fullname= infoUser.name+" "+infoUser.surname;
            // store.dispatch(startSession(this.sesion.id_user,this.sesion.pass,this.sesion.token,fullname,infoUser.avatar_folder_url+"avatar.jpg",infoUser.email));

             this._getCampaignCRM();
             this._getCampaigns();
            //this._getProducts();

            }

            
        }) 
        .catch((error) => { //Alert.alert( 'Almacenes', 'Problemas obteniendo la información, intenta nuevamente.' ); 
            /*console.warn(error);*/ });
    }

  _gotoPerfil(){
    
    this.navigator.navigate("EditProfile", { screen: "EditProfile", sesion: this.sesion, gotoRoute: "CRMProfile" })
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
  
  _gotoLogin() {
     //this.navigator.navigate("Login");
     this.navigator.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'Login',
                  params: { route:'Login', gotoRoute:'CRMProfile' },
                }
              ],
            })
          )
  }

  _gotoInvoices() {
    this.navigator.navigate('Invoices', {screen:'Invoices', sesion:this.sesion })
  }

  state = {
    modalVisible: false
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }



  renderCRM(){

    const { modalVisible } = this.state;

    if (this.state.infoCRM.length>0){
      

      return (
          <View style={[{paddingVertical: 20, paddingHorizontal: 18}]}>

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
                
                
                
                <TouchableOpacity onPress={this.selectPhoto} 
                style={[interactions.gralButton, interactions.purple, interactions.center]}>
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
                   <TouchableOpacity onPress={()=>this.setModalVisible(false)} style={[Modals.modalClose, interactions.gralButton, interactions.white, interactions.center]}>
                 
                  <Text style={[text.purple, text.bold]}>
                    Cancelar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={CRM.buttonsContainer}>
 
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(true);
              }}
              style={[CRM.buttonsContainer]}>
              <View style={CRM.cameraButton}>
                <CustomIcon name='camera' size={30} style={[text.black, {color: colors.piPurple}]} />
              </View>
              <Text style={[text.semibold, {color: colors.piPurple}]}>
                Agregar Factura
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={this._gotoInvoices} 
            >
              <Text style={[text.semibold, {color: colors.piPurple}]}>
                Mis Facturas
              </Text>
            </TouchableOpacity>
          </View>

          <LinearGradient 
          colors={primaryGradient.colors}
          style={CRM.CMRCard}
          start={primaryGradient.start}
          end={primaryGradient.end}
          locations={primaryGradient.location}>
            <Text style={[text.bold, text.categoryStoreText, text.white]}>
             {store.getState().todos.fullname}
            </Text>
            <Text style={[text.light, text.white]}>
              Numero CMR
            </Text>

            <Text style={[text.semibold, text.white]}>
              {this.state.document_number}
            </Text>

            <Text style={[text.bold, text.white, {marginTop: 30, fontSize: 15}]}>
               {this.state.pointsCRM} puntos
            </Text>

            <View style={[CRM.footerCardInfo, {marginTop: 5}]}>
              <View style={CRM.footerCardColumn}>
                <Text style={[text.light, text.categoryStoreText, text.white, {fontSize:13}]}>
                  Puntos por Vencer
                </Text>  
              </View>
              <View style={CRM.footerCardColumn}>
                <Text style={[text.light, text.categoryStoreText, text.white, {fontSize:13}]}>
                  Fecha de Vencimiento
                </Text> 
              </View>
            </View>

            <View style={[CRM.footerCardInfo, {marginTop: -5}]}>
              <View style={CRM.footerCardColumn}>
                <Text style={[text.semibold, text.categoryStoreText, text.white, {fontSize:14}]}>
                  {this.state.toExpirePoints} pts
                </Text>  
              </View>
              <View style={CRM.footerCardColumn}>
                <Text style={[text.semibold, text.categoryStoreText, text.white, {fontSize:14}]}>
                 {this.state.expireDate}
                </Text> 
              </View>
            </View>

          </LinearGradient>

        </View>
      )
    }else{
      return null;
    }
  }



  render() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ScrollView style={{flex:1, backgroundColor: colors.piLightGray}}>

       {this.renderCRM()}

        <View
          style={[
            layout.mainContainer,
            { minHeight: 270, flex: 1, justifyContent: "center" }
          ]}
        >

        <Text style={[text.bold, {marginHorizontal: 20, marginTop: 20}]}>
          Sorteos y Boletas
        </Text>

        { this.state.dataCampaigns.length == 0 &&
          <Text style={[text.regular, {marginHorizontal: 20, marginTop: 20}]}>
          No hay sorteos disponibles en este momento.
        </Text>
        }

        <FlatList
          contentContainerStyle={[styles.storeList, {paddingTop:10}]}
          keyExtractor={(item, index) => index}
          data={this.state.dataCampaigns}
          numColumns={2}
          renderItem={({ item }) => this.renderCampaign(item)}
          //ListFooterComponent={this.renderFooter.bind(this)}
        />

        </View>

          <View
          style={[
            layout.mainContainer,
            { minHeight: 270, flex: 1, justifyContent: "center" }
          ]}
        >

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


module.exports = CRMProfile;
'use strict';

import React, { Component } from 'react'; 
import {PropTypes} from 'prop-types';

import CustomIcon from './CustomIcon.js'
 
import {
  Alert,
  findNodeHandle,
  ImageBackground,
  Image,
  ScrollView,
  StyleSheet,
  Text, 
  SafeAreaView,
  TextInput,
  TouchableOpacity, 
  View,
  KeyboardAvoidingView,
  Platform
  
} from 'react-native'; 

import CheckBox from 'react-native-check-box'

import AsyncStorage from '@react-native-community/async-storage';

const FBSDK = require('react-native-fbsdk-next');
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager
} = FBSDK;

import {
  debugMe
} from '../Utilities/Messaging'

import { CommonActions, DrawerActions } from '@react-navigation/native';


import { AppleButton, appleAuth, AppleAuthError,
  AppleAuthRequestScope,
  AppleAuthRequestOperation, } from '@invertase/react-native-apple-authentication';



import store from '../Reducers/store';

import { loginLayout, layout, text, interactions, forms, spacers  } from '../Styles/TitanPlaza/Global';

import DeviceInfo from 'react-native-device-info';

const CONST = require('../Constants/constants');
var unsubscribe = null;

export default class Register extends Component { 
   
  constructor(props, context) { 
    super(props, context); 

    this.navigator = this.props.navigation;
    const {state} = this.navigator;

    this.getSystemVersion = DeviceInfo.getSystemVersion();

    this.sesion = null;

    this.sendRegister = this.sendRegister.bind(this);

    //console.log(store.getState().todos.id);

    this.state = {
      name: '',
      last_name:'',
      email:'',
      pass:'',
      confirmPass:'',
      errorName: false,
      errorlastName: false,
      errorEmail: false,
      errorPass: false,
      errorConfirmPass: false,
      id_user:0,
      access_tocken : '',
      shouldDisablePostButton: false,
      loaded: false,
    };

    this.sesion = {
        id_user: "",   
        token: "",
        pass: ""
      }

    // tracker.trackScreenView('Registro');
  } 

  componentDidMount(){
      this._valSessionUser();
    }

   _valSessionUser(){
    
    if(this.sesion.id_user=="" ||  this.sesion.token=="" || this.sesion.id_user==undefined ||  this.sesion.token==undefined){

      this.setState({loaded:true})
       
    }else{

        this.navigator.dispatch(StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home', params: {route:'Home'} })
          ]
        }));
        
      }

   
  }


  sendRegister(){

    this.state.shouldDisablePostButton = true;
    this.state.errorName  = true;
    this.state.errorlastName = true;
    this.state.errorEmail =true;
    this.state.errorPass =true;
    this.state.errorConfirmPass = true;

    debugMe(this.state);

    if(this.state.name==""){
      this.setState({errorName: true});
      debugMe(this.state.errorName);
    }else{
      this.setState({errorName: false});
      this.state.errorName  = false;
      debugMe(this.state.errorName);

    }

    if(this.state.last_name==""){
      this.setState({errorlastName: true});
      debugMe(this.state.errorlastName);
    }else{
      this.setState({errorlastName: false});
      this.state.errorlastName  = false;
      debugMe(this.state.errorlastName);

    }

    if(!this.validateEmail(this.state.email)){
      this.setState({errorEmail: true});
      debugMe(this.state.errorEmail);
    }else{
      this.setState({errorEmail: false});
      this.state.errorEmail  = false;
      debugMe(this.state.errorEmail);

    }

    if(this.state.pass==""){
      this.setState({errorPass: true});
      debugMe(this.state.errorPass);
    }else{
      this.setState({errorPass: false});
      this.state.errorPass  = false;
      debugMe(this.state.errorPass);

    }

    if(this.state.confirmPass=="" || (this.state.confirmPass != this.state.pass)){
      this.setState({errorConfirmPass: true});
      debugMe(this.state.errorConfirmPass);
    }else{
      this.setState({errorConfirmPass: false});
      this.state.errorConfirmPass  = false;
      debugMe(this.state.errorConfirmPass);

    }

    if (!this.state.errorName && !this.state.errorlastName && !this.state.errorEmail && !this.state.errorPass && !this.state.errorConfirmPass){
      debugMe("send form");
      

      fetch(CONST.URL_AMFPHP, { 
        method: 'POST', 
        headers: { 'Accept': 'application/json', 
        'Content-Type': 'application/json', 
        }, 
        body: JSON.stringify({ 
          "serviceName":"amf_mobile_services",
          "methodName":"registerUser",
          "parameters":[this.state.name,this.state.last_name,this.state.email,this.state.pass]
          
        }) 
      }) 
      .then((response) => response.json()) 
      .then((responseJson) => { 

        debugMe(responseJson); 
        if (responseJson==0) {
          this.state.shouldDisablePostButton = false;
          Alert.alert( 'Registro', 'Problemas en el registro, intenta nuevamente.' );
        }
        if (responseJson==-1) {
          this.state.shouldDisablePostButton = false;
          Alert.alert( 'Registro', 'El usuario ya se encuentra registrado.' );
          this.clearText();
        }

        debugMe("responseJson.id_user: "+responseJson.id_user);

        if (responseJson.id_user != undefined && responseJson.id_user>0) {

          //handleNotificationSubscribing(true, {topic:this.state.email});
          //store.dispatch(startSession(responseJson.id_user+'',responseJson.user_pass,responseJson.token,"",""));
          //this._gotoLogin(responseJson.id_user+'',responseJson.token,responseJson.user_pass); // ToDo: ONLY FOR REGISTER

          Alert.alert( 'Registro', 'El registro se guardó correctamente', 
            [ {text: 'OK', onPress: () => this._gotoLogin(responseJson.id_user+'',responseJson.token,responseJson.user_pass)} ] );
        }

      }) 
      .catch((error) => { this.state.shouldDisablePostButton = false; Alert.alert( 'Registro', 'Problemas en el registro, intenta nuevamente.' ); /*console.warn(error);*/ });

    }else{
      this.state.shouldDisablePostButton = false;
      Alert.alert( 'Registro', 'Por favor revise los datos ingresados' );
    }
  }

  _gotoLogin(id_user,token,pass){
    //this.props.navigator.replace({
    //  title:"Login",
    //  name: 'Login',
    //  passProps:{id_user: id_user, token: token,pass: pass,register:true }
    //});
    // this.navigator.dispatch(CommonActions.reset({
    //   index: 1,
    //   actions: [
    //     CommonActions.navigate({ name: 'Home', params: {route:'Home', id_user: id_user, token: token,pass: pass,register:true} })
    //   ]
    // }));
     this.navigator.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: 'Login',
                  params: { route:'Login', id_user: id_user, token: token,pass: pass, register:true },
                }
              ],
            })
          )
  }

  clearText() {

    this.refs['name'].setNativeProps({text: ''})
    this.refs['last_name'].setNativeProps({text: ''})
    this.refs['email'].setNativeProps({text: ''})
    this.refs['pass'].setNativeProps({text: ''})
    this.refs['confirmPass'].setNativeProps({text: ''})

    this.setState({name: ''});
    this.setState({last_name: ''});
    this.setState({email: ''});
    this.setState({pass: ''});
    this.setState({confirmPass: ''});
    }

  validateEmail (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

  // Scroll a component into view. Just pass the component ref string.
  inputFocused(refName) {
    setTimeout(() => {
      // Note the this.refs.scrollView -- the ScrollView element to be
      // handled must have the ref='scrollView' for this to work.
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(this.refs[refName]),
        110, //additionalOffset
        true
      );
    }, 50);
  }

 _handleFacebookLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then( (result, error) => {
      if (error) {
        alert('Login fail with error: ' + error);
        debugMe(error);
      }
      else if (result) {
        if (result.isCancelled) {
          debugMe( 'Inicio de sesión', "Cancelado" );
        }
        else {
          AccessToken.getCurrentAccessToken().then( (data) => {
            let accessToken = data.accessToken
            const responseInfoCallback = (error, result) => {
              if (error) {
                  alert('Error fetching data: ' + error.toString());
              } else {
                const parameters = [result.id,result.first_name,result.last_name,result.picture.data.url,result.email,accessToken];
                debugMe("loginFb parameters",parameters);

                if (!result.email || result.email == null || result.email == "") {
                  Alert.alert('Error de inicio de sesión con Facebook', 'Tu cuenta de Facebook no tiene asociada un correo electrónico público. Regístrate usando tu correo electrónico y contraseña.',
                  [
                    {text: 'Cancelar', onPress: () => {}},
                    //{text: 'Registrar con correo', onPress: () => this.navigator.navigate('Register', {})},
                  ])
                }
                else {
                  fetch(CONST.URL_AMFPHP, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      "serviceName":"amf_mobile_services",
                      "methodName":"loginFb",
                      "parameters":parameters
                    })
                  })
                  .then((response) => response.json())
                  .then((responseJson) => {
                    debugMe("loginFb responseJson",responseJson);
                    if (responseJson!=null) {
                      try {
                        // tracker.trackEvent('Facebook', 'Inciar Sesión');
                        // handleNotificationSubscribing(true, {topic:result.email});
                        //store.dispatch(startSession(responseJson.id_user+'',responseJson.user_pass,responseJson.token,"",""));
                        this._gotoLogin(responseJson.id_user+'',responseJson.token,responseJson.user_pass); // ToDo: ONLY FOR REGISTER
                      } catch (error) {
                        alert('AsyncStorage error: ' + error.message);
                      }
                    }else{
                      debugMe('LoginFb', responseJson);
                    }
                  })
                  .catch((error) => { /*console.warn(error);*/ }); // fetch
                }
              }
            }
            const infoRequest = new GraphRequest( '/me', {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'first_name,middle_name,last_name,picture,email'
                  }
                }
              },
              responseInfoCallback
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start()
          })
        }
      }
    })
  }

  onAppleButtonPress = async () => { 

  try {

    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

        // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

      // console.log(credentialState)
      // console.log(appleAuthRequestResponse)

      // // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {

        // console.log("Send Info User")

        // console.log(appleAuthRequestResponse.fullName.email)

        // if (appleAuthRequestResponse.email == null|| appleAuthRequestResponse.email == '' || appleAuthRequestResponse.email == undefined  ) {

        //     Alert.alert( 'Login', 'Problemas al recibir la información de Apple, por favor vaya a la configuración de su dispositivo; Configuración> ID de Apple, iCloud, iTunes y App Store> Contraseña y seguridad> Aplicaciones usando su ID de Apple, toque su aplicación y toque Dejar de usar ID de Apple, y vulva a intentarlo.' );

        //     return false;


        // }

        fetch(CONST.URL_AMFPHP, {
          method: 'POST',
          headers: { 'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "serviceName":"amf_mobile_services",
            "methodName":"loginApple",
            "parameters":[appleAuthRequestResponse.fullName.givenName,appleAuthRequestResponse.fullName.familyName, appleAuthRequestResponse.email, appleAuthRequestResponse.user]
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("loginApple responseJson",responseJson);
          if(responseJson == -2){

             Alert.alert( 'Login', 'Problemas al recibir la información de Apple, por favor vaya a la configuración de su dispositivo; Configuración> Apple ID, contenido y compras > Contraseña y seguridad> Apps que usan el Apple ID, toque en Titán Plaza y luego toque Dejar de utilizar Apple ID, y vuelva a intentarlo.' );

            return false;
          }else if (responseJson!=null ) {
            try {
              
               //store.dispatch(startSession(responseJson['id_user']+'',responseJson['user_pass'],responseJson['token'],"",""));
               this._gotoLogin(responseJson['id_user']+'',responseJson['token'],responseJson['user_pass']); // ToDo: ONLY FOR REGISTER
            } catch (error) {
              //alert('AsyncStorage error: ' + error.message);
              Alert.alert( 'Login', 'Problemas en el envio de datos intenta nuevamente.' );
            }

          }else{
            Alert.alert( 'Login', 'Problemas en el envio de datos intenta nuevamente.' );
             return false;
          }
        })
        .catch((error) => { 
          //console.log(error); 
          Alert.alert( 'Login', 'Problemas en el envio de datos intenta nuevamente.' ); 
           return false;
        }); // fetch
      }



    } catch (error) {

      console.log('error applesing', error);

      // if (error.code === AppleAuthError.CANCELED) {
      //   // user cancelled Apple Sign-in
      // } else {
      //   // other unknown error
      // }
    }
}  

  _updateState = (data) => {
    this.setState(data);
  }
  
  render() { 


    let fbShown = true;
    // if (Platform.OS === 'android' && parseInt(this.getSystemVersion) >= 10  ){
    //   fbShown = false;
    // }

    return (

      <KeyboardAvoidingView style={layout.mainContainer} behavior={Platform.select({ios: "padding", android: ""})} enabled>

       <ScrollView  ref='scrollView' 
          automaticallyAdjustContentInsets={false} 
          scrollsToTop={true}
          //onScroll={() => { debugMe('onScroll!'); }} 
          scrollEventThrottle={200}
          keyboardDismissMode='interactive'>
       { fbShown &&
       <View style={loginLayout.loginFBContainer} >
        <TouchableOpacity style={[interactions.gralButton, interactions.facebookBlue, interactions.center]} onPress={this._handleFacebookLogin}>
          <CustomIcon name='facebook' size={25} style={[interactions.buttonIcon,text.white]} />
          <Text style={[text.buttonLabel, text.semibold, text.white]}>
            Registrarme con Facebook
          </Text>
        </TouchableOpacity>
       </View>
       }
       { Platform.OS === 'ios' ?
           <View style={[loginLayout.loginFBContainer]} >

              <AppleButton
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.SIGN_IN}
              style={[interactions.gralButton, interactions.facebookBlue, interactions.center]}
              onPress={() => this.onAppleButtonPress().done()}
            />
            
          </View> : null }

          <View style={[loginLayout.separator, loginLayout.light]}></View>

            <SafeAreaView style={loginLayout.formContainer}>

          <View style={forms.inputGroup}>

            <View style={forms.inputLabelCont}>
              <Text style={[text.inputLabel, text.semibold, text.black]}>
                Nombre
              </Text>
            </View>

            <TextInput
              ref='name' 
              autoCapitalize="none"  
              style={[forms.mainInput, forms.darkInput, !this.state.errorName && this.state.name.length>0 ? forms.successInput : null]}
              onChangeText={(text) => this._updateState({name:text, errorName: text.length < 2}) }
              placeholder='Tu nombre'  onFocus={this.inputFocused.bind(this, 'name')}
              placeholderTextColor= "#B8BDCC"
              //underlineColorAndroid="transparent" 
            />
            {!this.state.errorName && this.state.name.length>0?
              <View style={forms.validateIconCont}>
                <CustomIcon name='check' size={18} style={text.green} />
              </View>
            :null}

          </View>


          <View style={forms.inputGroup}>

            <View style={forms.inputLabelCont}>
              <Text style={[text.inputLabel, text.semibold, text.black]}>
                Apellido
              </Text>
            </View>

            <TextInput
              ref='last_name'
              autoCapitalize="none"  
              style={[forms.mainInput, forms.darkInput, !this.state.errorlastName && this.state.last_name.length>0 ? forms.successInput : null]}
              onChangeText={(text) => this._updateState({last_name:text, errorlastName: text.length < 2}) }
              placeholder='Tu apellido'  onFocus={this.inputFocused.bind(this, 'last_name')}
              placeholderTextColor= "#B8BDCC"
              //underlineColorAndroid="transparent" 
            />
            {!this.state.errorlastName && this.state.last_name.length>0?
              <View style={forms.validateIconCont}>
                <CustomIcon name='check' size={18} style={text.green} />
              </View>
            :null}

          </View>

          <View style={forms.inputGroup}>

            <View style={forms.inputLabelCont}>
              <Text style={[text.inputLabel, text.semibold, text.black]}>
                Correo electrónico
              </Text>
            </View>

            <TextInput
              ref='email'  
              autoCapitalize="none"  
              style={[forms.mainInput, forms.darkInput, !this.state.errorEmail && this.state.email.length>0 ? forms.successInput : null]}
              onChangeText={(text) => this._updateState({email:text, errorEmail: !this.validateEmail(text)}) }
              placeholder='Tu correo electrónico'
              keyboardType = "email-address"
              onFocus={this.inputFocused.bind(this, 'email')}
              placeholderTextColor= "#B8BDCC"
              //underlineColorAndroid="transparent" 
            />
            {!this.state.errorEmail && this.state.email.length>0?
              <View style={forms.validateIconCont}>
                <CustomIcon name='check' size={18} style={text.green} />
              </View>
            :null}

          </View>

          <View style={forms.inputGroup}>

            <View style={forms.inputLabelCont}>
              <Text style={[text.inputLabel, text.semibold, text.black]}>
                Contraseña
              </Text>
            </View>

            <TextInput
              ref='pass'   
              autoCapitalize="none"  
              secureTextEntry={true} 
              style={[forms.mainInput, forms.darkInput, !this.state.errorPass && this.state.pass.length>0 ? forms.successInput : null]}
              placeholder='Tu contraseña' password={true}  
              onFocus={this.inputFocused.bind(this, 'pass')}
              placeholderTextColor= "#B8BDCC"
              onChangeText={(text) => this._updateState({pass: text, errorPass: text.length < 2}) }
              //underlineColorAndroid="transparent" 
            />
            {!this.state.errorEmail && this.state.pass.length>0?
              <View style={forms.validateIconCont}>
                <CustomIcon name='check' size={18} style={text.green} />
              </View>
            :null}

          </View>

          <View style={forms.inputGroup}>

            <View style={forms.inputLabelCont}>
              <Text style={[text.inputLabel, text.semibold, text.black]}>
                Confirmar contraseña
              </Text>
            </View>

            <TextInput
              ref='confirmPass'  
              autoCapitalize="none"    
              secureTextEntry={true} 
              style={[forms.mainInput, forms.darkInput, !this.state.errorConfirmPass && this.state.confirmPass.length>0 ? forms.successInput : null]}
              placeholder='Confirmar tu contraseña' password={true} 
              onFocus={this.inputFocused.bind(this, 'confirmPass')}
              placeholderTextColor= "#B8BDCC"
              onChangeText={(text) => this._updateState({confirmPass: text, errorConfirmPass: (text != this.state.pass) }) }
              //underlineColorAndroid="transparent" 
            />
            {!this.state.errorConfirmPass && this.state.confirmPass.length>0?
              <View style={forms.validateIconCont}>
                <CustomIcon name='check' size={18} style={text.green} />
              </View>
            :null}

          </View>

         

        </SafeAreaView>

      

        <View style={loginLayout.loginFBContainer} >

         <TouchableOpacity style={[interactions.gralButton, interactions.purple, interactions.center]} onPress={this.sendRegister} disabled={this.state.shouldDisablePostButton}>
            <Text style={[text.buttonLabel, text.semibold, text.white]}>
              ENVIAR
            </Text>
          </TouchableOpacity>
          </View>

      </ScrollView>

        

      </KeyboardAvoidingView>
    );
  } 
}


module.exports = Register;
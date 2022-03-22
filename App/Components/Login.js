import React, { Component,useEffect } from 'react'; 
import {PropTypes} from 'prop-types';

import CustomIcon from './CustomIcon.js'
import BusyIndicator from './BusyIndicator'

import {
  ScrollView,
  Text, 
  TouchableOpacity, 
  View,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native'; 

import AsyncStorage from '@react-native-community/async-storage';

import {
  debugMe
} from '../Utilities/Messaging'

import { CommonActions, DrawerActions } from '@react-navigation/native';

import store from '../Reducers/store';
import { startSession} from '../Reducers/action';


import { loginLayout, layout, text, interactions, forms, spacers  } from '../Styles/TitanPlaza/Global';


import { AppleButton, appleAuth, AppleAuthError,
  AppleAuthRequestScope,
  AppleAuthRequestOperation, } from '@invertase/react-native-apple-authentication';

  import DeviceInfo from 'react-native-device-info';

const CONST = require('../Constants/constants');

const FBSDK = require('react-native-fbsdk-next');
const {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager
} = FBSDK;

var unsubscribe = null;

export default class Login extends Component { 

 
  constructor(props, context) { 
    super(props, context); 

    this.navigator = this.props.navigation;

    this.getSystemVersion = DeviceInfo.getSystemVersion();
 
    
    if (this.props.route.params) {
      this.logOut = this.props.route.params["logOut"]? this.props.route.params["logOut"]: null;
      this.register = this.props.route.params["register"]? this.props.route.params["register"]: null;
      this.token = this.props.route.params["token"]? this.props.route.params["token"]: null;
      this.id_user = this.props.route.params["id_user"]? this.props.route.params["id_user"]: null;
      this.pass = this.props.route.params["pass"]? this.props.route.params["pass"]: null;
      this.gotoRoute = this.props.route.params["gotoRoute"]? this.props.route.params["gotoRoute"]: 'Home';
    }

    //console.log(this.register)

    this.sendLogin = this.sendLogin.bind(this); 
    this.recoverPass = this.recoverPass.bind(this);
    this._goHome2 = this._goHome2.bind(this);
    this._goRegister = this._goRegister.bind(this);
    this.state = {
      disabled:false,
      email: '',
      pass:'',
      errorEmail: false,
        errorPass: false,
        modalVisible: false,
        fbtoken:'',
        loaded: true,
      // focusInput: false,
    };

     this.sesion = {
            id_user: this.id_user,   
            token: this.token,
            pass: this.pass,
          }
  } 

  componentDidMount() {    

    console.log("logOut", this.logOut);
    if(this.logOut){
      LoginManager.logOut();
      this._removeStorage().done();
      store.dispatch(startSession('','','','',''));
      console.log("logout");
      this._goHome2();
    }else if(this.register){
      this._onValueKey(this.token,this.id_user,this.pass).done();
    }else{
      this.setState({ loaded: false});
      this._loadInitialState().done();
    }

    unsubscribe = store.subscribe(() => {
      this.setState({ loaded: false});
      this._onValueKey(store.getState().todos.token,store.getState().todos.id,store.getState().todos.pass);
      unsubscribe();
    });
  }

  componentWillUnmount() {
    if (unsubscribe) unsubscribe(); // ToDo: this was added to avoid warning
  }
    
  _setBusyIndicator = (activity_loading, activity_text) => {
    this.setState({activity_loading: activity_loading})
    this.setState({activity_text: activity_text})
  }

  _loadInitialState = async () => {
      try {
        var id_user = await AsyncStorage.getItem(CONST.STORAGE_ID_USER);
          var pass = await AsyncStorage.getItem(CONST.STORAGE_PASS);
          var token =await AsyncStorage.getItem(CONST.STORAGE_TOKEN);

        if (pass !== null){
          this.credentialsUpdate(id_user,pass);
        }else{
          this.setState({ loaded: true});
        }
      } catch (error) {
        debugMe('loadInitialState error: ' + error.message);
      }
  };

  _onValueKey = async (token,id,pass) => {
    console.log("login _onValueKey");
      try {
        if (unsubscribe) unsubscribe(); // ToDo: this was added to avoid warning
        this.setState({disabled: false}, async () => {
          await AsyncStorage.setItem(CONST.STORAGE_TOKEN, token+'');
          await AsyncStorage.setItem(CONST.STORAGE_ID_USER, id+'');
          await AsyncStorage.setItem(CONST.STORAGE_PASS, pass+'');
          store.dispatch(startSession(id,pass,token,"",""));

          //scheduleBirthdayNotification(true);
         this._getBasicInfoUser(id, token, pass)
        });
      } catch (error) {
        debugMe('onValueKey error: ' + error.message);
      }
  };

  _getBasicInfoUser(id_user, token, pass) {
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
      this.setState({loaded:false});
      if (responseJson == -1) {
        store.dispatch(startSession("","","","",""));
      }
      else {
        var fullname= responseJson.name+" "+responseJson.surname;
        store.dispatch(startSession(id_user,pass,token,fullname,responseJson.avatar_folder_url+"avatar.jpg",responseJson.email));
        this._goHome(id_user, token, pass);
      }
    }) 
    .catch((error) => {
      this.setState({loaded:false});
      Alert.alert( 'Login', 'Problemas en el envio de datos intenta nuevamente.' );
    });
  };

 
  _removeStorage = async () => {
      try {
        await AsyncStorage.removeItem(CONST.STORAGE_TOKEN);
        await AsyncStorage.removeItem(CONST.STORAGE_ID_USER);
        await AsyncStorage.removeItem(CONST.STORAGE_PASS);

      } catch (error) {
        this._appendMessage('removeStorage error: ' + error.message);
      }
  };

  credentialsUpdate(id_user,pass){
  
      fetch(CONST.URL_AMFPHP, { 
        method: 'POST', 
        headers: { 'Accept': 'application/json', 
        'Content-Type': 'application/json', 
        }, 
        body: JSON.stringify({ 
          "serviceName":"amf_mobile_services",
          "methodName":"validateUserPassStored",
          "parameters":[id_user,pass]    
        }) 
      }) 
      .then((response) => response.json()) 
      .then((responseJson) => {
        if (responseJson!=null) {
          try {
              this._onValueKey(responseJson,id_user,pass).done();
            } catch (error) {
              alert('AsyncStorage error: ' + error.message);
            }
        }else{
            Alert.alert( 'update', responseJson );
        }
      }) 
      .catch((error) => { /*console.warn(error);*/ });
  } 

  sendLogin(){

    this.state.errorEmail  = true;
    this.state.errorPass = true;

    if(!this.validateEmail(this.state.email)){
      this.setState({errorEmail: true});
    }else{
      this.setState({errorEmail: false});
      this.state.errorEmail  = false;
    }
    if(this.state.pass==""){
      this.setState({errorPass: true});
    }else{
      this.setState({errorPass: false});
      this.state.errorPass  = false;
    }

    if (!this.state.errorUser && !this.state.errorPass){
      this._setBusyIndicator(true, '')

      this.setState({disabled: true});
      fetch(CONST.URL_AMFPHP, { 
        method: 'POST', 
        headers: { 'Accept': 'application/json', 
        'Content-Type': 'application/json', 
        }, 
        body: JSON.stringify({ 
          "serviceName":"amf_mobile_services",
          "methodName":"loginUser",
          "parameters":[this.state.email,this.state.pass]
        }) 
      }) 
      .then((response) => response.json()) 
      .then((responseJson) => { 
        this._setBusyIndicator(false, '')

        if (responseJson.length != 0) {
          // tracker.trackEvent('Sesión', 'Inciar Sesión');
          // handleNotificationSubscribing(true, {topic:this.state.email});
          this._onValueKey(responseJson['token'],responseJson['id_user'],responseJson['user_pass']).done();
          this.clearText();
        }else{
          Alert.alert( 'Login','El usuario o Contraseña no coinciden' );
          this.clearText();
        }
        this.setState({disabled: false});
      }) 
      .catch((error) => {
        this._setBusyIndicator(false, '')
      });

    }else{

      Alert.alert( 'Login', 'Por favor revise los datos ingresados' );
    }
  }

  clearText() {

    this._textInputEmail.setNativeProps({text: ''})
    this._textInputPass.setNativeProps({text: ''})

    this.setState({email: ''});
    this.setState({pass: ''});
    }

  validateEmail (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

  recoverPass(){
    this.state.errorEmail  = true;

    if(!this.validateEmail(this.state.email)){
      this.setState({errorEmail: true});
      debugMe(this.state.errorEmail);
    }else{
      this.setState({errorEmail: false});
      this.state.errorEmail  = false;
      debugMe(this.state.errorEmail);
    }
    debugMe("Valor:"+this.state.errorEmail);
    if (!this.state.errorEmail){
      this.setState({disabled: true});
      fetch(CONST.URL_AMFPHP, { 
        method: 'POST', 
        headers: { 'Accept': 'application/json', 
        'Content-Type': 'application/json', 
        }, 
        body: JSON.stringify({ 
          "serviceName":"amf_mobile_services",
          "methodName":"recover_password",
          "parameters":[this.state.email]    
        }) 
      }) 
      .then((response) => response.json()) 
      .then((responseJson) => { 
        if (responseJson!=null) {
          this.clearText();
          //Alert.alert( 'Login', 'Se ha enviado un correo con su nueva Contraseña' );
          //this.setModalVisible(!this.state.modalVisible);
          Alert.alert(
                  'Login',
                  'Se ha enviado un correo con su nueva Contraseña',
                  [
                    
                    {text: 'OK', onPress: () => {this.setModalVisible(!this.state.modalVisible)}},
                  ]
              )
        }else{
          /*Alert.alert( 'Login', responseJson );
          this.clearText();
          this.nextScene();
          */
          Alert.alert(
                  'Login',
                  'Problemas en el envio de datos intenta nuevamente.',
                  [
                    
                    {text: 'OK', onPress: () => {
                      this.clearText();
              this.nextScene();
              this.setModalVisible(!this.state.modalVisible)}},
                  ]
              )
        }
        this.setState({disabled: false});
      }) 
      .catch((error) => { /*console.warn(error);*/ });
    }else{
      Alert.alert( 'Login', 'Por favor ingrese su correo' );
    }  
  } 


  _goHome(id_user,token,pass){
    
    this.sesion = {
                id_user: id_user,
                token: token,
                pass: pass,
              }
    
    this.navigator.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: this.gotoRoute,
                  params: { route:this.gotoRoute, sesion:this.sesion, id_user: id_user, token: token,pass: pass,register:true },
                }
              ],
            })
          )
  }
  _goHome2(){
    
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

  _goRegister(){
    //this.props.navigator.push({
    //  title:"Register",
    //  name: 'Register',
    //  passProps:{}
    //});
    this.navigator.navigate('Register', {screen:'Register'})
  }

  setModalVisible(visible) {
    this.clearText();
    this.setState({modalVisible: visible});
  }

  renderLoadingView(){
      return(
          <View style={[layout.mainContainer, layout.centerCenter]}>
              <Text style={[text.mainText, text.semibold, text.darkgray, text.center]}> Cargando información ... </Text>   
          </View>
      );
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
          this.setState({loaded:false});
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
                    {text: 'Registrar con correo', onPress: () => this.navigator.navigate('Register', {})},
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
                        //this._gotoLogin(responseJson.id_user+'',responseJson.token,responseJson.user_pass); // ToDo: ONLY FOR REGISTER
                        this._onValueKey(responseJson.token,responseJson.id_user,responseJson.user_pass).done();
                      } catch (error) {
                        this.setState({loaded:true});
                        //alert('AsyncStorage error: ' + error.message);
                        Alert.alert( 'Login', 'Problemas en el envio de datos intenta nuevamente.' );
                      }
                    }else{
                      debugMe('LoginFb', responseJson);
                      this.setState({loaded:true});
                       Alert.alert( 'Login', 'Problemas en el envio de datos intenta nuevamente.' );
                    }
                  })
                  .catch((error) => { 
                    this.setState({loaded:true});
                    /*console.warn(error);*/
                     Alert.alert( 'Login', 'Problemas en el envio de datos intenta nuevamente.' );
                   }); // fetch
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

  _updateState = (data) => {
    this.setState(data);
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
               this._onValueKey(responseJson['token'],responseJson['id_user'],responseJson['user_pass']).done();
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

  render() { 
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
   

    const bgColor = 'rgba(0, 0, 0, 0.6)';
    let fbShown = true;
    // if (Platform.OS === 'android' && parseInt(this.getSystemVersion) >= 10 ){
    //   fbShown = false;
    // }

    return (
      <ImageBackground
        source={require('../Img/titan_plaza/login/loginBg.jpg')}
        style={loginLayout.loginContainer} >

        <ScrollView style={{flex: 1, backgroundColor: 'transparent'}}>

        <View style={loginLayout.loginTop}>
          
          <TouchableOpacity style={interactions.simpleLink} onPress={()=>this._goHome2()}>
            <Text style={[text.linkText, text.semibold, text.white, text.right ]}>
              Saltar
            </Text>
          </TouchableOpacity>

        </View>

          <View style={layout.centerCenter} >
            <Image
            resizeMode={'stretch'}
            source={require('../Img/titan_plaza/logos/logo02.png')}
            style={loginLayout.logoCC}
          />
          <Text style={[spacers.mt2, spacers.mb2, layout.centerCenter, text.titleText, text.white]} > Login</Text>
          </View>
          
          { fbShown &&
            <View style={loginLayout.loginFBContainer} >

            <TouchableOpacity style={[interactions.gralButton, interactions.facebookBlue, interactions.center]} onPress={this._handleFacebookLogin}>
              <CustomIcon name='facebook' size={25} style={[interactions.buttonIcon,text.white]} />
              <Text style={[text.buttonLabel, text.semibold, text.white]}>
                Ingresar con Facebook
              </Text>
            </TouchableOpacity> 
              
            </View> 
          }
          { Platform.OS === 'ios' ?
           <View style={loginLayout.loginFBContainer} >

              <AppleButton
              buttonStyle={AppleButton.Style.WHITE}
              buttonType={AppleButton.Type.SIGN_IN}
              style={[interactions.gralButton, interactions.facebookBlue, interactions.center]}
              onPress={() => this.onAppleButtonPress().done()}
            />
            
          </View> : null }

       <View style={[layout.separator]}></View>

        <SafeAreaView
          style={[loginLayout.formContainer, spacers.mt1, spacers.pt2]}>

          <View style={forms.inputGroup}>

            <View style={forms.inputLabelCont}>
              <Text style={[text.inputLabel, text.bold, text.black]}>
                Correo electrónico
              </Text>
            </View>

            <TextInput
              ref={component => this._textInputEmail = component}  
              value={this.state.email}
              autoCapitalize="none" 
              placeholderTextColor= "#666C80"
              style={[forms.mainInput, forms.darkInput, !this.state.errorEmail && this.state.email.length>0 ? forms.successInput : null]}
              onChangeText={(text) => this._updateState({email:text, errorEmail: !this.validateEmail(text)}) }
              // onFocus={this.setState({focusInput:true,})}
              // onBlur={this.setState({focusInput:false,})}
              placeholder='Tu correo electrónico' keyboardType = "email-address"
              //underlineColorAndroid="transparent" 
            />
            {!this.state.errorEmail && this.state.email.length>0?
              <View style={forms.validateIconCont}>
                <CustomIcon name='check' size={18} style={forms.validateIconSuccess} />
              </View>
            :null}

          </View>

          <View style={forms.inputGroup}>

            <View style={forms.inputLabelCont}>
               <Text style={[text.inputLabel, text.bold, text.black]}>
                Contraseña
              </Text>
            </View>

            <TextInput
                ref={component => this._textInputPass = component}  
                autoCapitalize="none"  
                style={[forms.mainInput, forms.darkInput, this.state.errorPass ? [forms.activeInput] : null]}
                placeholder='Contraseña'
                placeholderTextColor= "#666C80"
                password={true}
                secureTextEntry={true}
                onChangeText={(text) => this._updateState({pass: text, errorPass: text.length < 2}) }
                //underlineColorAndroid="transparent"
              />

          </View>

          <TouchableOpacity style={interactions.simpleLink} onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
            <Text style={[text.linkText, text.semibold, text.purple, text.center ]}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[interactions.gralButton, interactions.purple, interactions.center]} onPress={this.sendLogin} disabled={this.state.disabled}>
            <Text style={[text.buttonLabel, text.bold, text.white]}>
              Ingresar
            </Text>
          </TouchableOpacity>

        </SafeAreaView>

        <View>
          <TouchableOpacity style={interactions.simpleLink} onPress={this._goRegister}>
            <Text style={[text.mainText, text.semibold, text.white, text.center ]}>
              ¿Aún no tienes una cuenta?
            </Text>
            <Text style={[text.mainText, text.bold, text.purple, text.center ]}>
              Registrate Gratis
            </Text>
          </TouchableOpacity>
        </View>
        </ScrollView>

        <BusyIndicator 
          activity_loading={this.state.activity_loading} 
          activity_text={this.state.activity_text} 
        />
        
        {/* RECOVER PASSWORD */}
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {debugMe("Modal has been closed.")}}
        >
          <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>

            <KeyboardAvoidingView style={layout.mainContainer} behavior={Platform.select({ios: "padding", android: ""})} enabled>
    
              <View style={loginLayout.innerModalContainer}>

                <View style={loginLayout.loginTop}>
                  <TouchableOpacity style={interactions.closeModalButton} onPress={() => {
                    this.setModalVisible(!this.state.modalVisible)
                  }}>
                  <View style={[loginLayout.closeBackground]}>
                   <CustomIcon name='cross' size={25} style={[text.darkgray]} />  
                  </View>
                  
                  </TouchableOpacity>
                </View>

                <View style={[loginLayout.formContainerSecondary]}>

                  <View style={layout.centerCenter} > 
                    <Image
                    resizeMode={'stretch'}
                    style={loginLayout.recoveryImage}
                    source={require('../Img/titan_plaza/login/passRecoveryImg.png')}/>
                  </View>
                
                  <Text style={[text.titleText, text.semibold, text.darkgray, text.center]}>¿Olvidaste tu contraseña?</Text>

                  <Text style={[text.mainText, text.regular, text.darkgray, text.center]}>Ingresa tu correo electrónico para recibir instrucciones de como recuperar tu contraseña.</Text>

                  <View style={[forms.inputGroup, spacers.mt2]}>

                    <View style={forms.inputLabelCont}>
                      <Text style={[text.inputLabel, text.bold, text.black]}>
                        Correo electrónico
                      </Text>
                    </View>

                    <TextInput
                      ref={component => this._textInputEmail = component}  
                      value={this.state.email}
                      autoCapitalize="none" 
                      placeholderTextColor= "#666C80"
                      style={[forms.mainInput, forms.darkInput, !this.state.errorEmail && this.state.email.length>0 ? forms.successInput : null, {minWidth:300}]}
                      onChangeText={(text) => this._updateState({email:text, errorEmail: !this.validateEmail(text)}) }
                      // onFocus={this.setState({focusInput:true,})}
                      // onBlur={this.setState({focusInput:false,})}
                      placeholder='Tu correo electrónico' keyboardType = "email-address"
                      //underlineColorAndroid="transparent" 
                    />
                      {!this.state.errorEmail && this.state.email.length>0?
                        <View style={forms.validateIconCont}>
                        <CustomIcon name='check' size={18} style={text.green} />
                        </View>
                        :null}

                    </View>

                    <View style={loginLayout.loginFBContainer} >
                    <TouchableOpacity style={[interactions.gralButton, interactions.purple, interactions.center]} onPress={this.recoverPass}>
                      <Text style={[text.buttonLabel, text.bold, text.white, text.center]}> ENVIAR </Text>
                    </TouchableOpacity>
                  </View>

                  </View>

              </View>
               

            </KeyboardAvoidingView>
            
          </SafeAreaView>
        </Modal>
      </ImageBackground> 
    );
  } 
}

module.exports = Login;
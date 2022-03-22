'use strict';

import React, { Component } from 'react'; 
import {PropTypes} from 'prop-types';

import {
    Text,
    TextInput,
    View,
    Alert,
    Modal,
    Image,
    ScrollView,
    TouchableHighlight, 
    TouchableOpacity, 
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import CustomIcon from './CustomIcon.js'
import BusyIndicator from './BusyIndicator'

import {
  debugMe
} from '../Utilities/Messaging'

import { CommonActions, DrawerActions, StackActions } from '@react-navigation/native';

import store from '../Reducers/store';
import { startSession} from '../Reducers/action';

import { loginLayout, layout, text, interactions, forms, spacers, drawerMenu  } from '../Styles/TitanPlaza/Global';



import ModalSelector from 'react-native-modal-selector'
import DatePicker from 'react-native-datepicker'
import CheckBox from 'react-native-check-box'
import sha1 from 'sha1';

import {
  valAdult,
} from './utility';

//const Home = require('./Home');
var styles= require('../Styles/MyStyles');
var today= new Date();
const CONST = require('../Constants/constants');


class EditProfile extends Component {

    constructor(props, context) {
        super(props, context);

        this.navigator = this.props.navigation;
        const {state} = this.navigator;
        
        if (this.props.route.params) {
          this.sesion = this.props.route.params["sesion"]? this.props.route.params["sesion"]: null;
          this.gotoRoute = this.props.route.params["gotoRoute"]? this.props.route.params["gotoRoute"]: null;
        }

        this.gender_data = [
          { key: 'M', label: 'Masculino' },
          { key: 'F', label: 'Femenino' },
        ];

        this._saveChanges = this._saveChanges.bind(this);

        this._cancel = this._cancel.bind(this); 
        this.state = {
            name:"",
            surname:"",
            fullname:store.getState().todos.fullname,
            email:"",
            address:"",
            phone_number:"",
            document_number:'',
            birthDate:"1970-01-01",
            children:0,
            cities:[],
            civilStates:[],
            hobbiesArray:[],
            idSelectCity: '',
            idSelectTransport: '',
            idSelectCivilStatus: '',
            idSelectGender: '',
            idSelectState:'',
            idSelectDocumentTypes:'',
            numbers:[],
            selectCity: 'Ciudad',
            selectCivilStatus: 'Estado Civil',
            selectDocumentTypes: 'Tipo de documento',
            selectGender: 'Género',
            selectHobbies:[],
            selectState: 'Departamento',
            selectTransport:'Transporte',
            states:[],
            statesCivil:[],
            documentTypes:[],
            transports:[],
            loaded: false,

            activity_text: '',
            activity_loading: false,

            oldPass: '',
            newPass: '',
            repeatPass: '',

            modalPassVisible: false,
        }
        this.sesion = {
            id_user: store.getState().todos.id,   
            token: store.getState().todos.token,
            pass: store.getState().todos.pass
          }
        
    }

    componentDidMount(){
        //tracker.trackScreenView('Editar Perfil');
        this._valSessionUser();

    }

    
    _setBusyIndicator = (activity_loading, activity_text) => {
      this.setState({activity_loading: activity_loading})
      this.setState({activity_text: activity_text})
    }

    _valSessionUser(){
    
        if(this.sesion.id_user=="" ||  this.sesion.token=="" || this.sesion.id_user==undefined ||  this.sesion.token==undefined){

        //this.setState({loaded:true})

        Alert.alert(
                'Pefil',
                'Debes estar logeado para poder ingresar a esta seccion',
                [
                  {text: 'Login', onPress: () => this._gotoLogin()},
                ]
            )
      }else{

        this._getStates();
        this._getHobbiesUser(this.sesion.id_user,this.sesion.token);
      }

   
  }
  
   _gotoLogin(){
    //this.props.navigator.replace({ component: Login, title: 'Login', name:'Login',passProps:{}  }); 
        // this.navigator.dispatch(StackActions.reset({
        //   index: 0,
        //   actions: [
        //     NavigationActions.navigate({ routeName: 'Login', params: {route:'Login'} })
        //   ]
        // }));

        this.navigator.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: "Login",
                  params: { route:"Login" },
                }
              ],
            })
          )
  }

    _saveChanges(){

        var child=parseInt(this.state.children);
        var restric= new Date();
        var mydate= new Date(this.state.birthDate);
        
        restric.setFullYear(restric.getFullYear()-10)
        
        if(mydate.getHours()==19){
            mydate.setDate(mydate.getDate()+1);
        }

        //console.log(this.state);   

        if(this.state.name.length==0 || this.state.surname.length==0) {
          Alert.alert( 'Perfil',"Debes ingresar tu Nombre y Apellido.");
          return false;
        }
        // else if(this.state.idSelectGender == 0 || this.state.idSelectGender=='' || this.state.idSelectGender== null) { 
        //     Alert.alert( 'Perfil',"Debes seleccionar tu Género.");
        //     return false;}
        else if(this.state.birthDate == '' || !valAdult(this.state.birthDate) || this.state.birthDate== null) { 
            Alert.alert( 'Perfil',"Debes ser mayor de edad.");
            return false;
         //} else if(this.state.idSelectCivilStatus == 0 || this.state.idSelectCivilStatus=='' || this.state.idSelectCivilStatus == -1) {
        //     Alert.alert( 'Perfil',"Debes seleccionar tu Estado Civil.");
        //     return false;
        }else if(this.state.idSelectDocumentTypes == 0 || this.state.idSelectDocumentTypes=='' || this.state.idSelectDocumentTypes == null) {
            Alert.alert( 'Perfil',"Debes seleccionar tu Tipo de Documento.");
            return false;
        }else if(this.state.document_number == 0 || this.state.document_number=='' || this.state.document_number == null) {
            Alert.alert( 'Perfil',"Debes ingresar tu Número de Documento.");
            return false;
        }else if(this.state.idSelectState == 0 || this.state.idSelectState=='' || this.state.idSelectState == null || this.state.idSelectCity == 0 || this.state.idSelectCity=='' || this.state.idSelectCity == null ) {
            Alert.alert( 'Perfil',"Debes seleccionar tu Departamento y Ciudad.");
            return false;
        }else if(this.state.phone_number == 0 || this.state.phone_number=='' || this.state.phone_number == null) {
            Alert.alert( 'Perfil',"Debes ingresar tu Número de Celular.");
            return false;
        }else if(this.state.address == 0 || this.state.address=='' || this.state.address == null) {
            Alert.alert( 'Perfil',"Debes ingresar tu Dirección.");
            return false;
        }else if(isNaN(child) || child < 0 || child > 30) {
          Alert.alert( 'Perfil',"Debes ingresar una cantidad de hijos válida.");
          return false;
        }else {

            //id_user,token,name,surname,birthDate,gender,civilStatus,id_document_type,document_number,id_city,phone_number,address,number_children,transport,hobbies
          this._editInfoUser(
              this.sesion.id_user,
              this.sesion.token,
              this.state.name,
              this.state.surname,
              this.state.birthDate,
              this.state.idSelectGender,
              this.state.idSelectCivilStatus,
              this.state.idSelectDocumentTypes,
              this.state.document_number,
              this.state.idSelectCity,
              this.state.phone_number,
              this.state.address,              
              this.state.children,
              this.state.idSelectTransport,
              this.state.selectHobbies,
            );
        }

    }
    _cancel(){
        //this.props.navigator.replace({ component: Home, title: 'Home', name:'Home',passProps:{}  }); 
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
    _getLabel(array,target,opcion){
        if(array.length>1){
            if(opcion == 1){var min = 1;var max = parseInt(min) + parseInt(array.length) - 1 ;}else{var min = 0;var max = parseInt(min) + parseInt(array.length);}
            for(var a = min ; a < max ; a++){
                if(array[a].key==target){
                    switch(opcion) {
                        case 1:
                            this.setState({selectState: array[a].label})
                            break;
                        case 2:
                            this.setState({selectCity: array[a].label})
                            break;
                        case 3:
                            this.setState({selectCivilStatus: array[a].label})
                            break;
                        case 4:
                            this.setState({selectTransport: array[a].label})
                            break;
                        case 5:
                            this.setState({selectGender: array[a].label})
                            break;
                        case 6:
                            this.setState({selectDocumentTypes: array[a].label})
                            break;
                    }
                }
            }

        }
    }

    _getHobbiesUser(id_user,token){

        fetch(CONST.URL_AMFPHP, { 
            method: 'POST', 
            headers: { 'Accept': 'application/json', 
            'Content-Type': 'application/json', 
        }, 
        body: JSON.stringify({ 
            "serviceName":"amf_mobile_services",
            "methodName":"getListHobbiesByIdUser",
            "parameters":[id_user,token]
        }) 
        }) 
        .then((response) => response.json()) 
        .then((responseJson) => { 
            var hobbiesUser = responseJson;
            var {selectHobbies} = this.state;
            for (var i = 0; i <=hobbiesUser.length-1; i++) {
                selectHobbies.push(hobbiesUser[i].id_utils_category_details);
            }
            this.setState({selectHobbies});
        }) 
        .catch((error) => { //Alert.alert( 'Almacenes', 'Problemas obteniendo la información, intenta nuevamente.' ); 
            /*console.warn(error);*/ });
    }
    _getStates(){

        fetch(CONST.URL_AMFPHP, { 
            method: 'POST', 
            headers: { 'Accept': 'application/json', 
            'Content-Type': 'application/json', 
        }, 
        body: JSON.stringify({ 
            "serviceName":"amf_mobile_services",
            "methodName":"getStates"
        }) 
        }) 
        .then((response) => response.json()) 
        .then((responseJson) => { 
            var dataResult = responseJson;
            var dataSelect = [];

            for (var i = 1; i < responseJson.length; i++) {
                dataSelect[i] =  {'key':dataResult[i].id_state,'label':dataResult[i].state_name};
            }

            this.setState({
                states: dataSelect
            })
        }) 
        .catch((error) => { //Alert.alert( 'Almacenes', 'Problemas obteniendo la información, intenta nuevamente.' ); 
            /*console.warn(error);*/ });
        this._getStateCivil();
        
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

            console.log(infoUser);

            if(infoUser.year != undefined && infoUser.year != null && infoUser.year != "" && infoUser.year != "0000"){
                this.setState({birthDate: infoUser.year+"-"+infoUser.month+"-"+infoUser.day})
            }else{
                this.setState({birthDate: today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()})
            }

            if(infoUser.children==null){
                this.setState({children:0})
            }else{
                this.setState({children:infoUser.children})
            }
            this.setState({
                name:infoUser.name,
                surname:infoUser.surname,
                email:infoUser.email,
                address:infoUser.address,
                phone_number:infoUser.phone_number,
                document_number: infoUser.document_number,
                idSelectState:infoUser.id_state,
                idSelectCity:infoUser.id_city,
                idSelectCivilStatus:infoUser.status_civil,
                idSelectGender:infoUser.gender,
                idSelectTransport:infoUser.transporter,
                idSelectDocumentTypes: infoUser.id_document_type,
                loaded:true
            })
            this._getCitiesByStates(infoUser.id_state)
            this._getLabel(this.state.states,infoUser.id_state,1)
            this._getLabel(this.state.statesCivil,infoUser.status_civil,3)
            this._getLabel(this.state.transports,infoUser.transporter,4)
            this._getLabel(this.gender_data,infoUser.gender,5)
            this._getLabel(this.state.documentTypes,infoUser.id_document_type,6);
        }) 
        .catch((error) => { //Alert.alert( 'Almacenes', 'Problemas obteniendo la información, intenta nuevamente.' ); 
            /*console.warn(error);*/ });
    }

    _editInfoUser = (id_user,token,name,surname,birthDate,gender,civilStatus,id_document_type,document_number,id_city,phone_number,address,number_children,transport,hobbies) => {
            this._setBusyIndicator(true, '')

            fetch(CONST.URL_AMFPHP, { 
                method: 'POST', 
                headers: { 'Accept': 'application/json', 
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify({ 
                "serviceName":"amf_mobile_services",
                "methodName":"updatePerfil",
                //"parameters":[id_user,id_city,address,birthDate,children,civilStatus,hobbies,transport,token,gender,name,surname]
                "parameters":[id_user,token,name,surname,birthDate,gender,civilStatus,id_document_type,document_number,id_city,phone_number,address,number_children,transport,hobbies]
            }) 
            }) 
            .then((response) => response.json()) 
            .then((responseJson) => { 
                this._setBusyIndicator(false, '')

                var status = responseJson;

                if (status == 1) {

                  // update credentials-store
                  this._updateUserCredentials(this.sesion.id_user, this.sesion.pass, this.sesion.token, name, surname, store.getState().todos.avatar);
                  
                  //scheduleBirthdayNotification(true);

                  
                  Alert.alert(
                    'Perfil',
                    'Cambios realizados correctamente.',
                    [
                     {text: 'OK', onPress: () => {

                        console.log("this.gotoRoute", this.gotoRoute);
                        console.log("this.this.sesion", this.sesion);

                        if (this.gotoRoute != null) {
                            
                            //this.navigator.navigate(this.gotoRoute, {screen:this.gotoRoute, sesion:this.sesion})
                             // this.navigator.dispatch(StackActions.reset({
                             //      index: 0,
                             //      actions: [
                             //        NavigationActions.navigate({ routeName: this.gotoRoute, params: {route:this.gotoRoute, sesion:this.sesion} })
                             //      ]
                             //    }));

                              this.navigator.dispatch(
                                    CommonActions.reset({
                                      index: 0,
                                      routes: [
                                        {
                                          name: this.gotoRoute,
                                          params: { route:this.gotoRoute,sesion:this.sesion },
                                        }
                                      ],
                                    })
                                  )
                                
                        }
                            
                        }
                     }  
                    ]
                  );

                }
                else {
                  Alert.alert( 'Perfil',"No se pudo actualizar el perfil");

                }
            })
            .catch((error) => {
                this._setBusyIndicator(false, '')
            });
    }

    _getCitiesByStates(idState){
            fetch(CONST.URL_AMFPHP, { 
                method: 'POST', 
                headers: { 'Accept': 'application/json', 
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify({ 
                "serviceName":"amf_mobile_services",
                "methodName":"getCityByIdState",
                "parameters":[idState]
            }) 
            }) 
            .then((response) => response.json()) 
            .then((responseJson) => { 

                var dataResult = responseJson;
                var dataSelect = [];

                for (var i = 0; i < responseJson.length; i++) {
                    dataSelect[i] =  {'key':dataResult[i].id_city,'label':dataResult[i].city_name};
                }

                this.setState({
                    cities: dataSelect
                })
                this._getLabel(this.state.cities,this.state.idSelectCity,2)
            }) 
            .catch((error) => { //Alert.alert( 'Almacenes', 'Problemas obteniendo la información, intenta nuevamente.' ); 
                /*console.warn(error);*/ });
    }
    
    _getStateCivil(){
        fetch(CONST.URL_AMFPHP, { 
                method: 'POST', 
                headers: { 'Accept': 'application/json', 
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify({ 
                "serviceName":"amf_mobile_services",
                "methodName":"getStateCivil"
            }) 
        }) 
        .then((response) => response.json()) 
        .then((responseJson) => { 

            var dataResult = responseJson;
            var dataSelect = [];

            for (var i = 0; i < responseJson.length; i++) {
                dataSelect[i] =  {'key':dataResult[i].id_utils_category_details,'label':dataResult[i].value};
            }

            this.setState({
                statesCivil: dataSelect,
                })
            }) 
            .catch((error) => { //Alert.alert( 'Almacenes', 'Problemas obteniendo la información, intenta nuevamente.' ); 
                /*console.warn(error);*/ });
            this._getDocumentTypes();
    }


     _getDocumentTypes(){
        fetch(CONST.URL_AMFPHP, { 
                method: 'POST', 
                headers: { 'Accept': 'application/json', 
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify({ 
                "serviceName":"amf_mobile_services",
                "methodName":"getDocumentTypes"
            }) 
        }) 
        .then((response) => response.json()) 
        .then((responseJson) => { 

            var dataResult = responseJson;
            var dataSelect = [];

            for (var i = 0; i < responseJson.length; i++) {
                dataSelect[i] =  {'key':dataResult[i].id_document_type,'label':dataResult[i].name};
            }

            this.setState({
                documentTypes: dataSelect,
                })
            }) 
            .catch((error) => { //Alert.alert( 'Almacenes', 'Problemas obteniendo la información, intenta nuevamente.' ); 
                /*console.warn(error);*/ });
            this._getHobbies();
    }



    _getHobbies(){
        fetch(CONST.URL_AMFPHP, { 
                method: 'POST', 
                headers: { 'Accept': 'application/json', 
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify({ 
                "serviceName":"amf_mobile_services",
                "methodName":"get_list_hobbies"
            }) 
        }) 
        .then((response) => response.json()) 
        .then((responseJson) => { 

            var dataResult = responseJson;
            var dataSelect = [];

            for (var i = 0; i < responseJson.length; i++) {
                dataSelect[i] =  {'key':dataResult[i].id_utils_category_details , 'label':dataResult[i].value};
            }

            this.setState({
                hobbiesArray: dataSelect
                })
            this._getTransports();
            }) 
            .catch((error) => { //Alert.alert( 'Almacenes', 'Problemas obteniendo la información, intenta nuevamente.' ); 
                /*console.warn(error);*/ });
    }

    _getTransports(){
        fetch(CONST.URL_AMFPHP, { 
                method: 'POST', 
                headers: { 'Accept': 'application/json', 
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify({ 
                "serviceName":"amf_mobile_services",
                "methodName":"getListTransport"
            }) 
        }) 
        .then((response) => response.json()) 
        .then((responseJson) => { 

            var dataResult = responseJson;
            var dataSelect = [];

            for (var i = 0; i < responseJson.length; i++) {
                dataSelect[i] =  {'key':dataResult[i].id_utils_category_details , 'label':dataResult[i].value};
            }

            this.setState({
                transports: dataSelect
                })
            this._getInfoUser(this.sesion.id_user,this.sesion.token);
            }) 
            .catch((error) => { //Alert.alert( 'Almacenes', 'Problemas obteniendo la información, intenta nuevamente.' ); 
                /*console.warn(error);*/ });
    }

    renderCheckBox(data) {
        let rightText = data.label;
        let isChecked = false;
        if(this.state.selectHobbies.indexOf(data.key)!=-1){
            isChecked = true;
        }else{
            isChecked = false;
        }
        return (
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={()=>this.onClick(data)}
                isChecked={isChecked}
                rightText={rightText}
                checkedImage={<Image source={require('../Img/titan_plaza/forms/checkbox_on.png')}/>}
                unCheckedImage={<Image source={require('../Img/titan_plaza/forms/checkbox_off.png')}/>}
            />);
    }    

    renderView() {
        if (!this.state.hobbiesArray || this.state.hobbiesArray.length === 0)return;
        var len = this.state.hobbiesArray.length;
        var views = [];
        for (var i = 0, l = len - 2; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.hobbiesArray[i])}
                        {this.renderCheckBox(this.state.hobbiesArray[i + 1])}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        views.push(
            <View key={len - 1}>
                <View style={styles.item}>
                    {len % 2 === 0 ? this.renderCheckBox(this.state.hobbiesArray[len - 2]) : null}
                    {this.renderCheckBox(this.state.hobbiesArray[len - 1])}
                </View>
            </View>
        )
        return views;

    }

//Funcion encargada del array de hobbies seleccionados para enviar al servicio
    onClick(data) {
        var selected = [];
        if(!this.isRemoveKey){
            data.checked=!data.checked;
            var a= this.state.selectHobbies.indexOf(data.key);
            if(a==-1){
                var {selectHobbies} = this.state;
                selectHobbies.push(data.key);
                this.setState({selectHobbies});
            }else{
                var {selectHobbies} = this.state;
                selectHobbies.splice(a,1);
                this.setState({selectHobbies});
            }
        }
    } 

    renderLoadingView(){
        return(
            <View style={styles.container}>
                <Text> Cargando información ... </Text>   
            </View>
        );
    }

    _updateState = (data) => {
        this.setState(data);
    }

    _updateUserCredentials = async (id_user, pass, token, name, surname, avatar_folder_url) => {
      var fullname= name+" "+surname;
      this.setState({fullname});
      store.dispatch(startSession(id_user, pass, token, fullname, avatar_folder_url+"avatar.jpg"));
      this.sesion = {
        id_user: id_user,   
        token: token,
        pass: pass
      }

      this.sessionSet(id_user,pass,token,fullname,'email',avatar_folder_url+"avatar.jpg").done();
       
    }

    sessionSet = async (id_user,pass,token,fullname,email,avatar) => {
    
    const id_user_sesion = [CONST.STORAGE_ID_USER, id_user]
    const pass_sesion = [CONST.STORAGE_PASS, pass]
    const token_sesion = [CONST.STORAGE_TOKEN, token]
    const fullname_sesion = [CONST.STORAGE_NAME_USER, fullname]
    const avatar_sesion = [CONST.STORAGE_AVATAR, avatar]
    const email_sesion = [CONST.STORAGE_EMAIL, email]
    
    try {

      await AsyncStorage.multiSet([id_user_sesion, pass_sesion, token_sesion, fullname_sesion, avatar_sesion, email_sesion ])    

      
    } catch(e) {
      debugMe(e)
    }

    debugMe("Done.")


  }

    _updateUserPassword = (id_user,pass,token) => {
      this._setBusyIndicator(true, '')

      fetch(CONST.URL_AMFPHP, {
              method: 'POST',
              headers: { 'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "serviceName":"amf_mobile_services",
              "methodName":"updateUserPassword",
              "parameters":[id_user,pass,token]
          })
      })
      .then((response) => response.json()) 
      .then( (responseJson) => {

        this._setBusyIndicator(false, '')

        if (responseJson.id_user) {

          // update credentials-store
          this._updateUserCredentials(id_user, pass, token, responseJson.name, responseJson.surname, responseJson.avatar_folder_url);

          // reset pass
          this.setState({
            oldPass: '',
            newPass: '',
            repeatPass: '',
          });

          Alert.alert( '', 'Cambio de contraseña exitoso',
            [
              {text: 'Continuar', onPress: () => this.setState({modalPassVisible: false}) },
            ]
          );          
        }
        else if (responseJson == -1) {
          Alert.alert( 'Error', 'Token incorrecto');
        }
        else if (responseJson == 0) {
          Alert.alert( 'Error', 'No se pudo cambiar la contraseña');
        }

      }).catch((error) => {
        Alert.alert( 'Error', error);

        this._setBusyIndicator(false, '')        
      });
    }

    _updatePasswordModal = () => {
      return(

      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalPassVisible}
        onRequestClose={() => {debugMe("Modal has been closed.")}}
      >

        <ScrollView 
          ref='scrollView' 
          automaticallyAdjustContentInsets={false} 
          scrollsToTop={true}
          //onScroll={() => { debugMe('onScroll!'); }} 
          scrollEventThrottle={200}
          keyboardDismissMode='interactive'
          style={[layout.mainContainer]}>

          <View style={layout.innerContainer, spacers.mt2}>

            <View style={loginLayout.loginTop}>
              <TouchableOpacity style={interactions.closeModalButton} onPress={() => {
                this.setState({modalPassVisible: false})
              }}>
              <View style={[loginLayout.closeBackground]}>
                <CustomIcon name='cross' size={25} style={text.darkgray} />
                </View>
              </TouchableOpacity>
            </View>


            <View style={loginLayout.innerModalContainerPassword}>

                <View style={layout.centerCenter}>
              <Image
                resizeMode={'stretch'}
                style={loginLayout.recoveryImage}
                source={require('../Img/titan_plaza/login/passRecoveryImg.png')}/>
                </View>
              <Text style={[text.titleText, text.semibold, text.darkgray, text.center]}>Cambiar contraseña</Text>

              {/*
              <Text style={[text.mainText, text.regular, text.darkgray, text.center]}>Ingresa tu correo electrónico para recibir instrucciones de como recuperar tu contraseña.</Text>
            */}

              <View style={[forms.inputGroup, spacers.mt2, {marginBottom: 20, marginTop:0}]}>
                <View style={forms.inputLabelCont}>
                  <Text style={[text.inputLabel, text.regular, text.dark]}>
                    Contraseña actual
                  </Text>
                </View>

                <TextInput
                  ref={component => this._textInputEmail = component} 
                  value={this.state.oldPass}
                  autoCapitalize="none" 
                  placeholderTextColor= "#666C80"
                  style={[forms.mainInput, forms.darkInput, {marginTop: 0, paddingTop: 0}]}
                  secureTextEntry = {true}
                  onChangeText = { (text) => { this.setState({oldPass: text}) }}
                />
              </View>

              <View style={[forms.inputGroup, spacers.mt2, {marginBottom: 20, marginTop:0}]}>
                <View style={forms.inputLabelCont}>
                  <Text style={[text.inputLabel, text.regular, text.dark]}>
                    Nueva contraseña
                  </Text>
                </View>

                <TextInput
                  ref={component => this._textInputEmail = component} 
                  value={this.state.newPass}
                  autoCapitalize="none" 
                  placeholderTextColor= "#666C80"
                  style={[forms.mainInput, forms.darkInput, {marginTop: 0, paddingTop: 0}]}
                  secureTextEntry = {true}
                  onChangeText = { (text) => { this.setState({newPass: text}) } }                  
                />
              </View>

              <View style={[forms.inputGroup, spacers.mt2, {marginBottom: 20, marginTop:0}]}>
                <View style={forms.inputLabelCont}>
                  <Text style={[text.inputLabel, text.regular, text.dark]}>
                    Repita la nueva contraseña
                  </Text>
                </View>

                <TextInput
                  ref={component => this._textInputEmail = component} 
                  value={this.state.repeatPass}
                  autoCapitalize="none" 
                  placeholderTextColor= "#666C80"
                  style={[forms.mainInput, forms.darkInput, {marginTop: 0, paddingTop: 0}]}
                  secureTextEntry = {true}
                  onChangeText = { (text) => { this.setState({repeatPass: text}) }}                  
                />
                {this.state.newPass.length>0 && this.state.newPass===this.state.repeatPass?
                  <View style={forms.validateIconCont}>
                    <CustomIcon name='check' size={18} style={text.green} />
                  </View>
                :null}
              </View>

              <TouchableOpacity
                style={[interactions.gralButton, interactions.purple, interactions.center]}
                onPress={()=>{
                  const oldPassSha1 = sha1(this.state.oldPass);
                  const newPassSha1 = sha1(this.state.newPass);

                  if (this.sesion.pass!=oldPassSha1) {
                    Alert.alert('Error', 'La contraseña actual es incorrecta');                  
                  }
                  else if (this.state.newPass.length==0 && this.state.newPass!=this.state.repeatPass) {
                    Alert.alert('Error', 'La validación de la nueva contraseña no coinciden');                  
                  }
                  else {
                    this._updateUserPassword(this.sesion.id_user, newPassSha1, this.sesion.token);
                  }
                }}>
                <Text style={[text.buttonLabel, text.semibold, text.white]}>
                  CAMBIAR
                </Text>
              </TouchableOpacity>

            </View>

          </View>
         

        </ScrollView>

        <BusyIndicator 
          activity_loading={this.state.activity_loading} 
          activity_text={this.state.activity_text} 
        />

      </Modal>
      );
    }





    render() {
        const avatar = (store.getState().todos.avatar && store.getState().todos.avatar!= "nullavatar.jpg")?
          {uri:CONST.BASE_URL+store.getState().todos.avatar}:
          require('../Img/avatar.jpg')

        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (

            <ScrollView 
                  ref='scrollView' 
                  automaticallyAdjustContentInsets={false} 
                  scrollsToTop={true}
                  //onScroll={() => { debugMe('onScroll!'); }} 
                  scrollEventThrottle={200}
                  keyboardDismissMode='interactive'
                   style={layout.mainContainer}>

                <View style={drawerMenu.drawerHeader}>

                    <View style={drawerMenu.profileInfoContainer}>

                        <View style={drawerMenu.avatarProfileContainer}>
                            <Image
                              source={avatar}
                              style={drawerMenu.avatarImg}
                              onError={() => this.setState({ avatarError: true })}
                              onLoad={() => this.setState({ avatarError: false })}
                            />
                            {!this.state.avatarError ? (
                              <Image
                                source={avatar}
                                defaultSource={require("../Img/avatar.jpg")}
                              />
                            ) : (
                              <Image source={require("../Img/avatar.jpg")} />
                            )}
                        </View>

                        <View style={drawerMenu.userInfoContainer}>
                            <Text
                              style={[text.userName, text.bold, text.darkgray, text.left]}
                            >
                              {this.state.fullname}
                            </Text>

                            <Text style={[text.userMail, text.light, text.gray, text.left]}>
                              {this.state.email}
                            </Text>
                        </View>

                    </View>

                </View>

                <View 
                  
                  style={loginLayout.formContainer}>

                    <Text style={[text.mainText, text.semibold, text.drakgray, text.left, spacers.mt2, spacers.mb2 ]}>
                        Información Personal 
                    </Text>

                    <View style={forms.inputGroup}>

                        <View style={forms.inputLabelCont}>
                          <Text style={[text.inputLabel, text.regular, text.gray]}>
                            Nombre
                          </Text>
                        </View>

                        <TextInput
                          value={this.state.name}  
                          autoCapitalize="none"  
                          style={[forms.mainInput, forms.darkInput]}
                          onChangeText={(text) => this._updateState({name:text}) }
                          placeholder='Tu nombre'
                          placeholderTextColor= "#B8BDCC"
                          underlineColorAndroid="transparent"
                        />

                    </View>

                    <View style={forms.inputGroup}>

                        <View style={forms.inputLabelCont}>
                          <Text style={[text.inputLabel, text.regular, text.gray]}>
                            Apellido
                          </Text>
                        </View>

                        <TextInput
                          value={this.state.surname}  
                          autoCapitalize="none"  
                          style={[forms.mainInput, forms.darkInput]}
                          onChangeText={(text) => this._updateState({surname:text}) }
                          placeholder='Tu apellido'
                          placeholderTextColor= "#B8BDCC"
                          underlineColorAndroid="transparent"
                        />

                    </View>

                     <View style={forms.inputGroup}>

                        <View style={forms.inputLabelCont}>
                          <Text style={[text.inputLabel, text.regular, text.gray]}>
                            Fecha de Nacimiento
                          </Text>
                        </View>

                        <DatePicker
                            style={forms.mainSelect}
                            date={this.state.birthDate}
                            mode="date"
                            showIcon= {false}
                            placeholder="Fecha de Nacimiento"
                            format="YYYY-MM-DD"
                            minDate="1900-01-01"
                            //maxDate={today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate()}
                            confirmBtnText="Aceptar"
                            cancelBtnText="Cancelar"
                            customStyles={{
                            dateInput: {
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                borderWidth: 0,
                            }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this._updateState({birthDate: date}) }}/>

                        <View style={forms.validateIconCont}>
                            <CustomIcon name='calendar' size={18} style={text.darkgray} />
                        </View>

                    </View>

                    <View style={forms.inputGroup}>

                        <View style={forms.inputLabelCont}>
                          <Text style={[text.inputLabel, text.regular, text.gray]}>
                            Correo electrónico
                          </Text>
                        </View>

                        <TextInput
                          value={this.state.email}  
                          autoCapitalize="none"  
                          style={[forms.mainInput, forms.darkInput]}
                          // onChangeText={(text) => this._updateState({address:text}) }
                          placeholder='Correo electrónico'
                          placeholderTextColor= "#B8BDCC"
                          underlineColorAndroid="transparent"
                          keyboardType = "email-address"
                          editable = {false}

                        />

                    </View>
                  

                    <View style={forms.inputGroup}>

                        <View style={forms.inputLabelCont}>
                          <Text style={[text.inputLabel, text.regular, text.gray]}>
                            Tipo de documento
                          </Text>
                        </View>

                        <ModalSelector 
                            data={this.state.documentTypes}
                            onChange={(option)=>{
                                this._updateState({selectDocumentTypes:option.label, idSelectDocumentTypes:option.key})
                                
                            }}>
                            <View style={[forms.mainInput, forms.darkInput]}>
                                <Text>
                                  {this.state.selectDocumentTypes} 
                                </Text>
                            </View>
                        </ModalSelector>

                        <View style={forms.validateIconCont}>
                            <CustomIcon name='chevron' size={18} style={text.darkgray} />
                        </View>

                    </View>

                     <View style={forms.inputGroup}>

                        <View style={forms.inputLabelCont}>
                          <Text style={[text.inputLabel, text.regular, text.gray]}>
                            Número de documento
                          </Text>
                        </View>

                        <TextInput
                          value={this.state.document_number}  
                          autoCapitalize="none"  
                          style={[forms.mainInput, forms.darkInput]}
                          onChangeText={(text) => this._updateState({document_number:text}) }
                          placeholder='Tu número de documento'
                          placeholderTextColor= "#B8BDCC"
                          underlineColorAndroid="transparent"
                        />

                    </View>
                    <View style={forms.inputGroup}>

                        <View style={forms.inputLabelCont}>
                          <Text style={[text.inputLabel, text.regular, text.gray]}>
                            Departamento
                          </Text>
                        </View>

                        <ModalSelector 
                            data={this.state.states}
                            onChange={(option)=>{
                                this._updateState({selectState:option.label, idSelectState:option.key})
                                this._getCitiesByStates(option.key)
                            }}>
                            <View style={[forms.mainInput, forms.darkInput]}>
                                <Text>
                                  {this.state.selectState} 
                                </Text>
                            </View>
                        </ModalSelector>

                        <View style={forms.validateIconCont}>
                            <CustomIcon name='chevron' size={18} style={[text.darkgray]} />
                        </View>

                    </View>

                    <View style={forms.inputGroup}>

                        <View style={forms.inputLabelCont}>
                          <Text style={[text.inputLabel, text.regular, text.gray]}>
                            Ciudad
                          </Text>
                        </View>

                        <ModalSelector 
                            data={this.state.cities}
                            onChange={(option)=>{ this._updateState({selectCity:option.label, idSelectCity:option.key}) }}>
                            <View style={[forms.mainInput, forms.darkInput]}>
                                <Text>
                                  {this.state.selectCity} 
                                </Text>
                            </View>
                        </ModalSelector>

                        <View style={forms.validateIconCont}>
                            <CustomIcon name='chevron' size={18} style={text.darkgray} />
                        </View>

                    </View>

                    <View style={forms.inputGroup}>

                        <View style={forms.inputLabelCont}>
                          <Text style={[text.inputLabel, text.regular, text.gray]}>
                           Celular
                          </Text>
                        </View>

                        <TextInput
                          value={this.state.phone_number}  
                          autoCapitalize="none"  
                          style={[forms.mainInput, forms.darkInput]}
                          onChangeText={(text) => this._updateState({phone_number:text}) }
                          placeholder='Tu celular'
                          placeholderTextColor= "#B8BDCC"
                          underlineColorAndroid="transparent"
                        />

                    </View>

                    <View style={forms.inputGroup}>

                        <View style={forms.inputLabelCont}>
                          <Text style={[text.inputLabel, text.regular, text.gray]}>
                            Dirección
                          </Text>
                        </View>

                        <TextInput
                          value={this.state.address}  
                          autoCapitalize="none"  
                          style={[forms.mainInput, forms.darkInput]}
                          onChangeText={(text) => this._updateState({address:text}) }
                          placeholder='Tu dirección'
                          placeholderTextColor= "#B8BDCC"
                          underlineColorAndroid="transparent"
                        />

                    </View>

                   

                    <Text style={[text.mainText, text.semibold, text.drakgray, text.left, spacers.mt2, spacers.mb2 ]}>
                       Otra Información
                    </Text>

                    <View style={forms.inputGroup}>

                        <View style={forms.inputLabelCont}>
                          <Text style={[text.inputLabel, text.regular, text.gray]}>
                            Género
                          </Text>
                        </View>

                        <ModalSelector 
                            data={this.gender_data}
                            onChange={(option)=>{
                                this._updateState({selectGender:option.label, idSelectGender:option.key})
                            }}
                            >
                            <View style={[forms.mainInput, forms.darkInput]}>
                                <Text>
                                  {this.state.selectGender} 
                                </Text>
                            </View>
                        </ModalSelector>

                        <View style={forms.validateIconCont}>
                            <CustomIcon name='chevron' size={18} style={text.darkgray} />
                        </View>

                    </View>

                       <View style={forms.inputGroup}>

                        <View style={forms.inputLabelCont}>
                          <Text style={[text.inputLabel, text.regular, text.gray]}>
                            Estado Civil
                          </Text>
                        </View>

                        <ModalSelector 
                            data={this.state.statesCivil}
                            onChange={(option)=>{
                                this._updateState({selectCivilStatus:option.label, idSelectCivilStatus:option.key})
                                
                            }}>
                            <View style={[forms.mainInput, forms.darkInput]}>
                                <Text>
                                  {this.state.selectCivilStatus} 
                                </Text>
                            </View>
                        </ModalSelector>

                        <View style={forms.validateIconCont}>
                            <CustomIcon name='chevron' size={18} style={text.darkgray} />
                        </View>

                    </View>

                     <View style={forms.inputGroup}>

                        <View style={forms.inputLabelCont}>
                          <Text style={[text.inputLabel, text.regular, text.gray]}>
                            # de Hijos
                          </Text>
                        </View>

                        <TextInput
                          value={""+this.state.children}  
                          autoCapitalize="none"  
                          style={[forms.mainInput, forms.darkInput]}
                          onChangeText={(text) => this._updateState({children:text}) }
                          placeholder='# de hijos'
                          placeholderTextColor= "#B8BDCC"
                          underlineColorAndroid="transparent"
                        />

                    </View>

                     <View style={forms.inputGroup}>

                        <View style={forms.inputLabelCont}>
                          <Text style={[text.inputLabel, text.regular, text.gray]}>
                            Medio de transporte
                          </Text>
                        </View>

                        <ModalSelector 
                            data={this.state.transports}
                            onChange={(option)=>{
                                this._updateState({selectTransport:option.label, idSelectTransport:option.key})
                               
                            }}>
                            <View style={[forms.mainInput, forms.darkInput]}>
                                <Text>
                                  {this.state.selectTransport} 
                                </Text>
                            </View>
                        </ModalSelector>

                        <View style={forms.validateIconCont}>
                            <CustomIcon name='chevron' size={18} style={text.darkgray} />
                        </View>

                    </View>

                   

                    <Text style={[text.mainText, text.semibold, text.drakgray, text.left, spacers.mt2, spacers.mb2 ]}>
                        Intereses
                    </Text>
                    
                    {this.renderView()}

                    <TouchableOpacity style={[interactions.gralButton, interactions.purple, interactions.center]}
                      onPress={this._saveChanges} >
                        <Text style={[text.buttonLabel, text.semibold, text.white]}>
                          GUARDAR CAMBIOS
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[interactions.gralButton, interactions.purple, interactions.center, {backgroundColor: 'transparent', borderColor: '#903392', borderWidth: 1}]}
                      onPress={()=>this.setState({modalPassVisible:true})}
                      >
                        <Text style={[text.buttonLabel, text.semibold, text.purple]}>
                          CAMBIAR CONTRASEÑA
                        </Text>
                    </TouchableOpacity>

                </View>

                <BusyIndicator 
                  activity_loading={this.state.activity_loading} 
                  activity_text={this.state.activity_text} 
                />

                {/* CHANGE PASSWORD */}
                {this._updatePasswordModal()}

            </ScrollView>
        );
    }
}

module.exports = EditProfile;
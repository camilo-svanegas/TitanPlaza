'use strict';

import React, { Component } from 'react'; 
import {PropTypes} from 'prop-types';

import CustomIcon from './CustomIcon.js'
 
import {  
  Text, 
  TouchableOpacity, 
  View,
  StyleSheet,
  FlatList,
  Image,
  RecyclerViewBackedScrollView, 
  Picker,
  ScrollView,
  TextInput,
  RefreshControl,
  Alert
} from 'react-native';

import {
  debugMe
} from '../Utilities/Messaging'

import ModalSelector from 'react-native-modal-selector';

import { layout, text, interactions, filters, forms, stores  } from '../Styles/TitanPlaza/Global';

import {
  nameCapitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfEachWord,
} from './utility'


const CONST = require('../Constants/constants');


const StoreDetails = require('./StoreDetails');
const Login=require('./Login');

class FavoriteIcon extends Component {
  constructor(props,context){
    super(props,context);
    this.state={
      isfavorite: this.props.isfavorite,
    }
  }
  render() {
    return (
      <TouchableOpacity
        onPress={()=>{
          //this.setState({isfavorite: !this.state.isfavorite}, () => {
            this.props.onPress();
          //})
        }}
        style={interactions.FavButton} >

        <CustomIcon name='heart' size={25} style={[text.gray, this.props.isfavorite && text.purple] } />

      </TouchableOpacity>
    );
  }
}

class StoresFavorites extends Component {

  static propTypes = { 
    navigator: PropTypes.object.isRequired, 
  }; 

  constructor(props,context){
    super(props,context); 

    this.navigator = this.props.navigator;
    const {state} = this.navigator;
    
    this.sesion = this.props.sesion;

    this.tabsChange = this.props.tabsChange;

    //debugMe(this.props.sesion);

    this._setStoreFavorite = this._setStoreFavorite.bind(this);

    this.state={
      id_user: this.sesion.id_user,
      token: this.sesion.token,
      dataSource: [],
      loaded: false,
      noFavorites: false,
      currentScrollPos:0,
      isRefreshing: false,
      refreshing: false,
    }

  }

  componentDidMount(){
   
    this._getStores();
  }


  componentWillReceiveProps(nextProps){
    //console.warn("StoresFavorites", "componentWillReceiveProps", this.tabsChange, nextProps)
    if(this.state.id_user!="" &&  this.state.token!="" && this.state.id_user!=undefined &&  this.state.token!=undefined){
      this._getStores();
    }
  }
  

  _gotoLogin(){
    //this.props.navigator.push({ component: Login, title: 'Login', name:'Login',passProps:{}  }); 
    this.navigator.navigate('Login', {route:'Login'})
  }

  // _gotoStoresDetailsContainer(id_store,name,store){
  //   name = capitalizeFirstLetterOfEachWord(name);
  //   //this.props.navigator.push({component:StoreDetails, title:name, name:'StoreDetails',passProps:{id_store: id_store,name_store:name }});
  //   this.navigator.navigate('StoreDetails', {route:'StoreDetails', sesion:this.sesion, store:store, id: id_store, name_store:name, favoriteCallback:()=>this._getStores(this.state.selectCatID), tabIndex:0 })
  //   //this.props.navigator.pop();
  // }

   _gotoStoresDetailsContainer(id_store,name,store){

    name = capitalizeFirstLetterOfEachWord(name);
    
    //this.navigator.navigate('StoreDetails', {route:'StoreDetails', sesion:this.sesion, store:store, id: id_store, name_store:name, favoriteCallback:()=>this._getStores(this.state.selectCatID), tabIndex:0 })
    this.navigator.navigate('StoreDetails', {screen:'StoreDetails', sesion:this.sesion, store:store, id: id_store, name_store:name, favoriteCallback:()=>this._getStores(this.state.selectCatID), tabIndex:0 })
  }

 

  _getStores(){

    //debugMe(this.state.id_user);
    //debugMe(this.state.token);

    if(this.state.id_user=="" ||  this.state.token=="" || this.state.id_user==undefined ||  this.state.token==undefined){

      this.setState({loaded:true,noFavorites:true})

      Alert.alert(
              'Favoritos',
              'Debes estar logeado para poder ver tu lista de favoritos',
              [
                {text: 'Cancel', onPress: () => { this.setState({noFavorites:true})}},
                {text: 'Login', onPress: () => this._gotoLogin()},
              ]
          )

    }else{
          //this.setState({
          //    dataSource: new ListView.DataSource({
          //    rowHasChanged:(row1,row2) => row1 !== row2
          //  }),              
          //})


          fetch(CONST.URL_AMFPHP, { 
            method: 'POST', 
            headers: { 'Accept': 'application/json', 
            'Content-Type': 'application/json', 
          }, 
          body: JSON.stringify({ 
            "serviceName":"amf_mobile_services",
            "methodName":"getStoresFavoritesUser",
            "parameters":[this.state.id_user]

          }) 
          }) 
          .then((response) => response.json()) 
          .then((responseJson) => { 

            if (responseJson.length<=0) { 
              this.setState({noFavorites:true,isRefreshing: false,loaded:true,});
            }else{

              this.setState({
                dataSource: responseJson,
                isRefreshing: false,
                noFavorites:false,
                loaded:true,
              })

            }

          }) 
          .catch((error) => { //Alert.alert( 'Almacenes', 'Problemas obteniendo la información, intenta nuevamente.' ); 
            /*console.warn(error);*/ 
            this.setState({
                    loaded:true,
               });
          });

    }

  

  }



  _setStoreFavorite(id_store,status,nameStore){

    //his.setState({loaded:false})
    //this.setState({currentScrollPos: this.listView.scrollProperties.offset});

    if(status==0){
      status=1;
    }else if(status==1){
      status=0;
    }

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

      //debugMe(responseJson);

      this._getStores();


    }) 
    .catch((error) => { //Alert.alert( 'Almacenes', 'Problemas obteniendo la información, intenta nuevamente.' ); 
      /*console.warn(error);*/ 
    });

  }

  renderStores(store){

    store = store.item;

    var nameStore = store.nameStore.toLowerCase().replace(/((^| )[a-z])/g, function(a, b){
         return b.toUpperCase();
      });

    return(

      <View style={stores.storeItemContainer}>

        <TouchableOpacity 
          onPress={()=>this._gotoStoresDetailsContainer(store.id_store,store.nameStore,store)}
          style={stores.storeItem}>

          <View style={stores.storeItemImageContainer}>
            <Image
              style={stores.storeItemImage}
              source={{uri:CONST.BASE_URL+store.img_folder_url+"gallery_img.jpg"}}
            />
            
          </View>

          <View style={stores.storeItemTextContainer}>
          
            <View style={stores.storeItemMainInfo}>
              <Text style={[text.titleStoreText, text.bold, text.darkgray, text.left]}>
                {nameStore}
              </Text>
              <Text style={[text.categoryStoreText, text.light, text.gray, text.left]}>
                {store.nameBuilding}
              </Text>
            </View>

            <View style={stores.storeInteractionInfo}>

              <View style={stores.storeLocationInfo}>
               <CustomIcon name='map' size={23} style={stores.storeLocationIcon} />
                <Text style={[text.locationStoreText, text.semibold, text.purple, text.left]}>
                  {store.local_label} 
                </Text>

              </View>

              <View style={stores.storeFavButtonCont}>

                <FavoriteIcon isfavorite={store.favorites} onPress={()=>{
                  this._setStoreFavorite(store.id_store,store.favorites,store.nameStore)
                  }}
                />

              </View>

            </View>

          </View>

        </TouchableOpacity>

      </View>
    );
  }

  renderPromo(has_promo){
    if (has_promo==1) {
      return (
        <Image source={require('../Img/icons/promo-store.png')} style={{width:32,height:69}} />
      );
    }else{
      return null;
    }
  }

  _onRefresh() {
    this.setState({refreshing: true, loading: true}, ()=> {
      this._getStores();
      this.setState({refreshing: false});
    });
  }


  render() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    
    if (!this.state.noFavorites) {
      return (

       <View style={[{flex: 1, marginTop:20}]}>
        <FlatList
          style={stores.storeList}
          // ref={ref => this.listView = ref}
          // dataSource={this.state.dataSource}
          // decelerationRate ='normal'
          // renderRow={this.renderStores.bind(this)}

          ref={ref => this.listView = ref}
          style={filters.categoriesList}
          data={this.state.dataSource}
          renderItem={(item)=>this.renderStores(item)}
          keyExtractor={(item) => item.id_store}

          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        />
      </View>
      );
    } else {
      return this.renderNoFavorites();
    }

      
    
  }

  renderNoFavorites(){
    return(

      <View style={[layout.mainContainer, layout.centerCenter]}>

        <Image
          resizeMode={'stretch'}
          style={layout.mainAlertImage}
          source={require('../Img/titan_plaza/alerts/fav_alert.png')}/>

        <Text style={text.mainText, text.regular, text.darkgray, text.center}>No hay almacenes agregados 
          {"\n"}
          a tus Favoritos
        </Text>

      </View>

    );
  }

  renderLoadingView(){
    return(
      <View style={[layout.mainContainer, layout.centerCenter]}>
        <Text style={[text.mainText, text.darkgray, text.center, text.regular]} > Cargando Almacenes Favoritos ... </Text>
      </View>
    );
  }

}

module.exports = StoresFavorites;
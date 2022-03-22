'use strict';

import React, { Component } from 'react';
import {PropTypes} from 'prop-types';

import CustomIcon from './CustomIcon.js'

import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  //ListView,
  Image,
  RecyclerViewBackedScrollView,
  Picker,
  ScrollView,
  TextInput,
  Alert,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView, 
  FlatList,
  SectionList
} from 'react-native';

import {
  debugMe
} from '../Utilities/Messaging'

import {
  nameCapitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfEachWord,
} from './utility'

import { layout, text, interactions, filters, forms, stores  } from '../Styles/TitanPlaza/Global';

import ModalSelector from 'react-native-modal-selector';


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
          this.props.onPress();
        }}
        style={interactions.FavButton} >

        <CustomIcon name='heart' size={25} style={[text.gray, this.props.isfavorite && text.purple] } />

      </TouchableOpacity>
    );
  }
}

class Stores extends Component {

  static propTypes = {
    //navigator: PropTypes.object.isRequired,
  };

  constructor(props,context){
    super(props,context);

    this.navigator = this.props.navigator;
    const {state} = this.navigator;
    
    this.sesion = this.props.sesion;

    this.gotoStore = this.props.gotoStore ? this.props.gotoStore : null;

    this.tabsChange = this.props.tabsChange; // ToDo: revisar para que sirve esto

    this._setStoreFavorite = this._setStoreFavorite.bind(this);

    this.state={
      id_user: this.sesion.id_user,
      token: this.sesion.token,
      // dataSource: new ListView.DataSource({
      //   rowHasChanged:(row1,row2) => row1 !== row2,
      //   sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      // }),
      dataSource: [],
      loaded: false,
      //categories:'',
      selectCat: 'Filtrar por Categoría',
      selectCatID: 0,
      currentScrollPos:0,
      //categoryDataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      categoryDataSource: [],
      dropDownActive: false,
      searchText: "",
      allStores: null,
      refreshing: false,
      showDownArrow: true,
    }

    this._gotoStoresDetailsContainer = this._gotoStoresDetailsContainer.bind(this);

  }

  componentWillReceiveProps(nextProps){
    if(this.tabsChange==0){
      this._getStores(this.state.selectCatID);
    }
  }

  componentDidMount(){

    // // send event
    // logEvent('screen_view_rn', {
    //   //'item_id': 'NA',
    //   'item_title': 'Stores',
    // });

    
    this._getStoreCategories();
  }

  _gotoStoresDetailsContainer(id_store,name,store){

    name = capitalizeFirstLetterOfEachWord(name);
    
    //this.navigator.navigate('StoreDetails', {route:'StoreDetails', sesion:this.sesion, store:store, id: id_store, name_store:name, favoriteCallback:()=>this._getStores(this.state.selectCatID), tabIndex:0 })
    this.navigator.navigate('StoreDetails', {screen:'StoreDetails', sesion:this.sesion, store:store, id: id_store, name_store:name, favoriteCallback:()=>this._getStores(this.state.selectCatID), tabIndex:0 })
  }

  _validateGotoStore = (stores) => {
    if (this.gotoStore) {
      const query = this.gotoStore;
      const regex = new RegExp(`${query.trim()}`, 'i');
      //var filteredStations = stores.filter(store => store.id_store.toString().search(regex) >= 0);
      var filteredStations = stores.filter(store => store.id_store.toString()==this.gotoStore.toString());

      this.gotoStore = null;

      if (filteredStations.length>0) {
        var store = filteredStations[0];
        this._gotoStoresDetailsContainer(store.id_store,store.nameStore,store)
      }
    }
  }

  _getStoreCategories(){

    fetch(CONST.URL_AMFPHP, {
      method: 'POST',
      headers: { 'Accept': 'application/json',
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "serviceName":"amf_mobile_services",
        "methodName":"getLocalStoreCategories"
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {

      var dataResult = responseJson;

      dataResult.unshift({
        "id_store_cat":"0",
        "name":"todos",
        "thumb_url":"todos.gif"
      });
      dataResult = dataResult.map(nameCapitalizeFirstLetterOfEachWord);
      this.setState({
        //categoryDataSource: this.state.categoryDataSource.cloneWithRows(dataResult),
        categoryDataSource : dataResult
      });

      //console.log(this.state.categoryDataSource);

      this._getStores();
    })
    .catch((error) => {
      //Alert.alert( 'Almacenes', 'Problemas obteniendo la información, intenta nuevamente.' );
      Alert.alert(CONST.MALL_NAME, error.message);
      /*console.warn(error);*/
    });
  }

  _getStores(idCat=''){

    this.setState({
    //    loaded:false,
        selectCatID:idCat,
    })

    fetch(CONST.URL_AMFPHP, {
      method: 'POST',
      headers: { 'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "serviceName":"amf_mobile_services",
        "methodName":"getStoresByIdCatSec",
        "parameters":[idCat,this.state.id_user]
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {

      // this is for the searcher
      if (idCat === '') {
        this.setState({ allStores: responseJson });
      }

     this.setState({ dataSource: responseJson });

     //console.log(this.state.dataSource)

      this.setState({
        //dataSource: this.state.dataSource.cloneWithRowsAndSections(this._convertArrayToMap(responseJson)),
        
        loaded:true
      }, () => {
        this._validateGotoStore(responseJson);
      })




      //if (this.listView) this.listView.scrollTo({y:this.state.currentScrollPos,animated:true});
    })
    .catch((error) => { //Alert.alert( 'Almacenes', 'Problemas obteniendo la información, intenta nuevamente.' );
      Alert.alert(CONST.MALL_NAME, error.message);
      /*console.warn(error);*/
    });
  }

  _convertArrayToMap(fuldata) {
    var map = {};
    fuldata.forEach(function(item) {

      //get first character
      var key = item.nameStore.toUpperCase().slice(0,1);

      //replace accents
      key = key.replace('Á', 'A');
      key = key.replace('É', 'E');
      key = key.replace('Í', 'I');
      key = key.replace('Ó', 'O');
      key = key.replace('Ú', 'U');

      // this is for numbers
      if (!key.toLowerCase().match(/[a-z]/i)) {
        key = "#";
      }

      if (!map[key]) {
        map[key] = [];
      }
      map[key].push(item);       
    });
    return map;
  }

  _gotoLogin(){
    //this.props.navigator.push({ component: Login, title: 'Login', name:'Login',passProps:{}  });
    this.navigator.navigate('Login', {route:'Login'})
  }

  _setStoreFavorite(id_store,status,nameStore){
    if(this.state.id_user=="" ||  this.state.token=="" || this.state.id_user==undefined ||  this.state.token==undefined){
      Alert.alert(
        'Favoritos',
        'Debes estar logeado para poder agregar este almacen a tu lista de favoritos',
        [
          {text: 'Cancel', onPress: () => debugMe('Cancel Pressed!')},
          {text: 'Login', onPress: () => this._gotoLogin()},
        ]
      )
    }else{
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
        
        this._getStores(this.state.selectCatID);
      })
      .catch((error) => { //Alert.alert( 'Almacenes', 'Problemas obteniendo la información, intenta nuevamente.' );
        Alert.alert(CONST.MALL_NAME, error.message);
      });
    }
  }

  _toggleList() {
    this.setState({
      dropDownActive: !this.state.dropDownActive
    })
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

  _updateState = (data) => {
    this.setState(data);
  }

  _filterStores = (term) => {

    term = term.toUpperCase();

    const data = this.state.allStores.reduce((result, sectionData) => {
      const { title, data } = sectionData;

      //console.log(data)

      const filteredData = data.filter(
        element => {
          
          if (element.nameStore.includes(term))
          {return element;}
          
        }
      );

     

      if (filteredData.length !== 0) {
        result.push({
          title,
          data: filteredData
        });
      }

      

      return result;

    }, [])

    this.setState({dataSource:data});

    //console.log(data)
  
  }

  _onRefresh() {
    this.setState({refreshing: true, loading: true}, ()=> {
      if (this.state.searchText) {
        this._filterStores(this.state.searchText);        
      }
      else {
        this._getStores(this.state.selectCatID);
      }
      this.setState({refreshing: false});
    });
  }

  _getThumbImage = (thumb_url) => {
    var img_name = thumb_url.substring(0, thumb_url.length - 4);
    var img_path = null;

    switch(img_name) {
      case 'todos': img_path = 'cat-all'; break;
      case 'artesanias': img_path = 'cat-crafts'; break;
      case 'calzado': img_path = 'cat-shoes'; break;
      case 'cambio_de_moneda': img_path = 'cat-exchange'; break;
      case 'casino': img_path = 'cat-casino'; break;
      case 'comidas_y_bares': img_path ='cat-restaurant'; break;
      case 'Telefonía': img_path = 'cat-phone'; break;
      case 'concesionarios': img_path = 'undefined'; break;
      case 'deportes': img_path = 'cat-sportsapparel'; break;
      case 'diversion': img_path = 'cat-childspark'; break;
      case 'electronica': img_path = 'undefined'; break;
      case 'financiero': img_path = 'cat-bakns'; break;
      case 'fotografia': img_path = 'undefined'; break;
      case 'hobbies': img_path = 'undefined'; break;
      case 'hogar': img_path = 'undefined'; break;
      case 'hombres': img_path = 'cat-menswear'; break;
      case 'joyerias': img_path = 'undefined'; break;
      case 'marroqineria': img_path = 'undefined'; break;
      case 'mujeres': img_path = 'cat-womenswear'; break;
      case 'ninios_y_ninias': img_path = 'cat-kidsswear'; break;
      case 'opticas': img_path = 'cat-optics'; break;
      case 'regalos': img_path = 'undefined'; break;
      case 'ropa_intima': img_path = 'cat-lingerie'; break;
      case 'salas_de_cine': img_path = 'cat-cinema'; break;
      case 'salud_y_belleza': img_path = 'undefined'; break;
      case 'servicios': img_path = 'undefined'; break;
      case 'sin_categoria': img_path = 'undefined'; break;
      case 'tiendas_por_departamento': img_path = 'cat-departamentstores'; break;
      case 'viajes': img_path = 'undefined'; break;
      default: img_path = 'undefined'; break;
    }
    return img_path;
  }

  renderLoadingView(){
    return(
      <View style={[layout.mainContainer, layout.centerCenter]}>
        <Text style={[text.mainText, text.darkgray, text.center, text.regular]} > Cargando Almacenes ... </Text>
      </View>
    );
  }

  renderRowCategory(category){

    ////console.warn(category)

    return(
      <TouchableOpacity
        activeOpacity={0.6}
        style={[filters.categoryItem, (category.item.id_store_cat==this.state.selectCatID)? filters.categoryItemActive :{} ]} onPress={() => {
        this.setState({
          dropDownActive: false,
          selectCat:category.item.name,
          selectCatID:category.item.id_store_cat,
          currentScrollPos:0,
        }, () => {
          this.setState({searchText:'', loaded:false}, () => {
            this._getStores(category.item.id_store_cat);
          });
        })
      }}
      >
        <View style={filters.categoryIconContainer}>
        { category.item.id_store_cat==0?
          <CustomIcon name={this._getThumbImage(category.item.thumb_url)} size={25} /> :
          <Image
            style={{width: 25, height: 25, tintColor: 'black'}}
            source={{uri:CONST.BASE_URL+'/images/almacenes/categories_icons_app/'+category.item.icon_app_url}}
          />
        }
        </View>
        <Text style={[filters.categoryItemText, text.regular, text.left]}>{category.item.name}</Text>
      </TouchableOpacity>
    );
  }

  _renderSectionHeader(sectionTitle){
    //console.log(sectionTitle)
      return (
        <View style={stores.headerStoreList}>
          <Text style={[text.semibold, text.gray, text.center]}>{sectionTitle.section.title}</Text>          
        </View>
      );
  };

  renderStores(store){

    //console.log(store);

    var stylePromo = "";
 
    var nameStore = store.item.nameStore.toLowerCase().replace(/((^| )[a-z])/g, function(a, b){
      return a.toUpperCase();
    });
 
    return(

      <View style={stores.storeItemContainer}>

        <TouchableOpacity 
          onPress={()=>{this._gotoStoresDetailsContainer(store.item.id_store,store.item.nameStore,store.item)}}
          style={stores.storeItem}>

          <View style={stores.storeItemImageContainer}>
            <Image
              style={stores.storeItemImage}
              source={{uri:CONST.BASE_URL+store.item.img_folder_url+"gallery_img.jpg"}}
            />
          </View>

          <View style={stores.storeItemTextContainer}>
          
            <View style={stores.storeItemMainInfo}>
              <Text style={[text.titleStoreText, text.bold, text.darkgray, text.left]}>
                {nameStore}
              </Text>
              <Text style={[text.categoryStoreText, text.gray, text.left]}>
                {store.item.nameBuilding}
              </Text>
            </View>

            <View style={stores.storeInteractionInfo}>

              <View style={stores.storeLocationInfo}>
                <CustomIcon name='map' size={23} style={stores.storeLocationIcon} />
                <Text style={[text.locationStoreText, text.semibold, text.purple, text.left]}>
                  {store.item.local_label} 
                </Text>
                
              </View>

              <View style={stores.storeFavButtonCont}>

                <FavoriteIcon isfavorite={store.item.favorites} onPress={()=>{
                  this._setStoreFavorite(store.item.id_store,store.item.favorites,store.item.nameStore)
                  }}
                />

              </View>

            </View>

          </View>

        </TouchableOpacity>

      </View>

    );
  }


  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return(

      <View style={{flex: 1}}>

        <View style={[filters.filterContainer, this.state.dropDownActive && {backgroundColor: 'white', borderBottomWidth: 0, borderRadius: 20}]}>

          { this.state.dropDownActive ? (
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[text.mainText, text.light, text.center, {marginVertical: 21, fontSize: 21, height: 40, paddingLeft: 30}]}>
                  {/*{this.state.selectCat}*/}
                  Filtrar
                </Text>
              </View>
            ) : (
              <View style={filters.searchContainer}>

                <TextInput  
                  value={this.state.searchText}
                  placeholderTextColor= "lightgray"
                  style={[forms.mainInput, forms.darkInput, forms.searchInput]}
                  onChangeText={(text) => {
                    this._filterStores(text);
                    this.setState({searchText:text, selectCatID:''});
                  }}
                  placeholder="Búsqueda"
                  underlineColorAndroid="transparent"
                />

                <View style={filters.searchIconContainer}>
                  <CustomIcon name='search' size={20} style={text.darkgray} />
                </View>

              </View>
            )
          }

          <View style={this.state.dropDownActive && {borderLeftWidth: 0}}>
            <TouchableOpacity
              style={interactions.filterButton}
              onPress={()=>{
                this.setState({
                  dropDownActive: !this.state.dropDownActive
                })
              }}
              >
              { (this.state.dropDownActive) ? (
                <CustomIcon name='cross' size={20} />
              ) : (
                <CustomIcon name='filters' size={20} />
              )}
            </TouchableOpacity>
          </View>

        </View>

        {/* STORES console.log(JSON.stringify(this.state.dataSource) )  */ }
        { this.state.dataSource.length>0?(
          
          <SectionList
            style={stores.storeList}
            //ref={ref => this.sectionList = ref}
            sections={this.state.dataSource}
            // decelerationRate ='normal'
            removeClippedSubviews={true}
            keyExtractor={(item) => item.id_store}
            renderSectionHeader={this._renderSectionHeader}
            renderItem={(item)=>this.renderStores(item)}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
          />

        ):(
          <View style={[layout.mainContainer, layout.centerCenter]}>

            <Image
              resizeMode={'stretch'}
              style={layout.mainAlertImage}
              source={require('../Img/titan_plaza/alerts/search_alert.png')}/>

            <Text style={[text.mainText, text.regular, text.darkgray, text.center]}>No hay almacenes que 
              {"\n"}
              coincidan con tu búsqueda
            </Text>

          </View>
        )}

        {/* CATEGORIES */}
        { this.state.dropDownActive ? (
          <View style={filters.categoriesListContainer}>
            <View style={[filters.filterTitle]}>
              <Text style={[text.center, text.titleText]}>Filtrar</Text>
              <TouchableOpacity style={[filters.closeButton]} onPress={()=>{
                  this.setState({
                    dropDownActive: !this.state.dropDownActive
                  })
                }}>
                <CustomIcon name='cross' size={14} style={text.black} />
              </TouchableOpacity>
              
            </View>
            <FlatList
              ref={ref => this.lvCategories = ref}
              style={filters.categoriesList}
              data={this.state.categoryDataSource}
              renderItem={(item)=>this.renderRowCategory(item)}
              keyExtractor={(item) => item.id_store_cat}
              // onScroll={() => {
              //   const sp = this.lvCategories.scrollProperties;
              //   if (sp.visibleLength+sp.offset < sp.contentLength) {
              //     if (this.state.showDownArrow===false) this.setState({showDownArrow: true});
              //   }
              //   else {
              //     if (this.state.showDownArrow===true) this.setState({showDownArrow: false});
              //   }
              // }}
            />
            { this.state.showDownArrow?
              <View style={filters.scrollIndicatorContainer}>
                <CustomIcon name='chevron' size={20} style={text.white} />
              </View>
              : null }

              <TouchableOpacity style={[filters.modalBackground]} onPress={()=>{
                this.setState({
                    dropDownActive: !this.state.dropDownActive
                    })
                  }}>
              </TouchableOpacity>    
          </View>
          ) : null }

      </View>
    );
  }

}

module.exports = Stores;
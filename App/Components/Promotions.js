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
  ScrollView,
  RefreshControl,
  TextInput,
  Alert,
} from 'react-native';

import {
  nameCapitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterOfEachWord,
  getDiffDays,
} from './utility'


const CONST = require('../Constants/constants');

import analytics from '@react-native-firebase/analytics';

import store from '../Reducers/store.js';
import ModalSelector from 'react-native-modal-selector';

//const Login=require('./Login');
//const Wishlist=require('./Wishlist');

import { layout, text, interactions, filters, stores, spacers  } from '../Styles/TitanPlaza/Global';

class Promotions extends Component {

  static propTypes = { 
    //navigator: PropTypes.object.isRequired, 
  };

  constructor(props, context) { 
    super(props, context);

    this.navigator = this.props.navigation;

    this.state={
      loaded: false,
      refreshing: false,

      // Promo list
      dataSource: [],

      // Dropdown
      id_user: store.getState().todos.id,
      token: store.getState().todos.token,
      currentScrollPos:0,
      categories:'',
      selectCat: 'Filtrar por Categoría',
      selectCatID: '',
      categoryDataSource: [],
      dropDownActive: false,
      showDownArrow: true,
      allStores: null,
    }

    this.sesion = {
      id_user: store.getState().todos.id,   
      token: store.getState().todos.token,
      pass: store.getState().todos.pass
    }

  } 

  componentDidMount(){

    this._getStorePromos();
    //this._getProductCategories();
  }

  _gotoStores = (promo) => { 
    fetch(CONST.URL_AMFPHP, {
      method: 'POST',
      headers: { 'Accept': 'application/json',
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "serviceName":"amf_mobile_services",
        "methodName":"getInfoStoreById",
        "parameters":[promo.id_store, this.sesion.id_user]
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      var store = responseJson;
      this._registerAnalytics(promo.title,promo.id_store, promo.id_promotions).done();
      this.navigator.navigate('StoreDetails', {route:'StoreDetails', sesion:this.sesion, store:store, id: promo.id_store, name_store:store['nameStore'], favoriteCallback:()=>{}, tabIndex:1 })
    })
    .catch((error) => {});
  }

  _registerAnalytics = async (promo_name,id_store, id_promo) =>{

     await analytics().logEvent('Promociones',{
                  promo_name: promo_name,
                  id_store: id_store,
                  id_promo: id_promo
                });

  } 

  _filterPromosByStoreId = (query) => {
    var { allStores } = this.state;
    var filteredStations = null;

    if (query) {
      const regex = new RegExp(`${query.trim()}`, 'i');
      filteredStations = allStores.filter(store => store.id_store.toString().search(regex) >= 0);
    }
    else {
      filteredStations = allStores;
    }

    this.setState({
      dataSource: filteredStations,
    })
  }

  _setFilterCategories = (dataResult) => {

      // show all
      dataResult.unshift({
        "id_store": null,
        "nameStore":"TODOS",
      });

      // to lower case
      dataResult = dataResult.map(json => {
        var nameStore = json.nameStore.toLowerCase();
        json.nameStore = nameStore.replace(/((^| )[a-z])/g, function(a, b){
          return b.toUpperCase();
        });
        return json;
      });

      // remove duplicates
      dataResult = dataResult.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.id_store === thing.id_store
        ))
      )

      //console.log("_setFilterCategories", dataResult)

      // udate data source
      this.setState({
        categoryDataSource: dataResult,
      });
  }

  _getStorePromos = (id_store=null) => {
    this.setState({
      loaded: false,
    });

    fetch(CONST.URL_AMFPHP, {
      method: 'POST',
      headers: { 'Accept': 'application/json',
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "serviceName":"amf_mobile_services",
        "methodName":"getStorePromos",
        "parameters":[id_store]
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {

      //console.log(responseJson)

      this.setState({
        dataSource: responseJson,
        loaded: true,
      });
      this._setFilterCategories( JSON.parse(JSON.stringify(responseJson)) ); //clone responseJson
      this.setState({ allStores: responseJson });
    })
    .catch((error) => {
      this.setState({
        loaded: true,
      });
      Alert.alert(CONST.MALL_NAME, error.message);
    });
  }

  _onRefresh() {
    this.setState({refreshing: true, loading: true}, ()=> {
      if (this.state.searchText) {
        this._filterStores(this.state.searchText);        
      }
      else {
        // this._getStores(this.state.selectCatID);
      }
      this.setState({refreshing: false});
    });
  }

  _renderFilter = () => {
    return (
      <View style={[{paddingHorizontal: 15}]}>
        <View style={[filters.filterContainer, filters.filterWhite, this.state.dropDownActive && { borderBottomWidth: 0}]}>
          

          { this.state.dropDownActive ? (
              <View style={[ {flex: 1, alignItems: 'flex-start', justifyContent: 'center',}]}>
                <Text style={[text.mainText, text.black, {marginBottom: 0,}]}>
                  {/*{this.state.selectCat}*/}
                  Filtrar
                </Text>
              </View>
            ) : (
              <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center',}}>
                <Text style={[text.mainText, text.black, {marginBottom: 0,}]}>
                  Filtrar
                </Text>
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
                <CustomIcon name='cross' size={20} style={text.black} />
              ) : (
                <CustomIcon name='filters' size={20} style={text.black} />
              )}
            </TouchableOpacity>
          </View>
          <View style={filters.point}></View>        
      </View>


      </View>
    )
  }

  renderRowCategory(category){

    //console.log("category",category.nameStore);

    return(
      <TouchableOpacity
        activeOpacity={0.6}
        style={[filters.categoryItem, (category.id_store==this.state.selectCatID)? filters.categoryItemActive :{} ]}
        onPress={() => {
          this.setState({
            dropDownActive: false,
            selectCat:category.nameStore,
            selectCatID:category.id_store,
            currentScrollPos:0,
          }, () => {
            //this.setState({searchText:''});
            this._filterPromosByStoreId(category.id_store)
          })
        }} 
        >
        <Text style={[ text.regular, text.black, text.left]}>{category.nameStore}</Text>
      </TouchableOpacity>
    );
  }

  renderPromos(promo){

    var diffDays = getDiffDays(promo.date_end);

    return(

    <TouchableOpacity onPress={()=>this._gotoStores(promo) }>
    {/* onPress: this._gotoStores(promo.id_store) */}

      <View style={stores.promotionCardContainer}>

        <View style={stores.promotionCard}>

          <View style={[stores.promotionCardImageContainer, {height: 330,}]}>

          { /* 
            <View style={stores.promotionTimeInfoContainer}>
                        <CustomIcon name='clock' size={20} style={[text.orange]} />
                        <Text style={[text.orange, text.center, {flex: 1}]}>
                          {diffDays==0? "Último día":
                            "Quedan: " + diffDays + " días"
                          }
                        </Text>
                      </View>
                    */}
            <Image
              resizeMode={'stretch'}
              source={{uri:CONST.BASE_URL+'images/almacenes/'+promo.id_store+"/promociones/"+promo.image_url}}
              style={[stores.promotionCardImage, {width: '100%', height: '100%'}]} />

          </View>

          <View style={stores.promotionCardInfoContainer}>
            
          <Image
            defaultSource={require("../Img/titan_plaza/logos/logo_store_default.png")}
            source={{uri:CONST.BASE_URL+'images/almacenes/'+promo.id_store+"/logo_almacen.png"}}
            style={stores.promotionShopLogo} />

            <View style={stores.promoTitleContainer}>
              <Text style={[text.orange, text.left]}>
                {promo.title}
              </Text>

            </View>

            <View style={stores.promoDecoContainer}>

              {/* <View
                style={stores.promoLabel}>
                <CustomIcon name='sales' size={35} style={text.red} />
              </View> */}

            </View>

          </View>

        </View>

      </View>
    </TouchableOpacity>
    );  
  }

  renderLoadingView(){
    return(
      <View style={[layout.mainContainer, layout.centerCenter, {minHeight: 270,}]}>
        <Text style={[text.mainText, text.darkgray, text.center, text.regular]} > Cargando Promociones ... </Text>
      </View>
    );
  }

  render() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return(

      <View style={[layout.mainContainer, {minHeight: 270,}]}>

        {/* FILTER */}
        {this._renderFilter()}

        {/* PROMOTIONS */}
        { this.state.dataSource.length>0?(

           <FlatList
            
            style={[stores.storeList, spacers.mt0]}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.dataSource}
            renderItem={({item}) => this.renderPromos(item)}
          />

        ):(
          <View style={[layout.mainContainer, layout.centerCenter]}>

            <Image
              resizeMode={'stretch'}
              style={layout.mainAlertImage}
              source={require('../Img/titan_plaza/alerts/promos_alert.png')}/>

            <Text style={[text.mainText, text.regular, text.darkgray, text.center]}>
              No hay promociones 
              {"\n"}
              disponibles en este momento
            </Text>

          </View>
        )}

        {/* CATEGORY LIST */}
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

                keyExtractor={(item, index) => index.toString()}
                data={this.state.categoryDataSource}
                renderItem={({item}) => this.renderRowCategory(item)}
                style={filters.categoriesList}
               
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
          ) : null
        }

      </View>
    );
  }

}
module.exports = Promotions;
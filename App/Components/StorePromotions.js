'use strict';

import React, { Component } from 'react'; 
import {PropTypes} from 'prop-types';

import CustomIcon from './CustomIcon.js'
 
import {  
  Text, 
  TouchableHighlight,
  TouchableOpacity, 
  View,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
  RefreshControl,
  Modal,
  Alert,
} from 'react-native';

import {
  debugMe
} from '../Utilities/Messaging'

import {
  getDiffDays,
} from './utility'

import store from '../Reducers/store.js';
import ImageSlider from 'react-native-image-slider';



const CONST = require('../Constants/constants');


import { layout, text, stores, spacers  } from '../Styles/TitanPlaza/Global';

const Login=require('./Login');
//const Wishlist=require('./Wishlist');

export default  class StorePromotions extends Component {

  static propTypes = { 
    navigator: PropTypes.object.isRequired, 

  } 

  constructor(props, context) { 
    debugMe(store.getState().todos.id);
    super(props, context);

    const promoList = [];

    this.state={
      dataSource: promoList,
      loaded: false,
      refreshing: false,
      id_store: this.props.data.id_store,
    }

  } 

  componentDidMount(){
    this._getStorePromos(this.state.id_store);
  }

  _getStorePromos = (id_store) => {
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
      this.setState({
        dataSource: responseJson,
        loaded: true,
      });
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
        this._getStorePromos(this.state.id_store);
      }
      this.setState({refreshing: false});
    });
  }

  renderLoadingView(){
    return(
      <View style={[layout.mainContainer, layout.centerCenter, {minHeight: 270,}]}>
        <Text style={[text.mainText, text.darkgray, text.center, text.regular]} > Cargando Promociones ... </Text>
      </View>
    );
  }

  renderPromos(promo){

    var diffDays = getDiffDays(promo.date_end);

    return(

        <View style={stores.promotionCardContainer}>

        <View style={stores.promotionCard}>

          <View style={[stores.promotionCardImageContainer, {height: 330,}]}>

        {/*
            <View style={stores.promotionTimeInfoContainer}>
                      <CustomIcon name='clock' size={20} style={[text.orange]} />
                      <Text style={[text.orange, text.center, {flex: 1}]}>
                        {diffDays==0? "Último día":
                          "Quedan: " + diffDays + " días"
                        }
                      </Text>
                    </View>*/
          }
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
    );
  }

  render() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return(

      <View style={[layout.mainContainer, {minHeight: 270,}]}>

        <View style={layout.titleContainer}>
          <Text style={[text.titleText, text.darkgray, text.left, text.bold]}>
            PROMOCIONES
          </Text>
        </View>

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

      </View>
    );
  }

}
module.exports = StorePromotions;
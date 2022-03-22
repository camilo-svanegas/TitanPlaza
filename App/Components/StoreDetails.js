'use strict';

import React, { Component } from 'react'; 
import {PropTypes} from 'prop-types';

import Carousel from 'react-native-carousel-view';

import {
  PickerIOS,
  ScrollView,
  Text, 
  TouchableOpacity, 
  View,
  StyleSheet,
  TabBarIOS,
  Alert,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';

import {
  debugMe
} from '../Utilities/Messaging'

import analytics from '@react-native-firebase/analytics';

import { TabView, TabBar, TabViewPagerPan, SceneMap } from 'react-native-tab-view';

import { layout, homeLayout, text, interactions, spacers, tabs, stores  } from '../Styles/TitanPlaza/Global';


import storedValues from '../Reducers/store.js';

const CONST = require('../Constants/constants');

const StoreDescription = require('./StoreDescription');
const StorePromotions = require('./StorePromotions');





export default class StoreDetails extends Component{

  static propTypes = { 
    //navigator: PropTypes.object.isRequired, 
  }

  constructor(props, context) { 
    super(props, context);

    this.navigator = this.props.navigation;
    const {state} = this.navigator;
   
    if (this.props.route.params) {
      this.id_store = this.props.route.params["id"]? this.props.route.params["id"]: null;
      this.name_store = this.props.route.params["name_store"]? this.props.route.params["name_store"]: null;
      this.store = this.props.route.params["store"]? this.props.route.params["store"]: null;
      this.tabIndex = this.props.route.params["tabIndex"]? this.props.route.params["tabIndex"]: 0;
      this.favoriteCallback = this.props.route.params["favoriteCallback"];
      this.sesion = this.props.route.params["sesion"]? this.props.route.params["sesion"]: null;
    }

    this.state = {
      infoStore : '',
      loaded: false,
      id_store: this.id_store, 
      index: this.tabIndex,
      routes: [
        { key: 'first', title: 'Descripción' },
        { key: 'second', title: 'Promociones' },
      ],  
    }
  }

  _getStore(){
    fetch(CONST.URL_AMFPHP, { 
        method: 'POST', 
        headers: { 'Accept': 'application/json', 
        'Content-Type': 'application/json', 
      }, 
      body: JSON.stringify({ 
        "serviceName":"amf_mobile_services",
        "methodName":"getInfoStoreById",
        "parameters":[this.state.id_store,storedValues.getState().todos.id]
      }) 
    }) 
    .then((response) => response.json()) 
    .then((responseJson) => {
      this.store = responseJson;
      this.setState({
        infoStore: responseJson,
        loaded:true
      })

    }) 
    .catch((error) => { Alert.alert( 'Almacenes', 'Problemas obteniendo la información, intenta nuevamente.' ); 
    /*console.warn(error);*/ });
  }

  componentDidMount(){
    console.log(this.props.route);

    this._registerAnalytics().done()

    this._getStore();
  }

  _registerAnalytics = async () =>{

     await analytics().logEvent('Almacenes',{
                  store_name: this.name_store,
                  id_store: this.id_store
                });

  }

  componentWillReceiveProps(nextProps) {

    this.id_store = nextProps.route.params["id"];
    this.setState({
      id_store: this.id_store,
      index: nextProps.route.params["tabIndex"],
      infoStore: {},
      loaded:false,
    }, ()=>this._getStore());
  }

   _handleChangeTab = (index) => {
    this.setState({ index });
    //if (this.scrollview) this.scrollview.scrollTo({y:1,animated:true});
  }
 
  _handleRenderLabel = (scene) => {
    var labelStyle = null;

    if (scene.focused) labelStyle = {color: '#903392', fontSize: 15, fontFamily: 'OpenSans',}
    else               labelStyle = {color: '#292C33', fontSize: 15, fontFamily: 'OpenSans',}

    return <Text style={labelStyle}>{scene.route.title}</Text>
  }

  _renderHeader = (props) => {
    return<TabBar {...props}
            style={[tabs.tabContainer]}
            labelStyle={tabs.tabItem}
            indicatorStyle={tabs.tabIndicator}
            renderLabel={this._handleRenderLabel}
            />;
  }
  
  _renderDescription =  ({ route }) => {
   //console.log(route)
    return <StoreDescription sesion={this.sesion} navigator={this.navigator} data={this.state.infoStore} store={this.store} favoriteCallback={this.favoriteCallback} />;
  }

  _renderPromotions =  ({ route }) => {
   //console.log(route)
    return <StorePromotions sesion={this.sesion} navigator={this.navigator} data={this.state.infoStore} />;
  }

  _renderEmpty =  ({ route }) => {
    return <View sesion={this.sesion} navigator={this.navigator} data={this.state.infoStore} />;
  }

  _renderPager = props => {
    return <TabViewPagerPan {...props} />;
  }

  _renderSceneDescription = SceneMap({
    first: this._renderDescription,
    second: this._renderEmpty
  });
  _renderScenePromo = SceneMap({
    first: this._renderEmpty,
    second: this._renderPromotions
  });

  _renderSlider = () => {
    return (
      <Carousel
      delay={6000}
      indicatorAtBottom={true}
      indicatorSize={12}
      indicatorColor="#903392"
      animate={true}
      loop={true}
      indicatorOffset={12}
      indicatorSpace={18}
      height={160}
      >

       
      </Carousel>
    );
  }


render() {

  if (!this.state.loaded || !this.state.infoStore || !this.state.infoStore.nameStore) {
      return this.renderLoadingView();
    }

    var nameStore = this.state.infoStore.nameStore.toLowerCase().replace(/((^| )[a-z])/g, function(a, b){
          return b.toUpperCase();
      });

    return (

      <SafeAreaView  style={[layout.mainContainer,{width:'100%'}]} >
      <ScrollView
        ref={ref => this.scrollview = ref}
          automaticallyAdjustContentInsets={false} 
          scrollsToTop={true}
          //onScroll={() => { debugMe('onScroll!'); }} 
          scrollEventThrottle={200}
          keyboardDismissMode='interactive'
        >

        <View style={stores.storeCarouselContainer}>
          {true?
            <Image
              resizeMode={'center'}
              source={{uri:CONST.BASE_URL+this.state.infoStore.img_folder_url+"banner_header.jpg"}}
              style = {{width: '100%', height: 100, resizeMode: 'cover'}} />:
            this._renderSlider() // TODO: FOR SECOND PHASE
          }
        </View>

        <View style={stores.storeDetailInfoContainer}>

          <View style={stores.storeDetailInfo}>
            <Text style={[text.titleStoreDetailText, text.bold, text.purple, text.left, {marginBottom: 0,}]}>
              {nameStore}
            </Text>
            <Text style={[text.categoryStoreText, text.regular, text.gray, text.left, {marginBottom: 0,}]}>
              {this.state.infoStore.nameBuilding}{' '}
            </Text>
            <Text style={[text.categoryStoreText, text.regular, text.purple, text.left, {marginBottom: 0,}]}>
              {this.state.infoStore.local_label}
            </Text>
          </View>

          <View style={stores.storeDetailLogoContainer}>
            <Image
              source={{uri:CONST.BASE_URL+this.state.infoStore.img_folder_url+"logo_almacen.png"}}
              style = {stores.storeDetailLogo} />
          </View>

        </View>

        
       
        
          <TabView
            navigationState={this.state}
            renderScene={this.state.index==0? this._renderSceneDescription: this._renderScenePromo}
            //renderPager={this._renderPager}
            renderTabBar={this._renderHeader}
            initialLayout={{ width: Dimensions.get('window').width }}
            onIndexChange={this._handleChangeTab}
          />
          
   
      
      </ScrollView>
      </SafeAreaView>
    );
  }

  renderLoadingView() {
    return (
      <View style={[layout.mainContainer, layout.centerCenter]}>
        <Text style={[text.mainText, text.darkgray, text.center, text.regular]} > Cargando informacion del Almacén ...</Text>
      </View>
    );
  }

}

module.exports = StoreDetails;
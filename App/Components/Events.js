'use_strict';

import React, { Component } from 'react'; 


import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Image,
	ScrollView,
  TouchableHighlight,
  TouchableOpacity,
	Alert,
  RefreshControl,
  SafeAreaView,
  Linking,
} from 'react-native';

import {
  getMonthName,
  getFullMonthName,
  getDateDay,
  getFullYear
} from './utility';



import HTMLView from 'react-native-htmlview';

const CONST = require('../Constants/constants');


import store from '../Reducers/store.js';
const EventDetails = require('./EventDetails');

import { layout, text, interactions, filters, forms, theEvents  } from '../Styles/TitanPlaza/Global';

class Events extends Component{

  constructor(props,context){
    super(props,context); 

    this.navigator = this.props.navigation;
    const {state} = this.navigator;
    if (this.props.route.params) {
      this.sesion = this.props.route.params["sesion"]? this.props.route.params["sesion"]: null;
    }
    //debugMe(this.props.sesion);
    
    this.state={
      id_user: store.getState().todos.id,   
      token: store.getState().todos.token,
      dataSource: [],
      loaded: false,
      noEvents: false,
      allEvents: [],
      refreshing: false,
      zebraStripe: theEvents.eventListItemContainer
    }
  }

  componentDidMount(){

    this._getEvents();    
  }

  _gotoEventsDetailsContainer(event){
    this.navigator.navigate('EventDetails', {screen:'EventDetails', event:event, allEvents:this.state.allEvents})
  }

  _getEvents(){
    fetch(CONST.URL_AMFPHP, 
      {
        method: 'POST', 
        headers: { 'Accept': 'application/json', 
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({ 
        "serviceName":"amf_mobile_services",
        "methodName":"getPostEvents"
      }) 
    }) 
    .then((response) => response.json()) 
    .then((responseJson) => { 
      this.setState({loaded: true});

     // console.log(responseJson)

      if (!responseJson) { 
        this.setState({noEvents:true});
      }else{
        this.setState({allEvents: responseJson});
        this.setState({noEvents:false});
        this.setState({
          dataSource: responseJson,
        })
      }
    })
    .catch((error) => {
      this.setState({loaded: true});
      Alert.alert(CONST.MALL_NAME, error.message);
      /*console.warn(error);*/ 
    });
  }

  _gotoLogin(){
    //this.props.navigator.push({ component: Login, title: 'Login', name:'Login',passProps:{}  }); 
    this.navigator.navigate('Login', {screen:'Login'})
  }

  _formatEvent = (eventContent) => {
    eventContent = eventContent.replace(/<(?:.|\n)*?>/gm, '');
    eventContent = eventContent.split("\n").join(" ");
    eventContent = eventContent.split("\t").join(" ");
    eventContent = eventContent.split("   ").join(" ");
    return eventContent;
  }

  _onRefresh() {
    this.setState({refreshing: true, loading: true}, ()=> {
    this._getEvents();
      this.setState({refreshing: false});
    });
  }

  renderNoEvents(){
    return(

      <View style={[layout.mainContainer, layout.centerCenter]}>

        <Image
          resizeMode={'stretch'}
          style={layout.mainAlertImage}
          source={require('../Img/titan_plaza/alerts/events_alert.png')}/>

        <Text style={[text.mainText, text.regular, text.darkgray, text.center]}>
          Aún no hemos publicado eventos.
        </Text>

      </View>
    );
  }

  renderLoadingView(){
    return(
      <View style={[layout.mainContainer, layout.centerCenter]}>
        <Text style={[text.mainText, text.darkgray, text.center, text.regular]} > Cargando Eventos ... </Text>
      </View>
    );
  }

  renderEvent(event, header, index){
    // format date
    let fullYear = getFullYear(event.start_date);
    let monthName = getMonthName(event.start_date).toUpperCase();
    let monthFullName = getFullMonthName(event.start_date);
    let day = getDateDay(event.start_date);
    if (day < 10) day="0"+day;

    let fullYear_ed = getFullYear(event.end_date);
    let monthName_ed = getMonthName(event.end_date).toUpperCase();
    let monthFullName_ed = getFullMonthName(event.end_date);
    let day_ed = getDateDay(event.end_date);
    if (day_ed < 10) day_ed="0"+day_ed;

    return(
      <View style={index % 2 == 0 ? theEvents.oddContainer : theEvents.eventListItemContainer} >

        <TouchableOpacity
          onPress={()=>this._gotoEventsDetailsContainer(event)}
          style={theEvents.eventItemContainer}>

          <View style={theEvents.eventItemHeader}>

            <View style={theEvents.eventItemImageContainer}>
              <Image
                resizeMode={'center'}
                defaultSource={require('../Img/titan_plaza/news/no_image_news.jpg')}
                source={{uri:CONST.BASE_URL+event.img_folder_url+'/small.jpg'}}
                style = {[theEvents.eventItemImage, {resizeMode: 'cover'}]} />
            </View>

          </View>

          <View style={theEvents.eventItemDescriptionContainer}>

            <View style={theEvents.eventItemTitleContainer}>

              <View style={theEvents.eventDateInfo}>
                <Text style={[text.eventDayText, text.bold, text.white, text.center]} >
                  {day}
                </Text>
                <Text style={[text.eventMonthText, text.bold, text.white, text.center]} >
                  {monthName}
                </Text>
              </View>

              <View style={theEvents.eventDescription}>
                <Text style={[text.eventTitleText, text.bold, text.green, text.left]} >
                  {event.title}
                </Text>
                <Text style={[text.eventTitleText, text.left, text.light]} >
                  {event.place}
                </Text>
              </View>

            </View>
            
            {/* <View style={theEvents.eventItemDateContainer}>
              <Image
              resizeMode={'stretch'}
              style={theEvents.eventItemIco}
              source={require('../Img/icons/icon_calendar.png')}/>
                {event.start_date==event.end_date?
                  <Text style={theEvents.eventItemCalendarText}>{day+' de '+monthFullName+', '+fullYear}</Text>
                  :monthFullName==monthFullName_ed?
                  <Text style={theEvents.eventItemCalendarText}>{day+' al '+day_ed+' de '+monthFullName+', '+fullYear}</Text>
                  :<Text style={theEvents.eventItemCalendarText}>{day+' de '+monthFullName+' al '+day_ed+' de '+monthFullName_ed+', '+fullYear}</Text>
                }
            </View> */}

          </View>
          
        </TouchableOpacity>
        
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    else if (!this.state.noEvents) {
      return (
        <SafeAreaView style={layout.mainContainer}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.dataSource}
            renderItem={({item}) => this.renderEvent(item)}
          />
        </SafeAreaView>

      );
    } else {
      return this.renderNoEvents();
    }
  }
}

module.exports = Events;

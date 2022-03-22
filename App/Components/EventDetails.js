'use strict';

import React, { Component } from 'react';
import {PropTypes} from 'prop-types';

import CustomIcon from './CustomIcon.js'
 
import {  
  Linking,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native'; 

import {
  getMonthName,
  getFullMonthName,
  getDateDay,
  getFullYear,
} from './utility'

import analytics from '@react-native-firebase/analytics';

import HTMLView from 'react-native-htmlview';

const CONST = require('../Constants/constants');


var styles= require('../Styles/MyStyles');

import { layout, text, interactions, filters, forms, theEvents, colors  } from '../Styles/TitanPlaza/Global';
 
export default class EventDetails extends Component {

  static propTypes = { 
    //navigator: PropTypes.object.isRequired, 
  } 

  constructor(props, context) { 
    
    super(props, context);

    this.navigator = this.props.navigation;
    const {state} = this.navigator;

    if (this.props.route.params) {
        this.event = this.props.route.params["event"]? this.props.route.params["event"]: null;
        this.idNew = this.props.route.params["id"]? this.props.route.params["id"]: null;
        this.allEvent = this.props.route.params["allEvent"]? this.props.route.params["allEvent"]: [];
    }

    this.scrollView = null;

    this.state = {
      loaded: false,
      infoEvent: this.event, 
      id_new: this.idNew   
    }
  }

  componentDidMount(){



    //console.log(this.state)
    if (this.state.infoEvent != null && this.state.infoEvent != undefined) {
      this._registerAnalytics(this.state.infoEvent.title,this.state.infoEvent.id_post).done();
      this.setState({loaded: true});
    }else if (this.state.id_new != null && this.state.id_new!='' && this.state.id_new != undefined){
      //console.log(state.params["id_new"])
      this.getInfoEvent(this.state.id_new);
    }else{ }
  }

   _registerAnalytics = async (name,id) =>{

     await analytics().logEvent('Eventos',{
                  event_name: name,
                  id_event: id
                });

  }

  getInfoEvent(id_new){
    fetch(CONST.URL_AMFPHP, { 
        method: 'POST', 
        headers: { 'Accept': 'application/json', 
        'Content-Type': 'application/json', 
      }, 
      body: JSON.stringify({ 
        "serviceName":"amf_mobile_services",
        "methodName":"getInfoPostEventById",
        "parameters":[id_new]
      }) 
      }) 
      .then((response) => response.json()) 
      .then((responseJson) => {
        if (responseJson.length>0) { 
          this.setState({infoEvent:responseJson[0],loaded: true});
          this._registerAnalytics(this.state.infoEvent.title,this.state.infoEvent.id_post).done();
        }else{
          Alert.alert(CONST.MALL_NAME, 'Problemas obteniendo la información, intenta nuevamente.');
        }

      }) 
      .catch((error) => { //Alert.alert( 'Almacenes', 'Problemas obteniendo la información, intenta nuevamente.' ); 
        Alert.alert(CONST.MALL_NAME, 'Problemas obteniendo la información, intenta nuevamente.');
        ///*console.warn(error);*/ 
      });
  }

  openLink(urlEvent){
    Linking.canOpenURL(urlEvent).then(supported => { 
      if (supported) { 
        Linking.openURL(urlEvent); 
      } else { 
        //debugMe('Don\'t know how to open URI: ' + urlEvent); 
      } 
    });
  } 

  _getTwitter(twitter_user){
    return(
      <TouchableOpacity
        style={interactions.sociaSimpleButton}
        onPress={() => {
          var url = "https://twitter.com/share?url=" +
                    encodeURI(CONST.BASE_URL+'eventos/' +
                    this.state.infoEvent.url_title);
          Linking.openURL(url);
        }} >
        <CustomIcon name='twitter' size={25} style={text.twitterBlueText} />
      </TouchableOpacity>
    );
  } 

  _getFB(facebook_fp_url){
    return(
      <TouchableOpacity
        style={interactions.sociaSimpleButton}
        onPress={() => {
          var url = "https://www.facebook.com/sharer/sharer.php?u=" +
                    encodeURI(CONST.BASE_URL+'eventos/' +
                    this.state.infoEvent.url_title);
          Linking.openURL(url);
        }} >
        <CustomIcon name='facebook' size={25} style={text.facebookBlueText} />
      </TouchableOpacity>
    );
  }

   openLink(urlNews){
    Linking.canOpenURL(urlNews).then(supported => { 
      if (supported) { 
        Linking.openURL(urlNews); 
      } else { 
        //debugMe('Don\'t know how to open URI: ' + urlNews); 
      } 
    });
  } 


  _shuffle = (array) => { // unsort array
    var tmp, current, top = array.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
  }

  renderLoadingView() {
    return(
      <View style={[layout.mainContainer, layout.centerCenter]}>
        <Text style={[text.mainText, text.darkgray, text.center, text.regular]} >
          Cargando informacion del Evento ...
        </Text>
      </View>
    );
  }

  _renderMoreEvent = () => {
    var that = this;

    var id_post = this.state.infoEvent.id_post;
    var k = 0;

    var map_event = this._shuffle(this.allEvent).map(function(event, i){

      // format date
      let monthName = getFullMonthName(event.date_publish);
      let day = getDateDay(event.date_publish);
      if (day < 10) day="0"+day;
      let year = getFullYear(event.date_publish);
      let current_year = ( new Date() ).getFullYear();

      // event counter
      if (id_post!=event.id_post) k++;

      return( id_post!=event.id_post && k<4?
        <TouchableOpacity
          key={i}
          onPress={()=>{
            that.setState({infoEvent:event}, ()=>{
              setTimeout(() => {
                that.scrollView.scrollTo({y:0,animated:true});
              }, 200);
            })
          }}
          style={[theEvents.eventRelatedItemContainer, {marginBottom: 30}]}>

            <View style={theEvents.eventRelatedImageContainer}>
              <Image
                resizeMode={'center'}
                defaultSource={require('../Img/titan_plaza/news/no_image_news.jpg')}
                source={{uri:CONST.BASE_URL+event.img_folder_url+'/small.jpg'}}
                style={[theEvents.eventRelatedImage, {width: '100%', height: '100%', resizeMode: 'cover'}]} />
            </View>

            <View style={[theEvents.eventRelatedTextContainer, {marginLeft: 15, paddingHorizontal:0}]}>
              <Text style={[text.bold, text.darkgray, {marginBottom: 5, position: 'absolute', top: 0}]}>
                {event.title}
              </Text>
              <Text style={[text.regular, text.gray, {position: 'absolute', bottom: 0}]}>
                {monthName + " " + day}{year!=current_year?", " + year:""}                
              </Text>
            </View>

        </TouchableOpacity>:
        null
      );
    });

    return(
      this.allEvent.length>0?
      <View style={theEvents.eventRelatedContainer}>
        <Text style={[text.titleText, text.semibold, text.gray, text.left]}>
          Otros Eventos
        </Text>
        {map_event}
      </View>:
      null
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    if (!this.state.infoEvent) return <View/>;

    // format date
    let fullYear = getFullYear(this.state.infoEvent.start_date);
    let monthName = getMonthName(this.state.infoEvent.start_date).toUpperCase();
    let monthFullName = getFullMonthName(this.state.infoEvent.start_date);
    let day = getDateDay(this.state.infoEvent.start_date);
    if (day < 10) day="0"+day;

    let fullYear_ed = getFullYear(this.state.infoEvent.end_date);
    let monthName_ed = getMonthName(this.state.infoEvent.end_date).toUpperCase();
    let monthFullName_ed = getFullMonthName(this.state.infoEvent.end_date);
    let day_ed = getDateDay(this.state.infoEvent.end_date);
    if (day_ed < 10) day_ed="0"+day_ed;

    if (this.state.loaded) {
      return (

        <View style={layout.mainContainer}>

          <ScrollView
            ref={ref => this.scrollView = ref} 
            style={theEvents.eventDetailContainer}>

            <View style={theEvents.eventDetailTitleContainer}>

              <View style={theEvents.eventDateInfoDetail}>
                <Text style={[text.eventDayText, text.bold, text.white, text.center]} >
                  {day}
                </Text>
                <Text style={[text.eventMonthText, text.light, text.white, text.center]} >
                  {monthName}
                </Text>
              </View>

              <View style={theEvents.eventDetailTitle}>
                <Text style={[text.titleText, text.green, text.left, text.bold]} >
                  {this.state.infoEvent.title}
                </Text>
              </View>

            </View>

            <View style={theEvents.eventDetailSocialContainer}>

              <TouchableOpacity
              onPress={() => {
                  var url = "https://www.facebook.com/sharer/sharer.php?u=" +
                            encodeURI(CONST.BASE_URL+'noticias/' +
                            this.state.infoEvent.url_title);
                  Linking.openURL(url);
                }} 
                  style={[interactions.socialCircularButton, { backgroundColor: colors.piGreen, borderWidth: 0, marginHorizontal: 0, marginVertical: 20}]}
                  >
                  <CustomIcon name='facebook' size={25} style={text.white} />
                </TouchableOpacity>
                <TouchableOpacity
                 onPress={() => {
                    var url = "https://twitter.com/share?url=" +
                              encodeURI(CONST.BASE_URL+'noticias/' +
                              this.state.infoEvent.url_title);
                    Linking.openURL(url);
                  }} 
                  style={[interactions.socialCircularButton, { backgroundColor: colors.piGreen, borderWidth: 0, marginHorizontal: 0, marginVertical: 20, marginLeft: 10}]}
                  >
                  <CustomIcon name='twitter' size={25} style={text.white} />
              </TouchableOpacity>
            </View>
            <View style={theEvents.eventDetailHeaderConteiner}>
              <Image
                defaultSource={require('../Img/titan_plaza/news/no_image_news.jpg')}
                source={{uri:CONST.BASE_URL+this.state.infoEvent.img_folder_url+'/small.jpg'}}
                style={theEvents.eventDetailHeaderConteiner} >
              </Image>
            </View>
            



            <View style = {theEvents.eventDetailDescriptionsContainer} >
              <HTMLView onLinkPress={(url) => this.openLink(url)}  value={this.state.infoEvent.content} addLineBreaks={false} paragraphBreak={""} lineBreak={""} textComponentProps={{style: {lineHeight: 24}}} />
            </View>

            {this._renderMoreEvent()}

            <View style={theEvents.eventHoraryContainer}>
              <View style={[theEvents.eventItemDateContainer]}>
                <CustomIcon name='calendar' size={25} style={text.green} />
                <View>
                  <Text style={[theEvents.eventItemCalendarTextTitle, text.bold]}>Fecha:</Text>
                  {this.state.infoEvent.start_date==this.state.infoEvent.end_date?
                    <Text style={[theEvents.eventItemCalendarText]}>{day+' de '+monthFullName+', '+fullYear}</Text>
                    :monthFullName==monthFullName_ed?
                    <Text style={[theEvents.eventItemCalendarText]}>{day+' al '+day_ed+' de '+monthFullName+', '+fullYear}</Text>
                    :<Text style={[theEvents.eventItemCalendarText]}>{day+' de '+monthFullName+' al '+day_ed+' de '+monthFullName_ed+', '+fullYear}</Text>
                  }
                </View>
                
                {/* FECHA */}

              </View>

              <View style={[theEvents.eventItemDateContainer, {marginTop: 10}]}>
                  <CustomIcon name='clock' size={25} style={text.green} />
                  {/* HORA */}
                  <View>
                    <Text style={[theEvents.eventItemCalendarTextTitle, text.bold]}>Hora:</Text>
                    <Text style={[theEvents.eventItemCalendarText]}>{this.state.infoEvent.schedule}</Text>
                  </View>
                  
              </View>

              <View style={[theEvents.eventItemDateContainer, {marginTop: 10}]}>
                  <CustomIcon name='map' size={25} style={text.green} />
                  {/* LOCALIZACION */}
                  <View>
                    <Text style={[theEvents.eventItemCalendarTextTitle, text.bold]}>Lugar:</Text>
                    <Text style={[theEvents.eventItemCalendarText]}>{this.state.infoEvent.place}</Text>
                  </View>
                  
              </View>

            </View>

            <View style={theEvents.eventDetailsRestrictions}>
                <Text style={[text.gray, {marginBottom: 80}]}>
                </Text>
              </View>
            
          </ScrollView>

        </View>
      
    );
    }else{
      return null;
    }
    
  }

}

module.exports = EventDetails;
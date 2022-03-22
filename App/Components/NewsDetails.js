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

import { layout, text, interactions, filters, forms, theNews, colors  } from '../Styles/TitanPlaza/Global';
 
export default class NewsDetails extends Component {

  static propTypes = { 
    //navigator: PropTypes.object.isRequired, 
  } 

  constructor(props, context) { 
    
    super(props, context);

    this.navigator = this.props.navigation;
    const {state} = this.navigator;

    if (this.props.route.params) {
        this.news = this.props.route.params["news"]? this.props.route.params["news"]: null;
        this.idNew = this.props.route.params["id"]? this.props.route.params["id"]: null;
        this.allNews = this.props.route.params["allNews"]? this.props.route.params["allNews"]: [];
    }

    this.scrollView = null;

    this.state = {
      loaded: false,
      infoNews: this.news, 
      id_new: this.idNew   
    }
  }

  componentDidMount(){
    

    //console.warn(this.state)
    if (this.state.infoNews != null && this.state.infoNews != undefined) {
      this._registerAnalytics(this.state.infoNews.title,this.state.infoNews.id_post).done();
      this.setState({loaded: true});
    }else if (this.state.id_new != null && this.state.id_new!='' && this.state.id_new != undefined){
      //console.log(state.params["id_new"])
      this.getInfoNews(this.state.id_new);
    }else{ }
  }

  _registerAnalytics = async (name,id) =>{

     await analytics().logEvent('Noticias',{
                  news_name: name,
                  id_news: id
                });

  }

  getInfoNews(id_new){
    fetch(CONST.URL_AMFPHP, { 
        method: 'POST', 
        headers: { 'Accept': 'application/json', 
        'Content-Type': 'application/json', 
      }, 
      body: JSON.stringify({ 
        "serviceName":"amf_mobile_services",
        "methodName":"getInfoPostNoticeById",
        "parameters":[id_new]
      }) 
      }) 
      .then((response) => response.json()) 
      .then((responseJson) => { 

       

        if (responseJson.length>0) { 

          this.setState({infoNews:responseJson[0],loaded: true});

          this._registerAnalytics(this.state.infoNews.title,this.state.infoNews.id_post).done();

          //console.log(this.state.infoNews);

        }else{

          // this.setState({
          //   dataSource: this.state.dataSource.cloneWithRows(responseJson),
          //   loaded: true
          // })
          Alert.alert(CONST.MALL_NAME, 'Problemas obteniendo la información, intenta nuevamente.');
        }

      }) 
      .catch((error) => { //Alert.alert( 'Almacenes', 'Problemas obteniendo la información, intenta nuevamente.' ); 
        Alert.alert(CONST.MALL_NAME, 'Problemas obteniendo la información, intenta nuevamente.');
        ///*console.warn(error);*/ 
      });
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
          Cargando informacion de la noticia aaaaa...
        </Text>
      </View>
    );
  }

  _renderMoreNews = () => {
    var that = this;

    var id_post = this.state.infoNews.id_post;
    var k = 0;

    var map_news = this._shuffle(this.allNews).map(function(news, i){

      // format date
      let monthName = getFullMonthName(news.date_publish);
      let day = getDateDay(news.date_publish);
      if (day < 10) day="0"+day;
      let year = getFullYear(news.date_publish);
      //let current_year = ( new Date() ).getFullYear();

      // news counter
      if (id_post!=news.id_post) k++;

      return( id_post!=news.id_post && k<4?
        <TouchableOpacity
          key={i}
          onPress={()=>{
            that.setState({infoNews:news}, ()=>{
              setTimeout(() => {
                that.scrollView.scrollTo({y:0,animated:true});
              }, 200);
            })
          }}
          style={theNews.newsItemContainer}>

          <View style={theNews.newsItemHeader}>

            <View style={theNews.newsItemImageContainer}>
              <Image
                resizeMode={'center'}
                defaultSource={require('../Img/titan_plaza/news/no_image_news.jpg')}
                source={{uri:CONST.BASE_URL+news.img_folder_url+'/small.jpg'}}
                style = {[theNews.newsItemImage, {resizeMode: 'cover'}]} />
            </View>

            <View style={theNews.newsItemTitleContainer}>

              <Text style={[text.newsTitleText, text.bold, text.blue, text.left]} >
                {news.title}
              </Text>
              <Text style={[text.newsTitleText, text.mainText, text.gray, text.left, {marginTop: 20}]} >
              {day} de {monthName}, {year}
              </Text>
            </View>

          </View>

          
        </TouchableOpacity>
        :
        null
      );
    });

    return(
      this.allNews.length>0?
      <View style={theNews.newsRelatedContainer}>
        <Text style={[text.titleText, text.semibold, text.blue, text.left]}>
          Otras Noticias
        </Text>
        {map_news}
      </View>:
      null
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    if (!this.state.infoNews) return <View/>;

    // format date
    let monthName = getMonthName(this.state.infoNews.date_publish).toUpperCase();
    let day = getDateDay(this.state.infoNews.date_publish);
    if (day < 10) day="0"+day;

    if (this.state.loaded) {
      return (

        <View style={layout.mainContainer}>

          <ScrollView
            ref={ref => this.scrollView = ref} 
            style={theNews.newsDetailContainer}>

          

            <View style={theNews.newsDetailTitleContainer}>

             
              <View style={theNews.newsDetailTitle}>
                <Text style={[text.titleText, text.blue, text.left, text.bold]} >
                  {this.state.infoNews.title}
                </Text>
              </View>

            </View>

          
            <View style={[theNews.newsDetailSocialContainer]}>
              <TouchableOpacity 
               onPress={() => {
                  var url = "https://www.facebook.com/sharer/sharer.php?u=" +
                            encodeURI(CONST.BASE_URL+'noticias/' +
                            this.state.infoNews.url_title);
                  Linking.openURL(url);
                }} 
                style={[interactions.socialCircularButton, { backgroundColor: colors.piBlue, borderWidth: 0, marginHorizontal: 0, marginVertical: 20}]}
                >
                <CustomIcon name='facebook' size={25} style={text.white} />
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => {
                    var url = "https://twitter.com/share?url=" +
                              encodeURI(CONST.BASE_URL+'noticias/' +
                              this.state.infoNews.url_title);
                    Linking.openURL(url);
                  }} 
                style={[interactions.socialCircularButton, { backgroundColor: colors.piBlue, borderWidth: 0, marginHorizontal: 0, marginVertical: 20, marginLeft: 10}]}
                >
                <CustomIcon name='twitter' size={25} style={text.white} />
              </TouchableOpacity>
            </View>
            <View style={theNews.newsDetailHeaderConteiner}>
              <Image
                defaultSource={require('../Img/titan_plaza/news/no_image_news.jpg')}
                source={{uri:CONST.BASE_URL+this.state.infoNews.img_folder_url+'/web_banner.jpg'}}
                style={theNews.newsDetailHeaderConteiner} >
              </Image>
            </View>
          
            <View style = {theNews.newsDetailDescriptionsContainer} >
              <HTMLView onLinkPress={(url) => this.openLink(url)}  value={this.state.infoNews.content} addLineBreaks={false} paragraphBreak={""} lineBreak={""} textComponentProps={{ style: {lineHeight: 24} }} />
            </View>

            {this._renderMoreNews()}
            
          </ScrollView>
          <View>
          
          </View>
        </View>
        
      
    );
    }else{
      return null;
    }
    
  }

}

module.exports = NewsDetails;
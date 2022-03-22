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
  Linking,
  SafeAreaView
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
const NewsDetails = require('./NewsDetails');

import { layout, text, interactions, filters, forms, theNews  } from '../Styles/TitanPlaza/Global';

class News extends Component{

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
      noNews: false,
      allNews: [],
      refreshing: false,
      zebraStripe: theNews.newsListItemContainer
    }
  }

  componentDidMount(){

    // // send event
    // logEvent('screen_view_rn', {
    //   //'item_id': 'NA',
    //   'item_title': 'News',
    // });

    // tracker.trackScreenView('Noticias');
    this._getNews();    
  }

  _gotoNewsDetailsContainer(news){ 
  
    this.navigator.navigate('NewsDetails', {screen:'NewsDetails',news:news, allNews:this.state.allNews})
  
  }

  _getNews(){
      //this.setState({loaded: false});

      //this.setState({
      //  dataSource: new ListView.DataSource({
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
        "methodName":"getPostNotice",

      }) 
      }) 
      .then((response) => response.json()) 
      .then((responseJson) => { 
        this.setState({loaded: true});

        if (responseJson.length<=0) { 
          this.setState({noNews:true});
        }else{
          this.setState({allNews: responseJson});
          this.setState({noNews:false});
          this.setState({
            dataSource: responseJson,
          })
        }
      })
      .catch((error) => { //Alert.alert( 'Almacenes', 'Problemas obteniendo la información, intenta nuevamente.' ); 
        this.setState({loaded: true});
        Alert.alert(CONST.MALL_NAME, error.message);
        /*console.warn(error);*/ 
      });
  }

  _gotoLogin(){
    //this.props.navigator.push({ component: Login, title: 'Login', name:'Login',passProps:{}  }); 
     this.navigator.navigate('Login', {screen:'Login'})
  }

  _formatNews = (newsContent) => {
    newsContent = newsContent.replace(/<(?:.|\n)*?>/gm, '');
    newsContent = newsContent.split("\n").join(" ");
    newsContent = newsContent.split("\t").join(" ");
    newsContent = newsContent.split("   ").join(" ");
    return newsContent;
  }

  _onRefresh() {
    this.setState({refreshing: true, loading: true}, ()=> {
    this._getNews();
      this.setState({refreshing: false});
    });
  }

  renderNoNews(){
    return(

      <View style={[layout.mainContainer, layout.centerCenter]}>

        <Image
          resizeMode={'stretch'}
          style={layout.mainAlertImage}
          source={require('../Img/titan_plaza/alerts/news_alert.png')}/>

        <Text style={[text.mainText, text.regular, text.darkgray, text.center]}>
          No hay noticias disponibles
          {"\n"}
          en este momento
        </Text>

      </View>
    );
  }

  renderLoadingView(){
    return(
      <View style={[layout.mainContainer, layout.centerCenter]}>
        <Text style={[text.mainText, text.darkgray, text.center, text.regular]} > Cargando noticias ... </Text>
      </View>
    );
  }

  renderNews(news, header, index){

    // format date
    let year = getFullYear(news.date_publish);
    let monthName = getMonthName(news.date_publish);
    let day = getDateDay(news.date_publish);
    if (day < 10) day="0"+day;

    return(
      <View style={index % 2 == 0 ? theNews.oddContainer : theNews.newsListItemContainer} >

        <TouchableOpacity
          onPress={()=>this._gotoNewsDetailsContainer(news)}
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

              {/* <View style={theNews.newsDateInfo}>
                <Text style={[text.newsDayText, text.bold, text.darkgray, text.center]} >
                  {day}
                </Text>
                <Text style={[text.newsMonthText, text.light, text.darkgray, text.center]} >
                  {monthName}
                </Text>
              </View> */}

              <Text style={[text.newsTitleText, text.bold, text.blue, text.left]} >
                {news.title}
              </Text>
              <Text style={[text.newsTitleText, text.mainText, text.gray, text.left, {marginTop: 20}]} >
                {day} de {monthName}, {year}
              </Text>
            </View>

          </View>

          {/* <View style={theNews.newsItemDescriptionContainer}>

            <HTMLView 
              value={this._formatNews(news.content).substr(0, 105)+'...'} />

          </View> */}
          
        </TouchableOpacity>
        
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    else if (!this.state.noNews) {
      return (

        <SafeAreaView style={layout.mainContainer}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.dataSource}
            renderItem={({item}) => this.renderNews(item)}
          />
      </SafeAreaView>

      );
    } else {
      return this.renderNoNews();
    }
  }

}

module.exports = News;

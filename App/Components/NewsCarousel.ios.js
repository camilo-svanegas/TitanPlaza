'use strict';

import React, { Component } from 'react';
import {PropTypes} from 'prop-types';

import {
  View,
  Text,
  Image,
  TouchableHighlight,
  Linking,
  Dimensions,
} from 'react-native';

import Carousel from 'react-native-carousel-view';


import { homeLayout  } from '../Styles/TitanPlaza/Global';

const CONST = require('../Constants/constants');

class NewsCarousel extends Component {

  static propTypes = {
    images: PropTypes.array.isRequired,
  };

  constructor(props,context){
    super(props,context);
    this.navigations = props.navigations
  }

  gotoNews(id_post,title){

  
    this.navigations.navigate('NewsDetails', {route:'NewsDetails', id:id_post});

  }

  openLink(urlNews){
    Linking.canOpenURL(urlNews).then(supported => { 
      if (supported) { 
        Linking.openURL(urlNews); 
      } else { 
        //debugMe('Don\'t know how to open URI: ' + urlNews); 
      } 
    }).catch(err => console.error('An error occurred', err));
  } 

  _renderContents = () => {
    var that = this;
    return this.props.images.map(function(image, i){
      return(
        <View key={i} style={[homeLayout.carouselSliderContainer, {flex: 1, backgroundColor: '#000'}]}>
          <TouchableHighlight style={{flex: 1}} onPress={()=>{
            
            if (image.id_post_type == 2) 
            {
              that.gotoNews(image.id_post,image.title)  
              
            }else{
              if(image.link!='' && image.link!=null){
                that.openLink(image.link)
              }
            }
          }} >
            <Image
              resizeMode="center"
              style={[homeLayout.carouselSlider, {flex: 1, resizeMode:"cover"}]} source={{uri:CONST.BASE_URL+image.img_mobile_url}}/>
          </TouchableHighlight>
        </View>
      );
    });
  }

  render() {
    return (
      
      <View style={[homeLayout.newsCarouselContainer, ]}>
        <Carousel 
        width={Dimensions.get('window').width - 40 }
        delay={6000}
        indicatorAtBottom={true}
        indicatorSize={9}
        indicatorColor="#903392"
        animate={true}
        loop={true}
        indicatorOffset={-20}
        indicatorSpace={18}
        height={(Dimensions.get('window').width - 40)*0.68 }
        >
          {this._renderContents()}
        </Carousel>
      </View>
    );
  }
}


export default NewsCarousel;
//'use strict';

import React, { Component } from 'react';

import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

class BusyIndicator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ( this.props.activity_loading ?
      <View style={styles.indicatorContainer}>
        <View style={styles.indicator}>
          <ActivityIndicator animating={this.props.activity_loading} size="large"/>
          {/*
          <Text style={{fontSize:18, color: 'white', paddingTop: 50,}}>{this.props.activity_text}</Text>
        */}
        </View>
      </View>
      : null
    );
  }
}

const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    //backgroundColor: 'rgba(52, 52, 52, 0.9)',
  },  
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(52, 52, 52, 0.9)',
  },  
});


export default BusyIndicator;
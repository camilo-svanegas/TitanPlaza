'use strict';

import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

import {
  PickerIOS,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ViewPropTypes,
  Alert,
} from 'react-native';

import {debugMe} from '../Utilities/Messaging';

import ScrollableTabView, {
  DefaultTabBar,
} from '../Components/react-native-scrollable-tab-view';

const Stores = require('./Stores');
const StoresFavorites = require('./StoresFavorites');

import analytics from '@react-native-firebase/analytics';

import {layout, tabs} from '../Styles/TitanPlaza/Global';

export default class StoresContainer extends Component {
  static propTypes = {
    //navigator: PropTypes.object.isRequired,
    style: ViewPropTypes.style,
  };

  constructor(props, context) {
    super(props, context);

    this.navigator = this.props.navigation;
    const {state} = this.navigator;
    //if (state.params) {
    this.sesion = this.props.route.params.sesion
      ? this.props.route.params.sesion
      : null;
    this.initialPage = this.props.route.params.initialPage
      ? this.props.route.params.initialPage
      : 0;
    this.gotoStore = this.props.route.params.gotoStore
      ? this.props.route.params.gotoStore
      : null;
    //}

    this.state = {
      ranNum: 0,
      tabsChange: 0,
      id_user: this.sesion.id_user,
      token: this.sesion.token,
    };

    //this._randomNumber = this._randomNumber.bind(this);
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text> Cargando Almacenes ... </Text>
      </View>
    );
  }

  _randomNumber = (tab) => {
    //console.warn(tab)
    //if(tab.i==0){
    //  var ra = Math.floor((Math.random() * 1000) + 0); //unused
    //  this.setState({ranNum:ra, tabsChange:tab.i});
    //}else{
    //  this.setState({ranNum:ra, tabsChange:-1});
    //}
    this.setState({tabsChange: tab.i});
  };

  componentDidMount() {
    this._registerAnalytics(this.initialPage);
  }

  _registerAnalytics = async (tab) => {
    if (tab == 0) {
      await analytics().logScreenView({
        screen_name: 'Stores',
        screen_class: 'Stores',
      });
    } else if (tab == 1) {
      await analytics().logScreenView({
        screen_name: 'Favoritos',
        screen_class: 'Favoritos',
      });
    }
  };

  render() {
    return (
      <ScrollableTabView
        renderTabBar={() => <DefaultTabBar />}
        tabBarUnderlineStyle={tabs.tabIndicator}
        tabBarBackgroundColor="#FAFAFA"
        tabBarActiveTextColor="#903392"
        tabBarInactiveTextColor="#292C33"
        tabBarTextStyle={tabs.tabLabel}
        tabBarPosition="top"
        onChangeTab={async (tab) => {
          this._randomNumber(tab);
          this._registerAnalytics(tab.i);
        }}
        initialPage={this.initialPage}>
        <View tabLabel="Todos" style={layout.mainContainer}>
          <Stores
            navigator={this.navigator}
            tabsChange={this.state.tabsChange}
            sesion={this.sesion}
            gotoStore={this.gotoStore}
          />
        </View>

        <View tabLabel="Favoritos" style={layout.mainContainer}>
          <StoresFavorites
            navigator={this.navigator}
            tabsChange={this.state.tabsChange}
            sesion={this.sesion}
          />
        </View>
      </ScrollableTabView>
    );
  }
}

module.exports = StoresContainer;

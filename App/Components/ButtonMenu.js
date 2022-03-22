import React, { Component } from 'react';

import CustomIcon from './CustomIcon.js'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';

import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import { interactions  } from '../Styles/TitanPlaza/Global';

class ButtonMenu extends Component {
   constructor(props) {
    super(props);
  }

  _openMenu(){
    this.props._nav.dispatch(DrawerActions.toggleDrawer());
  }
  render() {
    const { style } = this.props;
    return (
      <TouchableOpacity style={interactions.menuButton}
        onPress={this._openMenu.bind(this)}>
        <CustomIcon name='menu' size={22} style={{color: 'black'}} />
      </TouchableOpacity>
    );
  }
}

export default ButtonMenu;
import React, { Component } from "react";
import {
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";


import {
  debugMe
} from '../Utilities/Messaging'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DrawerActions,CommonActions } from '@react-navigation/native';


import CustomIcon from "./CustomIcon.js";

import { MENU } from "../Styles/global";

import { interactions, text, drawerMenu, colors } from "../Styles/TitanPlaza/Global";

import Button from "react-native-button";

import store from '../Reducers/store.js';
import { startSession} from '../Reducers/action';

import AsyncStorage from '@react-native-community/async-storage';


const CONST = require("../Constants/constants");

class Menu extends Component {
  constructor(props) {
    super(props);

    //console.log(props)

    var dataSourceOut = [
      {
        key: "home",
        label: "Inicio",
        icon: "home",
        route: "Home"
      },
      {
        key: "stores",
        label: "Almacenes",
        icon: "stores",
        route: "StoresContainer"
      },      
      {
        key: "map",
        label: "Mapa",
        icon: "map",
        route: "Mapa"
      },
      {
        key: "promotions",
        label: "Promociones",
        icon: "sales",
        route: "Promotions"
      },
      // {
      //   key: "cartelera",
      //   label: "Cartelera",
      //   icon: "film",
      //   route: "Cartelera"
      // },      
      {
        key: "news",
        label: "Noticias",
        icon: "news",
        route: "News"
      },
      {
        key: "events",
        label: "Eventos",
        icon: "calendar",
        route: "Events"
      },
 
      {
        key: "facturas",
        label: "Facturas",
        icon: "bills",
        route: "CRMProfile"
      },
      {
        key: "favorites",
        label: "Favoritos",
        icon: "favourites",
        route: "favorites"
      },
      
    ];

    var dataSourceIn = [ ... dataSourceOut ];
    dataSourceIn.push({
      key: "logout",
      label: "Cerrar Sesión",
      icon: "logout",
      route: "logOut"
    });

    this.state = {
      avatarError: false,
      dataSourceIn: dataSourceIn,
      dataSourceOut: dataSourceOut,
      sessionOn: this.props.sessionOn
    };

    debugMe(this.state.sessionOn);

   
    this._navigate = this.props.navigation;
  }

  _renderMenuItem = item => {
    return (
      <Button
        containerStyle={drawerMenu.menuListItemContainer}
        style={drawerMenu.menuListItemText}
        onPress={() => this._navigateTo(item.route)}
      >
        <View style={drawerMenu.menuListIconContainer}>
        {item.key == "cartelera"?
        <Image               
          resizeMode={"stretch"}
          style={{width:20,height:20}}
          source={require("../Img/icons/movie.png")}
        />:
          <CustomIcon
            name={item.icon}
            size={20}
            style={drawerMenu.menuListIcon}
          />}
        </View>
        {item.label}
      </Button>
    );
  };

  _navigateTo = (route) => {

     //debugMe(this.props)

    this.sesion = {
      id_user: store.getState().todos.id,
      token: store.getState().todos.token,
      pass: store.getState().todos.pass
    };
    // if (route == "logOut") {
    //   handleNotificationSubscribing(false, {topic:this.props.menuEmail});
    // }
    //this.props.navigation.dispatch(DrawerActions.toggleDrawer());
    if (route=="logOut") {
      //this._gotoLogOut();
      this._navigate.navigate('Login', { screen: 'Login', logOut: true });  
    } else if (route=="favorites") {
      this._navigate.navigate('StoresContainer', { screen: 'StoresContainer', initialPage: 1, sesion: this.sesion });  
    }else{
      this._navigate.navigate(route, { screen: route, sesion: this.sesion });  
    }
    
  }

  _gotoLogin() {
    this._navigateTo("Login");
  }

  _gotoLogOut() {
    //this._navigateTo("Login");
    debugMe("logout")

    this.setState({sessionOn:false})
    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
    store.dispatch(startSession("","","","","",""));
    this.clearAll().done();
   
    
  }

  clearAll = async () => {
    try {

      await AsyncStorage.clear();
      await AsyncStorage.removeItem(CONST.STORAGE_ID_USER);
      await AsyncStorage.removeItem(CONST.STORAGE_TOKEN);

      this.props.onPress();
      //this._navigateTo("Home", { screen: 'Home', id_user: null, token: null, pass: null, logout:true  });
      this.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'Home',
                  params: { route:'Home', id_user: "", token: "",pass: "" },
                }
              ],
            })
          )

    } catch(e) {
       console.log(e);
    }

    debugMe('Clear All.')
    //this.navigate('Home', { screen: 'Home' }); 
  }




  _gotoRegister() {
    this._navigateTo("Register");
  }

  _gotoProfile() {
    this._navigateTo("EditProfile");
  }

  render() {
    // const avatar =
    //   this.props.menuAvatar &&
    //   this.props.menuAvatar != "nullavatar.jpg"
    //     ? { uri: CONST.BASE_URL + this.props.menuAvatar }
    //     : require("../Img/avatar.jpg");
    
     const avatar =
      store.getState().todos.avatar &&
      store.getState().todos.avatar != "nullavatar.jpg"
        ? { uri: CONST.BASE_URL + store.getState().todos.avatar }
        : require("../Img/avatar.jpg");

    if(store.getState().todos.id == "" || store.getState().todos.id == undefined ){
    // if (
    //   this.state.sessionOn == false
    // ) {
      return (
        <View style={drawerMenu.drawerContainer}>
          <SafeAreaView style={{backgroundColor: '#F5F6FA'}}>
          <View style={drawerMenu.drawerHeader}>
            <Image
              source={require("../Img/titan_plaza/logos/logo02.png")}
              style={drawerMenu.drawerLogo}
            />

            <TouchableOpacity
              style={[
                interactions.gralButton,
                interactions.purple,
                interactions.center
              ]}
              onPress={this._gotoLogin.bind(this)}
            >
              <Text style={[text.buttonLabel, text.semibold, text.white]}>
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                interactions.gralButton,
                interactions.white,
                interactions.center
              ]}
              onPress={this._gotoRegister.bind(this)}
            >
              <Text style={[text.buttonLabel, text.semibold, text.black]}>
                Registro
              </Text>
            </TouchableOpacity>
          </View>
          </SafeAreaView>

          <FlatList
            data={this.state.dataSourceOut}
            style={drawerMenu.menuList}
            contentContainerStyle={{ padding: 15 }}
            renderItem={({ item }) => this._renderMenuItem(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    } else {
      return (
        <View style={drawerMenu.drawerContainer}>
          <SafeAreaView style={{backgroundColor: colors.piLightGray}}>
          <View style={drawerMenu.drawerHeader}>
            <Image
              source={require("../Img/titan_plaza/logos/logo.png")}
              style={[drawerMenu.drawerLogo2]}
            />

            <View style={drawerMenu.profileInfoContainer}>
              <View style={drawerMenu.avatarContainer}>
                <Image
                  source={avatar}
                  style={drawerMenu.avatarImg}
                  onError={() => this.setState({ avatarError: true })}
                  onLoad={() => this.setState({ avatarError: false })}
                />
                {!this.state.avatarError ? (
                  <Image
                    source={avatar}
                    defaultSource={require("../Img/avatar.jpg")}
                  />
                ) : (
                  <Image source={require("../Img/avatar.jpg")} />
                )}
              </View>

              <View style={drawerMenu.userInfoContainer}>
                <Text
                  style={[text.userName, text.bold, text.darkgray, text.left]}
                >
                  {store.getState().todos.fullname}{/*{store.getState().todos.fullname}*/}
                </Text>

                <Text style={[text.userMail, text.light, text.gray, text.left]}>
                  {store.getState().todos.email}{/*{"user@mail.com"}*/}
                </Text>
              </View>

              <TouchableOpacity
                style={interactions.editButtonContainer}
                onPress={this._gotoProfile.bind(this)}
              >
                <CustomIcon
                  name="edit"
                  size={22}
                  style={text.purple}
                />
              </TouchableOpacity>
            </View>
          </View>
          </SafeAreaView>

          <FlatList
            data={this.state.dataSourceIn}
            style={drawerMenu.menuList}
            contentContainerStyle={{ padding: 15 }}
            renderItem={({ item }) => this._renderMenuItem(item)}
            keyExtractor={(item, index) => index.toString()}
          />
          
        </View>
      );
    }
  }

  press() {}
}

module.exports = Menu;

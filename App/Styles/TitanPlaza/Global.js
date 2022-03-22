import { StyleSheet, Platform, Dimensions} from 'react-native';
import { hidden } from 'ansi-colors';
import { color } from 'react-native-reanimated';

var {height, width} = Dimensions.get('window');

// Constants
const fzbase = 14;

const gralSpacer = 15;

export const colors = {
  primaryGradient: ['#801f7d', '#b43165'],
  white: '#FFFFFF',
  piRed: '#EC1B2E',

  piPurple: '#903392',
  piOrange: '#F06031',
  piBlue: '#00B3A2',
  piGreen: '#B2BD00',


  piBlack: '#25282F',
  piDarkGray: '#333333',
  piGray: '#B8BDCC',
  piLightGray: '#FAFAFA',

  piSuccessGreen: '#61B300',
  piErrorRed: '#EC1B2E',

  facebookColor: '#3B5998',
  twitterColor: '#5FA9DD',

  separatorLight: '#DDDFE6',
  separatorDark: '#494B52',
  pinkLight: '#F1D5D7'
};

export const primaryGradient = {
  colors: ['#801f7d', '#b43165'],
  start: { x: 1, y: 0 },
  end: { x: 0, y: 1 },
  location: [0.99, 0.0],
}

const fonts = {
  lt: 'OpenSans-Light',
  lti: 'OpenSansLight-Italic',
  rg: 'OpenSans',
  rgi: 'OpenSans-Italic',
  sb: 'OpenSans-Semibold',
  sbi: 'OpenSans-SemiboldItalic',
  bl: 'OpenSans-Bold',
  bli: 'OpenSans-BoldItalic',
}

// General layout styles

export const layout = StyleSheet.create({
  // Main container Views
  mainContainer :{
    flex:1,
    // paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    backgroundColor: colors.piLightGray,
    position: 'relative',
  },
  innerContainer :{
    flex: 1,
    paddingHorizontal: gralSpacer * 2,
    paddingVertical: gralSpacer,
  },
  titleContainer :{
    width: '100%',
    paddingHorizontal: gralSpacer * 2,
    height: gralSpacer * 5,
    paddingTop: gralSpacer * 1.5,
  },
  // Main container alignment
  centerCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainAlertImage: {
    width: 100,
    height: 100,
    marginVertical: gralSpacer * 2,
  },
  mainAlertSmallImage: {
    width: 80,
    height: 80,
    marginVertical: gralSpacer ,
  },
  // Separator styles
  separator: {
    width: '100%',
    height: 1,
  },
  // Separator colors
  light: {
    backgroundColor: colors.separatorLight,
  },
  dark: {
    backgroundColor: colors.separatorDark,
  },
  white:{
    backgroundColor: colors.white
  }
});

// General menu styles

export const drawerMenu = StyleSheet.create({
  drawerContainer:{
    flex: 1,
    backgroundColor: colors.piLightGray,
    borderRadius: 20
  },
  drawerHeader: {
    backgroundColor: colors.piLightGray,
    paddingHorizontal: gralSpacer * 1.5,
    paddingVertical: gralSpacer,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
  },
  drawerLogo:{
    width: 65, //cambia depediendo de la medida de las dimenciones del logo
    height: 72, //cambia depediendo de la medida de las dimenciones del logo
  },
  drawerLogo2:{
    width: 130, //cambia depediendo de la medida de las dimenciones del logo
    height: 50, //cambia depediendo de la medida de las dimenciones del logo
  },
  profileInfoContainer: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: gralSpacer * 1.5,
    alignItems: 'center',
  },
  avatarContainer: {
    width: gralSpacer * 3,
    height: gralSpacer * 3,
    borderRadius: gralSpacer * 1.5,
    overflow: 'hidden',
    marginRight: gralSpacer * 0.5,
  },
  avatarProfileContainer: {
    width: gralSpacer * 4.5,
    height: gralSpacer * 4.5,
    borderRadius: gralSpacer * 2.25,
    overflow: 'hidden',
    marginRight: gralSpacer,
  },
  avatarImg: {
    flex: 1,
  },
  userInfoContainer:{
    flex: 1,
    flexDirection: 'column',
    padding: gralSpacer * 0.5,
  },
  menuList: {
    flex: 1,
    paddingHorizontal: gralSpacer * 1.5,
  },
  menuListAlignment: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingVertical: gralSpacer * 1.5,
    paddingHorizontal: gralSpacer * 2
  },
  menuListItemContainer:{
    width: '100%',
    height: gralSpacer * 1.5,
    marginVertical: gralSpacer * 0.7,
  },
  menuListItemText:{
    flex: 1,
    height: gralSpacer * 1.5,
    marginLeft: gralSpacer * 2.2,
    fontFamily: fonts.lt,
    color: colors.piDarkGray,
    fontSize: fzbase,
    textAlign: 'left',
    fontWeight: 'normal',
    paddingTop: gralSpacer * 0.1,
  },
  menuListIconContainer: {
    width: gralSpacer * 1.5,
    height: gralSpacer * 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuListIcon: {
    color: colors.piGray,
  },
});

// Login layout styles

export const loginLayout = StyleSheet.create({
  // Main container Views
  closeBackground: {
    backgroundColor: '#ffffff',
    borderRadius: 40 / 2,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: gralSpacer * 1.5,
  },

  loginContainer: {
    flex: 1,
  },
  loginFBContainer:{
    paddingHorizontal: gralSpacer * 2,
    paddingVertical: gralSpacer,
   
  },
  loginTop: {
    width: '100%',
    height: 45, //cambia depediendo de la medida de las dimenciones del logo
    //marginTop: gralSpacer * 2,
    marginBottom: gralSpacer * 1.5,
    paddingHorizontal: gralSpacer * 2,
    justifyContent: 'space-between',
    //alignItems: 'flex-start',
    //flexDirection: 'row',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: gralSpacer * 2,
    paddingVertical: gralSpacer,
    marginBottom: gralSpacer * 2,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: gralSpacer * 1.5,
  },
  formContainerSecondary: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: gralSpacer * 2,
    paddingVertical: gralSpacer,
    marginBottom: gralSpacer * 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: gralSpacer * 1.5,
  },

  logoCC: {
    width: 65, //cambia depediendo de la medida de las dimenciones del logo
    height: 72, //cambia depediendo de la medida de las dimenciones del logo
  },
  buttonBottonContainer: {
    borderTopWidth: 1,
    borderColor: '#494B52',
    backgroundColor: 'transparent',
    height: gralSpacer * 3.5,
  },
  // For password recovery modal
  innerModalContainer: {
    flex: 1,
    padding: gralSpacer ,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerModalContainerPassword: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: gralSpacer * 2,
    paddingVertical: gralSpacer,
    marginBottom: gralSpacer * 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: gralSpacer * 1.5,
  },
  recoveryImage: {
    width: 100,
    height: 100,
    marginVertical: gralSpacer * 2,
  }
});

// Home styles

export const homeLayout = StyleSheet.create({
  homeScroll: {
    flex: 1,
  },
  homeHeader: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
    paddingVertical: 1,
    overflow: 'hidden'
  },
  logoContainer: {
    padding: gralSpacer * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    width: '60%',
    height: 120,
    overflow: 'hidden'
  },
  logo:{
    width: '100%', //cambia depediendo de la medida de las dimenciones del logo
    // height: 70, //cambia depediendo de la medida de las dimenciones del logo
  },
  appTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: gralSpacer * 1.5,
  },
  // For carousel Slider
  newsCarouselContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -3,
    marginTop: 20
  },
  carouselSliderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
    overflow: 'hidden',
    
  },
  carouselSlider: {
    width: width-40,
  },
  // Home items menu
  homeItemsMenuContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 20,
    // backgroundColor: colors.piLightGray,
    paddingVertical: gralSpacer * 2,
    paddingHorizontal: gralSpacer,
    
  },
  homeItemMenu: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginHorizontal: gralSpacer / 2,
    marginBottom: gralSpacer * 1,
  },
  homeItemIconContainer: {
    width: '100%',
    height: 110,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 11,
    paddingHorizontal: 5,
  },
  homeItemIcon: {
    marginBottom: -20,
    marginTop: -10,
  },
});

// Text styles

export const text = StyleSheet.create({
  titleText: {
    fontSize: fzbase * 1.3,
    marginBottom: fzbase * 1.3,
  },
  mainText: {
    fontSize: fzbase,
    marginBottom: fzbase * 1.2,
  },
  smallText: {
    fontSize: fzbase * 0.8,
  },
  largeText: {
    fontSize: fzbase * 1.2,
  },
  userName: {
    fontSize: fzbase,
    marginBottom: fzbase * 0.3,
  },
  userMail: {
    fontSize: fzbase * 0.9,
  },
  titleStoreText: {
    fontSize: fzbase + 1,
    marginBottom: fzbase + 3,
  },
  titleStoreDetailText: {
    fontSize: fzbase * 1.5,
    marginBottom: fzbase * 0.5,
  },
  socialNameText: {
    fontSize: fzbase * 0.65,
    marginTop: gralSpacer * 0.5,
  },
  categoryStoreText: {
    fontSize: fzbase + 1,
    marginBottom: fzbase * 0.5,
  },
  locationStoreText: {
    fontSize: fzbase,
    marginLeft: 5
  },
  newsDayText: {
    fontSize: fzbase * 1.1,
    marginTop: gralSpacer * 0.3,
    marginBottom: 0,
  },
  newsMonthText: {
    fontSize: fzbase * 0.7,
    marginBottom: gralSpacer * 0.7,
  },
  newsTitleText: {
    fontSize: fzbase,
    paddingLeft: gralSpacer,
    color: colors.piBlue,
  },
  eventTitleText: {
    fontSize: fzbase,
    paddingBottom: gralSpacer
    // paddingLeft: gralSpacer,
  },
  linkText: {
    fontSize: fzbase,
  },
	inputLabel: {
    fontSize: fzbase * 1,
  },
  buttonLabel: {
    fontSize: fzbase * 0.9,
    //textTransform: 'uppercase',
  },
  // Text styles
  light: {
    fontFamily: fonts.lt,
  },
  lightI: {
    fontFamily: fonts.lti,
  },
  regular: {
    fontFamily: fonts.rg,
  },
  regularI: {
    fontFamily: fonts.rgi,
  },
  semibold: {
    fontFamily: fonts.sb,
  },
  semiboldI: {
    fontFamily: fonts.sbi,
  },
  bold: {
    fontFamily: fonts.bl,
  },
  boldI: {
    fontFamily: fonts.bli,
  },
  // Text colors // Cambia de acuerdo al esquema de color de cada centro comercial
  black: {
    color: colors.piBlack,
  },
  darkgray: {
    color: colors.piDarkGray,
  },
  gray: {
    color: colors.piGray,
  },
  lightgray: {
    color: colors.piLightGray,
  },
  white: {
    color: colors.white,
  },


  orange: {
    color: colors.piOrange,
  },
  blue: {
    color: colors.piBlue,
  },
  red: {
    color: colors.piRed,
  },
  purple: {
    color: colors.piPurple,
  },
  green: {
    color: colors.piGreen,
  },


  facebookBlueText: {
    color: colors.facebookColor,
  },
  twitterBlueText: {
    color: colors.twitterColor,
  },
  // Text alignment
  center: {
    textAlign: 'center',
  },
  left: {
    textAlign: 'left',
  },
  right: {
    textAlign: 'right',
  },
});

// Links and buttons styles
export const interactions = StyleSheet.create({
  simpleLink: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  gralButton: {
    width: '100%',
    height: fzbase * 3,
    marginVertical: gralSpacer,
    paddingHorizontal: gralSpacer * 2,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'gray', // quitar
    borderRadius: 25
  },
  // Buttons alignement
  center: {
    justifyContent: 'center',
  },
  // Button icon
  buttonIcon: {
    marginRight: gralSpacer * 0.8,
  },
  // Button colors
  red: {
    backgroundColor: colors.piRed,
  },
  purple: {
    backgroundColor: colors.piPurple,
  },
  white: {
    backgroundColor: colors.white,
  },
  facebookBlue: {
    backgroundColor: colors.facebookColor,
  },
  twitterBlue: {
    backgroundColor: colors.twitterColor,
  },
  // For modal styles
  closeModalButton: {
    width: 30,
    height: 30,
    position: 'absolute',
    zIndex: 2,
    right: gralSpacer * 2,
    top: gralSpacer * 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Menu drawe button
  menuButton: {
    backgroundColor: 'transparent',
    width: gralSpacer * 1.5,
    height: gralSpacer * 1.5,
    marginRight: gralSpacer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Edit profile button
  editButtonContainer: {
    backgroundColor: 'transparent',
    width: gralSpacer * 1.5,
    height: gralSpacer * 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: gralSpacer * 0.5,
  },
  // Filters button styles
  
  filterButton:{
    backgroundColor: 'white',
    width: gralSpacer * 3,
    height: gralSpacer * 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  },
  
  filterButtonTransparent:{
    backgroundColor: 'transparent',
  },
  // Fav button
  FavButton: {
    width: gralSpacer * 2,
    height: gralSpacer *2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Social interactions
  socialCircularButton: {
    width: gralSpacer * 3,
    height: gralSpacer * 3,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: gralSpacer * 1.5,
    marginHorizontal: gralSpacer * 2,
  },
  sociaSimpleButton: {
    width: gralSpacer * 3,
    height: gralSpacer * 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  socialRoundButton: {
    borderRadius: 25,
    width: 35,
    height: 35,
    maxHeight: 50,
    maxWidth: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialRoundButtonIcon:{
    width: 20,
    height: 20,
  },
  darkBorder: {
    borderColor: colors.piPurple,
  },
  // Wishlist interactions
  wishlistPhotoButton: {
    backgroundColor: colors.white,
    width: '100%',
    padding: gralSpacer * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  takePictureButton: {
    width: gralSpacer * 5,
    height: gralSpacer * 5,
    borderRadius: gralSpacer *2.5,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow Android
    elevation: 3,
    margin: 3,
    marginTop: 0,
    // Shadow IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  retakePictureButton: {
    width: gralSpacer * 3,
    height: gralSpacer * 3,
    borderRadius: gralSpacer *1.5,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow Android
    elevation: 3,
    margin: 3,
    marginTop: 0,
    // Shadow IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  }
});

export const Modals = StyleSheet.create({
  modalContainer:{
    backgroundColor: colors.white,
    height: 290,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    borderRadius: 10,
    padding: 20,
  },
  modalClose: {
    borderColor: colors.piPurple,
    borderWidth: 1,
    marginBottom: 20
  },
  modalBackground:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.87)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    flex: 1,
  },
  ButtonIcon: {
    
  },  
});

// Forms styles
export const forms = StyleSheet.create({
  // input container
  inputGroup:{
    width: '100%',
    flexDirection: 'column',
    height: 'auto',
    marginBottom: gralSpacer,
  },
  inputLabelCont: {
    width: '100%',
    paddingVertical: fzbase * 0.2,
  },
  mainInput: {
    position:'relative',
    width: '100%',
    marginVertical: gralSpacer * 0.2,
    fontSize: fzbase,
    paddingVertical: gralSpacer * 0.5,
    paddingHorizontal: gralSpacer * 1,
    //borderBottomWidth: 1,
    backgroundColor: colors.piLightGray,
    borderRadius: 25,
    height: 40
  },
  mainSelect: {
    position:'relative',
    width: '100%',
    height: gralSpacer *2,
    marginVertical: gralSpacer * 0.2,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    borderColor: colors.piDarkGray,
  },
  searchInput:{
    flex: 1,
    alignItems: 'center',
    fontFamily: fonts.sb,
    backgroundColor: 'white',
    borderBottomWidth: 0,
    borderRadius: 11,
    height: 50,
    padding: 11,
    paddingRight: 22
  },
  // Inputs line color
  lightInput: {
    borderColor: colors.white,
    backgroundColor: colors.white,
  },
  darkInput: {
    borderColor: colors.piDarkGray,
    color: colors.piDarkGray,
    justifyContent: 'center',
  },
  darkInputError: {
    borderColor: colors.piRed,
    color: colors.piDarkGray,
    borderWidth:1
  },
  // Input on focus state
  focusInput: {
    borderBottomWidth: 2,
  },
  // Validation icons
  validateIconCont:{
    backgroundColor: 'transparent',
    marginHorizontal: gralSpacer * 1,
    width: 25,
    height: 25,
    position: 'absolute',
    right: 0,
    bottom: gralSpacer * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  validateIconSuccess: {
    color: colors.piSuccessGreen,
  },
});

// Specific components styles

// Tabs styles
export const tabs = StyleSheet.create({
  tabLabel: {
    fontSize: fzbase,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    textAlign: 'center',
  },
  tabContainer:{
    backgroundColor: colors.piLightGray,
    paddingVertical: gralSpacer * 0.8,
    elevation: 0,
  },
  tabItem:{
    flex: 1,
  },
  tabIndicator:{
    backgroundColor: colors.piPurple,
    height: 0.5,
  },
});

// Filters styles
export const filters = StyleSheet.create({
  point:{
    backgroundColor: colors.piOrange,
    position: 'absolute',
    top: 5,
    right: 5,
    width: 10,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  filterDrop:{
    backgroundColor: 'red',
  },
  filterContainer:{
    justifyContent:'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 0,
    marginTop: 11,
    // paddingRight: gralSpacer,
    // marginHorizontal: 30,
    // marginBottom: 20,
    paddingHorizontal: gralSpacer,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.01,
    shadowRadius: 1,

    elevation: 1,
  },
  filterWhite: {
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    paddingHorizontal: gralSpacer,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.01,
    shadowRadius: 1,

    elevation: 1,
  },
  searchContainer: {
    flex:1,
    paddingHorizontal: gralSpacer - 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    marginRight: 10,
  },
  searchContainerFilter: {
    flex:1,
    // paddingHorizontal: gralSpacer - 15,
    paddingVertical: gralSpacer,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  searchIconContainer: {
    position: 'absolute',
    right: 11,
    top: 5,
    width: gralSpacer * 3,
    height: gralSpacer * 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer:{
    backgroundColor: 'white',
    paddingTop: gralSpacer,
    paddingBottom: gralSpacer * 3,
    position: 'absolute',
    flex: 1,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    justifyContent: 'center',
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalBackground: {
    backgroundColor: 'rgba(37, 37, 37, 0.84)',
    top: '-40%',
    height: '40%',
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 0,
  },
  filterTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  closeButton: {
    backgroundColor: '#E6E6E6',
    position: 'absolute',
    top: 0,
    right: 15,
    height: 44,
    width: 44,
    borderRadius: 44 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoriesList: {
    // backgroundColor: colors.piBlack,
    // flexDirection: 'row',
  },
  categoryItem: {
    width: '100%',
    paddingVertical: gralSpacer * 0.8,
    paddingHorizontal: gralSpacer,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // textAlign: 'left'
  },
  categoryItemActive: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  categoryItemText: {
    flex: 1,
    fontSize: fzbase ,
  },
  categoryIconContainer: {
    width: gralSpacer * 2,
    height: gralSpacer * 2,
    marginRight: gralSpacer * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollIndicatorContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: gralSpacer * 3,
    position: 'absolute',
    bottom: 0,
    left: 0,
  }
});

export const createVoucer = StyleSheet.create({
  mainContainer: {
    padding: 18,
  },
  containerImage:{
    width: '100%',
    height: 350,
    overflow: 'hidden',
    borderRadius: 11
  },
  containerForm:{
    marginTop: 18,
    backgroundColor: 'white',
    borderRadius: 11,
    paddingHorizontal: 18,
    paddingVertical: 20
  }
})

export const newVoucer = StyleSheet.create({
  mainContainer: {
    padding: 18,
  },
  containerImage:{
    width: '100%',
    height: 180,
    overflow: 'hidden',
    borderRadius: 11,
    marginTop: 30
  },
  containerForm:{
    marginTop: 18,
    backgroundColor: 'white',
    borderRadius: 11,
    paddingHorizontal: 18,
    paddingVertical: 20
  },
  infoIcon:{
    width: 25,
    height: 25,
    position: 'absolute',
    top: '40%',
    left: '10%'
  },
  row:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  column:{
    width: '50%',
  }
})



export const invoices = StyleSheet.create({
  containerList:{
    padding: 18,
    paddingBottom: 40,
  },

  storeItem:{
    backgroundColor: colors.white,
    marginVertical: 11,
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderRadius: 11,
    overflow: 'hidden',
    flex: 1,
    flexDirection: 'row'
  },

  imageItem:{
    width: '37%',
    height: 130,
  },

  infoItemContainer:{
    padding: 11,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  }

})
export const CRM = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    // borderRadius: 11,
    paddingVertical: 20,
    paddingHorizontal: 18,
    // top: -10,
    // left: -3,
    // Shadow android
    // elevation: 2,
    // margin: 2,
    // marginTop: 0,
    // Shadow IOS
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 1,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
  },

  buttonsContainer:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  cameraButton:{
    backgroundColor: colors.separatorLight,
    borderRadius: 50,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    marginRight: 11
  },
  CMRCard:{
    backgroundColor: colors.piRed,
    borderRadius: 11,
    padding: 15,
    minHeight: 30,
    marginTop: 20
  },
  footerCardInfo:{
    flex: 1,
    flexDirection: 'row'
  },
  footerCardColumn:{
    width: '50%',
    minHeight: 30
  },
})

// Stores screens styles
export const stores = StyleSheet.create({
  storeList: {
    flex:1,
    marginTop: gralSpacer * 1.5,
  },
  headerStoreList: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', 
    marginBottom: gralSpacer * 1.5,
    height: gralSpacer * 2,
    width: gralSpacer * 2,
    borderRadius: (Platform.OS) === 'ios' ? gralSpacer : 0,
    backgroundColor: (Platform.OS) === 'ios' ? colors.white : 'transparent',
    textAlign: 'center',
  },
  storeItemContainer:{
    width: '100%',
    paddingHorizontal: gralSpacer ,
    marginBottom: gralSpacer,

  },
  storeItem: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // Shadow Android
    elevation: 3,
    margin: 3,
    marginTop: 0,
    // Shadow IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderRadius: 11,
    overflow: 'hidden',
  },
  storeItemImageContainer: {
    width: gralSpacer * 8,
    height: gralSpacer * 8,
    overflow: 'hidden',
  },
  storeItemImage: {
    flex: 1,
  },
  storeItemTextContainer: {
    flex: 1,
    height: gralSpacer * 8,
    justifyContent: 'space-between',
  },
  storeItemMainInfo: {
    flex: 1,
    paddingHorizontal: gralSpacer * 1.1,
    paddingVertical: gralSpacer * 0.9,
  },
  storeInteractionInfo:{
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    bottom: 4,
  },
  storeLocationInfo: {
    flex: 1,
    height: gralSpacer * 2.5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  storeLocationIcon: {
    color: colors.piPurple,
    marginLeft: gralSpacer * 0.5,
  },
  storeFavButtonCont: {
    width: gralSpacer * 2.5,
    height: gralSpacer * 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },
  // Stores detail header styles
  storesCarouselContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  storesCarouselSliderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  storesCarouselSlider: {
    width: width,
  },
  storeDetailInfoContainer: {
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  storeDetailInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column', 
    paddingHorizontal: gralSpacer * 2,
    paddingVertical: gralSpacer,
  },
  storeDetailLogoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: gralSpacer * 7.5,
    borderRadius: 80 / 2,
    
  },
  storeDetailLogo: {
    width: 90,
    height: 90,
    backgroundColor: colors.white,
    borderRadius: 90 / 2,
    borderColor: colors.piGray,
    borderWidth: 1,
  },
  // For description styles
  storeSocialContainer: {
    width: '100%',
    marginVertical: gralSpacer,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  storesSocialItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  storeDescriptionContainer: {
    width: '100%',
    marginVertical: gralSpacer
  },
  timetableContainer: {
    backgroundColor: '#FFF',
  },
  // Store promotion styles
  promotionCardContainer: {
    width: '100%',
    paddingHorizontal: gralSpacer,
    marginVertical: gralSpacer,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.01,
    shadowRadius: 1,

    elevation: 1,
    
  },
  promotionCard: {
    flex: 1,
    minHeight: 100,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  promotionCardLogoContainer: {
    width: '100%',
    backgroundColor: colors.white,
    height: 80,
    paddingVertical: gralSpacer * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promotionShopLogo: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderColor: colors.piLightGray,
    borderWidth: 5,
    paddingHorizontal: gralSpacer * 2,
    margin: 20,
    borderWidth: 1,
    borderColor: colors.piLightGray,
  },
  promotionCardImageContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: colors.piGray,
    position: 'relative', 
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  promotionCardImage:{
    width: '100%',
    
  },
  promotionCardInfoContainer: {
    backgroundColor: colors.white,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  promoTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: gralSpacer * 4,
    // paddingHorizontal: gralSpacer,
    paddingRight: 10,
  },
  promoDecoContainer:{
    width: gralSpacer * 3,
    height: gralSpacer * 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoLabel: {
    width: gralSpacer * 2.5,
    height: gralSpacer * 2.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  promotionTimeInfoContainer: {
    position: 'absolute',
    backgroundColor: colors.white,
    width: gralSpacer * 11,
    height: gralSpacer * 2.5,
    paddingVertical: gralSpacer * 0.5,
    paddingHorizontal: gralSpacer,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: gralSpacer * 1.5,
    zIndex: 2,
    top: gralSpacer * 1.25,
  },

  // Promotion details
  promoDetail: {
    flex: 1,
    width: '100%',
    justifyContent: 'center'
  },
  promoDetailHeader: {
    flexDirection: 'row',
    marginTop: 20
  },
  promoDetailImage: {
    width: 335,
    height: 335,
    borderRadius: 10,
  },
  promoDetailDateContainer: {
    backgroundColor: '#FFEBE6',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    flexDirection: 'row',
    marginVertical: 30,
  },
  promoDetailRestrictions: {
    borderTopWidth: 1,
    borderTopColor: colors.separatorLight,
    paddingTop: 30
  }
});

// CarteleraDetails Descrition screens styles
export const stylesHTML = StyleSheet.create({
  p: {
    fontFamily: 'OpenSans',
    textAlign: 'justify',
    lineHeight: 26,
    fontSize: 15, 
    color: colors.piDarkGray, // make links coloured pink
  },
});
// Cartelera screens styles
export const carteleras = StyleSheet.create({

  // Carteleras styles
  cartelerasListView: {
    padding: gralSpacer * 2,
  },  
  carteleraCardContainer: {
    width: '47%',
    height: 'auto',
    margin: 5,
    marginBottom: gralSpacer * 2,
    borderRadius: 15,
    overflow: 'hidden' 
  },
  carteleraFooter: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.piRed,
    width: '100%',
  },
  carteleraLoadMoreBtn: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carteleraBtnText: {
    color: colors.white,
    textTransform: 'uppercase',
    fontSize: 13,
    textAlign: 'center',
  },
  carteleraCard: {
    flex: 1,
  },
  carteleraCardImageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative', 
  },
  carteleraCardImage:{
    width: '100%',
  },
  carteleraCardInfoContainer: {
    backgroundColor: colors.white,
    width: '100%',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    height: 80,
  },
  carteleraTitleContainer: {
    flex: 1,
    fontSize: 17,
    lineHeight: 25.7,
    justifyContent: 'center',
    alignItems: 'flex-start',
  }, 
  // Detail cartelera container
  carteleraDetailContainer: {
    flex:1,
    backgroundColor: colors.white,
    padding: gralSpacer * 2,
  },
  carteleraDetailHeaderConteiner: {
    width: '100%',
  },
  carteleraDetailDesc: {
    lineHeight: 26,
    fontSize: 15,
  },
  carteleraCaracteristicas:{
    flex: 1, 
    flexDirection: 'row',
  },
  carteleraCaracteristica:{
    backgroundColor: colors.separatorLight,
    padding: 10,
    borderRadius: 10,
    marginRight: 5,
  },
  carteleraDetailSocialContainer: {
    width: '100%',
    height: gralSpacer * 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carteleraDetailinfocontainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 0,
    justifyContent: 'space-between',
  },  
  carteleraDetailspaceBorder: {
    height:1,
    width: '100%',
    marginVertical: 25,
    backgroundColor: colors.piLightGray,
  },
  carteleraDetailspace: {
    height:30,
    width: '100%',
  },
  carteleraYoutube: {
    height:200,
    width: '100%',
    borderRadius: 11,
    overflow: 'hidden'
  },  
  carteleraItemImageContainer: {
    width: '100%',
    height: 'auto',
    overflow: 'hidden',
    borderRadius: 11
  },   
  carteleraVerHorario: {
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.piRed,
    width: '100%'
  },  
});

// news screens styles
export const theNews = StyleSheet.create({
  newsListItemContainer: {
    flex: 1,
    paddingHorizontal: gralSpacer,
    paddingVertical: gralSpacer * 1.5,
    
  },
  oddContainer: {
    flex: 1,
    paddingHorizontal: gralSpacer * 2,
    paddingVertical: gralSpacer * 1.5,
    backgroundColor: colors.white,
  },
  newsItemContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.01,
    shadowRadius: 1,

    elevation: 1,
    marginBottom: -20,
  },
  newsItemHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsItemImageContainer: {
    width: gralSpacer * 10,
    height: gralSpacer * 10,
    overflow: 'hidden',
    backgroundColor: colors.piLightGray, 
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  newsItemImage:{
    flex: 1,
  },
  newsItemTitleContainer: {
    flex: 1,
    height: gralSpacer * 8,
    paddingRight: gralSpacer,
    paddingTop: gralSpacer,
    justifyContent: 'center',
  },
  newsDateInfo: {
    backgroundColor: colors.piLightGray,
    width: gralSpacer * 3,
    height: gralSpacer * 3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: gralSpacer * 0.5,
  },
  newsItemDescriptionContainer: {
    width: '100%',
    paddingTop: gralSpacer,
  },
  // Detail news container
  newsDetailContainer: {
    flex:1,
    backgroundColor: colors.white,
  },
  newsDetailHeaderConteiner: {
    width: '100%',
    height: gralSpacer * 12,
    paddingHorizontal: gralSpacer,
    borderColor: 'transparent',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  newsDetailTitleContainer: {
    width: '100%',
    height: gralSpacer * 5,
    paddingHorizontal: gralSpacer,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  newsDetailTitle:{
    flex: 1,
    height: gralSpacer * 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingRight: gralSpacer * 0.5,
    marginTop: 40
  },
  newsDetailSocialContainer: {
    width: '100%',
    paddingHorizontal: gralSpacer,
    flexDirection: 'row',
    marginTop: 20,
  },
  newsDetailDescriptionsContainer: {
    width: '100%',
    paddingHorizontal: gralSpacer,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  newsRelatedContainer: {
    flex: 1,
    backgroundColor: colors.piLightGray,
    width: '100%',
    paddingTop: gralSpacer * 2,
    paddingBottom: gralSpacer * 10,
    paddingHorizontal: gralSpacer,
  },
  newsRelatedItemContainer: {
    width: '100%',
    flex: 1,
    height: gralSpacer * 5,
    marginBottom: gralSpacer,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10
  },
  newsRelatedImageContainer: {
    width: gralSpacer * 7,
    height: gralSpacer * 5,
    overflow: 'hidden',
    backgroundColor: colors.piGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsRelatedImage: {
    flex: 1,
    height: gralSpacer * 5,
  },  
  newsRelatedTextContainer: {
    flex: 1,
    // height: gralSpacer * 5,
    paddingHorizontal: gralSpacer,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
});

// event screens styles
export const theEvents = StyleSheet.create({
  eventListItemContainer: {
    flex: 1,
    paddingHorizontal: gralSpacer,
    paddingVertical: gralSpacer * 0.5,
    marginTop: 30
  },
  oddContainer: {
    flex: 1,
    paddingHorizontal: gralSpacer * 2,
    paddingVertical: gralSpacer * 1.5,
    backgroundColor: colors.white,
  },
  eventItemContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.white,
    borderRadius: 10
  },
  eventItemHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventItemImageContainer: {
    width: '100%',
    height: 335,
    overflow: 'hidden',
    backgroundColor: colors.piLightGray,
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10, 
  },
  eventItemImage:{
    flex: 1,
  },
  eventItemTitleContainer: {
    flex: 1,
    height: gralSpacer * 8,
    paddingRight: gralSpacer,
    flexDirection: 'row',
  },
  eventDateInfo: {
    backgroundColor: colors.piGreen,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: gralSpacer,
    margin: gralSpacer,
  },
  eventDateInfoDetail: {
    backgroundColor: colors.piGreen,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: gralSpacer,
    marginRight: gralSpacer,
    // marginTop: gralSpacer,
    borderRadius: 66 / 2,
  },
  eventItemDescriptionContainer: {
    width: '100%',
    paddingTop: gralSpacer,
  },
  eventDescription: {
    flex: 1,
  },
  eventItemDateContainer: {
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  eventItemCalendarText:{
    color: colors.piGreen,
    marginLeft: gralSpacer,
    marginBottom: gralSpacer,
    marginTop: 2,
    fontSize: 14
  },
  eventItemCalendarTextTitle:{
    color: colors.piGreen,
    marginLeft: gralSpacer,
    fontSize: 14
  },
  eventItemIco:{
    width: 20,
    height: 20,
  },

  eventHoraryContainer: {
    backgroundColor: '#FEFFE6',
    paddingHorizontal: gralSpacer * 1.5,
    paddingVertical: gralSpacer,
    marginHorizontal: gralSpacer * 2,
    marginVertical: 50,
    borderRadius: 10,
  },
  // Detail event container

  eventDetailsRestrictions: {
    paddingHorizontal: gralSpacer * 2,
    paddingTop: 40,
    borderTopColor: colors.piLightGray,
    borderTopWidth: 1,
  },

  eventDetailContainer: {
    flex:1,
    backgroundColor: colors.white,
  },
  eventDetailHeaderConteiner: {
    width: '100%',
    height: gralSpacer * 20,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: gralSpacer * 2,
    borderRadius: 10,
    marginVertical: 15,
  },
  eventDetailTitleContainer: {
    width: '100%',
    height: gralSpacer * 5,
    paddingHorizontal: gralSpacer * 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: gralSpacer
  },
  eventDetailTitle:{
    flex: 1,
    // height: gralSpacer * 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingRight: gralSpacer * 0.5,
  },
  eventDetailSocialContainer: {
    width: '100%',
    height: gralSpacer * 4,
    paddingHorizontal: gralSpacer * 2,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventDetailDescriptionsContainer: {
    width: '100%',
    paddingHorizontal: gralSpacer * 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  eventRelatedContainer: {
    flex: 1,
    backgroundColor: colors.piLightGray,
    width: '100%',
    padding: gralSpacer * 2,
  },
  eventRelatedItemContainer: {
    width: '100%',
    height: gralSpacer * 5,
    marginBottom: gralSpacer,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventRelatedImageContainer: {
    width: gralSpacer * 7,
    height: gralSpacer * 5,
    overflow: 'hidden',
    backgroundColor: colors.piGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventRelatedImage: {
    flex: 1,
    height: gralSpacer * 5,
  },  
  eventRelatedTextContainer: {
    flex: 1,
    height: gralSpacer * 5,
    paddingHorizontal: gralSpacer,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
});



// Wishlist screens styles
export const wishlist = StyleSheet.create({
  wishlistList: {
    flex:1,
  },
  whislistFormContainer: {
    width: '100%',
    backgroundColor: colors.white,
    paddingHorizontal: gralSpacer * 2,
    paddingVertical: gralSpacer * 1.2,
  },
  whislistAlertContainer: {
    width: '100%',
    padding: gralSpacer * 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whislistWorkspaceContainer: {
    width: '100%',
    paddingVertical: gralSpacer * 0.8,
    paddingHorizontal: gralSpacer * 2,
  },
  whislistCameraPicture: {
    flex:1,
    alignSelf: 'stretch',
    position: 'relative',
    height: undefined,
    width: undefined,
    margin: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistProductItem: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    // Shadow Android
    elevation: 3,
    margin: 3,
    marginTop: 0,
    // Shadow IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  wishlistProductItemImageContainer:{
    width: '100%',
    height: gralSpacer * 7,
  }
});

// Spacers

export const spacers = StyleSheet.create({
  mt1: {
    marginTop: gralSpacer,
  },
  mt2: {
    marginTop: gralSpacer * 2,
  },
  mt4: {
    marginTop: gralSpacer * 4,
  },
  mt6: {
    marginTop: gralSpacer * 6,
  },

    mt8: {
    marginTop: gralSpacer * 8,
  },
  mb1: {
    marginBottom: gralSpacer,
  },
  mb2: {
    marginBottom: gralSpacer * 2,
  },
  mt0: {
    marginTop: 0,
  },
  pt1: {
    paddingTop: gralSpacer,
  },
  pt2: {
    paddingTop: gralSpacer * 2,
  },
  pb1: {
    paddingBottom: gralSpacer,
  },
  pb2: {
    paddingBottom: gralSpacer * 2,
  },
  pt0: {
    paddingTop: 0,
  }
});

export const htmlViewCss = StyleSheet.create({

  p:{
    margin: 0,
    padding: 0,
    textAlign: 'justify',
    fontFamily: fonts.lt,
    color: colors.piDarkGray, // make links coloured pink

  }

});


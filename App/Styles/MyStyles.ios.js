'use strict';

var React = require('react-native');

var {
  Dimensions,
  StyleSheet,
} = React;

var {height, width} = Dimensions.get('window');

// Variables de fuentes tipograficas
export const baseFontSize = 15
export const OpenSansFont = {
  OpenSansLight: 'OpenSans-Light',
  OpenSansLightItalic: 'OpenSansLight-Italic',
  OpenSansRegular: 'OpenSans',
  OpenSansItalic: 'OpenSans-Italic',
  OpenSansSemibold: 'OpenSans-Semibold',
  OpenSansSemiboldItalic: 'OpenSans-SemiboldItalic',
  OpenSansBold: 'OpenSans-Bold',
  OpenSansBoldItalic: 'OpenSans-BoldItalic',
  OpenSansExtraBold: 'OpenSans-Extrabold',
  OpenSansExtraBoldItalic: 'OpenSans-ExtraboldItalic',
}

// Variables Globales
const colors = {
  yellow: '#ffc700',
  facebook: '#3b5998',
  grey: '#ccc',
  lightgrey: '#f7f7f7',
  darkgrey: '#1a1a1a',
  orange: '#ff8d00',
  lightblue: '#00A2FF',
};
const barHeight = 60;
const borderRadius = 5;
var productCardWidth = (Dimensions.get('window').width - 52) / 2;

// Estilos
module.exports = StyleSheet.create({

  // HTML tags
  body: {
    flex: 1,
    position: 'relative',
  },
  h1: {
    fontSize: 20,
    textAlign: 'center',
  },
  h2: {
    fontSize: 18,
  },
  p: {
    marginVertical: 8,
    fontSize: 16,
    lineHeight: 18,
  },
  a: {
    paddingVertical: 8,
    fontSize: 16,
    color: colors.orange
  },
  strong: {
    fontWeight: 'bold',
  },
  inline: {
    flexDirection: 'row',
  },

  // Home
  home_container: {
    flex: 1,
    backgroundColor: colors.yellow,
  },
  home_scroll: {
    //marginTop: barHeight,
    flex: 1,
  },
  home_scroll_content: {
    paddingVertical: 20,
  },
  home_header: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -15,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  home_logo: {
    width: 80,
    height: 80,
    marginRight: 20,
    borderRadius: 6,
  },
  home_title: {
    marginTop: 8,
    color: '#000000',
    fontWeight: 'bold',
  },
  home_subtitle: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '100',
  },
  home_items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  home_item: {
    width: 120,
    marginBottom: 20,
    padding: 5,
  },
  home_button: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  home_button_img: {
    width: 100,
    height: 100,
  },
  home_button_text: {
    fontFamily: OpenSansFont.OpenSansRegular,
    fontSize: 13,
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    height: 35,
    color: "#1a1a1a",
  },

  // Menu
  menu: {
    paddingBottom: 10,
    backgroundColor: colors.yellow,
  },
  menuButton: {
    // 
  },
  avatarContainer: {
    // backgroundColor: 'green',
    marginBottom: 10,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.5)',
  },
  avatar: {
    flex: 1,
    alignSelf: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    textAlign: 'center',
  },
  menuLink: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    marginTop: 1,
    paddingHorizontal: 20,
    height: 60,
  },
  menuLinkText: {
    fontSize: 18,
  },
  // Background
  backgroundContainer: {
    flex:1,
    height: undefined,
    width: undefined,
    margin: 0,
    backgroundColor: 'transparent',
  },
  innerContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 30,
  },
  // Botones
  button: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 40,
    backgroundColor: colors.yellow,
    borderRadius: borderRadius,
    marginVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: OpenSansFont.OpenSansSemibold,
    color: colors.darkgrey,
  },
  buttonFB: {
    backgroundColor: colors.facebook,
  },
  buttonTextFB: {
    color: '#fff',
  },
  linkText: {
    paddingVertical: 8,
    fontSize: 16,
    color: colors.orange
  },
  // Inputs
  inputContainer: {
    alignSelf: 'stretch',
    height: 40,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: borderRadius,
  },
  inputIcon: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    height: 40,
    width: 40,
    margin: 0,
  },
  // Login
  logoGE: {
    alignSelf: 'center',
    width: 120,
    height: 26,
    marginBottom: 30,
  },
  skipLogin: {
    marginTop: 10,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: colors.grey,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.66)',
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: borderRadius,
  },
  modalContentScroll: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalImage: {
    marginBottom: 20,
    width: 80,
    height: 80,
  },
  modalTitle: {
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
    color: colors.darkgrey,
  },
  modalText: {
    marginVertical: 8,
    fontSize: 16,
    textAlign: 'center',
  },
  modalScroll: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: colors.lightgrey,
  },
  closeModal: {
    position: 'absolute',
    zIndex: 10,
    top: 10,
    right: 10,
  },
  closeModalIcon: {
    width: 48,
    height: 48,
  },
  ModalSelector: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: colors.lightgrey,
    borderRadius: borderRadius,
  },
  ModalSelectorIcon: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    right: 0,
    width: 50,
    height: 50,
  },
  modalInput: {
    alignSelf: 'stretch',
    height: 50,
    marginVertical: 10,
    backgroundColor: colors.lightgrey,
    borderRadius: borderRadius,
  },
  modalInputText:{
    alignSelf: 'stretch',
    height: 50,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: borderRadius,
  },
  // Card
  card: {
    flex:1,
    flexDirection: 'row',
    minHeight: 120,
    backgroundColor: '#fff',
    borderRadius: borderRadius,
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  cardVoucher: {
    flex:1,
    flexDirection: 'row',
    minHeight: 120,
    backgroundColor: '#fff',
    borderRadius: borderRadius,
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginBottom: 15,
  },
  cardImage: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
  },
  cardInfo: {
    flex: 5,
    padding: 10,
  },
  // Stores
  storesContainer: {
    flex: 1,
    //marginTop: barHeight,
    backgroundColor: colors.lightgrey,
  },
  vaucherImageCont: {
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    width: 120,
    height: 120,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeImage: {
    flex: 3,
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    width: 120,
    height: 120,
  },
  vaucherImage: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: 135,
    height: 135,
  },
  storeName: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    color: colors.darkgrey,
    fontFamily: OpenSansFont.OpenSansSemibold,
  },
  vaucherName: {
    marginBottom: 3,
    fontSize: 14,
    color: colors.darkgrey,
    fontFamily: OpenSansFont.OpenSansSemibold,
  },
  storeNameDetail: {
    fontSize: 22,
    color: colors.darkgrey,
    fontFamily: OpenSansFont.OpenSansRegular,
  },
  storeCategory: {
    marginBottom: 10,
    fontSize: 14,
    color: colors.grey,
    fontFamily: OpenSansFont.OpenSansLight,
  },
  vaucherDate: {
    marginBottom: 2,
    fontSize: 13,
    color: colors.grey,
    fontFamily: OpenSansFont.OpenSansLight,
  },
  storeBuilding: {
    fontSize: 14,
    color: colors.darkgrey,
    fontFamily: OpenSansFont.OpenSansRegular,
  },
  vauchersStateBad: {
    fontSize: 13,
    color: '#D60D14',
    fontFamily: OpenSansFont.OpenSansRegular,
  },
  vauchersStateGood: {
    fontSize: 13,
    color: '#32BD0B',
    fontFamily: OpenSansFont.OpenSansRegular,
  },
  storeLocal: {
    fontSize: 14,
    color: colors.yellow,
    fontFamily: OpenSansFont.OpenSansRegular,
  },
  categoryPicker: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
  categoryPickerIcon: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    right: 0,
    width: 50,
    height: 50,
  },
  storeList: {
    padding: 10,
  },
  favStore: {
    position: 'absolute',
    zIndex: 10,
    right: 0,
    bottom: 0,
    padding: 10,
  },
  favStoreIcon: {
    width: 40,
    height: 40,
  },
  promoStore: {
    position: 'absolute',
    top: -5,
    left: 10,
    zIndex: 4,
    elevation: 4,
  },
  // Store
  storeDetailContainer: {
    flex: 1,
    backgroundColor: colors.lightgrey,
  },
  storeLogo: {
    position: 'absolute',
    top: -40,
    right: 20,
    width: 80,
    height: 80,
    borderWidth: 4,
    borderColor: '#ffffff',
    borderRadius: 40,
    zIndex: 10,
  },
  storeDetailTabs: {
    flex:1,
  },
  storeDetailTab: {
    fontFamily: OpenSansFont.OpenSansSemibold,
    color: '#ff8d00',
  },
  storeDetailIndicator: {
    height: 4,
    backgroundColor: '#ff8d00',
  },
  storeDetailInfo: {
    padding: 10,
    paddingHorizontal: 20,
  },
  descriptionHeader: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative', 
    height: 30,
  },
  descriptionHeaderTitle: {
    color: '#1a1a1a',
    fontFamily: OpenSansFont.OpenSansSemibold,
    fontSize: 14,
  },
  productsHeaderTitle: {
    color: '#1a1a1a',
    fontFamily: OpenSansFont.OpenSansSemibold,
    fontSize: 14,
    marginLeft: '5%',
  },
  descriptionHeaderCategoryContainer: {
    backgroundColor: '#00a2ff',
    position: 'absolute', 
    borderRadius: 15,
    height: 30,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionHeaderCategoryText: {
    color: '#ffffff',
    fontFamily: OpenSansFont.OpenSansRegular,
    fontSize: 14,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  storeDetailSocial: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    paddingHorizontal: 90,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.grey,
  },
  storeDetailSocialBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  storeDetailText: {
    marginBottom: 10,
  },
  storeDetailTitle: {
    color: colors.darkgrey,
    fontFamily: OpenSansFont.OpenSansSemibold,
    fontSize: 14,
  },
  storeDetailInfoText: {
    color: colors.darkgrey,
    fontFamily: OpenSansFont.OpenSansLight,
    fontSize: 14,
    marginBottom: 15,
  },
  storeDetailLink: {
    fontSize: 16,
    lineHeight: 20,
    marginVertical: 10,
    color: colors.orange,
    fontFamily: OpenSansFont.OpenSansSemibold,
    backgroundColor: 'transparent',
  },
  // Product
  productList: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  productCard: {
    width: productCardWidth,
    backgroundColor: '#fff',
    borderRadius: borderRadius,
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  productImage: {
    flex: 1,
    width: productCardWidth,
    height: productCardWidth,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
  },
  productInfo: {
    justifyContent: 'center',
    height: 120,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: colors.lightgrey,
  },
  productName: {
    justifyContent: 'center',
    marginBottom: 5,
    height: 35,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 16,
    color: colors.darkgrey,
  },
  productPrice: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.darkgrey,
  },
  productWishlist: {
    position: 'absolute',
    zIndex: 4,
    elevation: 4,
    top: productCardWidth - 20,
    right: 15,
  },
  promoRibbon: {
    position: 'absolute',
    zIndex: 4,
    elevation: 4,
    top: -2,
    left: 0,
  },
  // Mapa
  mapa: {
    margin: 0,
  },
  
  // Profile
  profileHeader: {
    flex: 1,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 15,
    position: 'relative', 
  },
  takePhotoBtn: {
    backgroundColor: colors.yellow,
    width: 30,
    height: 30,
    position: 'absolute',
    top: 5,
    left: 65,
    justifyContent: 'center',
    alignItems: 'center', 
    zIndex: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  closePhotoBtn: {
    backgroundColor: '#ff0000',
    width: 25,
    height: 25,
    position: 'absolute',
    top: 5,
    left: 60,
    justifyContent: 'center',
    alignItems: 'center', 
    zIndex: 10,
    borderRadius: 13,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  takePhotoImg: {
    width: 15,
    height: 15,
  },
  closePhotoImg: {
    width: 11,
    height: 11,
  },
  photo: {
    alignSelf: 'stretch',
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'relative', 
  },
  profileUserInfoCont:{
    flex: 1,
    padding: 15,
    marginLeft: 15,
  },
  ProfileUserName:{
    fontFamily: OpenSansFont.OpenSansSemibold,
    color: colors.darkgrey,
    fontSize: 15,
  },
  ProfileUserLog:{
    fontFamily: OpenSansFont.OpenSansLight,
    color: colors.darkgrey,
    fontSize: 13,
  },
  label: {
    fontFamily: OpenSansFont.OpenSansLight,
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
    color: colors.darkgrey,
  },
  select: {
    flex: 1,
    justifyContent: 'center',
    height: 40,
    marginVertical: 5,
    paddingHorizontal: 12,
    backgroundColor: colors.lightgrey,
    borderRadius: borderRadius,
  },
  selectText: {
    fontSize: 15,
    fontFamily: OpenSansFont.OpenSansRegular,
    color: colors.darkgrey,
  },
  selectIcon: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    right: 0,
    width: 40,
    height: 40,
  },
  pInput: {
    flex: 1,
    justifyContent: 'center',
    height: 40,
    marginVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.lightgrey,
    borderRadius: borderRadius,
  },
  inputText:{
    fontSize: 15,
    fontFamily: OpenSansFont.OpenSansRegular,
    color: colors.darkgrey,
    backgroundColor: 'transparent',
    flex:1,
  },
  inputTextLogin:{
    fontSize: 15,
    fontFamily: OpenSansFont.OpenSansRegular,
    color: colors.darkgrey,
    paddingLeft: 45,
    borderRadius: borderRadius,
    flex: 1, 
  },
  pInputText: {
    fontSize: 16,
    fontFamily: OpenSansFont.OpenSansLight,
    backgroundColor: colors.lightgrey,
  },
  datePicker: {
    height: 40,
    backgroundColor: colors.lightgrey,
  },
  datePickerText: {
    backgroundColor: 'transparent',
  },
  
  // Boton impresionante
  btnImpGlobo: {
    backgroundColor: '#fff',
    padding: 10,
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  btnImpGloboTitleText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#1a1a1a',
    fontFamily: OpenSansFont.OpenSansRegular,
    paddingBottom: 5,
    backgroundColor: 'transparent',
  },
  btnImpGloboText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: OpenSansFont.OpenSansLight,
    backgroundColor: 'transparent',
  },
  btnImpGloboAfter: {
    alignSelf: 'center',
    elevation: 3,
    marginTop: -4,
  },
  btnImp: {
    alignSelf: 'center',
    marginVertical: 15,
  },
  btImpr_botonImp: {
    width: 240,
    height: 240,
  },
  btnAyuda: {
    position: 'absolute',
    zIndex: 10,
    right: 10,
    bottom: 10,
  },
  btnAyudaImg: {
    
  },
  btnGanador: {
    width: 300,
    height: 330,
  },
  // Ganadores
  dateContainer: {
    alignSelf: 'center',
    marginVertical: 15,
    height: 24,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  dateDayMonth: {
    fontSize: 16,
    fontFamily: OpenSansFont.OpenSansRegular,
    color: '#1a1a1a',
  },
  dateYear: {
    fontSize: 16,
    fontFamily: OpenSansFont.OpenSansLight,
    color: '#1a1a1a',
    paddingLeft: 10,
    marginLeft: 10,
  },
  winnerCard: {
    marginVertical: 5,
  },
  winnerAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  winnerStar: {
    position: 'absolute',
    zIndex: 10,
    top: 15,
    right: 15,
    width: 30,
    height: 30,
  },
  winnerStar2: {
    position: 'absolute',
    zIndex: 10,
    top: 15,
    right: 15,
    width: 64,
    height: 88,
  },
  winnerName: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    color: colors.darkgrey,
    fontFamily: OpenSansFont.OpenSansSemibold,
  },
  winnerPrize: {
    marginBottom: 5,
    fontSize: 14,
    fontFamily: OpenSansFont.OpenSansLight,
  },
  winnerWarn: {
    color: '#ff0048',
    fontFamily: OpenSansFont.OpenSansLight,
    fontSize: 14,
  },

  // Promociones
  promotionList: {
    flex:1,
    backgroundColor: '#fff',
  },
  promotionImage: {
    height: 240,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
  },
  promotionWishlist: {
    position: 'absolute',
    zIndex: 4,
    elevation: 4,
    top: 215,
    right: 20,
    width: 50,
    height: 50,
  },
  promotionInfo: {
    position: 'relative',
    padding: 20,
  },
  promotionIcon: {
    position: 'absolute',
    top: -32,
    right: 20,
    zIndex: 4,
    elevation: 4,
  },
  promotionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkgrey,
  },
  promotionStore: {
    fontSize: 16,
    color: colors.darkgrey,
  },

  // Noticias
  newsList: {
    flex:1,
    backgroundColor: '#fff',
  },
  newsItem: {
    flex: 1,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  newsHeader: {
    flex: 1,
    flexDirection: 'row',
  },
  newsInfo: {
    flex: 1,
  },
  newsImage: {
    width: 120,
    height: 120,
    backgroundColor: colors.lightgrey,
  },
  newsDate: {
    fontSize: 16,
    color: colors.yellow,
    fontFamily: OpenSansFont.OpenSansLight,
  },
  newsTitle: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 20,
  },
  newsTitleText: {
    color: colors.darkgrey,
    fontSize: 22,
    fontFamily: OpenSansFont.OpenSansRegular,
  },
  newsPreview: {
    paddingTop: 10,
  },
  newsPreviewText: {
    //fontSize: 16,
    //color: colors.darkgrey,
  },
  newsToDetail: {
    flex:1,
    alignItems: 'flex-end',
    marginTop: 10,
  },
  newsDetailContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  newsHero: {
   width: width,
      height: width / 1.89,
  },
  newsHeroTitle: {
    flex:1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'relative', 
  },
  newsGradient: {
    width: '100%',
    height: 160,
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 20,
  },
  newsHeroText: {
    fontSize: 30,
    fontFamily: OpenSansFont.OpenSansRegular,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  newsDetailDate: {
    height: 50,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  newsDetailDateText: {
    fontSize: 16,
    fontFamily: OpenSansFont.OpenSansRegular,
    color: colors.yellow,
    backgroundColor: 'transparent',
  },
  newsDetailInfo: {
    padding: 20,
    // paddingTop: 40,
  },

// Wishlist
 titleWishList: {
    fontFamily: OpenSansFont.OpenSansRegular,
    color: colors.darkgray,
    fontSize: 18,
    textAlign:'center',
    marginBottom:20,
  },
  textPhotoWishList: {
    flex:1,
    fontFamily: OpenSansFont.OpenSansRegular,
    color: colors.darkgray,
    fontSize: 15,
  },
  alertWishListText: {
    flex:1,
    fontFamily: OpenSansFont.OpenSansSemibold,
    color: colors.darkgray,
    fontSize: 16,
    textAlign: 'center',
  },
  wishlist: {
    flex:1,
    //marginTop: barHeight,
    backgroundColor: '#f5f5f5',
  },
  wishlist_instruction: {
    padding: 20,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 3,
  },
  wishlist_instruction_text: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.darkgrey,
  },
  wishlist_camera_instruction: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    padding:20,
    backgroundColor:"#ffffff",
    borderRadius:borderRadius,
    margin:5,
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  wishlist_categories_text: {
    flex: 1,
    height: 48,
    fontSize: 16,
    lineHeight: 20,
    padding: 14,
  },
  wishlist_bar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    // borderBottomColor: colors.grey,
    // borderBottomWidth: 1,
    // borderTopColor: colors.grey,
    // borderTopWidth: 1,
    borderRadius: borderRadius,
    zIndex: 0,
  },
  wishlist_bar_button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 49,
    borderLeftColor: "#f5f5f5",
    borderLeftWidth: 1,
  },
  wishlist_content: {
    flex: 1,
    padding: 10,
    paddingVertical:20,
  },
  wishlist_modal_product: {
    flexDirection:'row',
    marginVertical: 10,
    padding:20,
    borderColor: '#f5f5f5',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  wishlist_modal_name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  wishlist_modal_price: {
    fontSize: 16,
  },

  // Camera
  camera_container: {
    flex: 1,
    flexDirection: 'column',
    //marginTop: barHeight,
    backgroundColor: colors.lightgrey,
  },
  camera_image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:20,
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
  camera_picture: {
    flex:1,
    alignSelf: 'stretch',
    position: 'relative',
    height: undefined,
    width: undefined,
    margin: 0,
    backgroundColor: 'transparent',
  },
  camera_refresh_button: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1,
    elevation: 1,
  },
  camera_input: {
    marginVertical: 5,
    height: 48,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: borderRadius,
  },

  // Navigator
  navContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  navBar: {
    backgroundColor: '#ffc700',
    height: 64,
  },
  navBarTitle: {
    height: 64,
    paddingTop: 12,
  },
  navBarTitleText: {
    color: '#1a1a1a',
    fontSize: 16,
  },
  navBarLeftButton: {
    width:64,
    height: 64,
  },
  navBarRightButton: {
    width:64,
    height: 64,
  },
  scene: {
    flex: 1,
    paddingTop: 64,
  },

  // Nav
  navigationBar:{
    justifyContent:'center',
    alignItems:'center',
    height:60,
    paddingTop:15
  },
  picker:{
    height:20,
    marginBottom:10,
    paddingLeft:5
  },
  navtitle: {
    fontSize: 20,
    textAlignVertical:'bottom',
  },
  container: {
    alignItems: 'center',
    marginTop: 0,
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor:'white'
  },
  containerStoresContainer: {
    flex: 1,
    marginTop: 80
  },
  buttonBack: {
    height: 20,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  textInput:{
    marginTop: 10,
    padding: 10,
    height: 40,
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 5,
    width: 280
  },
  barTitle: {
    fontSize: 15
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  errorInput:{
    borderColor: 'red',
    borderWidth: 1
  },
  descriptionTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#1a1a1a',
    fontFamily: OpenSansFont.OpenSansRegular,
    paddingBottom: 5,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#1a1a1a',
    fontFamily: OpenSansFont.OpenSansLight,
  },
  imageStore:{
    alignSelf: 'stretch',
    alignItems:'center',
    height:150,
  },
  imageLogoStore:{
    width:80,
    height:80,
  },
  btImpr_botonHelp:{
    width:40,
    height:40,

  },
  listView:{
    marginBottom:80
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  tabViewCampaings: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f6fa',
  },
  CheckButton: {
    width:25,
    height:25 
  },
  item: {
    flexDirection: 'row',
  },
  line: {
    flex: 1,
    height: 0.1,
    backgroundColor: 'darkgray',
  },
  subtitle:{
    fontSize:12,
    marginBottom:5,
    marginTop:5,
  },
  scrollContainer:{
    flex:1, 
    paddingHorizontal: 25, 
    paddingVertical:20, 
    justifyContent:'space-around',
    backgroundColor: '#fff',
  },

  // Estilos para imagenes de campañas

  UserInfoImageCont:{
    backgroundColor: 'transparent',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
    width: 130,
    height: 130,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginRight: 15,
  },
  UserInfoImage: {
    width: 130,
    height: 130,
  },

  CampaingImageCont:{
    backgroundColor: 'transparent',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden', 
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  CampaingImage: {
    width: '100%',
    height: 159,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  CampaingTitle: {
    backgroundColor: 'green',
  }
});
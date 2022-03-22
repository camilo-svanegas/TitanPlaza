import { Dimensions, StyleSheet } from 'react-native';

var {height, width} = Dimensions.get('window'); 

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

// Colors
export const COLORS = {
  GeYellow: '#ffc700',
  GeOrange: '#ff8d00',
  GeBlueFacebook: '#3b5998',
  GeGralFont: '#1a1a1a',
  GeInputs: '#b2b2b2',
  White: '#FFFFFF',
}

const colors = {
  yellow: '#ffc700',
  facebook: '#3b5998',
  grey: '#ccc',
  lightgrey: '#f7f7f7',
  darkgrey: '#1a1a1a',
  orange: '#ff8d00',
  lightblue: '#00A2FF',
  piPurple: '#903392',
};

// Styles for splash
export const SPLASH = StyleSheet.create({
  splashWrapper: {
  	backgroundColor: COLORS.GeYellow,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  splashImage: {
  	width: 220,
  	height: 220,
  }
});

// Styles for login flux
export const LOGIN = StyleSheet.create({
    loginWrapper: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center', 
    },
    loginLogo: {
      width: 135,
      height: 31,
      marginTop: 25,
    },
    loginFacebookButton: {
      height: 40,
      width: '100%',
      backgroundColor: COLORS.GeBlueFacebook,
      borderRadius: 3,
      flexDirection: 'row',
      alignItems: 'center',
    },
    loginIcon: {
      width: 40,
      height: 40,
    },
    loginFacebookLink: {
      backgroundColor: 'transparent',
      color: COLORS.White,
      fontFamily: OpenSansFont.OpenSansSemibold,
      fontStyle: 'normal',
      fontSize: baseFontSize,
      flex: 1,
      textAlign: 'center',
    },
    loginSepText: {
      marginVertical: 30,
      backgroundColor: 'transparent',
      color: COLORS.GeGralFont,
      fontFamily: OpenSansFont.OpenSansRegular,
    },
    loginFormContent: {
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center', 
      marginBottom: 20, 
    },
    loginFormCenter: {
      flex: 1,
    },
    fieldContainer: {
      height: 40,
      width: '100%',
      backgroundColor: COLORS.White,
      borderRadius: 3,
      flexDirection: 'row',
      alignItems: 'center', 
      marginVertical: 5, 
    },
    fieldIcon: {
      width: 40,
      height: 40,
    },
    fieldInput: {
      backgroundColor: 'transparent',
      color: COLORS.GeInputs,
      fontFamily: OpenSansFont.OpenSansLight,
      flex: 1,
      textAlign: 'left', 
    },
    loginFormLinkContent: {
      width: '100%',
      height: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
      flexDirection: 'row', 
    },
    loginFormLink: {
      backgroundColor: 'transparent',
      color: COLORS.GeOrange,
      fontFamily: OpenSansFont.OpenSansRegular,
      flex: 1,
      textAlign: 'right',
    },
    loginFormButton: {
      height: 40,
      width: '100%',
      backgroundColor: COLORS.GeYellow,
      borderRadius: 3,
      marginVertical: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    loginFormInnerButton: {
      marginTop: 25,
    },
    loginFormButtonLink: {
      backgroundColor: 'transparent',
      color: COLORS.GeGralFont,
      fontFamily: OpenSansFont.OpenSansSemibold,
      fontStyle: 'normal',
      fontSize: baseFontSize * 1.05,
      flex: 1,
      textAlign: 'center',
    },
    loginRegText: {
      marginTop: 15,
      backgroundColor: 'transparent',
      color: COLORS.GeGralFont,
    },
    RegLinkContent: {
      width: '80%',
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row', 
      marginBottom: 20,
    },
    RegLink: {
      backgroundColor: 'transparent',
      color: COLORS.GeOrange,
      fontFamily: OpenSansFont.OpenSansSemibold,
      flex: 1,
      textAlign: 'center',
    },
    Spacer:{
      flex: 1,
    },
    ButtonBottonLink: {
      width: '100%',
      borderTopColor: '#d5d4d4',
      borderTopWidth: 2,
      height: 50,
      bottom: 0, 
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    ButtonBottonLinkText: {
      backgroundColor: 'transparent',
      color: COLORS.GeGralFont,
      fontFamily: OpenSansFont.OpenSansSemibold,
      flex: 1,
      textAlign: 'center',
      fontSize: baseFontSize * 1.2,
    },
    RecoveryTitleText:{
      fontSize: 19,
      backgroundColor: 'transparent',
      color: COLORS.GeGralFont,
      fontFamily: OpenSansFont.OpenSansSemibold,
      textAlign: 'center',
    },
    RecoveryCopyText:{
      fontSize: 16,
      backgroundColor: 'transparent',
      color: COLORS.GeGralFont,
      fontFamily: OpenSansFont.OpenSansLight,
      textAlign: 'center',
      marginVertical: 30,
    },
});

// Styles for Home and drawer menu
export const HOME = StyleSheet.create({
    menuGridContainer: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      alignItems: 'center', 
      width: '100%',
      paddingTop: 25,
    },
    menuGrid: {
      flex: 1, 
    },
    itemsGrid: {
      width: '100%', 
      flexDirection: 'row',
    },
    alertIndicator: {
      backgroundColor: COLORS.GeOrange,
      width: 25,
      height: 25,
      borderRadius: 13,
      position: 'absolute', 
      right: 0,
      top: 0,
      justifyContent: 'center',
      alignItems: 'center', 
    },
    alertText:{
      color: COLORS.White,
      fontFamily: OpenSansFont.OpenSansSemibold,
      fontSize: 16,
    },
    menuImage:{
      width: 35,
      height: 35,
    },
    menuText:{
      color: COLORS.GeGralFont,
      fontFamily: OpenSansFont.OpenSansRegular,
      fontSize: 13,
      width: '100%',
      textAlign: 'center',
      backgroundColor: 'transparent',
      marginTop: 10,
      alignItems: 'flex-start',
      height: 40,
    },
    staticBanerContainer: {
      width: '100%',
      height: 'auto',
      marginTop: 10,
    },
    banerImage: {
      width: width,
      height: width / 1.8,
    },
    newsCarousel: {
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    newsSliderContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    newsSliderImage: {
      width: width,
      height: width / 1.89,
    },
    newsSliderTextContainer: {
      position: 'absolute',
      top: 25,
      width: '90%',
      height: 'auto',
    },
    newsDateText: {
      color: COLORS.GeYellow,
      width: '100%',
      textAlign: 'center',
      paddingVertical: 5,
      fontFamily: OpenSansFont.OpenSansLight,
      fontSize: 13,
      backgroundColor: 'transparent'
    },
    newsTitleText: {
      color: COLORS.White,
      width: '100%',
      textAlign: 'center',
      paddingVertical: 5,
      fontFamily: OpenSansFont.OpenSansRegular,
      fontSize: 20,
      backgroundColor: 'transparent'
    },
    newsCopyText: {
      color: COLORS.White,
      width: '100%',
      textAlign: 'center',
      paddingVertical: 10,
      fontFamily: OpenSansFont.OpenSansLight,
      fontSize: 13,
      backgroundColor: 'transparent'
    },
    iconStackLeft: {
      width: 40,
      height: 40,
      marginLeft: 10,
    },
    iconStackRight: {
      width: 40,
      height: 40,
      marginRight: 10,
    },
});

// Styles for Home and drawer menu
export const MENU = StyleSheet.create({
    menu: {
      flex: 1,
      backgroundColor: '#f7f7f7',
    },
    user: {
      padding: 20,
      paddingHorizontal: 40,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    userLogHeader: {
      paddingTop: 0,
      paddingBottom: 20,
      paddingHorizontal: 40,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    menu_logo: {
      width: 120,
      height: 28,
      alignSelf: 'center',
      marginTop: 20,
      marginBottom: 20,
    },
    user_login: {
      fontFamily: OpenSansFont.OpenSansSemibold,
      marginTop:20,
      alignSelf: 'stretch',
      padding: 10,
      textAlign: 'center',
      backgroundColor: '#ffc700',
      color: '#1a1a1a',
      borderRadius: 5,
      fontSize: 14,
    },
    user_avatar: {
      alignSelf: 'center',
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    user_name: {
      fontSize: 20,
      textAlign: 'center',
      marginVertical: 5,
      color: '#1a1a1a',
      fontFamily: OpenSansFont.OpenSansRegular,
    },
    menuItem: {
      justifyContent: 'center',
      marginTop: 1,
      paddingHorizontal: 25,
      height: 40,
    },
    menuItemImg: {
      width: 25,
      height: 25,
    },
    menuItemText: {
      width: 200,
      paddingLeft: 20,
      fontFamily: OpenSansFont.OpenSansRegular,
      textAlign: 'left',
      fontSize: 14,
      fontWeight: 'normal',
      color: '#1a1a1a',
    },
    logHeadCont: {
      width: '95%',
      flexDirection: 'row', 
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:15,
      alignSelf: 'center',
    },
    profileNativeButton: {
      width: '15%',
      height: 'auto',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    sep: {
      width: '15%',
    },
    geImgCont: {
      width: '70%',
      height: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
    },
});


// Styles for home and drawer menu
export const FILTER = StyleSheet.create({
    filterContainer: {
      backgroundColor: '#ffffff',
      width: '100%',
      height: 50,
      borderBottomWidth: 1,
      borderBottomColor: '#d1d3d4',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',  
    },
    filterPicker: {
      flex: 1,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row', 
    },
    filterPickerText: {
      fontFamily: OpenSansFont.OpenSansRegular,
      fontSize: 16,
      color: COLORS.GeGralFont,
    },
    filterPickerIcon: {
      width: 50,
      height: 50,
      marginLeft: 10,
    },
    filterOrderIcon: {
      width: 25,
      height: 25,
      marginRight: 15,
    },
    searchContainer: {
      width: 50,
      height: 50,
      borderLeftColor: '#d1d3d4',
      borderLeftWidth: 1,
    },
   orderContainer: {
      width: 50,
      height: 50,
      borderRightColor: '#d1d3d4',
      borderRightWidth: 1,
    },
    searchButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
    },
    searchImage: {
      width: 35,
      height: 35,
    },
    categoryListContainer: {
      backgroundColor: COLORS.White,
      position: 'absolute',
      flex: 1,
      top: 50,
      bottom: 0,
      left: 0,
      right: 0,
    },
    categoryItem: {
      width: '100%',
      paddingVertical: 12,
      paddingHorizontal: 60,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row', 
    },
    categoryIcon: {
      width: 30,
      height: 30,
      marginRight: 20,
    },
    categoryText: {
      flex: 1,
      fontFamily: OpenSansFont.OpenSansRegular,
      fontSize: 16,
      color: COLORS.GeGralFont,
    },
});

export const BILLS = StyleSheet.create({
    Bills: {
      padding: 20,
      paddingTop: 30,
      marginVertical: 20,
      borderTopWidth: 2,
      borderColor: '#E6E6E6'
    },
    BillsContainer:{
      marginVertical: 20,
    },
    BillsCard: {
      backgroundColor: 'white',
      height: 133,
      borderRadius: 10,
      // Shadow android
      elevation: 2,
      margin: 2,
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


// Styles for campaings
export const CAMPAINGS = StyleSheet.create({
    CRMContainer: {
      backgroundColor: 'transparent',
      width: '100%',
      padding: 30, 
      borderBottomColor: '#dddfe6',
      borderBottomWidth: 1,
    },
    UserInfoContainer: {
      backgroundColor: '#ffffff',
      width: '100%',
      borderRadius: 10,
      flexDirection: 'row',
      // Shadow android
      elevation: 2,
      margin: 2,
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

    UserInfo: {
      height: 100,
      paddingTop: 15,
      flex: 1,
    },

    UserTextCont: {
      backgroundColor: 'transparent',
      width: '100%',
      height: 65,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    UserGralFont: {
      backgroundColor: 'transparent',
      backgroundColor: 'transparent',
      color: COLORS.GeGralFont,
      fontFamily: OpenSansFont.OpenSansLight,
      fontStyle: 'normal',
      fontSize: baseFontSize * 0.9,
      padding: 0,
      margin: 0,
    },
    UserStrongFont: {
      backgroundColor: 'transparent',
      fontFamily: OpenSansFont.OpenSansBold,
    },
    UserPointsFont: {
      backgroundColor: 'transparent',
      fontFamily: OpenSansFont.OpenSansBold,
      color: COLORS.GeOrange,
      marginLeft: 5,
    },

    UserLink: {
      backgroundColor: 'transparent',
      marginTop: 5,
      paddingVertical: 10,
    },
    UserLinkText: {
      backgroundColor: 'transparent',
      color: COLORS.GeYellow,
      fontFamily: OpenSansFont.OpenSansSemibold,
    },

    TitleCont: {
      width: '100%',
      paddingHorizontal: 30,
      paddingVertical: 15, 
    },
    TitleFont: {
      backgroundColor: 'transparent',
      fontFamily: OpenSansFont.OpenSansBold,
      color: '#A1A4B3',
    },

    CampaingsListCont: {
      borderRightColor: '#000000',
      flex: 1,
      paddingHorizontal: 30,
    },

    CampeingContainer: {
      borderColor:'transparent',
      borderWidth:1,
      height: '100%',
      alignItems: 'center',
      // marginRight: -20,
      paddingVertical: 20,
      paddingHorizontal: 10,
      flex: 2,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    CampeingCard: {
      backgroundColor: '#FFFFFF',
      width: '100%',
      maxWidth: 180,
      height: 234,
      // margin: 10,
      borderRadius: 10,
      // Shadow android
      elevation: 2,
      // Shadow IOS
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    CampeingImg: {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      height: '70%',
    },
    CampeingTitle: {
      padding: 20,
    },


    CampaingCont: {
      width: '44%',
      height: 234,
      marginHorizontal: 10,
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      marginBottom: 15,
      // Shadow android
      elevation: 2,
      margin: 2,
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

    CampaingTextCont: {
      paddingHorizontal: 30,
      paddingVertical: 10,
    },
    CampaingTitle: {
      backgroundColor: 'green',
    },
    TitleCampaing: {
      color: colors.piPurple,
      fontSize: 20,
      paddingHorizontal: 20,
      paddingVertical: 30,
      fontWeight: '500',
    },
    DescriptionCampaing: {
      padding: 20,
      paddingTop: 0,
    },
    DateContainer: {
      flexDirection: 'row',
      padding: 20,
      paddingTop: 0,
    },
    addBill: {
      margin: 20,
      marginTop: 0,
      marginBottom: 20,
      width: '90%',
    },
    cameraButton: {
      paddingRight: 30
    },
    CampaingCounter:{
      backgroundColor: COLORS.GeOrange,
      width: '100%',
      height: 50,
      paddingHorizontal: 30,
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingTop: 13,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      marginTop: 5,
    },
    CounterIcon: {
      width: 25,
      height: 25,
      marginRight: 10,
    },
    CounterText: {
      backgroundColor: 'transparent',
      color: '#FFFFFF',
      fontFamily: OpenSansFont.OpenSansSemibold,
      fontSize: baseFontSize * 1.05,
    },
    DetailHeaderImageCont: {
      margin: 20,
      height: 335,
      borderRadius: 10,
    },
    PhotoButtonsCont: {
      backgroundColor: 'white',
      width: '100%',
      borderRadius: 10,
      paddingVertical: 20,
      paddingHorizontal: 30,
      // top: -10,
      left: -3,
      // Shadow android
      elevation: 2,
      margin: 2,
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
    PhotoButtonsContTitle: {
      fontFamily: OpenSansFont.OpenSansBold,
      color: '#A1A4B3',
      fontSize: baseFontSize * 1.05,
      paddingBottom: 15,
      textAlign: 'center',
      width: '100%',
      flexDirection: 'column',
    },
    Separator: {
      width: '100%',
      height: 2,
      backgroundColor: '#EBEDF5',
    },
    ButtonsCont: {
      width: '100%',
      flexDirection: 'row',
      marginTop: 15,
    },
    Button: {
      width: '50%',
      marginVertical: 15,
      paddingVertical: 5,
      paddingHorizontal: 15,
      minHeight: 100,
      alignItems: 'center',
      flexDirection: 'column',
    },
    ButtonIcon:{
      width: 100,
      height: 100,
    },
    ButtonText: {
      backgroundColor: 'transparent',
      fontFamily: OpenSansFont.OpenSansRegular,
      color: COLORS.GeGralFont,
      fontSize: baseFontSize * 1.03,
      paddingTop: 10,
      textAlign: 'center',
      width: '100%',
    },

    CampaingInfoCont: {
      width: '80%',
      marginHorizontal: '10%',
      marginVertical: 30,
      alignItems: 'flex-start',
      flexDirection: 'column',
    },
    CampaingInfoTitle: {
      backgroundColor: 'transparent',
      fontFamily: OpenSansFont.OpenSansSemibold,
      color: COLORS.GeGralFont,
      fontSize: baseFontSize,
      paddingBottom: 15,
      textAlign: 'left',
      width: '100%',
    },
    CampaingInfoDescription: {
      backgroundColor: 'transparent',
      fontFamily: OpenSansFont.OpenSansLight,
      color: COLORS.GeGralFont,
      fontSize: baseFontSize  * 0.9,
      paddingBottom: 15,
      textAlign: 'left',
      maxWidth: 200,
      width: 'auto',
      flexWrap: "wrap"
    },
    CampaingInfoDescriptionFull: {
      backgroundColor: 'transparent',
      fontFamily: OpenSansFont.OpenSansLight,
      color: COLORS.GeGralFont,
      fontSize: baseFontSize  * 0.9,
      paddingBottom: 15,
      textAlign: 'left',
      maxWidth: '100%',
      width: 'auto',
      flexWrap: "wrap"
    },
    DescStrong: {
      fontFamily: OpenSansFont.OpenSansBold,
      marginRight: 5,
    },

    CRMHeaderCont: {
      width: '100%',
      height: 280,
      position: 'relative',
      alignItems: 'center',
    },
    CRMProfileHeaderInfo: {
      width: '80%',
      height: 'auto',
      position: 'absolute',
      bottom: 40,
      marginHorizontal: 'auto',
      marginVertical: 0,
      alignItems: 'center',
    },
    ProfileUser: {
      backgroundColor: 'transparent',
      fontFamily: OpenSansFont.OpenSansBold,
      color: COLORS.GeGralFont,
      fontSize: baseFontSize * 1.08,
      paddingBottom: 25,
    },

    VaucherCont: {
      paddingVertical: 30,
      flex: 1,
      backgroundColor: '#ffffff',
    },

    VaucherRegisterCont: {
      paddingVertical: 30,
      flex: 1,
      backgroundColor: '#A1A4B3',
    },
    VaucherFormCont: {
      backgroundColor: '#FFFFFF',
      width: '80%',
      borderRadius: 10,
      marginHorizontal: '10%',
      marginBottom: 10,
      paddingHorizontal: 30,
      paddingTop: 30,
      alignItems: 'center',
      position: 'relative',
      // Shadow android
      elevation: 2,
      margin: 2,
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
    VaucherImageCont:{
      width: '100%',
      height: 263,
      backgroundColor: 'transparent',
      position: 'relative',
    },
    VaucherImage: {
      width: '100%',
      height: 240,
      borderRadius: 8,
    },
    ButtonReload: {
      width: 44,
      height: 46,
      position: 'absolute',
      bottom: 0,
      right: 15,
      zIndex: 10,
    },
    ButtonReloadIcon: {
      width: 44,
      height: 46,
    },

    FormCont: {
      width: '100%',
      paddingVertical: 10,
    },
    VaucherInputCont: {
      width: '100%',
      backgroundColor: '#F5F6FA',
      borderRadius: 5,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      height: 45,
      alignSelf: 'stretch',
      marginBottom: 10,
    },
    VaucherInput: {
      backgroundColor: 'transparent',
      flex: 1,
      alignItems: 'flex-start',
      fontSize: 13,
      fontFamily: OpenSansFont.OpenSansRegular,
      color: colors.darkgrey,
      padding: 0,
      height: 30,
    },
    VaucherInputSideBtn: {
      width: 25,
      height: 25,
      backgroundColor: 'transparent',
    },
    VaucherInputSideBtnImg: {
      width: 25,
      height: 25,
    },
    VaucherSubmit: {
      width: '80%',
      marginHorizontal: '10%',
      marginTop: 20,
      marginBottom: 10,
    },
    VaucherSubmitGray: {
      width: '80%',
      marginHorizontal: '10%',
      backgroundColor: '#EBEDF5',
      marginBottom: 70,
    },

    VaucherDetailCont: {
      width: '80%',
      marginHorizontal: '10%',
      alignItems: 'center',
    },
    VaucherFloatIcon: {
      width: 65,
      height: 65,
    },
    VaucherFloatIconImg: {
      width: 65,
      height: 65,
    },
    VaucherHeader: {
      width: '100%',
      height: 97,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    VaucherHeaderImg: {
      width: '100%',
      height: 97,
      justifyContent: 'flex-start',
      resizeMode: 'contain',
    },
    VaucherDetailTitleCont: {
      width: '100%',
      alignItems: 'center',
      paddingTop: 5,
      backgroundColor: '#FFFFFF',
      marginTop: -10,
    },
    VaucherInfoCont: {
      width: '100%',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
    },
    VaucherInfoRow: {
      width: '50%',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#FFFFFF',
      flexDirection: 'column',
    },
    VaucherPick: {
      width: '100%',
      height: 100,
      borderRadius: 8,
    },
    VaucherInfoLight: {
      color: colors.darkgrey,
      fontFamily: OpenSansFont.OpenSansLightç,
      fontSize: baseFontSize * 0.6,
    },
    VaucherInfoStrong: {
      color: COLORS.GeGralFont,
      fontFamily: OpenSansFont.OpenSansSemibold,
      fontSize: baseFontSize * 0.7,
      marginBottom: 10,
    },
    VaucherTitle: {
      color: COLORS.GeGralFont,
      fontFamily: OpenSansFont.OpenSansSemibold,
      fontSize: baseFontSize * 1.1,
      marginBottom: 30,
    },
    VaucherSubtitle: {
      color: COLORS.GeGralFont,
      fontFamily: OpenSansFont.OpenSansLight,
      fontSize: baseFontSize,
      marginBottom: 15,
      textAlign: 'center',
    },
    VaucherSepCont: {
      width: '100%',
      height: 16 ,
      bottom: 0,
    },
    VaucherSepContImg: {
      width: '100%',
      height: 16,
    },

    MyVouchersListCont: {
      width: '100%',
      padding: 30,
    },
    VouchersDetailImgCont: {
      width: '80%',
      marginHorizontal: '10%',
      marginTop: 30,
      height: 250,
      borderRadius: 10,
      overflow: 'hidden',
    },
    VouchersDetailImg: {
      width: '100%',
      height: 250,
      borderRadius: 10,
    },

    VaucherSelected: {
      backgroundColor :COLORS.GeYellow,
      width: '100%',
      borderRadius: 5,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      height: 45,
      alignSelf: 'stretch',
      marginBottom: 10,
    }

});
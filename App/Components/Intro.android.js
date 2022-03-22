import React, { Component } from 'react'; 
import {PropTypes} from 'prop-types';
 
import PrincipalNav from './PrincipalNav.js';

import SplashScreen from 'react-native-splash-screen'

export default class Intro extends Component { 
	constructor(props, context) { 
		super(props, context); 
	} 

	componentDidMount() {

		setTimeout(()=>{
            SplashScreen.hide();
		}, 	1000);

	}

	render() { 
		return (
			<PrincipalNav />
		);
	} 
}

module.exports = Intro;
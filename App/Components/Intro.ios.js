import React, { Component } from 'react'; 
import {PropTypes} from 'prop-types';
 

import PrincipalNav from './PrincipalNav.js';

export default class Intro extends Component { 
	constructor(props, context) { 
		super(props, context); 
	} 

	render() { 
		return (
			<PrincipalNav />
		);
	} 
}

module.exports = Intro;
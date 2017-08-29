import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import uuid from 'node-uuid';

import io from 'socket.io-client';
export const socket = io(); 

// socket.on('news', function (data) {
// 	console.log(data);
// 	socket.emit('my other event', { my: 'data' });
// });


class MainApp extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		return (
			<div className='cardFlex fullWidth fullHeight'>
				{'TETRIS'}
			</div>

		);
	}
}

export default MainApp;
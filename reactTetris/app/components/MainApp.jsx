import React from 'react';
import uuid from 'node-uuid';


class MainApp extends React.Component {

	constructor(props) {
		super(props);
		var mapa = [];
		for(var i = 0; i < 21; i++) {
			var buf = [];
			for(var j = 0; j < 10; j++) {
				if(i == 20) {
					buf.push(1);
				} else {
					buf.push(0);
				}
			}
			mapa = [...mapa, [...buf]];
		}
		this.state = {
			mapa,
		}
	}

	// 20 * 10	


	render() {
		var {mapa} = this.state;
		var renderMapa = () => {
			return mapa.map((row) => {
				return (<div key={uuid()} className='cardGap cardFlex'>
					{row.map((elem) => {
						var style = elem == 0 ? '#f00' : '#00f';
						return (<div key={uuid()} className='cardGap' style={{backgroundColor:style}} >
							1
						</div>)
					})}
					</div>)
			})
		}
		return (
			<div className='cardFlex fullWidth fullHeight'>
				<div className='cardGap'></div>
				<div className='cardGap3 cardFlex columnOrder centerFlex'>
					<div className='cardGap'>
						<h1>{'TETRIS'}</h1>
					</div>
					<div className='cardGap5 cardFlex columnOrder'>
						{renderMapa()}
					</div>
					<div className='cardGap'>
						
					</div>
				</div>
				<div className='cardGap'></div>
			</div>

		);
	}
}

export default MainApp;
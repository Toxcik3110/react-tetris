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
			figure: {
				x:0,
				y:0,
				type:0,
			}
		}
		console.log(mapa)
		this.checkLine = this.checkLine.bind(this);
		var key = undefined;
		document.body.addEventListener('keydown', (e) => {
			key = e.key;
		});
		document.body.addEventListener('keyup', (e) => {
			key = undefined;
		});
		var timeSpeed = 100;
		var figure = undefined;
		var figurePos = [0,0];
		var figureRot = 0;
		var interv = setInterval(()=> {
			var mapa = this.state.mapa;
			// var position = [...this.state.mapaPosition];
			var deltax = 0;
			var deltay = 0;
			var flag = true;
			timeSpeed = 100;
			switch(key) {
				case 'ArrowRight':
					deltax = 1;
					break;
				case 'ArrowLeft':
					if(figurePos[1] > 0)
					deltax = -1;
					break;
				case 'ArrowDown':
					timeSpeed = 10;
					break;
				case 'ArrowUp':
					flag = false;
					//rotate figure
					if(figureRot < 3) figureRot++;
					else figureRot = 0;
					reRenderFigure();
					break;
				default:
					flag = false;
					break;
			}
			if(flag) {
				// this.setState({
				// 	mapaPosition:[position[0]+deltax,position[1]+deltay]
				// })
			}
			var reRenderFigure = () => {

			}
			if(figure === undefined) {
				// regenerate new figure:
				// square, T, line, Z, reverse Z, Г, reverse Г - 7 figures
				figure = Math.floor(Math.random()*1);
				figurePos = [0, 5]; //start on [0,10]
				figureRot = 0;
				console.log('generate')
			} else {
				console.log('render')
				switch(figure) {
					case 0: // square
						switch(figureRot) {
							case 0:
							case 1:
							case 2:
							case 3://render same way in different rotation cases
							case 4:
								if(figurePos[0] > 0) { //clear figure on previous location
									mapa[figurePos[0]][figurePos[1]] = 0;
									mapa[figurePos[0]-1][figurePos[1]] = 0;
									mapa[figurePos[0]][figurePos[1]+1] = 0;
									mapa[figurePos[0]-1][figurePos[1]+1] = 0;	
								}
								//fill lines with figure
								// debugger
								mapa[figurePos[0]][figurePos[1]] += 1;
								mapa[figurePos[0]+1][figurePos[1]] += 1;
								mapa[figurePos[0]][figurePos[1]+1] += 1;
								mapa[figurePos[0]+1][figurePos[1]+1] += 1;
								figurePos[0]++;
								if(deltax > 0) {
									if(figurePos[1] < mapa.length - 1) {
										figurePos[1] += deltax;
									}
								} else {
									figurePos[1] += deltax;
								}
								if(mapa[figurePos[0]+1][figurePos[1]] === 1
									|| mapa[figurePos[0]+1][figurePos[1]+1] === 1) {
									figure = undefined;
								}
								break;
						}
						break;
				}
				// move it down, untill it reach [1] element that below figure

			}
			this.setState({
				mapa
			})
		}, timeSpeed);
	}

	// 20 * 10	

	checkLine(N, arr) {
		var flag = true; //check if current line full of blocks
		for(var i = 0; i < 10; i++) {
			if(arr[N][i] === 0) {
				flag = false;
			}
		}

		if(flag) { //if line full of blocks, then CUT and COPY from above line recursively and PASTE to current
			for(var i = N; i > 0; i--) {
				for(var j = 0; j < 10; j++) {
					if(i == N) {
						arr[i][j] = 0;
					} else {
						arr[i][j] = arr[i-1][j];
					}
				}
			}
			this.setState({
				mapa: [...arr],
			})
		}
	}


	render() {
		var {mapa} = this.state;
		var renderMapa = () => {
			return mapa.map((row) => {
				return (<div key={uuid()} className='cardGap cardFlex width100 height100'>
					{row.map((elem) => {
						var style = elem == 0 ? '#000' : '#00f';
						return (<div key={uuid()} className='cardGap width100 height100' style={{backgroundColor:style}} >
							
						</div>)
					})}
					</div>)
			})
		}
		return (
			<div className='cardFlex fullWidth fullHeight'>
				<div className='cardGap'></div>
				<div className='cardGap3 cardFlex columnOrder centerFlex'>
					
					<div style={{fontSize:'0.1em'}} className='cardGap5 cardFlex columnOrder width100 height100'>
						{renderMapa()}
					</div>
				</div>
				<div className='cardGap'></div>
			</div>

		);
	}
}

export default MainApp;
import Phaser from 'phaser'

import Preloader from './scenes/Preloader'
import Game from './scenes/Game'
import GameOver from './scenes/GameOver'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	dom: {
		createContainer: true
	},
	physics: {
		default: 'matter',
		matter: {
			gravity: { y: 0 },
			setBounds: {
				left: true,
				right: true,
				top: true,
				bottom: false
			}
		}
	},
	scene: [Preloader, Game, GameOver]
}

export default new Phaser.Game(config)

import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader')
    }

    preload() {
        this.load.image('ball', 'assets/corn.png')
        this.load.image('paddle', 'assets/paddle.png')
        this.load.image('cow', 'assets/cow.png')

        this.load.tilemapTiledJSON('level1', 'levels/level1.json')
    }

    create() {
        this.scene.start('game')
    }
}
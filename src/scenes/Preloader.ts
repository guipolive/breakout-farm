import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader')
    }

    preload() {
        this.load.image('ball', 'assets/milk.png')
        this.load.image('paddle', 'assets/paddle.png')
        this.load.image('cow', 'assets/cow.png')
        this.load.image('chicken', 'assets/chicken.png')

        this.load.tilemapTiledJSON('level1', 'levels/level1.json')
        this.load.tilemapTiledJSON('level2', 'levels/level2.json')

        this.load.audio('tone1', 'assets/tone1.wav')
        this.load.audio('level1win', 'assets/level1win.wav')
        this.load.audio('level1lost', 'assets/level1lost.wav')
    }

    create() {
        this.scene.start('game', { level: 1 })
    }
}
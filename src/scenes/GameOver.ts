import Phaser from 'phaser'

export default class GameOver extends Phaser.Scene {
    constructor() {
        super('game-over')
    }

    create(data: {title: string, bgColor?: string}) {
        const { width, height } = this.scale
        this.add.text(width * 0.5, height * 0.5, data.title, {
            fontSize: '48px',
            color: '#fff',
            backgroundColor: data.bgColor ?? '#D82727',
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            }
        })
        .setOrigin(0.5, 0.5)
    }
}
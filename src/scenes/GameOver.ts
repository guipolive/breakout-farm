import Phaser from 'phaser'

// import { primaryButton } from '../ui/Button'

export default class GameOver extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private isWin!: boolean
    private level!: number

    constructor() {
        super('game-over')
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create(data: {title: string, bgColor?: string, win: boolean, level: number, description: string}) {
        const { width, height } = this.scale
        this.add.text(width * 0.5, height * 0.3, data.title, {
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
        .setOrigin(0.5, 0.4)
        
        this.add.text(width * 0.5, height * 0.6, data.description ?? 'Pressione ESPAÇO para jogar novamente', {
            fontSize: '24px',
            color: '#fff',
            backgroundColor: '#fc7303',
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            }
        })
        .setOrigin(0.5, 0.4)

        this.isWin = data.win!
        this.level = data.level
    }

    update () {
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(this.cursors.space!)
        
        if (isSpaceJustDown) {
            if (this.isWin)
                this.scene.start('game', { level: this.level + 1 })
            else
                this.scene.start('game', { level: this.level })
        }
    }
}
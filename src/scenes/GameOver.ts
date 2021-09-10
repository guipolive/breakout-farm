import Phaser from 'phaser'

// import { primaryButton } from '../ui/Button'

export default class GameOver extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private isWin!: boolean

    constructor() {
        super('game-over')
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create(data: {title: string, bgColor?: string, win: boolean}) {
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
        .setOrigin(0.5, 0.4)

        this.isWin = data.win!;

        // const button = primaryButton('Tentar novamente') as HTMLElement
        // this.add.dom(width * 0.5, height * 0.6, button)
    }

    update () {
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(this.cursors.space!)
        
        if (isSpaceJustDown) {
            if (this.isWin)
                console.log('Atualizar')
            else
                this.scene.start('game')
        }
    }
}
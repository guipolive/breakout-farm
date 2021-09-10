import Phaser from 'phaser'

import Paddle from '../game/Paddle'
import Ball from '../game/Ball'

export default class Game extends Phaser.Scene {

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private paddle!: Paddle
    private ball!: Ball

    private level!: number

    private livesLabel!: Phaser.GameObjects.Text
    private lives = 3

    private animals: Phaser.Physics.Matter.Sprite[] = []

    private levels = [
        'level1',
        'level2',
        'level3'
    ]

    constructor() {
        super('game');
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys()

        this.lives = 7
    }

    create(data: { level: number} = { level: 1 }) {
        const { width, height } = this.scale
        this.level = data.level

        const level = this.levels[data.level - 1]

    /* cow */

        const map = this.make.tilemap({key: level ?? 'level1'})
        const tileset = map.addTilesetImage('cow', 'cow')

        map.createLayer('Level', tileset)
        this.animals = map.createFromTiles(1, 0, { key: 'cow' })
            .map(go => {
                go.x += go.width * 0.5
                go.y += go.height * 0.5

                const cow = this.matter.add.gameObject(go, { isStatic: true}) as Phaser.Physics.Matter.Sprite
                cow.setData('type', 'animal')
                return cow;
            })

    /* ball */
        this.ball = new Ball(this.matter.world, 400, 300, 'ball', {
            circleRadius: 50
        })

    /* paddle */
        this.paddle = new Paddle(this.matter.world, width * 0.5, height * 0.9, 'paddle', {
            isStatic: true,
            chamfer: {
                radius: 15
            }
        })

        this.paddle.attachBall(this.ball)

        this.livesLabel = this.add.text(10, 10, `Vidas: ${this.lives}`, {
            fontSize: '30px',
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'
        })

        this.ball.setOnCollide(this.handleBallCollide.bind(this))
    }

    private handleBallCollide(data: Phaser.Types.Physics.Matter.MatterCollisionData) {
        const { bodyA } = data

        const goA = bodyA.gameObject as Phaser.GameObjects.GameObject

        if (goA?.getData('type') !== 'animal')
            return

        const index = this.animals.findIndex(anm => anm === goA)
        if (index >= 0) {
            this.animals.splice(index, 1)
        }

        this.sound.play('tone1')
        goA.destroy(true)

        if (this.animals.length <= 0) {
            this.sound.play('level1win')
            this.scene.start('game-over', {title: 'Você venceu!', bgColor: '#fcba03', win: true, level: this.level})
        }
    }

    update() {
        if (this.ball.y > this.scale.height + 100) {
            --this.lives
            this.livesLabel.text = `Vidas: ${this.lives}`

            if (this.lives <= 0) {
                this.sound.play('level1lost')
                this.scene.start('game-over', {title: 'Você perdeu!', win: false, level: this.level})
                return
            }

            this.paddle.attachBall(this.ball)
        }

        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(this.cursors.space!)
        if (isSpaceJustDown)
            this.paddle.launch()


        this.paddle.update(this.cursors);
    }
}
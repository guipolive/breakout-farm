import Phaser from 'phaser'

import Paddle from '../game/Paddle'

export default class Game extends Phaser.Scene {

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private paddle!: Paddle
    private ball!: Phaser.Physics.Matter.Image

    private livesLabel!: Phaser.GameObjects.Text
    private lives = 3

    constructor() {
        super('game');
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys()

        this.lives = 3
    }

    create() {
        const { width, height } = this.scale

    /* ball */
        this.ball = this.matter.add.image(400, 300, 'ball', undefined, {
            circleRadius: 12
        })

        const body = this.ball.body as MatterJS.BodyType
        body.inertia = Infinity
        // this.matter.body.setInertia(body, Infinity)
        this.ball.setFrictionAir(0)
        this.ball.setBounce(1.5)

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
    }

    update(t: number, dt: number) {
        if (this.ball.y > this.scale.height + 100) {
            --this.lives
            this.livesLabel.text = `Vidas: ${this.lives}`
            this.paddle.attachBall(this.ball)
        }

        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(this.cursors.space!)
        if (isSpaceJustDown)
            this.paddle.launch()


        this.paddle.update(this.cursors);
    }
}
import Phaser from 'phaser'

import Paddle from '../game/Paddle'

export default class Game extends Phaser.Scene {

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private paddle!: Paddle

    constructor() {
        super('game');
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create() {
        const { width, height } = this.scale

    /* ball */
        const ball = this.matter.add.image(400, 300, 'ball', undefined, {
            // circleRadius: 12
        })

        const body = ball.body as MatterJS.BodyType
        body.inertia = Infinity
        // this.matter.body.setInertia(body, Infinity)
        ball.setFrictionAir(0)
        ball.setBounce(1.2)

    /* paddle */
        this.paddle = new Paddle(this.matter.world, width * 0.5, height * 0.9, 'paddle', {
            isStatic: true,
            chamfer: {
                radius: 15
            }
        })

        this.paddle.attachBall(ball)

    //     this.paddle = this.matter.add.image(width * 0.5, height * 0.9, 'paddle', undefined, {
    //         isStatic: true,
    //         chamfer: {
    //             radius: 15
    //         }
    //     })
    }

    update(t: number, dt: number) {
        this.paddle.update(this.cursors);
    }
}
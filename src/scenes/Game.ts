import Phaser from 'phaser'

export default class Game extends Phaser.Scene {

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private paddle!: Phaser.Physics.Matter.Image

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
        ball.setVelocity(5, 5)

        const body = ball.body as MatterJS.BodyType
        body.inertia = Infinity
        // this.matter.body.setInertia(body, Infinity)
        ball.setFrictionAir(0)
        ball.setBounce(1.2)

    /* paddle */
        this.paddle = this.matter.add.image(width * 0.5, height * 0.9, 'paddle', undefined, {
            isStatic: true,
            chamfer: {
                radius: 15
            }
        })
    }

    update(t: number, dt: number) {
        const speed = 10

        if (this.cursors.left?.isDown) {
            // body.position.x -= 5
            this.paddle.x -= speed
        } else if (this.cursors.right?.isDown) {
            // body.position.x += 5
            this.paddle.x += speed
        }
    }
}
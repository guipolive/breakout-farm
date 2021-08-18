import Phaser from 'phaser'

export default class Paddle extends Phaser.Physics.Matter.Image {
    private ball?: Phaser.Physics.Matter.Image

    constructor(
        world: Phaser.Physics.Matter.World,
        x: number,
        y: number,
        texture: string,
        config?: Phaser.Types.Physics.Matter.MatterBodyConfig
    ) {
        super(world, x, y, texture, undefined, config)

        world.scene.add.existing(this)
    }

    attachBall(ball: Phaser.Physics.Matter.Image) {
        this.ball = ball
        this.ball.x = this.x
        this.ball.y = this.y - (this.height * 0.5) - (this.ball.height * 0.5)

        this.ball.setVelocity(0, 0)
    }

    launch() {
        if (!this.ball) /* Se não tem bola, não faz nada */
            return

        const { width, height } = this.scene.scale
        const x = width * 0.5
        const y = width * 0.5

        const vx = x - this.ball.x
        const vy = y- this.ball.y

        const vec = new Phaser.Math.Vector2(vx, vy).normalize().scale(8)

        this.ball.setVelocity(vec.x, vec.y)

        this.ball = undefined
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        const speed = 10

        if (cursors.left?.isDown) {
            // body.position.x -= 5
            this.x -= speed
        } else if (cursors.right?.isDown) {
            // body.position.x += 5
            this.x += speed
        }

        if (this.ball) {
            this.ball.x = this.x
        }
    }
}
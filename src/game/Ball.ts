import Phaser from 'phaser'

export default class Ball extends Phaser.Physics.Matter.Image {

    constructor(
        world: Phaser.Physics.Matter.World,
        x: number,
        y: number,
        key: string,
        config?: Phaser.Types.Physics.Matter.MatterBodyConfig
    ) {
        super(world, x, y, key, undefined, config)

        world.scene.add.existing(this)

        const body = this.body as MatterJS.BodyType
        body.inertia = Infinity

        this.setFrictionAir(0)
        this.setBounce(1.5)
    }
}
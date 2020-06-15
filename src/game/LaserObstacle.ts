import Phaser from 'phaser'
import TextureKeys from '~/consts/TextureKeys'

// 激光障碍物
export default class LaserObstacle extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y)

    // 创建一个顶端
    const top = scene.add.image(0, 0, TextureKeys.LaserEnd)
      .setOrigin(0.5, 0)

    // 创建激光的中间部分
    const middle = scene.add.image(0, top.y + top.displayHeight, TextureKeys.LaserMiddle)
      .setOrigin(0.5, 0)

    // 设置激光为高200
    middle.setDisplaySize(middle.width, 200)

    // 创建激光的下部分
    const bottom = scene.add.image(0, middle.y + middle.displayHeight, TextureKeys.LaserEnd)
      .setOrigin(0.5, 0)
      .setFlipY(true)

    // 将他们加入此容器
    this.add(top)
    this.add(middle)
    this.add(bottom)

    scene.physics.add.existing(this, true)

    const body = this.body as Phaser.Physics.Arcade.StaticBody
    const width = top.displayWidth
    const height = top.displayHeight + middle.displayHeight + bottom.displayHeight
    body.setSize(width, height)
    body.setOffset(-width * 0.5, 0)
  }

  preUpdate() { }
}

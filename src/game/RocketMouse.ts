import Phaser from 'phaser'

import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

// 火箭鼠
export default class RocketMouse extends Phaser.GameObjects.Container {
  private mouse: Phaser.GameObjects.Sprite
  private flames: Phaser.GameObjects.Sprite
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y)

    // 创建火箭鼠精灵
    this.mouse = scene.add.sprite(0, 0, TextureKeys.RocketMouse)
      .setOrigin(0.5, 1)
      .play(AnimationKeys.RocketMouseRun)

    // 创建火焰
    this.flames = scene.add.sprite(-63, -15, TextureKeys.RocketMouse)
      .play(AnimationKeys.RocketFlamesOn)
    this.enableJetpack(false)

    this.add(this.flames)
    this.add(this.mouse)

    scene.physics.add.existing(this)

    // 调整物理主体部分的尺寸和偏移量,使其包裹火箭鼠
    const body = this.body as Phaser.Physics.Arcade.Body
    body.setSize(this.mouse.width, this.mouse.height)
    body.setOffset(this.mouse.width * -0.5, -this.mouse.height)

    // 得到键盘事件
    this.cursors = scene.input.keyboard.createCursorKeys()
  }

  // 开关火箭喷射器
  enableJetpack(enabled: boolean) {
    this.flames.setVisible(enabled)
  }

  preUpdate() {
    const body = this.body as Phaser.Physics.Arcade.Body

    if (this.cursors.space?.isDown) {
      this.mouse.play(AnimationKeys.RocketMouseFly, true)
      body.setAccelerationY(-600)
      this.enableJetpack(true)
    } else {
      // 如果火箭鼠触地
      if (body.blocked.down) {
        this.mouse.play(AnimationKeys.RocketMouseRun, true)
        // 如果火箭鼠垂直方向的速度大于零
      } else if (body.velocity.y > 0) {
        this.mouse.play(AnimationKeys.RocketMouseFall, true)
      }
      body.setAccelerationY(0)
      this.enableJetpack(false)
    }
  }
}

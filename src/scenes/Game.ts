import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Game extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite

  constructor() {
    super(SceneKeys.Game)
  }

  preload() {
  }

  create() {
    // 得到游戏窗口大小
    const width = this.scale.width
    const height = this.scale.height
    // 设置碰撞边界
    this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 30)

    // 添加以瓦片精灵的方式将背景图加入场景
    this.background = this.add.tileSprite(0, 0, width, height, TextureKeys.Background)
      .setOrigin(0)
      .setScrollFactor(0, 0)

    // 添加角色
    // 播放奔跑动画
    const mouse = this.physics.add.sprite(width * 0.5, height - 30, TextureKeys.RocketMouse, 'rocketmouse_fly01.png')
      .play(AnimationKeys.RocketMouseRun)

    const body = mouse.body as Phaser.Physics.Arcade.Body
    body.setCollideWorldBounds(true)
    // 设置x轴的速度
    body.setVelocityX(200)

    // 设置相机跟随角色
    this.cameras.main.startFollow(mouse)
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)
  }

  update(t: number, dt: number) {
    // 根据相机滚动的x轴数据设置背景位置从而达到背景无限滚动的效果
    this.background.setTilePosition(this.cameras.main.scrollX)
  }
}
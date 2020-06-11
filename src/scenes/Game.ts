import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Game extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Game)
  }

  preload() {
  }

  create() {
    // 得到游戏窗口大小
    const width = this.scale.width
    const height = this.scale.height

    // 添加以瓦片精灵的方式将背景图加入场景
    this.add.tileSprite(0, 0, width, height, TextureKeys.Background)
      .setOrigin(0)

    // 添加角色
    this.add.sprite(width * 0.5, height * 0.5, TextureKeys.RocketMouse, 'rocketmouse_fly01.png')
      .play(AnimationKeys.RocketMouseRun)
  }
}
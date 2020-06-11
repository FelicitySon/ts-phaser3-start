import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader)
  }

  preload() {
    // 加载背景
    this.load.image(TextureKeys.Background, 'house/bg_repeat_340x640.png')
    // 加载角色
    this.load.atlas(TextureKeys.RocketMouse, 'characters/rocket-mouse.png', 'characters/rocket-mouse.json')
  }

  create() {
    // 创建角色奔跑动画
    this.anims.create({
      key: AnimationKeys.RocketMouseRun,
      frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, {
        start: 1,
        end: 4,
        prefix: 'rocketmouse_run',
        zeroPad: 2,
        suffix: '.png'
      }),
      frameRate: 10,
      repeat: -1
    })

    this.scene.start(SceneKeys.Game)
  }
}

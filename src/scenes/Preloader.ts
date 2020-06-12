import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader)
  }

  preload() {
    // 加载背景纹理图片
    this.load.image(TextureKeys.Background, 'house/bg_repeat_340x640.png')
    // 加载装饰物
    this.load.image(TextureKeys.MouseHole, 'house/object_mousehole.png')  // 老鼠洞
    this.load.image(TextureKeys.Window1, 'house/object_window1.png')  // 窗户 1
    this.load.image(TextureKeys.Window2, 'house/object_window2.png')  // 窗户 2
    this.load.image(TextureKeys.Bookcase1, 'house/object_bookcase1.png')  // 书柜 1
    this.load.image(TextureKeys.Bookcase2, 'house/object_bookcase2.png')  // 书柜 2

    // 加载角色纹理图片
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

    // 创建火箭火焰开启动画
    this.anims.create({
      key: AnimationKeys.RocketFlamesOn,
      frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, {
        start: 1,
        end: 2,
        prefix: 'flame',
        suffix: '.png'
      }),
      frameRate: 10,
      repeat: -1
    })

    // 创建火箭鼠飞翔动画
    this.anims.create({
      key: AnimationKeys.RocketMouseFly,
      frames: [{
        key: TextureKeys.RocketMouse,
        frame: 'rocketmouse_fly01.png'
      }]
    })

    // 创建火箭鼠跌落动画
    this.anims.create({
      key: AnimationKeys.RocketMouseFall,
      frames: [{
        key: TextureKeys.RocketMouse,
        frame: 'rocketmouse_fall01.png'
      }]
    })

    this.scene.start(SceneKeys.Game)
  }
}

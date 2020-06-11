import Phaser from 'phaser'

export default class Game extends Phaser.Scene {
  constructor() {
    super('game')
  }

  preload() {
    this.load.image('background', 'house/bg_repeat_340x640.png')

    // 加载角色
    this.load.atlas('rocket-mouse', 'characters/rocket-mouse.png', 'characters/rocket-mouse.json')
  }

  create() {
    // 得到游戏窗口大小
    const width = this.scale.width
    const height = this.scale.height

    this.anims.create({
      key: 'rocket-mouse-run',
      frames: this.anims.generateFrameNames('rocket-mouse', {
        start: 1,
        end: 4,
        prefix: 'rocketmouse_run',
        zeroPad: 2,
        suffix: '.png'
      }),
      frameRate: 10,
      repeat: -1
    })

    // 添加以瓦片精灵的方式将背景图加入场景
    this.add.tileSprite(0, 0, width, height, 'background').setOrigin(0)

    // 添加角色
    this.add.sprite(width * 0.5, height * 0.5, 'rocket-mouse', 'rocketmouse_fly01.png').play('rocket-mouse-run')
  }
}
import Phaser from 'phaser'

export default class Game extends Phaser.Scene {
  constructor() {
    super('game')
  }

  preload() {
    this.load.image('background', 'house/bg_repeat_340x640.png')
  }

  create() {
    // 得到游戏窗口大小
    const width = this.scale.width
    const height = this.scale.height

    // 添加以瓦片精灵的方式将背景图加入场景
    this.add.tileSprite(0, 0, width, height, 'background').setOrigin(0)
  }
}
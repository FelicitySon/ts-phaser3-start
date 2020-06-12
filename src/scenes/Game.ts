import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";
import RocketMouse from '~/game/RocketMouse';

export default class Game extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite
  private mouseHole!: Phaser.GameObjects.Image
  private window1!: Phaser.GameObjects.Image
  private window2!: Phaser.GameObjects.Image
  private bookcase1!: Phaser.GameObjects.Image
  private bookcase2!: Phaser.GameObjects.Image

  private bookcases: Phaser.GameObjects.Image[] = []
  private windows: Phaser.GameObjects.Image[] = []

  // 随机安放老鼠洞
  private wrapMouseHole() {
    const scrollX = this.cameras.main.scrollX
    const rightEdge = scrollX + this.scale.width

    if (this.mouseHole.x + this.mouseHole.width < scrollX) {
      this.mouseHole.x = Phaser.Math.Between(rightEdge + 100, rightEdge + 1000)
    }
  }

  // 随机安放窗户
  private wrapWindow() {
    const scrollX = this.cameras.main.scrollX
    const rightEdge = scrollX + this.scale.width

    let width = this.window1.width * 2
    if (this.window1.x + width < scrollX) {
      this.window1.x = Phaser.Math.Between(rightEdge + width, rightEdge + width + 800)

      // 检测是否与书柜有重叠
      const overlap = this.bookcases.find(bc => {
        return Math.abs(this.window1.x - bc.x) <= this.window1.width
      })
      this.window1.visible = !overlap
    }

    width = this.window2.width
    if (this.window2.x + width < scrollX) {
      this.window2.x = Phaser.Math.Between(this.window1.x + width, this.window1.x + width + 800)

      // 检测是否与书柜有重叠
      const overlap = this.bookcases.find(bc => {
        return Math.abs(this.window2.x - bc.x) <= this.window2.width
      })
      this.window2.visible = !overlap
    }
  }

  // 随机安放书架
  private wrapBookCase() {
    const scrollX = this.cameras.main.scrollX
    const rightEdge = scrollX + this.scale.width

    let width = this.bookcase1.width * 2
    if (this.bookcase1.x + width < scrollX) {
      this.bookcase1.x = Phaser.Math.Between(rightEdge + width, rightEdge + width + 800)

      // 检测是否与窗户有重叠
      const overlap = this.windows.find(wd => {
        return Math.abs(this.bookcase1.x - wd.x) <= this.bookcase1.width
      })
      this.bookcase1.visible = !overlap
    }

    width = this.bookcase2.width
    if (this.bookcase2.x + width < scrollX) {
      this.bookcase2.x = Phaser.Math.Between(this.bookcase1.x + width, this.bookcase1.x + width + 800)

      // 检测是否与窗户有重叠
      const overlap = this.windows.find(wd => {
        return Math.abs(this.bookcase2.x - wd.x) <= this.bookcase2.width
      })
      this.bookcase2.visible = !overlap
    }
  }

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

    // 添加老鼠洞
    this.mouseHole = this.add.image(Phaser.Math.Between(900, 1500), 501, TextureKeys.MouseHole)

    // 添加窗户
    this.window1 = this.add.image(Phaser.Math.Between(900, 1300), 200, TextureKeys.Window1)
    this.window2 = this.add.image(Phaser.Math.Between(1600, 2000), 200, TextureKeys.Window2)
    this.windows = [this.window1, this.window2]

    // 添加书架
    this.bookcase1 = this.add.image(Phaser.Math.Between(2200, 2700), 580, TextureKeys.Bookcase1).setOrigin(0.5, 1)
    this.bookcase2 = this.add.image(Phaser.Math.Between(2900, 3400), 580, TextureKeys.Bookcase2).setOrigin(0.5, 1)
    this.bookcases = [this.bookcase1, this.bookcase2]


    // 添加角色
    // 播放奔跑动画
    const mouse = new RocketMouse(this, width * 0.5, height - 30)
    this.add.existing(mouse)
    
    const body = mouse.body as Phaser.Physics.Arcade.Body
    // 开启碰撞
    body.setCollideWorldBounds(true)
    // 设置x轴的速度
    body.setVelocityX(200)

    // 设置相机跟随角色
    this.cameras.main.startFollow(mouse)
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)
  }

  update(t: number, dt: number) {
    this.wrapMouseHole()
    this.wrapWindow()
    this.wrapBookCase()
    // 根据相机滚动的x轴数据设置背景位置从而达到背景无限滚动的效果
    this.background.setTilePosition(this.cameras.main.scrollX)
  }
}
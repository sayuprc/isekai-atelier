import type { p5SVG } from 'p5.js-svg'
import { fillWhite, fillBlack, fillBlue, calculateDivideCirclePoints, type Point } from '../utils'

const side = 500

// 半径
const radius = side / 2

// 原点
const origin: Point = {
  x: side / 2 / 2,
  y: side / 2 / 2.5,
}

const originAfterMoving: Point = {
  x: 0,
  y: 0,
}

const leftSideAnemosSketch = (p: p5SVG) => {
  p.setup = () => {
    p.createCanvas(side, side, p.SVG)
    p.noLoop()

    const button = p.createButton('SVG ダウンロード')
    button.mousePressed(() => p.save('anemos-left.svg'))
  }

  p.draw = () => {
    p.scale(2)
    drawAnemos(p, origin, originAfterMoving, radius)
  }
}

export const drawAnemos = (p: p5SVG, origin: Point, originAfterMoving: Point, radius: number) => {
  p.push()
  p.translate(origin.x, origin.y)
  p.rotate(p.radians(30))

  // 葉の描画
  drawLeaves(p, radius)

  // 花弁の描画
  drawPetal(p, originAfterMoving)

  drawFloralOrgans(p, originAfterMoving)

  p.pop()
}

const drawLeaves = (p: p5SVG, radius: number) => {
  fillBlack(p)
  // 左の葉
  p.noStroke()

  p.point(235 - radius, 290 - radius)
  p.point(235 - radius, 325 - radius)
  p.point(238 - radius, 340 - radius)
  p.point(242 - radius, 360 - radius)
  p.point(243 - radius, 379 - radius)
  p.point(260 - radius, 350 - radius)
  p.point(270 - radius, 330 - radius)
  p.point(268 - radius, 300 - radius)
  p.point(260 - radius, 290 - radius)

  p.stroke(0)
  p.strokeWeight(0.2)

  p.beginShape()
  p.curveVertex(235 - radius, 290 - radius)
  p.curveVertex(235 - radius, 325 - radius)
  p.curveVertex(238 - radius, 340 - radius)
  p.curveVertex(242 - radius, 360 - radius)
  p.curveVertex(243 - radius, 379 - radius)
  p.curveVertex(260 - radius, 350 - radius)
  p.curveVertex(270 - radius, 330 - radius)
  p.curveVertex(268 - radius, 300 - radius)
  p.curveVertex(260 - radius, 290 - radius)
  p.curveVertex(235 - radius, 290 - radius)
  p.endShape()

  // 右の葉
  p.noStroke()

  p.point(280 - radius, 290 - radius)
  p.point(270 - radius, 300 - radius)
  p.point(275 - radius, 325 - radius)
  p.point(290 - radius, 340 - radius)
  p.point(310 - radius, 352 - radius)
  p.point(325 - radius, 360 - radius)
  p.point(340 - radius, 364 - radius)
  p.point(305 - radius, 300 - radius)
  p.point(290 - radius, 290 - radius)

  p.stroke(0)
  p.strokeWeight(0.2)

  p.beginShape()
  p.curveVertex(280 - radius, 290 - radius)
  p.curveVertex(270 - radius, 300 - radius)
  p.curveVertex(275 - radius, 325 - radius)
  p.curveVertex(290 - radius, 340 - radius)
  p.curveVertex(310 - radius, 352 - radius)
  p.curveVertex(325 - radius, 360 - radius)
  p.curveVertex(340 - radius, 364 - radius)
  p.curveVertex(305 - radius, 300 - radius)
  p.curveVertex(290 - radius, 290 - radius)
  p.curveVertex(270 - radius, 290 - radius)
  p.endShape()
}

const drawPetal = (p: p5SVG, originAfterMoving: Point) => {
  // 花弁の青い部分を先に塗る
  fillBlue(p)
  p.ellipse(originAfterMoving.x, originAfterMoving.y, 100)
  // 花弁の白い部分を先に塗る
  fillWhite(p)
  p.ellipse(originAfterMoving.x, originAfterMoving.y, 66)

  const [primary, secondary] = calculateDivideCirclePoints(p, originAfterMoving, 50)
  const [miniPrimary, miniSecondary] = calculateDivideCirclePoints(p, originAfterMoving, 33)

  for (let i = 0; i < 5; i++) {
    p.push()
    p.translate(originAfterMoving.x, originAfterMoving.y)
    p.rotate(p.radians(i * 72))

    p.noStroke()
    p.point(originAfterMoving.x, originAfterMoving.y)
    p.point(secondary.x, secondary.y)
    p.point(secondary.x + primary.x, secondary.y - primary.y)
    p.point(primary.x, primary.y)

    p.stroke(0)
    p.strokeWeight(1)

    // 青い花弁の色
    fillBlue(p)
    p.beginShape()
    p.curveVertex(originAfterMoving.x, originAfterMoving.y)
    p.curveVertex(secondary.x, secondary.y)
    p.curveVertex(secondary.x + primary.x * 0.6, secondary.y - primary.y * 0.6)
    p.curveVertex(secondary.x * 0.6 + primary.x, secondary.y * 0.6 - primary.y)
    p.curveVertex(primary.x, primary.y)
    p.curveVertex(originAfterMoving.x, originAfterMoving.y)
    p.endShape()

    // 白い部分
    p.strokeWeight(0.5)
    fillWhite(p)
    p.beginShape()
    p.bezier(
      miniPrimary.x,
      miniPrimary.y,
      miniPrimary.x + 15,
      miniPrimary.y + 25,
      miniSecondary.x + 20,
      miniSecondary.y + 8,
      miniSecondary.x,
      miniSecondary.y,
    )
    p.endShape()

    p.strokeWeight(1)
    p.line(originAfterMoving.x, originAfterMoving.y, primary.x, primary.y)

    p.pop()
  }
}

const drawFloralOrgans = (p: p5SVG, originAfterMoving: Point) => {
  // 中心の円
  p.stroke(0)
  fillWhite(p)
  p.ellipse(originAfterMoving.x, originAfterMoving.y, 50)
  fillBlack(p)
  p.ellipse(originAfterMoving.x, originAfterMoving.y, 30)
}

export { leftSideAnemosSketch }

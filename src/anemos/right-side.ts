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

const rightSideAnemosSketch = (p: p5SVG) => {
  p.setup = () => {
    p.createCanvas(side, side, p.SVG)
    p.noLoop()

    const button = p.createButton('SVG ダウンロード')
    button.mousePressed(() => p.save('anemos-right.svg'))
  }

  p.draw = () => {
    p.scale(2)
    drawAnemos(p, origin, originAfterMoving, radius)
  }
}

export const drawAnemos = (p: p5SVG, origin: Point, originAfterMoving: Point, radius: number) => {
  p.push()
  p.translate(origin.x, origin.y)

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

  p.point(240 - radius, 310 - radius)
  p.point(235 - radius, 325 - radius)
  p.point(233 - radius, 340 - radius)
  p.point(245 - radius, 396 - radius)
  p.point(250 - radius, 384 - radius)
  p.point(258 - radius, 370 - radius)
  p.point(268 - radius, 350 - radius)
  p.point(272 - radius, 330 - radius)
  p.point(264 - radius, 302 - radius)
  p.point(250 - radius, 300 - radius)

  p.stroke(0)
  p.strokeWeight(0.2)

  p.beginShape()
  p.curveVertex(240 - radius, 310 - radius)
  p.curveVertex(235 - radius, 325 - radius)
  p.curveVertex(233 - radius, 340 - radius)
  p.curveVertex(245 - radius, 396 - radius)
  p.curveVertex(250 - radius, 384 - radius)
  p.curveVertex(258 - radius, 370 - radius)
  p.curveVertex(268 - radius, 350 - radius)
  p.curveVertex(272 - radius, 330 - radius)
  p.curveVertex(264 - radius, 302 - radius)
  p.curveVertex(250 - radius, 300 - radius)
  p.curveVertex(240 - radius, 310 - radius)
  p.endShape()

  // 右の葉
  p.noStroke()

  p.point(275 - radius, 290 - radius)
  p.point(260 - radius, 290 - radius)
  p.point(265 - radius, 300 - radius)
  p.point(270 - radius, 310 - radius)
  p.point(280 - radius, 325 - radius)
  p.point(290 - radius, 332 - radius)
  p.point(330 - radius, 350 - radius)
  p.point(320 - radius, 335 - radius)
  p.point(305 - radius, 300 - radius)
  p.point(290 - radius, 290 - radius)

  p.stroke(0)
  p.strokeWeight(0.2)

  p.beginShape()
  p.curveVertex(275 - radius, 290 - radius)
  p.curveVertex(260 - radius, 290 - radius)
  p.curveVertex(265 - radius, 300 - radius)
  p.curveVertex(270 - radius, 310 - radius)
  p.curveVertex(280 - radius, 325 - radius)
  p.curveVertex(290 - radius, 332 - radius)
  p.curveVertex(330 - radius, 350 - radius)
  p.curveVertex(320 - radius, 335 - radius)
  p.curveVertex(305 - radius, 300 - radius)
  p.curveVertex(290 - radius, 290 - radius)
  p.curveVertex(275 - radius, 290 - radius)
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
  p.stroke(0)
  fillBlack(p)
  p.ellipse(originAfterMoving.x, originAfterMoving.y, 50)

  // 口の色
  p.fill(139, 44, 74)

  p.strokeWeight(0.2)
  p.point(250 - radius, 250 - radius)
  p.point(240 - radius, 245 - radius)
  p.point(228 - radius, 256 - radius)
  p.point(243 - radius, 267 - radius)
  p.point(249 - radius, 264 - radius)
  p.point(251 - radius, 256 - radius)
  p.point(258 - radius, 260 - radius)
  p.point(265 - radius, 260 - radius)
  p.point(268 - radius, 256 - radius)
  p.point(270 - radius, 244 - radius)
  p.point(255 - radius, 240 - radius)

  p.beginShape()
  p.curveVertex(250 - radius, 250 - radius)
  p.curveVertex(250 - radius, 250 - radius)
  p.curveVertex(240 - radius, 245 - radius)
  p.curveVertex(228 - radius, 256 - radius)
  p.curveVertex(243 - radius, 267 - radius)
  p.curveVertex(249 - radius, 264 - radius)
  p.curveVertex(251 - radius, 256 - radius)
  p.curveVertex(258 - radius, 260 - radius)
  p.curveVertex(265 - radius, 260 - radius)
  p.curveVertex(268 - radius, 256 - radius)
  p.curveVertex(270 - radius, 244 - radius)
  p.curveVertex(255 - radius, 240 - radius)
  p.curveVertex(250 - radius, 250 - radius)
  p.curveVertex(250 - radius, 250 - radius)
  p.endShape()
}

export { rightSideAnemosSketch }

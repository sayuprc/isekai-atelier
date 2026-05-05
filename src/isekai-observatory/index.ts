import type { p5SVG } from 'p5.js-svg'

export type LogoVariant = 'crimson' | 'monotone' | 'twilight'
type PreviewTheme = 'light' | 'dark'

const colorThemes = {
  crimson: {
    light: {
      infinityColor: '#94a3b8',
      morseColor: '#e11d48',
    },
    dark: {
      infinityColor: '#475569',
      morseColor: '#e11d48',
    },
  },
  monotone: {
    light: {
      infinityColor: '#94a3b8',
      morseColor: '#0f172a',
    },
    dark: {
      infinityColor: '#64748b',
      morseColor: '#f8fafc',
    },
  },
  twilight: {
    light: {
      infinityColor: '#334155',
      morseColor: 'gradient',
    },
    dark: {
      infinityColor: '#e2e8f0',
      morseColor: 'gradient',
    },
  },
} as const

const drawLogo = (p: p5SVG, type: LogoVariant, currentTheme: PreviewTheme) => {
  p.clear()

  const { infinityColor, morseColor } = colorThemes[type][currentTheme]

  p.push()
  p.translate(p.width / 2, p.height / 2)
  p.scale(0.85)
  p.translate(-200, -100)

  p.noFill()
  p.strokeCap(p.ROUND)

  p.strokeWeight(5)
  p.stroke(infinityColor)

  p.beginShape()
  for (let t = 0; t <= 0.96; t += 0.01) {
    p.vertex(p.bezierPoint(350, 350, 250, 200, t), p.bezierPoint(100, 170, 170, 100, t))
  }
  p.endShape()

  p.beginShape()
  for (let t = 0.04; t <= 1.0; t += 0.01) {
    p.vertex(p.bezierPoint(200, 150, 50, 50, t), p.bezierPoint(100, 30, 30, 100, t))
  }
  p.endShape()

  p.push()
  p.translate(200, 100)
  p.strokeWeight(5)

  const r = 34
  let currentAngle = p.radians(-115)
  const pattern = [4, 10, 20, 10, 4, 10, 4, 10, 20, 8]
  const totalPattern = 100
  const colorStart = p.color('#06b6d4')
  const colorEnd = p.color('#d946ef')

  for (let i = 0; i < pattern.length; i++) {
    const stepAngle = (pattern[i] / totalPattern) * p.TWO_PI

    if (i % 2 === 0) {
      if (morseColor === 'gradient') {
        const segments = p.ceil(pattern[i] * 2)
        const segmentAngle = stepAngle / segments

        for (let j = 0; j < segments; j++) {
          const startA = currentAngle + j * segmentAngle
          const endA = currentAngle + (j + 1) * segmentAngle
          const midA = (startA + endA) / 2
          const x = p.cos(midA) * r
          const y = p.sin(midA) * r
          const t = p.map(x + y, -r * 1.5, r * 1.5, 0, 1, true)

          p.stroke(p.lerpColor(colorStart, colorEnd, t))
          p.arc(0, 0, r * 2, r * 2, startA, endA)
        }
      } else {
        p.stroke(morseColor)
        p.arc(0, 0, r * 2, r * 2, currentAngle, currentAngle + stepAngle)
      }
    }

    currentAngle += stepAngle
  }

  p.pop()

  p.strokeWeight(5)
  p.stroke(infinityColor)
  p.beginShape()
  p.vertex(50, 100)
  p.bezierVertex(50, 170, 150, 170, 200, 100)
  p.bezierVertex(250, 30, 350, 30, 350, 100)
  p.endShape()

  p.pop()
}

const createLogoSketch = (type: LogoVariant) => (p: p5SVG) => {
  let currentTheme: PreviewTheme = 'light'
  let mountElement: HTMLElement | null = null

  const applyPreviewTheme = () => {
    if (mountElement) {
      mountElement.dataset.previewTheme = currentTheme
    }
  }

  p.setup = () => {
    p.createCanvas(300, 200, p.SVG)
    p.noLoop()

    const controls = p.createDiv()
    controls.class('sketch-controls')
    mountElement = controls.elt.parentElement as HTMLElement | null
    applyPreviewTheme()

    const themeButton = p.createButton('Dark')
    themeButton.parent(controls)
    themeButton.mousePressed(() => {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light'
      themeButton.html(currentTheme === 'light' ? 'Dark' : 'Light')
      applyPreviewTheme()
      p.redraw()
    })

    const downloadButton = p.createButton('SVG ダウンロード')
    downloadButton.parent(controls)
    downloadButton.mousePressed(() => p.save(`isekai-observatory-${type}-${currentTheme}.svg`))
  }

  p.draw = () => {
    drawLogo(p, type, currentTheme)
  }
}

export const twilightLogoSketch = createLogoSketch('twilight')
export const crimsonLogoSketch = createLogoSketch('crimson')
export const monotoneLogoSketch = createLogoSketch('monotone')

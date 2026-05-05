import p5 from 'p5'
import init from 'p5.js-svg'
import { sketchRegistry, type SketchKey } from '../pages'

init(p5)

let mountedSketches: p5[] = []

const isSketchKey = (key: string): key is SketchKey => key in sketchRegistry

const clearSketches = () => {
  for (const sketch of mountedSketches) {
    sketch.remove()
  }

  mountedSketches = []
}

export const mountSketches = () => {
  clearSketches()

  const mountPoints = document.querySelectorAll<HTMLElement>('[data-sketch-key]')

  for (const mountPoint of mountPoints) {
    const key = mountPoint.dataset.sketchKey

    if (!key) {
      continue
    }

    if (!isSketchKey(key)) {
      continue
    }

    const sketch = sketchRegistry[key]

    mountedSketches.push(new p5(sketch, mountPoint))
  }
}

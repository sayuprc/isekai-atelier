import type { p5SVG } from 'p5.js-svg'
import { anemosSketch } from './anemos'
import { leftSideAnemosSketch } from './anemos/left-side'
import { rightSideAnemosSketch } from './anemos/right-side'
import { crimsonLogoSketch, monotoneLogoSketch, twilightLogoSketch } from './isekai-observatory'

export type SketchKey =
  | 'anemos-left'
  | 'anemos-right'
  | 'anemos'
  | 'isekai-observatory-twilight'
  | 'isekai-observatory-crimson'
  | 'isekai-observatory-monotone'

export const sketchRegistry: Record<SketchKey, (p: p5SVG) => void> = {
  'anemos-left': leftSideAnemosSketch,
  'anemos-right': rightSideAnemosSketch,
  anemos: anemosSketch,
  'isekai-observatory-twilight': twilightLogoSketch,
  'isekai-observatory-crimson': crimsonLogoSketch,
  'isekai-observatory-monotone': monotoneLogoSketch,
}

export type SketchDefinition = {
  key: SketchKey
  title: string
}

export type PageDefinition = {
  slug: string
  title: string
  description: string
  layout?: 'default' | 'two-column'
  sketches: SketchDefinition[]
}

export const pages: PageDefinition[] = [
  {
    slug: 'anemos',
    title: 'anemos',
    description: '左右パーツと全体図をまとめて確認できるページです。',
    layout: 'two-column',
    sketches: [
      { key: 'anemos-left', title: 'Left Side' },
      { key: 'anemos-right', title: 'Right Side' },
      { key: 'anemos', title: 'Combined' },
    ],
  },
  {
    slug: 'isekai-observatory',
    title: 'Isekai Observatory',
    description: 'ロゴを確認できるページです。',
    layout: 'two-column',
    sketches: [
      { key: 'isekai-observatory-twilight', title: 'Twilight' },
      { key: 'isekai-observatory-crimson', title: 'Crimson' },
      { key: 'isekai-observatory-monotone', title: 'Monotone' },
    ],
  },
]

export const findPageBySlug = (slug: string) => pages.find((page) => page.slug === slug)

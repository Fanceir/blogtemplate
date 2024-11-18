import Translate, { translate } from '@docusaurus/Translate'
import { Icon } from '@iconify/react'
import OpenSourceSvg from '@site/static/svg/undraw_open_source.svg'
import SpiderSvg from '@site/static/svg/undraw_spider.svg'
import WebDeveloperSvg from '@site/static/svg/undraw_web_developer.svg'

export type FeatureItem = {
  title: string | React.ReactNode
  description: string | React.ReactNode
  header: React.ReactNode
  icon?: React.ReactNode
}

const FEATURES: FeatureItem[] = [
  {
    title: translate({
      id: 'homepage.feature.developer',
      message: 'TypeScript beginner',
    }),
    description: (
      <Translate>
        作为一名 TypeScript 初学者，正在努力学习 TypeScript，希望能够成为一名 TypeScript 高手。
      </Translate>
    ),
    header: <WebDeveloperSvg className={'h-auto w-full'} height={150} role="img" />,
    icon: <Icon icon="logos:typescript-icon" className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: translate({
      id: 'homepage.feature.spider',
      message: '看过点算法',
    }),
    description: (
      <Translate>
        半途而废的失败人士，能力低下
      </Translate>
    ),
    header: <SpiderSvg className={'h-auto w-full'} height={150} role="img" />,
  },
  {
    title: translate({
      id: 'homepage.feature.enthusiast',
      message: '开源爱好者',
    }),
    description: (
      <Translate>
        作为一名开源爱好者，渴望为开源社区做出自己的贡献。
      </Translate>
    ),
    header: <OpenSourceSvg className={'h-auto w-full'} height={150} role="img" />,
  },
]

export default FEATURES
